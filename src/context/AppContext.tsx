import React, { createContext, useContext, useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, fetchUserProfile, upsertUserProfile } from '../lib/supabase';
import { 
  StudentProfileData, 
  UserRole, 
  SemesterRecord, 
  CourseGrade,
  PlannerTask, 
  BudgetItem, 
  MarketplaceListing, 
  CommunityPost, 
  NotificationItem,
  DocumentItem,
  Institution,
  FacultyRecord,
  DepartmentRecord,
  ProgrammeRecord,
  CourseRecord,
  PastQuestion,
  StudyMaterial,
  AcademicImportResult,
  AcademicImportDetail,
  StudyGroup,
  GroupChatMessage,
  DirectConversation,
  DirectChatMessage,
  CommunityNotification,
  ModerationReport,
  StudySession,
  GroupSharedResource,
  SavedCopilotNote,
  AdditionRequest,
  CourseRepApplication,
  CourseRepStatus,
  LecturerProfile,
  CourseAnnouncement,
  PersonalCollection,
  LecturerRepMessage
} from '../types';
import { 
  DEFAULT_STUDENT, 
  SAMPLE_SEMESTERS, 
  SAMPLE_TASKS, 
  SAMPLE_BUDGET, 
  SAMPLE_MARKETPLACE_LISTINGS, 
  SAMPLE_COMMUNITY_POSTS,
  SAMPLE_DOCUMENTS
} from '../data/mockData';
import {
  INITIAL_STUDY_GROUPS,
  INITIAL_GROUP_CHAT_MESSAGES,
  INITIAL_CONVERSATIONS,
  INITIAL_DIRECT_MESSAGES,
  INITIAL_COMMUNITY_NOTIFICATIONS
} from '../data/communityData';
import {
  ALL_INSTITUTIONS,
  ALL_FACULTIES,
  ALL_DEPARTMENTS,
  ALL_PROGRAMMES,
  ALL_COURSES,
  ALL_PAST_QUESTIONS,
  ALL_STUDY_MATERIALS
} from '../data/academicStructureData';
import {
  INITIAL_COURSE_REP_APPLICATIONS,
  INITIAL_LECTURER_PROFILES,
  INITIAL_COURSE_ANNOUNCEMENTS,
  INITIAL_PERSONAL_COLLECTIONS,
  INITIAL_LECTURER_REP_MESSAGES
} from '../data/selfServiceData';

export type AppView = 
  | 'landing'
  | 'login'
  | 'signup'
  | 'forgot_password'
  | 'dashboard'
  | 'copilot'
  | 'past_questions'
  | 'materials'
  | 'gpa_calculator'
  | 'institutions'
  | 'project_center'
  | 'community'
  | 'admin'
  | 'profile'
  | 'course_rep'
  | 'lecturer'
  | 'my_courses'
  | 'my_library';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  student: StudentProfileData;
  updateStudent: (updated: Partial<StudentProfileData>) => Promise<void> | void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Supabase Auth States
  currentUser: User | null;
  currentSession: Session | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  isProfilesTableReady: boolean;
  logout: () => Promise<void>;
  refreshUserProfile: (userOverride?: User) => Promise<void>;
  setStudentSession: (email: string, fullName?: string, metadata?: Record<string, any>) => void;

  // Modals
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'signup';
  setAuthMode: (mode: 'login' | 'signup') => void;
  onboardingOpen: boolean;
  setOnboardingOpen: (open: boolean) => void;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  subscriptionOpen: boolean;
  setSubscriptionOpen: (open: boolean) => void;
  
  // Academic Structure State
  institutions: Institution[];
  faculties: FacultyRecord[];
  departments: DepartmentRecord[];
  programmes: ProgrammeRecord[];
  courses: CourseRecord[];
  pastQuestions: PastQuestion[];
  studyMaterials: StudyMaterial[];

  // Academic Structure CRUD
  addInstitution: (inst: Omit<Institution, 'id'>) => void;
  updateInstitution: (id: string, inst: Partial<Institution>) => void;
  deleteInstitution: (id: string) => void;

  addFaculty: (fac: Omit<FacultyRecord, 'id'>) => void;
  addDepartment: (dept: Omit<DepartmentRecord, 'id'>) => void;
  addProgramme: (prog: Omit<ProgrammeRecord, 'id'>) => void;

  addCourse: (course: Omit<CourseRecord, 'id'>) => void;
  updateCourse: (id: string, updated: Partial<CourseRecord>) => void;
  deleteCourse: (id: string) => void;

  addPastQuestion: (pq: Omit<PastQuestion, 'id'>) => void;
  updatePastQuestion: (id: string, updated: Partial<PastQuestion>) => void;
  deletePastQuestion: (id: string) => void;

  addStudyMaterial: (mat: Omit<StudyMaterial, 'id'>) => void;
  updateStudyMaterial: (id: string, updated: Partial<StudyMaterial>) => void;
  deleteStudyMaterial: (id: string) => void;

  // Import System
  importAcademicData: (records: Partial<CourseRecord>[]) => AcademicImportResult;

  // Data lists & mutators
  semesters: SemesterRecord[];
  addSemester: (semester: SemesterRecord) => void;
  deleteSemester: (id: string) => void;
  
  tasks: PlannerTask[];
  addTask: (task: Omit<PlannerTask, 'id'>) => void;
  toggleTaskCompleted: (id: string) => void;
  deleteTask: (id: string) => void;
  
  budget: BudgetItem[];
  addBudgetItem: (item: Omit<BudgetItem, 'id'>) => void;
  deleteBudgetItem: (id: string) => void;
  
  marketplace: MarketplaceListing[];
  addListing: (listing: Omit<MarketplaceListing, 'id' | 'postedAt'>) => void;
  
  communityPosts: CommunityPost[];
  addCommunityPost: (post: Omit<CommunityPost, 'id' | 'createdAt' | 'likes' | 'commentsCount'>) => void;
  likePost: (id: string) => void;
  reactToPost: (postId: string, reactionType: 'like' | 'helpful' | 'brilliant' | 'question') => void;
  addComment: (postId: string, commentText: string) => void;
  addPostCommentReply: (postId: string, commentId: string, replyText: string) => void;
  deletePost: (postId: string) => void;

  // Study Groups
  studyGroups: StudyGroup[];
  createStudyGroup: (groupData: Omit<StudyGroup, 'id' | 'createdAt' | 'memberCount' | 'members' | 'studySessions' | 'sharedResources'>) => string;
  updateStudyGroup: (id: string, updated: Partial<StudyGroup>) => void;
  deleteStudyGroup: (id: string) => void;
  joinStudyGroup: (groupId: string, message?: string) => void;
  leaveStudyGroup: (groupId: string) => void;
  handleGroupJoinRequest: (groupId: string, requestId: string, action: 'accept' | 'reject') => void;
  promoteGroupMember: (groupId: string, memberId: string, newRole: 'admin' | 'member') => void;
  removeGroupMember: (groupId: string, memberId: string) => void;
  addStudySession: (groupId: string, session: Omit<StudySession, 'id' | 'attendeesCount' | 'isAttending'>) => void;
  toggleAttendStudySession: (groupId: string, sessionId: string) => void;
  shareResourceInGroup: (groupId: string, resource: Omit<GroupSharedResource, 'id' | 'sharedAt' | 'sharedBy'>) => void;
  groupChatMessages: Record<string, GroupChatMessage[]>;
  sendGroupChatMessage: (groupId: string, text: string, replyTo?: { messageId: string; senderName: string; text: string }, attachedResource?: GroupSharedResource) => void;

  // Direct Messaging
  directConversations: DirectConversation[];
  directMessages: Record<string, DirectChatMessage[]>;
  sendDirectMessage: (conversationId: string, recipientId: string, recipientName: string, text: string, replyToText?: string) => void;
  startOrGetDirectConversation: (recipientId: string, recipientName: string, recipientInstitution: string, recipientDepartment: string) => string;
  markConversationAsRead: (conversationId: string) => void;

  // Notifications & Moderation
  communityNotifications: CommunityNotification[];
  markCommunityNotificationRead: (id: string) => void;
  markAllCommunityNotificationsRead: () => void;
  reportContent: (report: Omit<ModerationReport, 'id' | 'reportedAt' | 'status'>) => void;
  moderationReports: ModerationReport[];
  blockedUserIds: string[];
  blockUser: (userId: string, userName?: string) => void;
  unblockUser: (userId: string) => void;
  
  documents: DocumentItem[];
  addDocument: (doc: Omit<DocumentItem, 'id' | 'uploadedAt'>) => void;
  deleteDocument: (id: string) => void;
  
  // Saved AI Copilot Notes
  savedCopilotNotes: SavedCopilotNote[];
  saveCopilotNote: (note: Omit<SavedCopilotNote, 'id' | 'savedAt'>) => void;
  deleteCopilotNote: (id: string) => void;
  
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // Academic Addition Requests (Review queue for unavailable institutions/courses)
  additionRequests: AdditionRequest[];
  submitAdditionRequest: (req: Omit<AdditionRequest, 'id' | 'status' | 'submittedAt'>) => void;
  updateAdditionRequestStatus: (id: string, status: 'Approved' | 'Declined') => void;

  // Course Rep Management & Applications
  courseRepApplications: CourseRepApplication[];
  submitCourseRepApplication: (app: Omit<CourseRepApplication, 'id' | 'applicationDate' | 'status'>) => void;
  updateCourseRepApplicationStatus: (id: string, status: CourseRepStatus, adminNotes?: string) => void;
  courseRepModalOpen: boolean;
  setCourseRepModalOpen: (open: boolean) => void;

  // Lecturer Management & Spaces
  lecturerProfiles: LecturerProfile[];
  currentLecturerProfile: LecturerProfile | null;
  updateLecturerProfile: (profile: Partial<LecturerProfile>) => void;
  updateLecturerVerificationStatus: (id: string, status: 'Pending' | 'Verified' | 'Suspended') => void;

  // Course Announcements
  courseAnnouncements: CourseAnnouncement[];
  addCourseAnnouncement: (announcement: Omit<CourseAnnouncement, 'id' | 'createdAt'>) => void;
  deleteCourseAnnouncement: (id: string) => void;

  // Lecturer ↔ Course Rep Coordination Channel
  lecturerRepMessages: Record<string, LecturerRepMessage[]>;
  sendLecturerRepMessage: (courseCode: string, message: string, role: 'lecturer' | 'course_rep') => void;

  // Personal Library & Collections
  personalCollections: PersonalCollection[];
  createPersonalCollection: (name: string, description?: string, courseCode?: string, color?: string) => void;
  addItemToCollection: (collectionId: string, item: { id: string; type: 'past_question' | 'study_material' | 'copilot_note' | 'web_link'; title: string; subtitle?: string }) => void;
  removeItemFromCollection: (collectionId: string, itemId: string) => void;
  deletePersonalCollection: (collectionId: string) => void;

  // Self-Service Course & Resource Management
  enrollCourse: (courseCode: string) => void;
  unenrollCourse: (courseCode: string) => void;
  toggleBookmarkPastQuestion: (pqId: string) => void;
  toggleBookmarkStudyMaterial: (matId: string) => void;

  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [student, setStudent] = useState<StudentProfileData>(DEFAULT_STUDENT);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [subscriptionOpen, setSubscriptionOpen] = useState(false);

  // Supabase Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [isProfilesTableReady, setIsProfilesTableReady] = useState<boolean>(true);

  // Keep references to prevent duplicate requests or stale closures
  const currentUserRef = useRef<User | null>(null);
  const lastFetchedProfileUserId = useRef<string | null>(null);
  const isFetchingProfile = useRef<boolean>(false);

  // Dynamic Academic Structure Collections
  const [institutions, setInstitutions] = useState<Institution[]>(ALL_INSTITUTIONS);
  const [faculties, setFaculties] = useState<FacultyRecord[]>(ALL_FACULTIES);
  const [departments, setDepartments] = useState<DepartmentRecord[]>(ALL_DEPARTMENTS);
  const [programmes, setProgrammes] = useState<ProgrammeRecord[]>(ALL_PROGRAMMES);
  const [courses, setCourses] = useState<CourseRecord[]>(ALL_COURSES);
  const [pastQuestions, setPastQuestions] = useState<PastQuestion[]>(ALL_PAST_QUESTIONS);
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>(ALL_STUDY_MATERIALS);

  // User Data Lists
  const [semesters, setSemesters] = useState<SemesterRecord[]>(SAMPLE_SEMESTERS);
  const [tasks, setTasks] = useState<PlannerTask[]>(SAMPLE_TASKS);
  const [budget, setBudget] = useState<BudgetItem[]>(SAMPLE_BUDGET);
  const [marketplace, setMarketplace] = useState<MarketplaceListing[]>(SAMPLE_MARKETPLACE_LISTINGS);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sh_community_posts');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            return parsed.map((p: any) => ({
              ...p,
              tags: Array.isArray(p.tags) ? p.tags : [],
              comments: Array.isArray(p.comments) ? p.comments.map((c: any) => ({
                ...c,
                replies: Array.isArray(c.replies) ? c.replies : []
              })) : []
            }));
          }
        } catch {}
      }
    }
    return SAMPLE_COMMUNITY_POSTS;
  });

  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sh_study_groups');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            return parsed.map((g: any) => ({
              ...g,
              tags: Array.isArray(g.tags) ? g.tags : [],
              rules: Array.isArray(g.rules) ? g.rules : [],
              members: Array.isArray(g.members) ? g.members : [],
              sharedResources: Array.isArray(g.sharedResources) ? g.sharedResources : [],
              studySessions: Array.isArray(g.studySessions) ? g.studySessions : [],
              pendingRequests: Array.isArray(g.pendingRequests) ? g.pendingRequests : []
            }));
          }
        } catch {}
      }
    }
    return INITIAL_STUDY_GROUPS;
  });

  const [groupChatMessages, setGroupChatMessages] = useState<Record<string, GroupChatMessage[]>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sh_group_chat_msgs');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === 'object') return parsed;
        } catch {}
      }
    }
    return INITIAL_GROUP_CHAT_MESSAGES;
  });

  const [directConversations, setDirectConversations] = useState<DirectConversation[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sh_direct_conversations');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        } catch {}
      }
    }
    return INITIAL_CONVERSATIONS;
  });

  const [directMessages, setDirectMessages] = useState<Record<string, DirectChatMessage[]>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sh_direct_messages');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === 'object') return parsed;
        } catch {}
      }
    }
    return INITIAL_DIRECT_MESSAGES;
  });

  const [communityNotifications, setCommunityNotifications] = useState<CommunityNotification[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sh_community_notifications');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        } catch {}
      }
    }
    return INITIAL_COMMUNITY_NOTIFICATIONS;
  });

  const [moderationReports, setModerationReports] = useState<ModerationReport[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sh_moderation_reports');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        } catch {}
      }
    }
    return [];
  });

  const [blockedUserIds, setBlockedUserIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sh_blocked_users');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        } catch {}
      }
    }
    return [];
  });

  // Persist community state updates to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sh_community_posts', JSON.stringify(communityPosts));
    }
  }, [communityPosts]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sh_study_groups', JSON.stringify(studyGroups));
    }
  }, [studyGroups]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sh_group_chat_msgs', JSON.stringify(groupChatMessages));
    }
  }, [groupChatMessages]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sh_direct_conversations', JSON.stringify(directConversations));
    }
  }, [directConversations]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sh_direct_messages', JSON.stringify(directMessages));
    }
  }, [directMessages]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sh_community_notifications', JSON.stringify(communityNotifications));
    }
  }, [communityNotifications]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sh_moderation_reports', JSON.stringify(moderationReports));
    }
  }, [moderationReports]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sh_blocked_users', JSON.stringify(blockedUserIds));
    }
  }, [blockedUserIds]);

  // Addition Requests State (Student submissions for unlisted institutions, departments, or courses)
  const [additionRequests, setAdditionRequests] = useState<AdditionRequest[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sh_addition_requests');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        } catch {}
      }
    }
    return [
      {
        id: 'req_001',
        type: 'course',
        studentName: 'Blessing Okafor',
        studentEmail: 'b.okafor@student.unilag.edu.ng',
        institutionName: 'University of Lagos',
        facultyName: 'Faculty of Science',
        departmentName: 'Computer Science',
        courseCode: 'CSC 318',
        courseTitle: 'Introduction to Quantum Computing',
        level: '300L',
        additionalDetails: 'Elective course in the revised NUC CCMAS curriculum for Computer Science.',
        status: 'Pending Review',
        submittedAt: '2025-01-14T10:30:00Z'
      },
      {
        id: 'req_002',
        type: 'institution',
        studentName: 'Tunde Bakare',
        studentEmail: 'tunde@federalpolyilaro.edu.ng',
        institutionName: 'Federal Polytechnic, Ilaro',
        additionalDetails: 'NBTE accredited polytechnic in Ogun State.',
        status: 'Pending Review',
        submittedAt: '2025-01-15T08:15:00Z'
      }
    ];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sh_addition_requests', JSON.stringify(additionRequests));
    }
  }, [additionRequests]);

  const [documents, setDocuments] = useState<DocumentItem[]>(SAMPLE_DOCUMENTS);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((title: string, message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, [removeToast]);

  const submitAdditionRequest = useCallback((req: Omit<AdditionRequest, 'id' | 'status' | 'submittedAt'>) => {
    const newReq: AdditionRequest = {
      ...req,
      id: `req_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      status: 'Pending Review',
      submittedAt: new Date().toISOString()
    };
    setAdditionRequests(prev => [newReq, ...prev]);
    addToast('Addition Request Submitted', `Your request for "${req.courseCode || req.departmentName || req.institutionName}" was sent for admin review.`, 'success');
  }, [addToast]);

  const updateAdditionRequestStatus = useCallback((id: string, status: 'Approved' | 'Declined') => {
    setAdditionRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    addToast('Request Updated', `Academic addition request marked as ${status}.`, 'info');
  }, [addToast]);

  // Saved AI Study Copilot Notes
  const [savedCopilotNotes, setSavedCopilotNotes] = useState<SavedCopilotNote[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sh_saved_copilot_notes');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch (e) {
        console.warn('Failed to parse saved copilot notes', e);
      }
    }
    return [];
  });

  const saveCopilotNote = (note: Omit<SavedCopilotNote, 'id' | 'savedAt'>) => {
    const newNote: SavedCopilotNote = {
      ...note,
      id: `note_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      savedAt: new Date().toISOString()
    };
    setSavedCopilotNotes(prev => {
      const updated = [newNote, ...prev];
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('sh_saved_copilot_notes', JSON.stringify(updated));
        } catch (e) {
          console.warn('Failed to persist saved copilot notes', e);
        }
      }
      return updated;
    });
    addToast('Saved to Profile', `"${note.title}" saved to your study notes.`, 'success');
  };

  const deleteCopilotNote = (id: string) => {
    setSavedCopilotNotes(prev => {
      const updated = prev.filter(n => n.id !== id);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('sh_saved_copilot_notes', JSON.stringify(updated));
        } catch (e) {
          console.warn('Failed to persist saved copilot notes', e);
        }
      }
      return updated;
    });
    addToast('Note Removed', 'Saved study note was deleted.', 'info');
  };

  // Course Rep Modal & Applications
  const [courseRepModalOpen, setCourseRepModalOpen] = useState(false);
  const [courseRepApplications, setCourseRepApplications] = useState<CourseRepApplication[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sh_course_rep_apps');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse course rep apps', e);
      }
    }
    return INITIAL_COURSE_REP_APPLICATIONS;
  });

  const submitCourseRepApplication = useCallback((app: Omit<CourseRepApplication, 'id' | 'applicationDate' | 'status'>) => {
    const newApp: CourseRepApplication = {
      ...app,
      id: `rep_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      applicationDate: new Date().toISOString(),
      status: 'PENDING'
    };
    setCourseRepApplications(prev => {
      const updated = [newApp, ...prev];
      if (typeof window !== 'undefined') {
        try { localStorage.setItem('sh_course_rep_apps', JSON.stringify(updated)); } catch (e) {}
      }
      return updated;
    });
    setStudent(prev => ({
      ...prev,
      isCourseRep: false,
      courseRepStatus: 'PENDING',
      courseRepCourseCode: app.courseCode
    }));
    addToast('Course Rep Application Submitted', `Your application for ${app.courseCode} has been submitted for review.`, 'success');
  }, [addToast]);

  const updateCourseRepApplicationStatus = useCallback((id: string, status: CourseRepStatus, adminNotes?: string) => {
    setCourseRepApplications(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, status, adminReviewNotes: adminNotes } : a);
      if (typeof window !== 'undefined') {
        try { localStorage.setItem('sh_course_rep_apps', JSON.stringify(updated)); } catch (e) {}
      }
      return updated;
    });
    const app = courseRepApplications.find(a => a.id === id);
    if (app && app.userId === student.id) {
      const isActive = status === 'ACTIVE' || status === 'VERIFIED';
      setStudent(prev => ({
        ...prev,
        isCourseRep: isActive,
        courseRepStatus: status,
        roles: isActive ? Array.from(new Set([...(prev.roles || ['student']), 'course_rep' as UserRole])) : (prev.roles || ['student']).filter(r => r !== 'course_rep')
      }));
    }
    addToast('Status Updated', `Course Rep application status changed to ${status}.`, 'info');
  }, [courseRepApplications, student.id, addToast]);

  // Lecturer Management & Spaces
  const [lecturerProfiles, setLecturerProfiles] = useState<LecturerProfile[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sh_lecturer_profiles');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse lecturer profiles', e);
      }
    }
    return INITIAL_LECTURER_PROFILES;
  });

  const currentLecturerProfile = useMemo(() => {
    if (userRole === 'lecturer') {
      return lecturerProfiles[0] || null;
    }
    return null;
  }, [userRole, lecturerProfiles]);

  const updateLecturerProfile = useCallback((updates: Partial<LecturerProfile>) => {
    setLecturerProfiles(prev => {
      const updated = prev.map(p => p.id === 'lec_01' ? { ...p, ...updates } : p);
      if (typeof window !== 'undefined') {
        try { localStorage.setItem('sh_lecturer_profiles', JSON.stringify(updated)); } catch (e) {}
      }
      return updated;
    });
    addToast('Lecturer Profile Updated', 'Your academic profile and office hours were updated.', 'success');
  }, [addToast]);

  const updateLecturerVerificationStatus = useCallback((id: string, status: 'Pending' | 'Verified' | 'Suspended') => {
    setLecturerProfiles(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, verificationStatus: status } : p);
      if (typeof window !== 'undefined') {
        try { localStorage.setItem('sh_lecturer_profiles', JSON.stringify(updated)); } catch (e) {}
      }
      return updated;
    });
    addToast('Lecturer Status Updated', `Verification status changed to ${status}.`, 'info');
  }, [addToast]);

  // Course Announcements
  const [courseAnnouncements, setCourseAnnouncements] = useState<CourseAnnouncement[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sh_course_announcements');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse course announcements', e);
      }
    }
    return INITIAL_COURSE_ANNOUNCEMENTS;
  });

  const addCourseAnnouncement = useCallback((ann: Omit<CourseAnnouncement, 'id' | 'createdAt'>) => {
    const newAnn: CourseAnnouncement = {
      ...ann,
      id: `ann_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      createdAt: new Date().toISOString()
    };
    setCourseAnnouncements(prev => {
      const updated = [newAnn, ...prev];
      if (typeof window !== 'undefined') {
        try { localStorage.setItem('sh_course_announcements', JSON.stringify(updated)); } catch (e) {}
      }
      return updated;
    });
    addToast('Announcement Published', `Broadcast for ${ann.courseCode} has been published.`, 'success');
  }, [addToast]);

  const deleteCourseAnnouncement = useCallback((id: string) => {
    setCourseAnnouncements(prev => {
      const updated = prev.filter(a => a.id !== id);
      if (typeof window !== 'undefined') {
        try { localStorage.setItem('sh_course_announcements', JSON.stringify(updated)); } catch (e) {}
      }
      return updated;
    });
    addToast('Announcement Removed', 'Course announcement was deleted.', 'info');
  }, [addToast]);

  // Lecturer ↔ Course Rep Coordination Channel
  const [lecturerRepMessages, setLecturerRepMessages] = useState<Record<string, LecturerRepMessage[]>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sh_lec_rep_msgs');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse lecturer rep msgs', e);
      }
    }
    return INITIAL_LECTURER_REP_MESSAGES;
  });

  const sendLecturerRepMessage = useCallback((courseCode: string, message: string, role: 'lecturer' | 'course_rep') => {
    const newMsg: LecturerRepMessage = {
      id: `msg_${Date.now()}`,
      courseCode,
      senderId: role === 'course_rep' ? student.id : 'lec_01',
      senderName: role === 'course_rep' ? `${student.fullName} (Course Rep)` : 'Dr. Babatunde Ogunlesi',
      senderRole: role,
      message,
      timestamp: 'Just now'
    };
    setLecturerRepMessages(prev => {
      const existing = prev[courseCode] || [];
      const updated = {
        ...prev,
        [courseCode]: [...existing, newMsg]
      };
      if (typeof window !== 'undefined') {
        try { localStorage.setItem('sh_lec_rep_msgs', JSON.stringify(updated)); } catch (e) {}
      }
      return updated;
    });
  }, [student.id, student.fullName]);

  // Personal Library & Collections
  const [personalCollections, setPersonalCollections] = useState<PersonalCollection[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sh_personal_collections');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse personal collections', e);
      }
    }
    return INITIAL_PERSONAL_COLLECTIONS;
  });

  const createPersonalCollection = useCallback((name: string, description?: string, courseCode?: string, color?: string) => {
    const newCol: PersonalCollection = {
      id: `col_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      name,
      description,
      courseCode,
      color: color || '#059669',
      createdAt: new Date().toISOString(),
      itemIds: []
    };
    setPersonalCollections(prev => {
      const updated = [newCol, ...prev];
      if (typeof window !== 'undefined') {
        try { localStorage.setItem('sh_personal_collections', JSON.stringify(updated)); } catch (e) {}
      }
      return updated;
    });
    addToast('Collection Created', `Collection "${name}" added to your Library.`, 'success');
  }, [addToast]);

  const addItemToCollection = useCallback((collectionId: string, item: { id: string; type: 'past_question' | 'study_material' | 'copilot_note' | 'web_link'; title: string; subtitle?: string }) => {
    setPersonalCollections(prev => {
      const updated = prev.map(col => {
        if (col.id === collectionId) {
          const exists = col.itemIds.some(i => i.id === item.id);
          if (exists) return col;
          return {
            ...col,
            itemIds: [...col.itemIds, { ...item, dateAdded: new Date().toISOString().split('T')[0] }]
          };
        }
        return col;
      });
      if (typeof window !== 'undefined') {
        try { localStorage.setItem('sh_personal_collections', JSON.stringify(updated)); } catch (e) {}
      }
      return updated;
    });
    addToast('Added to Collection', `"${item.title}" saved to collection.`, 'success');
  }, [addToast]);

  const removeItemFromCollection = useCallback((collectionId: string, itemId: string) => {
    setPersonalCollections(prev => {
      const updated = prev.map(col => {
        if (col.id === collectionId) {
          return {
            ...col,
            itemIds: col.itemIds.filter(i => i.id !== itemId)
          };
        }
        return col;
      });
      if (typeof window !== 'undefined') {
        try { localStorage.setItem('sh_personal_collections', JSON.stringify(updated)); } catch (e) {}
      }
      return updated;
    });
    addToast('Removed from Collection', 'Item removed.', 'info');
  }, [addToast]);

  const deletePersonalCollection = useCallback((collectionId: string) => {
    setPersonalCollections(prev => {
      const updated = prev.filter(c => c.id !== collectionId);
      if (typeof window !== 'undefined') {
        try { localStorage.setItem('sh_personal_collections', JSON.stringify(updated)); } catch (e) {}
      }
      return updated;
    });
    addToast('Collection Deleted', 'Custom study collection was removed.', 'info');
  }, [addToast]);

  // Self-Service Course & Bookmark Management
  const enrollCourse = useCallback((courseCode: string) => {
    setStudent(prev => {
      const current = prev.enrolledCourseCodes || [];
      if (current.includes(courseCode)) return prev;
      const updatedCodes = [...current, courseCode];
      return {
        ...prev,
        enrolledCourseCodes: updatedCodes
      };
    });
    addToast('Course Added', `${courseCode} is now part of your personal curriculum.`, 'success');
  }, [addToast]);

  const unenrollCourse = useCallback((courseCode: string) => {
    setStudent(prev => {
      const current = prev.enrolledCourseCodes || [];
      const updatedCodes = current.filter(c => c !== courseCode);
      return {
        ...prev,
        enrolledCourseCodes: updatedCodes
      };
    });
    addToast('Course Removed', `${courseCode} removed from enrolled courses.`, 'info');
  }, [addToast]);

  const toggleBookmarkPastQuestion = useCallback((pqId: string) => {
    setStudent(prev => {
      const current = prev.bookmarkedPastQuestionIds || [];
      const isBookmarked = current.includes(pqId);
      const updated = isBookmarked ? current.filter(id => id !== pqId) : [...current, pqId];
      addToast(
        isBookmarked ? 'Bookmark Removed' : 'Past Question Bookmarked',
        isBookmarked ? 'Removed from your library.' : 'Saved to your library.',
        'info'
      );
      return {
        ...prev,
        bookmarkedPastQuestionIds: updated
      };
    });
  }, [addToast]);

  const toggleBookmarkStudyMaterial = useCallback((matId: string) => {
    setStudent(prev => {
      const current = prev.bookmarkedStudyMaterialIds || [];
      const isBookmarked = current.includes(matId);
      const updated = isBookmarked ? current.filter(id => id !== matId) : [...current, matId];
      addToast(
        isBookmarked ? 'Bookmark Removed' : 'Material Bookmarked',
        isBookmarked ? 'Removed from your library.' : 'Saved to your study library.',
        'info'
      );
      return {
        ...prev,
        bookmarkedStudyMaterialIds: updated
      };
    });
  }, [addToast]);

  // Apply resolved profile & metadata to student state
  const applyUserProfile = useCallback((targetUser: User, profileData?: any) => {
    const meta = targetUser.user_metadata || {};
    const chosenInstId = profileData?.institution_id || meta.institution_id || 'unilag';
    const matchedInst = ALL_INSTITUTIONS.find(
      i => i.id === chosenInstId || i.name.toLowerCase() === chosenInstId.toLowerCase()
    );

    setStudent(prev => ({
      ...prev,
      id: targetUser.id,
      fullName: profileData?.full_name || meta.full_name || prev.fullName || 'Student',
      username: profileData?.username || meta.username || prev.username,
      email: profileData?.email || targetUser.email || prev.email,
      institutionId: matchedInst?.id || chosenInstId,
      institutionName: matchedInst?.name || meta.institution_name || prev.institutionName,
      institutionType: matchedInst?.type || prev.institutionType,
      faculty: profileData?.faculty_id || meta.faculty_name || meta.faculty_id || prev.faculty,
      department: profileData?.department_id || meta.department_name || meta.department_id || prev.department,
      programme: profileData?.programme_id || meta.programme_name || meta.programme_id || prev.programme,
      level: profileData?.level || meta.level || prev.level,
      academicSession: profileData?.academic_session || meta.academic_session || prev.academicSession || '2024/2025',
      academicInterests: profileData?.academic_interests || meta.academic_interests || prev.academicInterests || [],
      enrolledCourseCodes: profileData?.enrolled_course_codes || meta.enrolled_course_codes || prev.enrolledCourseCodes || [],
      preferredResourceTypes: profileData?.preferred_resources || meta.preferred_resources || prev.preferredResourceTypes || [],
      preferredTopics: profileData?.preferred_topics || meta.preferred_topics || prev.preferredTopics || [],
      joinedReadingGroupIds: profileData?.joined_groups || meta.joined_groups || prev.joinedReadingGroupIds || [],
      onboardingCompleted: profileData?.onboarding_completed ?? meta.onboarding_completed ?? prev.onboardingCompleted ?? true,
      avatarUrl: profileData?.avatar_url || meta.avatar_url || prev.avatarUrl,
      bio: profileData?.bio || meta.bio || prev.bio,
    }));
  }, []);

  // Refresh student profile safely without triggering duplicate database requests
  const refreshUserProfile = useCallback(async (userOverride?: User) => {
    const targetUser = userOverride || currentUserRef.current;
    if (!targetUser) return;
    if (isFetchingProfile.current) return;

    isFetchingProfile.current = true;
    try {
      const { profile } = await fetchUserProfile(targetUser.id);
      setIsProfilesTableReady(true);
      applyUserProfile(targetUser, profile);
      lastFetchedProfileUserId.current = targetUser.id;
    } catch (err) {
      console.warn('Error refreshing student profile:', err);
    } finally {
      isFetchingProfile.current = false;
    }
  }, [applyUserProfile]);

  // Define active student session setter (guarantees frictionless login on any device)
  const setStudentSession = useCallback((userEmail: string, name?: string, metadata?: Record<string, any>) => {
    const studentId = `student_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
    const customUser: User = {
      id: studentId,
      app_metadata: { provider: 'email' },
      user_metadata: {
        full_name: name || userEmail.split('@')[0],
        ...metadata,
      },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      email: userEmail.trim(),
    } as any;

    currentUserRef.current = customUser;
    setCurrentUser(customUser);
    setIsAuthLoading(false);

    const chosenInstId = metadata?.institution_id || '';
    const matchedInst = ALL_INSTITUTIONS.find(
      i => (chosenInstId && i.id.toLowerCase() === chosenInstId.toLowerCase()) || 
           (metadata?.institution_name && i.name.toLowerCase() === metadata.institution_name.toLowerCase())
    );

    const instName = metadata?.institution_name || matchedInst?.name || 'Tertiary Institution';
    const instType = metadata?.institution_type || matchedInst?.type || 'Federal University';
    const isPoly = instType.toLowerCase().includes('polytechnic') || instType.toLowerCase().includes('monotechnic');

    const enrolledCodes: string[] = Array.isArray(metadata?.enrolled_course_codes) 
      ? metadata.enrolled_course_codes 
      : Array.isArray(metadata?.enrolled_courses)
        ? metadata.enrolled_courses.map((c: any) => c.courseCode)
        : [];

    const studentData: Partial<StudentProfileData> = {
      id: studentId,
      fullName: name || metadata?.full_name || userEmail.split('@')[0],
      username: metadata?.username || metadata?.user_name || userEmail.split('@')[0],
      email: userEmail.trim(),
      matricNumber: metadata?.matric_number || '',
      institutionId: matchedInst?.id || chosenInstId || 'custom_inst',
      institutionName: instName,
      institutionType: instType,
      faculty: metadata?.faculty_name || metadata?.faculty_id || 'Academic Faculty',
      department: metadata?.department_name || metadata?.department_id || 'Academic Department',
      programme: metadata?.programme_name || metadata?.programme_id || 'Degree Programme',
      level: metadata?.level || '100L',
      academicSession: metadata?.academic_session || '2024/2025',
      academicInterests: Array.isArray(metadata?.academic_interests) ? metadata.academic_interests : ['Academic Research'],
      enrolledCourseCodes: enrolledCodes,
      preferredResourceTypes: Array.isArray(metadata?.preferred_resources) ? metadata.preferred_resources : ['Past Questions & Worked Solutions'],
      preferredTopics: Array.isArray(metadata?.preferred_topics) ? metadata.preferred_topics : [],
      joinedReadingGroupIds: Array.isArray(metadata?.joined_groups) ? metadata.joined_groups : [],
      onboardingCompleted: true,
      gradingSystem: isPoly ? '4.0' : '5.0',
      currentCgpa: 0,
      totalUnitsTaken: 0,
      targetCgpa: isPoly ? 3.5 : 4.5,
      avatarUrl: metadata?.avatar_url,
      bio: metadata?.bio || `Student at ${instName}`,
      studyStreakDays: 1,
    };

    setStudent(prev => ({
      ...prev,
      ...studentData,
    }));

    // Auto-populate active semester with enrolled courses so their dashboard is ready
    if (typeof window !== 'undefined') {
      const userSemestersKey = `sh_semesters_${studentId}`;
      const savedUserSemesters = localStorage.getItem(userSemestersKey);
      if (savedUserSemesters) {
        try {
          setSemesters(JSON.parse(savedUserSemesters));
        } catch {
          setSemesters([]);
        }
      } else if (Array.isArray(metadata?.enrolled_courses) && metadata.enrolled_courses.length > 0) {
        const semesterCourses: CourseGrade[] = metadata.enrolled_courses.map((c: any) => ({
          id: `sem_crs_${c.courseCode?.replace(/\s+/g, '_') || Math.random().toString(36).substr(2, 5)}`,
          courseCode: c.courseCode,
          courseTitle: c.courseTitle || `${c.courseCode} Course`,
          units: Number(c.creditUnit || c.units) || 2,
          grade: 'A',
          gradePoint: 5.0
        }));

        const initialSem: SemesterRecord = {
          id: `sem_${studentId}_current`,
          semesterName: `${metadata?.level || '100L'} - First Semester`,
          academicSession: metadata?.academic_session || '2024/2025',
          courses: semesterCourses,
          totalUnits: semesterCourses.reduce((acc, c) => acc + c.units, 0),
          totalPoints: semesterCourses.reduce((acc, c) => acc + (c.units * c.gradePoint), 0),
          gpa: 5.0
        };

        setSemesters([initialSem]);
        localStorage.setItem(userSemestersKey, JSON.stringify([initialSem]));
      } else if (enrolledCodes.length > 0) {
        const semesterCourses: CourseGrade[] = enrolledCodes.map(code => ({
          id: `sem_crs_${code.replace(/\s+/g, '_')}`,
          courseCode: code,
          courseTitle: `${code} Lecture Series`,
          units: 2,
          grade: 'A',
          gradePoint: 5.0
        }));

        const initialSem: SemesterRecord = {
          id: `sem_${studentId}_current`,
          semesterName: `${metadata?.level || '100L'} - First Semester`,
          academicSession: metadata?.academic_session || '2024/2025',
          courses: semesterCourses,
          totalUnits: semesterCourses.reduce((acc, c) => acc + c.units, 0),
          totalPoints: semesterCourses.reduce((acc, c) => acc + (c.units * c.gradePoint), 0),
          gpa: 5.0
        };

        setSemesters([initialSem]);
        localStorage.setItem(userSemestersKey, JSON.stringify([initialSem]));
      } else {
        setSemesters([]);
      }

      // If joined reading groups, connect student in studyGroups state
      if (Array.isArray(metadata?.joined_groups) && metadata.joined_groups.length > 0) {
        setStudyGroups(prev => prev.map(g => {
          if (metadata.joined_groups.includes(g.id)) {
            const alreadyIn = g.members.some(m => m.id === studentId);
            if (!alreadyIn) {
              return {
                ...g,
                memberCount: g.memberCount + 1,
                members: [
                  ...g.members,
                  {
                    id: studentId,
                    name: name || metadata?.full_name || 'Student',
                    institution: instName,
                    department: metadata?.department_name || metadata?.department_id || 'Academic Department',
                    level: metadata?.level || '100L',
                    role: 'member',
                    joinedAt: 'Just now'
                  }
                ]
              };
            }
          }
          return g;
        }));
      }

      // Add a personalized welcome notification
      const welcomeNotif: NotificationItem = {
        id: `notif_welcome_${Date.now()}`,
        title: `Welcome to StudentHub NG, ${name || metadata?.full_name || 'Student'}!`,
        message: `Your ${metadata?.department_name || metadata?.department_id || 'academic'} (${metadata?.level || '100L'}) workspace is active for the ${metadata?.academic_session || '2024/2025'} session. Explore your personalized courses, past questions, and AI Copilot.`,
        time: 'Just now',
        type: 'academic',
        isRead: false,
        linkTab: 'dashboard'
      };
      setNotifications(prev => [welcomeNotif, ...prev.filter(n => !n.id.startsWith('notif_welcome_'))]);

      localStorage.setItem('sh_student_session', JSON.stringify({
        user: customUser,
        studentData
      }));
      localStorage.setItem('sh_student_email', userEmail.trim());
    }
  }, []);

  // Supabase Auth State Listener & Session Persistence (Runs STRICTLY ONCE on mount)
  useEffect(() => {
    let isMounted = true;

    // 1. First restore local student session if present (guarantees instant normal website behavior)
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('sh_student_session');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?.user) {
            currentUserRef.current = parsed.user;
            setCurrentUser(parsed.user);
            if (parsed.studentData) {
              setStudent(prev => ({ ...prev, ...parsed.studentData }));
            }
          }
        }
      } catch (err) {
        console.warn('Session parse note:', err);
      }
    }

    // 2. Check for auth callback parameters or errors in URL hash or query string
    try {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash;
        const search = window.location.search;

        if (hash && hash.includes('error=')) {
          window.history.replaceState(null, '', window.location.pathname);
          setCurrentView('login');
        } else if (search && search.includes('code=')) {
          const searchParams = new URLSearchParams(search);
          const code = searchParams.get('code');
          if (code) {
            supabase.auth.exchangeCodeForSession(code).then(({ data }) => {
              if (isMounted) {
                window.history.replaceState(null, '', window.location.pathname);
                if (data?.session) {
                  setCurrentView('dashboard');
                  addToast('Welcome to StudentHub NG!', 'Account confirmed successfully.', 'success');
                }
              }
            }).catch(err => {
              console.warn('Code exchange note:', err);
            });
          }
        }
      }
    } catch (err) {
      console.warn('URL auth parsing notice:', err);
    }

    // 3. Listen for auth state changes across the application
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return;

      const user = session?.user ?? null;
      if (user) {
        currentUserRef.current = user;
        setCurrentSession(session);
        setCurrentUser(user);
        setIsAuthLoading(false);

        if (lastFetchedProfileUserId.current !== user.id || event === 'USER_UPDATED') {
          await refreshUserProfile(user);
        }
        if (event === 'SIGNED_IN') {
          setCurrentView(prev => (prev === 'landing' || prev === 'login' || prev === 'signup' || prev === 'forgot_password' ? 'dashboard' : prev));
        }
      } else {
        // If not logged into Supabase, but has local student session, retain it
        const hasLocal = typeof window !== 'undefined' && localStorage.getItem('sh_student_session');
        if (!hasLocal) {
          currentUserRef.current = null;
          setCurrentSession(null);
          setCurrentUser(null);
        }
        setIsAuthLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [refreshUserProfile, addToast]);

  // Strict Auth Guard: All visitors must register before having access to website tools
  useEffect(() => {
    if (isAuthLoading) return;
    const publicViews: AppView[] = ['landing', 'login', 'signup', 'forgot_password'];
    if (!currentUser && !publicViews.includes(currentView)) {
      setCurrentView('signup');
      addToast(
        'Registration Required',
        'You must register and build your student account before accessing StudentHub NG tools.',
        'warning'
      );
    }
  }, [currentView, currentUser, isAuthLoading, addToast]);

  // Logout handler
  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err: any) {
      console.warn('Sign out error:', err);
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('sh_student_session');
      }
      currentUserRef.current = null;
      setCurrentUser(null);
      setCurrentSession(null);
      setStudent(DEFAULT_STUDENT);
      setCurrentView('landing');
      addToast('Signed Out', 'You have been securely signed out.', 'info');
    }
  };

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif_1',
      title: 'First Semester Exam Timetable Released',
      message: 'The official Harmattan semester exam schedule has been updated in your planner.',
      time: '10 mins ago',
      type: 'academic',
      isRead: false,
      linkTab: 'planner'
    },
    {
      id: 'notif_2',
      title: 'New GST 101 Worked Solutions Uploaded',
      message: 'Verified 2024 past question solution manual is now available in Study Materials.',
      time: '2 hours ago',
      type: 'info',
      isRead: false,
      linkTab: 'materials'
    },
    {
      id: 'notif_3',
      title: 'Study Streak Active! 🔥',
      message: 'Congratulations! You have maintained a 14-day continuous study session streak.',
      time: 'Yesterday',
      type: 'success',
      isRead: true,
      linkTab: 'dashboard'
    }
  ]);

  // Sync theme with HTML class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const updateStudent = async (updated: Partial<StudentProfileData>) => {
    setStudent(prev => ({ ...prev, ...updated }));

    if (currentUser) {
      const targetInstId = updated.institutionId || student.institutionId;
      const matchedInst = ALL_INSTITUTIONS.find(
        i => i.id === targetInstId || i.name === updated.institutionName
      );

      try {
        await upsertUserProfile({
          id: currentUser.id,
          full_name: updated.fullName ?? student.fullName,
          email: updated.email ?? student.email,
          institution_id: matchedInst?.id || targetInstId,
          faculty_id: updated.faculty ?? student.faculty,
          department_id: updated.department ?? student.department,
          programme_id: updated.programme ?? student.programme,
          level: updated.level ?? student.level,
          avatar_url: updated.avatarUrl ?? student.avatarUrl,
        });
      } catch (err) {
        console.warn('Failed to sync profile update to Supabase:', err);
      }
    }

    addToast('Profile Updated', 'Your academic profile details have been saved successfully.', 'success');
  };

  // ==========================================
  // Academic Structure CRUD Operations
  // ==========================================
  const addInstitution = (instData: Omit<Institution, 'id'>) => {
    const id = `inst_${Date.now()}`;
    const newInst: Institution = { ...instData, id };
    setInstitutions(prev => [newInst, ...prev]);
    addToast('Institution Added', `"${newInst.name}" has been registered in the directory.`, 'success');
  };

  const updateInstitution = (id: string, updated: Partial<Institution>) => {
    setInstitutions(prev => prev.map(inst => inst.id === id ? { ...inst, ...updated } : inst));
    addToast('Institution Updated', 'Details have been modified successfully.', 'info');
  };

  const deleteInstitution = (id: string) => {
    setInstitutions(prev => prev.filter(inst => inst.id !== id));
    addToast('Institution Deleted', 'The institution has been removed from the directory.', 'warning');
  };

  const addFaculty = (facData: Omit<FacultyRecord, 'id'>) => {
    const newFac: FacultyRecord = { ...facData, id: `fac_${Date.now()}` };
    setFaculties(prev => [...prev, newFac]);
    addToast('Faculty Added', `"${newFac.name}" added to ${newFac.institutionName}.`, 'success');
  };

  const addDepartment = (deptData: Omit<DepartmentRecord, 'id'>) => {
    const newDept: DepartmentRecord = { ...deptData, id: `dept_${Date.now()}` };
    setDepartments(prev => [...prev, newDept]);
    addToast('Department Added', `"${newDept.name}" added to ${newDept.facultyName}.`, 'success');
  };

  const addProgramme = (progData: Omit<ProgrammeRecord, 'id'>) => {
    const newProg: ProgrammeRecord = { ...progData, id: `prog_${Date.now()}` };
    setProgrammes(prev => [...prev, newProg]);
    addToast('Programme Added', `"${newProg.name}" registered successfully.`, 'success');
  };

  const addCourse = (courseData: Omit<CourseRecord, 'id'>) => {
    const newCourse: CourseRecord = { ...courseData, id: `crs_${Date.now()}` };
    setCourses(prev => [newCourse, ...prev]);
    addToast('Course Added', `"${newCourse.courseCode}: ${newCourse.courseTitle}" added to curriculum.`, 'success');
  };

  const updateCourse = (id: string, updated: Partial<CourseRecord>) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
    addToast('Course Updated', 'Course curriculum details updated.', 'info');
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    addToast('Course Removed', 'Course removed from directory.', 'info');
  };

  const addPastQuestion = (pqData: Omit<PastQuestion, 'id'>) => {
    const newPq: PastQuestion = { ...pqData, id: `pq_${Date.now()}` };
    setPastQuestions(prev => [newPq, ...prev]);
    addToast('Past Question Registered', `Exam paper for ${newPq.courseCode} added with source attribution.`, 'success');
  };

  const updatePastQuestion = (id: string, updated: Partial<PastQuestion>) => {
    setPastQuestions(prev => prev.map(pq => pq.id === id ? { ...pq, ...updated } : pq));
    addToast('Past Question Updated', 'Status and details updated.', 'info');
  };

  const deletePastQuestion = (id: string) => {
    setPastQuestions(prev => prev.filter(pq => pq.id !== id));
    addToast('Past Question Deleted', 'Item removed from archive.', 'info');
  };

  const addStudyMaterial = (matData: Omit<StudyMaterial, 'id'>) => {
    const newMat: StudyMaterial = { ...matData, id: `mat_${Date.now()}` };
    setStudyMaterials(prev => [newMat, ...prev]);
    addToast('Study Material Uploaded', `"${newMat.title}" added to notes vault.`, 'success');
  };

  const updateStudyMaterial = (id: string, updated: Partial<StudyMaterial>) => {
    setStudyMaterials(prev => prev.map(m => m.id === id ? { ...m, ...updated } : m));
    addToast('Material Updated', 'Study note details updated.', 'info');
  };

  const deleteStudyMaterial = (id: string) => {
    setStudyMaterials(prev => prev.filter(m => m.id !== id));
    addToast('Material Deleted', 'Item removed from notes vault.', 'info');
  };

  // ==========================================
  // Academic Data Importer Engine
  // ==========================================
  const importAcademicData = (rawRecords: Partial<CourseRecord>[]): AcademicImportResult => {
    let successCount = 0;
    let failedCount = 0;
    let duplicateCount = 0;
    let missingInfoCount = 0;
    const details: AcademicImportDetail[] = [];
    const validNewCourses: CourseRecord[] = [];

    rawRecords.forEach((record, index) => {
      const rowNum = index + 2; // considering 1-based index with header row at 1
      const courseCode = record.courseCode ? record.courseCode.trim().toUpperCase() : '';
      const courseTitle = record.courseTitle ? record.courseTitle.trim() : '';
      const institutionName = record.institutionName ? record.institutionName.trim() : '';

      // Check missing mandatory fields
      if (!courseCode || !courseTitle || !institutionName) {
        missingInfoCount++;
        details.push({
          row: rowNum,
          courseCode: courseCode || 'UNKNOWN',
          courseTitle: courseTitle || 'UNKNOWN',
          institution: institutionName || 'UNKNOWN',
          status: 'missing_info',
          message: 'Missing mandatory fields: Course Code, Course Title, or Institution Name.'
        });
        return;
      }

      // Check duplicates against existing courses
      const isDuplicate = courses.some(
        c => c.courseCode.toUpperCase() === courseCode && 
             c.institutionName.toLowerCase() === institutionName.toLowerCase() &&
             c.level === (record.level || '100L')
      );

      if (isDuplicate) {
        duplicateCount++;
        details.push({
          row: rowNum,
          courseCode,
          courseTitle,
          institution: institutionName,
          status: 'duplicate',
          message: `Duplicate detected: ${courseCode} is already registered under ${institutionName} (${record.level || '100L'}).`
        });
        return;
      }

      // Formulate valid Course Record
      const newCourse: CourseRecord = {
        id: `crs_import_${Date.now()}_${index}`,
        courseCode,
        courseTitle,
        creditUnit: Number(record.creditUnit) || 3,
        institutionId: record.institutionId || institutionName.toLowerCase().replace(/[^a-z0-9]/g, '_'),
        institutionName,
        faculty: record.faculty || 'Faculty of Science',
        department: record.department || 'General Studies',
        programme: record.programme || 'Undergraduate Programme',
        level: record.level || '100L',
        semester: record.semester || 'First Semester (Harmattan)',
        courseDescription: record.courseDescription || `Curriculum benchmark course ${courseCode}: ${courseTitle}`,
        status: 'Approved'
      };

      validNewCourses.push(newCourse);
      successCount++;
      details.push({
        row: rowNum,
        courseCode,
        courseTitle,
        institution: institutionName,
        status: 'success',
        message: 'Valid curriculum course record ready for ingestion.',
        data: newCourse
      });
    });

    if (validNewCourses.length > 0) {
      setCourses(prev => [...validNewCourses, ...prev]);
      addToast(
        'Import Completed',
        `Successfully ingested ${validNewCourses.length} academic course records into the institution catalog.`,
        'success'
      );
    } else {
      addToast(
        'Import Completed with Warnings',
        `0 new records added. Found ${failedCount} errors, ${duplicateCount} duplicates, ${missingInfoCount} missing fields.`,
        'warning'
      );
    }

    return {
      totalProcessed: rawRecords.length,
      successfulRecords: successCount,
      failedRecords: failedCount,
      duplicateRecords: duplicateCount,
      missingInfoRecords: missingInfoCount,
      details
    };
  };

  // Semesters & GPA
  const addSemester = (sem: SemesterRecord) => {
    const updated = [sem, ...semesters];
    setSemesters(updated);
    // Recalculate CGPA
    const allCourses = updated.flatMap(s => s.courses);
    const totalUnits = allCourses.reduce((acc, c) => acc + c.units, 0);
    const totalWeightedPoints = allCourses.reduce((acc, c) => acc + (c.units * c.gradePoint), 0);
    const newCgpa = totalUnits > 0 ? Number((totalWeightedPoints / totalUnits).toFixed(2)) : 0;
    
    setStudent(prev => {
      const nextStudent = {
        ...prev,
        currentCgpa: newCgpa,
        totalUnitsTaken: totalUnits
      };
      if (typeof window !== 'undefined' && prev.id) {
        localStorage.setItem(`sh_semesters_${prev.id}`, JSON.stringify(updated));
      }
      return nextStudent;
    });

    addToast('Semester Added', `Calculated GPA: ${sem.gpa.toFixed(2)}. Cumulative CGPA updated to ${newCgpa.toFixed(2)}.`, 'success');
  };

  const deleteSemester = (id: string) => {
    const updated = semesters.filter(s => s.id !== id);
    setSemesters(updated);
    const allCourses = updated.flatMap(s => s.courses);
    const totalUnits = allCourses.reduce((acc, c) => acc + c.units, 0);
    const totalWeightedPoints = allCourses.reduce((acc, c) => acc + (c.units * c.gradePoint), 0);
    const newCgpa = totalUnits > 0 ? Number((totalWeightedPoints / totalUnits).toFixed(2)) : 0;

    setStudent(prev => {
      const nextStudent = {
        ...prev,
        currentCgpa: newCgpa,
        totalUnitsTaken: totalUnits
      };
      if (typeof window !== 'undefined' && prev.id) {
        localStorage.setItem(`sh_semesters_${prev.id}`, JSON.stringify(updated));
      }
      return nextStudent;
    });

    addToast('Semester Removed', 'Semester record deleted.', 'info');
  };

  // Tasks
  const addTask = (taskData: Omit<PlannerTask, 'id'>) => {
    const newTask: PlannerTask = {
      ...taskData,
      id: `task_${Date.now()}`
    };
    setTasks(prev => [newTask, ...prev]);
    addToast('Task Created', `"${newTask.title}" added to your study planner.`, 'success');
  };

  const toggleTaskCompleted = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    addToast('Task Deleted', 'Planner task has been removed.', 'info');
  };

  // Budget
  const addBudgetItem = (itemData: Omit<BudgetItem, 'id'>) => {
    const newItem: BudgetItem = {
      ...itemData,
      id: `budget_${Date.now()}`
    };
    setBudget(prev => [newItem, ...prev]);
    addToast('Finance Logged', `${newItem.type === 'income' ? 'Income' : 'Expense'} of ₦${newItem.amount.toLocaleString()} recorded.`, 'success');
  };

  const deleteBudgetItem = (id: string) => {
    setBudget(prev => prev.filter(b => b.id !== id));
    addToast('Entry Removed', 'Financial transaction deleted.', 'info');
  };

  // Marketplace
  const addListing = (listingData: Omit<MarketplaceListing, 'id' | 'postedAt'>) => {
    const newListing: MarketplaceListing = {
      ...listingData,
      id: `mkt_${Date.now()}`,
      postedAt: 'Just now'
    };
    setMarketplace(prev => [newListing, ...prev]);
    addToast('Listing Published', 'Your item is now visible to students across Nigerian campuses.', 'success');
  };

  // Community - Public Feed
  const addCommunityPost = (postData: Omit<CommunityPost, 'id' | 'createdAt' | 'likes' | 'commentsCount'>) => {
    const newPost: CommunityPost = {
      ...postData,
      id: `post_${Date.now()}`,
      authorId: currentUser?.id || 'current_student',
      createdAt: 'Just now',
      likes: 1,
      likesCount: 1,
      commentsCount: 0,
      repliesCount: 0,
      isLiked: true,
      userReaction: 'like',
      reactionCounts: {
        like: 1,
        helpful: 0,
        brilliant: 0,
        question: 0
      },
      comments: []
    };
    setCommunityPosts(prev => [newPost, ...prev]);
    addToast('Post Shared', 'Your discussion is now live in the student community!', 'success');
  };

  const likePost = (id: string) => {
    reactToPost(id, 'like');
  };

  const reactToPost = (postId: string, reactionType: 'like' | 'helpful' | 'brilliant' | 'question') => {
    setCommunityPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const currentReaction = p.userReaction;
        const counts = { ...(p.reactionCounts || { like: p.likes || 0, helpful: 0, brilliant: 0, question: 0 }) };
        
        let nextReaction: 'like' | 'helpful' | 'brilliant' | 'question' | null = reactionType;
        if (currentReaction === reactionType) {
          // Toggle off
          nextReaction = null;
          counts[reactionType] = Math.max(0, (counts[reactionType] || 1) - 1);
        } else {
          // Switch reaction or new reaction
          if (currentReaction) {
            counts[currentReaction] = Math.max(0, (counts[currentReaction] || 1) - 1);
          }
          counts[reactionType] = (counts[reactionType] || 0) + 1;
        }

        const totalLikes = (counts.like || 0) + (counts.helpful || 0) + (counts.brilliant || 0);

        return {
          ...p,
          userReaction: nextReaction,
          isLiked: nextReaction !== null,
          likes: totalLikes,
          likesCount: totalLikes,
          reactionCounts: counts
        };
      }
      return p;
    }));
  };

  const addComment = (postId: string, commentText: string) => {
    if (!commentText.trim()) return;
    const commentId = `c_${Date.now()}`;
    setCommunityPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const newComments = p.comments || [];
        return {
          ...p,
          commentsCount: (p.commentsCount || 0) + 1,
          repliesCount: (p.repliesCount || 0) + 1,
          comments: [
            ...newComments,
            {
              id: commentId,
              authorId: currentUser?.id || 'current_student',
              authorName: student.fullName,
              authorInstitution: student.institutionName,
              authorDepartment: student.department,
              content: commentText.trim(),
              createdAt: 'Just now',
              likes: 0,
              isLiked: false,
              replies: []
            }
          ]
        };
      }
      return p;
    }));

    // Add notification to community notifications
    setCommunityNotifications(prev => [
      {
        id: `cnotif_${Date.now()}`,
        title: 'New Comment Posted',
        message: `You commented on a discussion: "${commentText.slice(0, 45)}..."`,
        timestamp: 'Just now',
        type: 'comment',
        isRead: false,
        actionLink: postId
      },
      ...prev
    ]);

    addToast('Comment Posted', 'Your reply has been added.', 'success');
  };

  const addPostCommentReply = (postId: string, commentId: string, replyText: string) => {
    if (!replyText.trim()) return;
    setCommunityPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const updatedComments = (p.comments || []).map(c => {
          if (c.id === commentId) {
            const replies = c.replies || [];
            return {
              ...c,
              replies: [
                ...replies,
                {
                  id: `rep_${Date.now()}`,
                  authorId: currentUser?.id || 'current_student',
                  authorName: student.fullName,
                  authorInstitution: student.institutionName,
                  content: replyText.trim(),
                  createdAt: 'Just now',
                  likes: 0
                }
              ]
            };
          }
          return c;
        });

        return {
          ...p,
          commentsCount: (p.commentsCount || 0) + 1,
          repliesCount: (p.repliesCount || 0) + 1,
          comments: updatedComments
        };
      }
      return p;
    }));

    addToast('Reply Posted', 'Your threaded reply was submitted.', 'success');
  };

  const deletePost = (postId: string) => {
    setCommunityPosts(prev => prev.filter(p => p.id !== postId));
    addToast('Discussion Removed', 'Post deleted from the community.', 'info');
  };

  // Study Groups Management
  const createStudyGroup = (groupData: Omit<StudyGroup, 'id' | 'createdAt' | 'memberCount' | 'members' | 'studySessions' | 'sharedResources'>): string => {
    const groupId = `grp_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const newGroup: StudyGroup = {
      ...groupData,
      id: groupId,
      createdAt: 'Just now',
      memberCount: 1,
      members: [
        {
          id: currentUser?.id || 'current_student',
          name: student.fullName,
          institution: student.institutionName,
          department: student.department,
          level: student.level,
          role: 'creator',
          joinedAt: 'Just now'
        }
      ],
      pendingRequests: [],
      studySessions: [],
      sharedResources: []
    };

    setStudyGroups(prev => [newGroup, ...prev]);

    // Initialize group chat with welcome message
    setGroupChatMessages(prev => ({
      ...prev,
      [groupId]: [
        {
          id: `gmsg_init_${Date.now()}`,
          groupId,
          senderId: currentUser?.id || 'current_student',
          senderName: student.fullName,
          senderInstitution: student.institutionName,
          text: `Welcome to ${newGroup.name}! Study sessions and lecture revision schedules will be posted here.`,
          sentAt: 'Just now'
        }
      ]
    }));

    addToast('Study Group Created', `"${newGroup.name}" is now live!`, 'success');
    return groupId;
  };

  const updateStudyGroup = (id: string, updated: Partial<StudyGroup>) => {
    setStudyGroups(prev => prev.map(g => g.id === id ? { ...g, ...updated } : g));
    addToast('Group Updated', 'Study group details updated successfully.', 'success');
  };

  const deleteStudyGroup = (id: string) => {
    setStudyGroups(prev => prev.filter(g => g.id !== id));
    addToast('Group Deleted', 'Study group removed.', 'info');
  };

  const joinStudyGroup = (groupId: string, message?: string) => {
    const group = studyGroups.find(g => g.id === groupId);
    if (!group) return;

    const studentId = currentUser?.id || 'current_student';
    const isAlreadyMember = group.members.some(m => m.id === studentId);
    if (isAlreadyMember) {
      addToast('Already a Member', 'You are already in this study group.', 'info');
      return;
    }

    if (group.privacy === 'public') {
      const newMember = {
        id: studentId,
        name: student.fullName,
        institution: student.institutionName,
        department: student.department,
        level: student.level,
        role: 'member' as const,
        joinedAt: 'Just now'
      };

      setStudyGroups(prev => prev.map(g => {
        if (g.id === groupId) {
          return {
            ...g,
            memberCount: g.memberCount + 1,
            members: [...g.members, newMember]
          };
        }
        return g;
      }));

      // Post welcome message in group chat
      setGroupChatMessages(prev => {
        const existing = prev[groupId] || [];
        return {
          ...prev,
          [groupId]: [
            ...existing,
            {
              id: `gmsg_join_${Date.now()}`,
              groupId,
              senderId: 'system',
              senderName: 'System Bot',
              senderInstitution: group.institution,
              text: `${student.fullName} has joined the group! Say hello and share resources.`,
              sentAt: 'Just now'
            }
          ]
        };
      });

      addToast('Joined Study Group', `You are now a member of ${group.name}.`, 'success');
    } else {
      // Private group - submit join request
      const isAlreadyRequested = group.pendingRequests?.some(r => r.studentId === studentId);
      if (isAlreadyRequested) {
        addToast('Request Pending', 'Your join request is awaiting group admin review.', 'info');
        return;
      }

      const joinRequest = {
        id: `req_${Date.now()}`,
        studentId,
        studentName: student.fullName,
        studentInstitution: student.institutionName,
        department: student.department,
        level: student.level,
        requestedAt: 'Just now',
        message: message || 'I would like to join this study group for exam revision.'
      };

      setStudyGroups(prev => prev.map(g => {
        if (g.id === groupId) {
          return {
            ...g,
            pendingRequests: [...(g.pendingRequests || []), joinRequest]
          };
        }
        return g;
      }));

      addToast('Join Request Submitted', 'Group administrators will review your admission request.', 'success');
    }
  };

  const leaveStudyGroup = (groupId: string) => {
    const studentId = currentUser?.id || 'current_student';
    setStudyGroups(prev => prev.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          memberCount: Math.max(0, g.memberCount - 1),
          members: g.members.filter(m => m.id !== studentId)
        };
      }
      return g;
    }));
    addToast('Left Group', 'You have left the study circle.', 'info');
  };

  const handleGroupJoinRequest = (groupId: string, requestId: string, action: 'accept' | 'reject') => {
    setStudyGroups(prev => prev.map(g => {
      if (g.id === groupId) {
        const req = (g.pendingRequests || []).find(r => r.id === requestId);
        const updatedRequests = (g.pendingRequests || []).filter(r => r.id !== requestId);

        if (action === 'accept' && req) {
          const newMember = {
            id: req.studentId,
            name: req.studentName,
            institution: req.studentInstitution,
            department: req.department,
            level: req.level,
            role: 'member' as const,
            joinedAt: 'Just now'
          };
          return {
            ...g,
            memberCount: g.memberCount + 1,
            members: [...g.members, newMember],
            pendingRequests: updatedRequests
          };
        }
        return {
          ...g,
          pendingRequests: updatedRequests
        };
      }
      return g;
    }));

    addToast('Request Handled', action === 'accept' ? 'Member accepted into study group.' : 'Request declined.', 'info');
  };

  const promoteGroupMember = (groupId: string, memberId: string, newRole: 'admin' | 'member') => {
    setStudyGroups(prev => prev.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          members: g.members.map(m => m.id === memberId ? { ...m, role: newRole } : m)
        };
      }
      return g;
    }));
    addToast('Role Updated', `Member promoted to ${newRole}.`, 'success');
  };

  const removeGroupMember = (groupId: string, memberId: string) => {
    setStudyGroups(prev => prev.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          memberCount: Math.max(1, g.memberCount - 1),
          members: g.members.filter(m => m.id !== memberId)
        };
      }
      return g;
    }));
    addToast('Member Removed', 'User removed from group.', 'info');
  };

  const addStudySession = (groupId: string, sessionData: Omit<StudySession, 'id' | 'attendeesCount' | 'isAttending'>) => {
    const newSession: StudySession = {
      ...sessionData,
      id: `ses_${Date.now()}`,
      attendeesCount: 1,
      isAttending: true
    };

    setStudyGroups(prev => prev.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          studySessions: [newSession, ...g.studySessions]
        };
      }
      return g;
    }));

    // Post announcement in group chat
    sendGroupChatMessage(
      groupId,
      `📅 New Study Session Scheduled: "${newSession.title}" on ${newSession.date} (${newSession.time}) at ${newSession.venueOrLink}. RSVP in the Sessions tab!`
    );

    addToast('Study Session Organized', 'Session posted to the group schedule.', 'success');
  };

  const toggleAttendStudySession = (groupId: string, sessionId: string) => {
    setStudyGroups(prev => prev.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          studySessions: g.studySessions.map(s => {
            if (s.id === sessionId) {
              const nextState = !s.isAttending;
              return {
                ...s,
                isAttending: nextState,
                attendeesCount: nextState ? s.attendeesCount + 1 : Math.max(1, s.attendeesCount - 1)
              };
            }
            return s;
          })
        };
      }
      return g;
    }));
  };

  const shareResourceInGroup = (groupId: string, resourceData: Omit<GroupSharedResource, 'id' | 'sharedAt' | 'sharedBy'>) => {
    const newResource: GroupSharedResource = {
      ...resourceData,
      id: `res_${Date.now()}`,
      sharedBy: student.fullName,
      sharedAt: 'Just now'
    };

    setStudyGroups(prev => prev.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          sharedResources: [newResource, ...g.sharedResources]
        };
      }
      return g;
    }));

    // Post in group chat with attachment
    sendGroupChatMessage(
      groupId,
      `Shared academic resource: ${newResource.title}`,
      undefined,
      newResource
    );

    addToast('Resource Shared', `"${newResource.title}" added to group repository.`, 'success');
  };

  const sendGroupChatMessage = (
    groupId: string, 
    text: string, 
    replyTo?: { messageId: string; senderName: string; text: string }, 
    attachedResource?: GroupSharedResource
  ) => {
    if (!text.trim() && !attachedResource) return;

    const newMsg: GroupChatMessage = {
      id: `gmsg_${Date.now()}`,
      groupId,
      senderId: currentUser?.id || 'current_student',
      senderName: student.fullName,
      senderInstitution: student.institutionName,
      text: text.trim(),
      sentAt: 'Just now',
      replyToMessageId: replyTo?.messageId,
      replyToSenderName: replyTo?.senderName,
      replyToText: replyTo?.text,
      attachedResource
    };

    setGroupChatMessages(prev => {
      const existing = prev[groupId] || [];
      return {
        ...prev,
        [groupId]: [...existing, newMsg]
      };
    });

    // Update group lastActivity
    setStudyGroups(prev => prev.map(g => g.id === groupId ? { ...g, lastActivity: 'Just now' } : g));
  };

  // Direct Messaging
  const sendDirectMessage = (
    conversationId: string, 
    recipientId: string, 
    recipientName: string, 
    text: string, 
    replyToText?: string
  ) => {
    if (!text.trim()) return;

    const studentId = currentUser?.id || 'current_student';
    const newMsg: DirectChatMessage = {
      id: `dm_${Date.now()}`,
      conversationId,
      senderId: studentId,
      senderName: student.fullName,
      senderInstitution: student.institutionName,
      recipientId,
      recipientName,
      text: text.trim(),
      sentAt: 'Just now',
      isRead: true,
      replyToText
    };

    // Append to messages
    setDirectMessages(prev => {
      const existing = prev[conversationId] || [];
      return {
        ...prev,
        [conversationId]: [...existing, newMsg]
      };
    });

    // Update conversation metadata
    setDirectConversations(prev => {
      const exists = prev.some(c => c.id === conversationId);
      if (exists) {
        return prev.map(c => {
          if (c.id === conversationId) {
            return {
              ...c,
              lastMessageText: text.trim(),
              lastMessageTime: 'Just now'
            };
          }
          return c;
        });
      }
      return [
        {
          id: conversationId,
          participantId: recipientId,
          participantName: recipientName,
          participantInstitution: 'Nigerian Tertiary Institution',
          participantDepartment: 'Student',
          lastMessageText: text.trim(),
          lastMessageTime: 'Just now',
          unreadCount: 0
        },
        ...prev
      ];
    });
  };

  const startOrGetDirectConversation = (
    recipientId: string, 
    recipientName: string, 
    recipientInstitution: string, 
    recipientDepartment: string
  ): string => {
    // Check if conversation already exists with this participant
    const existing = directConversations.find(c => c.participantId === recipientId);
    if (existing) {
      return existing.id;
    }

    const newConvId = `conv_${Date.now()}`;
    const newConv: DirectConversation = {
      id: newConvId,
      participantId: recipientId,
      participantName: recipientName,
      participantInstitution: recipientInstitution,
      participantDepartment: recipientDepartment,
      lastMessageText: 'Conversation started',
      lastMessageTime: 'Just now',
      unreadCount: 0
    };

    setDirectConversations(prev => [newConv, ...prev]);
    setDirectMessages(prev => ({
      ...prev,
      [newConvId]: []
    }));

    return newConvId;
  };

  const markConversationAsRead = (conversationId: string) => {
    setDirectConversations(prev => prev.map(c => c.id === conversationId ? { ...c, unreadCount: 0 } : c));
  };

  // Community Notifications
  const markCommunityNotificationRead = (id: string) => {
    setCommunityNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllCommunityNotificationsRead = () => {
    setCommunityNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    addToast('Notifications Cleared', 'All community alerts marked as read.', 'info');
  };

  // Moderation & Safety
  const reportContent = (reportData: Omit<ModerationReport, 'id' | 'reportedAt' | 'status'>) => {
    const newReport: ModerationReport = {
      ...reportData,
      id: `rep_${Date.now()}`,
      reportedAt: 'Just now',
      status: 'Pending'
    };

    setModerationReports(prev => [newReport, ...prev]);
    addToast(
      'Report Submitted', 
      'Thank you for keeping StudentHub NG safe. Our moderation team has flagged this item for review.', 
      'info'
    );
  };

  const blockUser = (userId: string, userName?: string) => {
    if (!blockedUserIds.includes(userId)) {
      setBlockedUserIds(prev => [...prev, userId]);
      addToast('User Blocked', `You will no longer see content or messages from ${userName || 'this student'}.`, 'info');
    }
  };

  const unblockUser = (userId: string) => {
    setBlockedUserIds(prev => prev.filter(id => id !== userId));
    addToast('User Unblocked', 'User content is now visible again.', 'info');
  };

  // Documents
  const addDocument = (docData: Omit<DocumentItem, 'id' | 'uploadedAt'>) => {
    const newDoc: DocumentItem = {
      ...docData,
      id: `doc_${Date.now()}`,
      uploadedAt: 'Today'
    };
    setDocuments(prev => [newDoc, ...prev]);
    addToast('Document Stored', `"${newDoc.title}" securely saved to your Student Document Vault.`, 'success');
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    addToast('Document Deleted', 'Item removed from vault.', 'info');
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    addToast('Notifications Cleared', 'All notifications marked as read.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        userRole,
        setUserRole,
        student,
        updateStudent,
        theme,
        toggleTheme,
        currentUser,
        currentSession,
        isAuthenticated: Boolean(currentUser),
        isAuthLoading,
        isProfilesTableReady,
        logout,
        refreshUserProfile,
        setStudentSession,
        authModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode,
        onboardingOpen,
        setOnboardingOpen,
        settingsOpen,
        setSettingsOpen,
        subscriptionOpen,
        setSubscriptionOpen,
        institutions,
        faculties,
        departments,
        programmes,
        courses,
        pastQuestions,
        studyMaterials,
        addInstitution,
        updateInstitution,
        deleteInstitution,
        addFaculty,
        addDepartment,
        addProgramme,
        addCourse,
        updateCourse,
        deleteCourse,
        addPastQuestion,
        updatePastQuestion,
        deletePastQuestion,
        addStudyMaterial,
        updateStudyMaterial,
        deleteStudyMaterial,
        importAcademicData,
        semesters,
        addSemester,
        deleteSemester,
        tasks,
        addTask,
        toggleTaskCompleted,
        deleteTask,
        budget,
        addBudgetItem,
        deleteBudgetItem,
        marketplace,
        addListing,
        communityPosts,
        addCommunityPost,
        likePost,
        reactToPost,
        addComment,
        addPostCommentReply,
        deletePost,
        studyGroups,
        createStudyGroup,
        updateStudyGroup,
        deleteStudyGroup,
        joinStudyGroup,
        leaveStudyGroup,
        handleGroupJoinRequest,
        promoteGroupMember,
        removeGroupMember,
        addStudySession,
        toggleAttendStudySession,
        shareResourceInGroup,
        groupChatMessages,
        sendGroupChatMessage,
        directConversations,
        directMessages,
        sendDirectMessage,
        startOrGetDirectConversation,
        markConversationAsRead,
        communityNotifications,
        markCommunityNotificationRead,
        markAllCommunityNotificationsRead,
        reportContent,
        moderationReports,
        blockedUserIds,
        blockUser,
        unblockUser,
        documents,
        addDocument,
        deleteDocument,
        savedCopilotNotes,
        saveCopilotNote,
        deleteCopilotNote,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        additionRequests,
        submitAdditionRequest,
        updateAdditionRequestStatus,
        courseRepApplications,
        submitCourseRepApplication,
        updateCourseRepApplicationStatus,
        courseRepModalOpen,
        setCourseRepModalOpen,
        lecturerProfiles,
        currentLecturerProfile,
        updateLecturerProfile,
        updateLecturerVerificationStatus,
        courseAnnouncements,
        addCourseAnnouncement,
        deleteCourseAnnouncement,
        lecturerRepMessages,
        sendLecturerRepMessage,
        personalCollections,
        createPersonalCollection,
        addItemToCollection,
        removeItemFromCollection,
        deletePersonalCollection,
        enrollCourse,
        unenrollCourse,
        toggleBookmarkPastQuestion,
        toggleBookmarkStudyMaterial,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
