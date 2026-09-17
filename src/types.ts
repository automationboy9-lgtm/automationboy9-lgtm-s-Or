export type UserRole = 'student' | 'course_rep' | 'lecturer' | 'admin' | 'super_admin';

export type InstitutionType = 
  | 'Federal University'
  | 'State University'
  | 'Private University'
  | 'Federal Polytechnic'
  | 'State Polytechnic'
  | 'Private Polytechnic'
  | 'Monotechnic / Specialized Institution'
  | 'College of Agriculture'
  | 'College of Health Sciences and Technology'
  | 'College of Nursing Sciences'
  | 'College of Education'
  | 'Federal College of Education'
  | 'State College of Education'
  | 'Private College of Education'
  | 'Other recognized tertiary institution';

export type RegulatorType = 'NUC' | 'NBTE' | 'NCCE' | 'NMCN' | 'Other';

export type VerificationStatus = 'Verified' | 'Pending verification' | 'Inactive' | 'Unverified';

export type AccreditationStatus = 
  | 'Accredited' 
  | 'Full Accreditation' 
  | 'Provisional Accreditation' 
  | 'Under Review' 
  | 'Candidate';

export interface Institution {
  id: string;
  name: string;
  shortName: string;
  type: InstitutionType;
  state: string;
  city: string;
  ownership: 'Federal' | 'State' | 'Private';
  establishedYear?: number;
  motto?: string;
  logoColor?: string;
  logo?: string;
  logoUrl?: string;
  faculties: string[];
  websiteUrl?: string;
  website?: string;
  gradingSystem: '5.0' | '4.0';
  regulator: RegulatorType;
  accreditationStatus: AccreditationStatus;
  accreditation_status?: string;
  sourceUrl?: string;
  source_url?: string;
  lastVerified?: string;
  last_verified?: string;
  verificationStatus: VerificationStatus;
  verification_status?: string;
  isDemo?: boolean;
  is_demo?: boolean;
  description?: string;
  geopoliticalZone?: string;
  campusLocation?: string;
  contactEmail?: string;
  portalUrl?: string;
}

export interface FacultyRecord {
  id: string;
  name: string;
  code: string;
  institutionId: string;
  institutionName: string;
  description?: string;
}

export interface DepartmentRecord {
  id: string;
  name: string;
  code: string;
  facultyId: string;
  facultyName: string;
  institutionId: string;
  institutionName: string;
}

export type DegreeType = 'B.Sc' | 'B.Eng' | 'B.A' | 'LL.B' | 'MBBS' | 'B.Pharm' | 'ND' | 'HND' | 'NCE' | 'PGD' | 'M.Sc' | 'Other';

export interface ProgrammeRecord {
  id: string;
  name: string;
  code: string;
  degreeType: DegreeType;
  departmentId: string;
  departmentName: string;
  facultyId: string;
  facultyName: string;
  institutionId: string;
  institutionName: string;
  durationYears: number;
  levels: string[];
}

export interface CourseRecord {
  id: string;
  courseTitle: string;
  courseCode: string;
  creditUnit: number;
  institutionId: string;
  institutionName: string;
  facultyId?: string;
  faculty: string;
  departmentId?: string;
  department: string;
  programmeId?: string;
  programme: string;
  level: string; // e.g. '100L', '200L', '300L', '400L', '500L', 'ND I', 'ND II', 'HND I', 'HND II', 'NCE I'
  semester: 'First Semester (Harmattan)' | 'Second Semester (Rain/Omega)';
  courseDescription: string;
  isElective?: boolean;
  status: 'Approved' | 'Pending' | 'Rejected';
}

export interface DepartmentInfo {
  id: string;
  name: string;
  faculty: string;
  code: string;
  programmes: string[];
  levels: string[];
  popularCourses: string[];
}

export interface SupabaseProfile {
  id: string;
  full_name: string;
  email: string;
  institution_id?: string;
  faculty_id?: string;
  department_id?: string;
  programme_id?: string;
  level?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface StudentProfileData {
  id: string;
  fullName: string;
  email: string;
  username?: string;
  matricNumber: string;
  institutionId: string;
  institutionName: string;
  institutionType: InstitutionType;
  faculty: string;
  department: string;
  programme: string;
  level: string; // '100L', '200L', '300L', '400L', '500L', 'ND I', 'ND II', 'HND I', 'HND II', 'NCE I-III'
  academicSession?: string;
  gradingSystem: '5.0' | '4.0';
  targetCgpa: number;
  currentCgpa: number;
  totalUnitsTaken: number;
  isPro: boolean;
  avatarUrl?: string;
  phone?: string;
  bio?: string;
  academicInterests?: string[];
  enrolledCourseCodes?: string[];
  enrolledCourses?: CourseRecord[];
  preferredResourceTypes?: string[];
  preferredTopics?: string[];
  joinedReadingGroupIds?: string[];
  onboardingCompleted?: boolean;
  joinedDate: string;
  studyStreakDays: number;
  // Role & Extended permissions
  roles?: UserRole[];
  isCourseRep?: boolean;
  courseRepStatus?: CourseRepStatus;
  courseRepCourseCode?: string;
  bookmarkedPastQuestionIds?: string[];
  bookmarkedStudyMaterialIds?: string[];
  completedPracticeQuestionsCount?: number;
  studySessionsCount?: number;
  weeklyStudyGoalHours?: number;
}

export type CourseRepStatus = 'PENDING' | 'VERIFIED' | 'ACTIVE' | 'REJECTED' | 'SUSPENDED';

export interface CourseRepApplication {
  id: string;
  userId: string;
  studentName: string;
  studentEmail: string;
  matricNumber: string;
  institutionId: string;
  institutionName: string;
  facultyId?: string;
  facultyName: string;
  departmentId?: string;
  departmentName: string;
  programmeId?: string;
  programmeName: string;
  level: string;
  courseId?: string;
  courseCode: string;
  courseTitle: string;
  academicSession: string;
  verificationInfo: string;
  idDocumentUrl?: string;
  applicationDate: string;
  status: CourseRepStatus;
  adminReviewNotes?: string;
}

export interface LecturerProfile {
  id: string;
  userId: string;
  fullName: string;
  title: string; // 'Prof.' | 'Dr.' | 'Engr.' | 'Mr.' | 'Mrs.' | 'Ms.'
  email: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
  institutionId: string;
  institutionName: string;
  facultyName: string;
  departmentName: string;
  programmeName: string;
  coursesTaught: string[]; // e.g. ['CSC 301', 'CSC 305']
  verificationStatus: 'Pending' | 'Verified' | 'Suspended';
  officeHours?: string;
  officeLocation?: string;
  joinedAt: string;
}

export interface CourseAnnouncement {
  id: string;
  courseCode: string;
  courseTitle: string;
  institutionId: string;
  departmentName?: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: 'lecturer' | 'course_rep';
  createdAt: string;
  priority?: 'normal' | 'urgent';
  attachments?: { title: string; url?: string; size?: string }[];
}

export interface PersonalCollection {
  id: string;
  name: string;
  description?: string;
  courseCode?: string;
  color?: string;
  createdAt: string;
  itemIds: Array<{
    id: string;
    type: 'past_question' | 'study_material' | 'copilot_note' | 'web_link';
    title: string;
    subtitle?: string;
    dateAdded: string;
  }>;
}

export interface LecturerRepMessage {
  id: string;
  courseCode: string;
  senderId: string;
  senderName: string;
  senderRole: 'lecturer' | 'course_rep';
  message: string;
  timestamp: string;
  attachments?: string[];
}

export interface AdditionRequest {
  id: string;
  type: 'institution' | 'department' | 'course';
  studentName: string;
  studentEmail: string;
  institutionName: string;
  facultyName?: string;
  departmentName?: string;
  courseCode?: string;
  courseTitle?: string;
  level?: string;
  additionalDetails?: string;
  status: 'Pending Review' | 'Approved' | 'Declined';
  submittedAt: string;
}

export type ResourceSourceType = 
  | 'authorized_upload' 
  | 'student_submission' 
  | 'admin_approved' 
  | 'public_resource';

export interface PastQuestion {
  id: string;
  courseCode: string; // e.g. "GST 101", "MAT 101"
  courseTitle: string;
  institutionId: string;
  institutionName: string;
  faculty: string;
  department: string;
  programme?: string;
  level: string;
  sessionYear: string; // e.g. "2023/2024"
  academicYear?: string;
  semester: 'First Semester (Harmattan)' | 'Second Semester (Rain/Omega)';
  examType: 'Semester Exam' | 'Mid-Semester Test' | 'POST-UTME';
  questionCount: number;
  timeAllowed?: string; // e.g. "2 Hours"
  instructions?: string; // e.g. "Answer ALL questions in Section A and any THREE in Section B"
  downloadUrl?: string;
  rating?: number;
  source: string;
  sourceType: ResourceSourceType;
  status: 'Approved' | 'Pending' | 'Rejected';
  copyrightNotice?: string;
  theoryQuestions?: Array<{
    id: number;
    questionNumber: number;
    questionText: string;
    marks: number;
    solutionGuide?: string;
    keyFormulas?: string[];
  }>;
  questions?: Array<{
    id?: number;
    questionNumber?: number;
    question?: string;
    questionText?: string;
    options?: string[];
    correctOption?: number;
    correctOptionIndex?: number;
    explanation?: string;
    conceptCategory?: string;
    type?: 'objective' | 'theory';
  }>;
}

export type StudyResourceCategory = 
  | 'Lecture Material' 
  | 'Note' 
  | 'PDF' 
  | 'Course Resource' 
  | 'Handout' 
  | 'Lab Manual' 
  | 'Syllabus';

export interface StudyMaterial {
  id: string;
  title: string;
  courseCode: string;
  courseTitle: string;
  faculty: string;
  department: string;
  programme?: string;
  level: string;
  semester?: string;
  institutionId?: string;
  institutionName: string;
  uploaderName: string;
  fileType: 'PDF' | 'DOCX' | 'PPTX' | 'Summary';
  category?: StudyResourceCategory;
  academicYear?: string;
  pages: number;
  fileSize: string;
  downloads: number;
  rating: number;
  description: string;
  tags: string[];
  dateUploaded: string;
  source: string;
  sourceType: ResourceSourceType;
  status: 'Approved' | 'Pending' | 'Rejected';
  copyrightNotice?: string;
  contentPreview?: string;
  downloadUrl?: string;
  keyTopics?: string[];
}

export interface WebResourceResult {
  id: string;
  title: string;
  source: string;
  url: string;
  category: 'Past Question' | 'Lecture Material' | 'Note' | 'PDF / Textbook' | 'Course Resource';
  description: string;
  institutionOrPlatform?: string;
  fileFormat?: 'PDF' | 'Web Page' | 'Slides';
  isExternalBrowserLink: boolean;
}

export interface CourseGrade {
  id: string;
  courseCode: string;
  courseTitle: string;
  units: number;
  grade: string; // 'A', 'B', 'C', 'D', 'E', 'F' or 'Distinction', 'Upper Credit', etc.
  gradePoint: number;
}

export interface SemesterRecord {
  id: string;
  semesterName: string; // e.g. "Year 1 - First Semester"
  academicSession: string; // e.g. "2023/2024"
  courses: CourseGrade[];
  gpa: number;
  totalUnits: number;
  totalPoints: number;
}

export interface TimetableSlot {
  id: string;
  courseCode: string;
  courseTitle: string;
  day: string; // 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
  time: string; // e.g. '08:00 AM - 10:00 AM'
  venue: string;
  lecturer: string;
}

export interface AcademicCalendarEvent {
  id: string;
  title: string;
  category: 'Resumption' | 'Registration' | 'Lectures' | 'Matriculation' | 'Examination' | 'Break' | 'SUG Week' | 'Convocation' | 'Continuous Assessment';
  startDate: string;
  endDate?: string;
  description: string;
  semester: 'First Semester (Harmattan)' | 'Second Semester (Rain/Omega)' | 'Both Semesters';
  status?: 'upcoming' | 'ongoing' | 'completed';
}

export interface SchoolCalendar {
  institutionId: string;
  institutionName: string;
  academicSession: string; // e.g. "2024/2025"
  approvedBy: string; // e.g. "College Academic Board" | "University Senate"
  lastUpdated: string;
  firstSemester: {
    startDate: string;
    endDate: string;
    examStartDate: string;
    events: AcademicCalendarEvent[];
  };
  secondSemester: {
    startDate: string;
    endDate: string;
    examStartDate: string;
    events: AcademicCalendarEvent[];
  };
}

export interface SchoolTimetableEntry {
  id: string;
  institutionId: string;
  institutionName: string;
  faculty: string;
  department: string;
  programme: string;
  level: string; // e.g. 'ND 1', 'ND 2', '100L', '200L', '300L', '400L', '500L'
  semester: 'First Semester (Harmattan)' | 'Second Semester (Rain/Omega)';
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  time: string; // e.g. '08:00 AM - 10:00 AM'
  courseCode: string;
  courseTitle: string;
  venue: string;
  lecturer: string;
  type: 'Lecture' | 'Lab / Practical' | 'Tutorial' | 'Examination';
  examDate?: string;
}

export interface PlannerTask {
  id: string;
  title: string;
  courseCode: string;
  dueDate: string;
  dueTime?: string;
  type?: 'assignment' | 'exam' | 'test' | 'study-session' | 'project';
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
  notes?: string;
}

export interface ProjectTopic {
  id: string;
  title: string;
  department: string;
  faculty: string;
  problemStatement: string;
  objectives: string[];
  methodology: string;
  expectedOutcome: string;
  caseStudyFocus: string;
  isCustomGenerated?: boolean;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'Admission' | 'School Fees' | 'Course Registration' | 'ID Card' | 'Result / Transcript' | 'Receipt' | 'Other';
  fileSize: string;
  uploadedAt: string;
  secureTag: string;
}

export interface BudgetItem {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: 'Allowance' | 'Textbooks & Handouts' | 'Departmental Dues' | 'Food & Groceries' | 'Transport' | 'Data & Subscriptions' | 'Miscellaneous';
  date: string;
}

export interface MarketplaceListing {
  id: string;
  title: string;
  price: number;
  category: 'Textbooks' | 'Engineering Equipment' | 'Medical Supplies' | 'Electronics' | 'Calculators' | 'Hostel Essentials';
  institutionName: string;
  campusLocation: string;
  sellerName: string;
  sellerPhone: string;
  sellerRating: number;
  condition: 'Brand New' | 'Like New' | 'Good' | 'Fair';
  description: string;
  postedAt: string;
  isVerifiedStudent: boolean;
}

export type CommunityPostCategory = 
  | 'Academic Help' 
  | 'Departmental Discussion' 
  | 'Campus Life' 
  | 'Final Year Project' 
  | 'Exam Prep'
  | 'Study Groups & Meetups'
  | 'Career & Internships'
  | 'General Advice';

export interface PostCommentReply {
  id: string;
  authorId?: string;
  authorName: string;
  authorInstitution: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  likes?: number;
}

export interface PostComment {
  id: string;
  authorId?: string;
  authorName: string;
  authorInstitution: string;
  authorDepartment?: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  likes?: number;
  isLiked?: boolean;
  replies?: PostCommentReply[];
}

export interface CommunityPost {
  id: string;
  authorId?: string;
  authorName: string;
  authorInstitution: string;
  authorDepartment: string;
  authorFaculty?: string;
  authorAvatar?: string;
  authorBadge?: string;
  title: string;
  content: string;
  category: CommunityPostCategory | string;
  courseTag?: string;
  tags?: string[];
  likes: number;
  likesCount?: number;
  commentsCount: number;
  repliesCount?: number;
  createdAt: string;
  isLiked?: boolean;
  userReaction?: 'like' | 'helpful' | 'brilliant' | 'question' | null;
  reactionCounts?: {
    like: number;
    helpful: number;
    brilliant: number;
    question: number;
  };
  comments?: PostComment[];
  isReported?: boolean;
}

export interface StudyGroupMember {
  id: string;
  name: string;
  institution: string;
  department: string;
  level?: string;
  role: 'creator' | 'admin' | 'member';
  joinedAt: string;
  avatarUrl?: string;
}

export interface StudyGroupJoinRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentInstitution: string;
  department: string;
  level: string;
  requestedAt: string;
  message?: string;
}

export interface StudySession {
  id: string;
  title: string;
  date: string;
  time: string;
  topic: string;
  venueOrLink: string;
  hostName: string;
  attendeesCount: number;
  isAttending?: boolean;
  notes?: string;
}

export interface GroupSharedResource {
  id: string;
  title: string;
  type: 'Lecture Material' | 'Past Question' | 'Link' | 'Summary Note';
  courseCode?: string;
  sharedBy: string;
  sharedAt: string;
  urlOrSnippet?: string;
  description?: string;
}

export interface GroupChatMessage {
  id: string;
  groupId: string;
  senderId: string;
  senderName: string;
  senderInstitution: string;
  senderAvatar?: string;
  text: string;
  sentAt: string;
  replyToMessageId?: string;
  replyToSenderName?: string;
  replyToText?: string;
  attachedResource?: GroupSharedResource;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  institution: string;
  faculty: string;
  department: string;
  courseCode: string;
  level: string;
  privacy: 'public' | 'private';
  creatorId: string;
  creatorName: string;
  creatorInstitution: string;
  createdAt: string;
  memberCount: number;
  members: StudyGroupMember[];
  pendingRequests?: StudyGroupJoinRequest[];
  studySessions: StudySession[];
  sharedResources: GroupSharedResource[];
  tags: string[];
  avatarColor: string;
  rules?: string[];
  lastActivity?: string;
}

export interface DirectChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderInstitution: string;
  senderAvatar?: string;
  recipientId: string;
  recipientName: string;
  text: string;
  sentAt: string;
  isRead: boolean;
  replyToText?: string;
}

export interface DirectConversation {
  id: string;
  participantId: string;
  participantName: string;
  participantInstitution: string;
  participantDepartment: string;
  participantAvatar?: string;
  lastMessageText: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface CommunityNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'reaction' | 'comment' | 'group_request' | 'group_accepted' | 'direct_message' | 'study_session';
  isRead: boolean;
  actionLink?: string;
  targetId?: string;
}

export interface ModerationReport {
  id: string;
  reporterId: string;
  targetType: 'post' | 'comment' | 'message' | 'group' | 'user';
  targetId: string;
  targetTitleOrSnippet: string;
  reason: 'Spam or Advertising' | 'Inappropriate Content' | 'Academic Dishonesty' | 'Harassment or Abuse' | 'Misleading Information';
  details?: string;
  reportedAt: string;
  status: 'Pending' | 'Reviewed' | 'Resolved';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'academic';
  isRead: boolean;
  linkTab?: string;
}

export interface AdminStats {
  totalStudents: number;
  activeToday: number;
  totalInstitutions: number;
  totalCourses: number;
  totalPastQuestions: number;
  totalStudyMaterials: number;
  totalAiQueriesToday: number;
  proSubscribers: number;
  monthlyRevenueNgn: number;
  systemHealth: 'Optimal' | 'Degraded' | 'Maintenance';
}

export interface AIInteractionLog {
  id: string;
  studentName: string;
  institution: string;
  department: string;
  promptSnippet: string;
  responseTokens: number;
  mode: string;
  timestamp: string;
  status: 'Success' | 'Rate-Limited' | 'Error';
}

export interface AcademicImportDetail {
  row: number;
  courseCode: string;
  courseTitle: string;
  institution: string;
  status: 'success' | 'failed' | 'duplicate' | 'missing_info';
  message: string;
  data?: Partial<CourseRecord>;
}

export interface AcademicImportResult {
  totalProcessed: number;
  successfulRecords: number;
  failedRecords: number;
  duplicateRecords: number;
  missingInfoRecords: number;
  details: AcademicImportDetail[];
}

export interface BulkImportRow {
  institution_name: string;
  institution_type: string;
  ownership: string;
  state: string;
  city: string;
  website?: string;
  regulator?: string;
  accreditation_status?: string;
  source_url?: string;
  faculty?: string;
  department?: string;
  programme?: string;
  level?: string;
  semester?: string;
  course_code?: string;
  course_title?: string;
  credit_unit?: string | number;
}

export interface BulkImportValidationError {
  row: number;
  field: string;
  reason: string;
  severity: 'error' | 'warning';
}

export interface BulkImportValidationReport {
  totalRows: number;
  validRows: number;
  errorCount: number;
  duplicateInstitutionsCount: number;
  duplicateCoursesCount: number;
  missingInstitutionNames: number;
  missingStates: number;
  invalidInstitutionTypes: number;
  errors: BulkImportValidationError[];
  parsedRecords: Array<{
    institution: Partial<Institution>;
    course?: Partial<CourseRecord>;
    faculty?: string;
    department?: string;
    programme?: string;
    rawRow: number;
    isValid: boolean;
    issues: string[];
  }>;
}

export type CopilotProvider = 'studenthub' | 'gemini' | 'chatgpt' | 'web';

export interface CopilotReferenceItem {
  id: string;
  type: 'course' | 'past_question' | 'study_material' | 'institution';
  title: string;
  subtitle?: string;
  courseCode?: string;
  institutionName?: string;
  yearOrLevel?: string;
}

export interface CopilotWebLink {
  platform: string;
  url: string;
  badge: string;
  description: string;
}

export interface CopilotMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  provider: CopilotProvider;
  mode?: string;
  sourceAttribution?: string;
  webLinks?: CopilotWebLink[];
  referencedResources?: CopilotReferenceItem[];
}

export interface SavedCopilotNote {
  id: string;
  title: string;
  query: string;
  provider: CopilotProvider;
  content: string;
  sourceAttribution?: string;
  savedAt: string;
  mode?: string;
  tags?: string[];
  courseCode?: string;
  webLinks?: CopilotWebLink[];
}

