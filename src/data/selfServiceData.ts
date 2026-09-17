import { 
  CourseRepApplication, 
  LecturerProfile, 
  CourseAnnouncement, 
  PersonalCollection, 
  LecturerRepMessage 
} from '../types';

export const INITIAL_COURSE_REP_APPLICATIONS: CourseRepApplication[] = [
  {
    id: 'rep_app_1',
    userId: 'stu_01',
    studentName: 'Chinedu Adeleke',
    studentEmail: 'chinedu.adeleke@student.ui.edu.ng',
    matricNumber: '219482',
    institutionId: 'ui',
    institutionName: 'University of Ibadan',
    facultyName: 'Faculty of Technology',
    departmentName: 'Computer Science',
    programmeName: 'B.Sc Computer Science',
    level: '300L',
    courseCode: 'CSC 301',
    courseTitle: 'Structured Programming (C & Python)',
    academicSession: '2024/2025',
    verificationInfo: 'Elected departmental Course Representative for CSC 301. Endorsed by HOD and class assembly.',
    applicationDate: '2024-10-12T10:00:00.000Z',
    status: 'ACTIVE'
  },
  {
    id: 'rep_app_2',
    userId: 'stu_02',
    studentName: 'Amina Bello',
    studentEmail: 'amina.bello@abu.edu.ng',
    matricNumber: 'U21CS1045',
    institutionId: 'abu',
    institutionName: 'Ahmadu Bello University',
    facultyName: 'Faculty of Physical Sciences',
    departmentName: 'Computer Science',
    programmeName: 'B.Sc Computer Science',
    level: '200L',
    courseCode: 'CSC 201',
    courseTitle: 'Computer Programming I',
    academicSession: '2024/2025',
    verificationInfo: 'Submitted valid student identity card and department letter endorsement.',
    applicationDate: '2024-11-04T14:30:00.000Z',
    status: 'PENDING'
  },
  {
    id: 'rep_app_3',
    userId: 'stu_03',
    studentName: 'Emeka Nwosu',
    studentEmail: 'emeka.nwosu@unilag.edu.ng',
    matricNumber: '200407089',
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    facultyName: 'Faculty of Science',
    departmentName: 'Computer Science',
    programmeName: 'B.Sc Computer Science',
    level: '400L',
    courseCode: 'CSC 401',
    courseTitle: 'Compiler Construction',
    academicSession: '2024/2025',
    verificationInfo: 'Appointed 400L Class Rep. Letter attached.',
    applicationDate: '2024-11-08T09:15:00.000Z',
    status: 'VERIFIED'
  }
];

export const INITIAL_LECTURER_PROFILES: LecturerProfile[] = [
  {
    id: 'lec_01',
    userId: 'usr_lec_01',
    fullName: 'Dr. Babatunde Ogunlesi',
    title: 'Dr.',
    email: 'b.ogunlesi@ui.edu.ng',
    username: 'dr_ogunlesi',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    bio: 'Associate Professor of Computer Systems & Software Architecture. Specializes in distributed algorithms, compilers, and OS kernels.',
    institutionId: 'ui',
    institutionName: 'University of Ibadan',
    facultyName: 'Faculty of Technology',
    departmentName: 'Computer Science',
    programmeName: 'B.Sc Computer Science',
    coursesTaught: ['CSC 301', 'CSC 305'],
    verificationStatus: 'Verified',
    officeHours: 'Tuesdays & Thursdays, 2:00 PM - 4:00 PM',
    officeLocation: 'Block B, Faculty of Technology, Office 204',
    joinedAt: 'January 2023'
  },
  {
    id: 'lec_02',
    userId: 'usr_lec_02',
    fullName: 'Prof. Comfort Nwachukwu',
    title: 'Prof.',
    email: 'c.nwachukwu@unilag.edu.ng',
    username: 'prof_comfort',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    bio: 'Professor of Database Engineering & Information Systems. Lead researcher at the AI & Data Analytics Lab.',
    institutionId: 'unilag',
    institutionName: 'University of Lagos',
    facultyName: 'Faculty of Science',
    departmentName: 'Computer Science',
    programmeName: 'B.Sc Computer Science',
    coursesTaught: ['CSC 302', 'CSC 401'],
    verificationStatus: 'Verified',
    officeHours: 'Mondays & Wednesdays, 11:00 AM - 1:00 PM',
    officeLocation: 'Science Complex, Room 312',
    joinedAt: 'March 2023'
  }
];

export const INITIAL_COURSE_ANNOUNCEMENTS: CourseAnnouncement[] = [
  {
    id: 'ann_01',
    courseCode: 'CSC 301',
    courseTitle: 'Structured Programming',
    institutionId: 'ui',
    departmentName: 'Computer Science',
    title: 'Continuous Assessment (CBT Test) Date Announced',
    content: 'The first CSC 301 Continuous Assessment test is officially scheduled for Thursday next week at 10:00 AM at the CBT Centre. Coverage will include Module 1 (C Syntax & Control Structures) and Module 2 (Pointer Memory Management). All students must present their school ID.',
    authorId: 'lec_01',
    authorName: 'Dr. Babatunde Ogunlesi',
    authorRole: 'lecturer',
    createdAt: '2024-11-10T09:00:00Z',
    priority: 'urgent',
    attachments: [
      { title: 'CSC301_Test_Sitting_Arrangement.pdf', size: '240 KB' }
    ]
  },
  {
    id: 'ann_02',
    courseCode: 'CSC 301',
    courseTitle: 'Structured Programming',
    institutionId: 'ui',
    departmentName: 'Computer Science',
    title: 'Friday Peer Revision & Lab Session (Lab 2)',
    content: 'Fellow students, as your Course Rep, I have secured Lab 2 this Friday from 3:00 PM to 6:00 PM. We will review previous exam questions on double pointers and dynamic memory allocation (malloc/free). Come with your laptops or notebooks.',
    authorId: 'rep_app_1',
    authorName: 'Chinedu Adeleke (Course Rep)',
    authorRole: 'course_rep',
    createdAt: '2024-11-12T11:30:00Z',
    priority: 'normal'
  },
  {
    id: 'ann_03',
    courseCode: 'CSC 302',
    courseTitle: 'Database Design & Management',
    institutionId: 'unilag',
    departmentName: 'Computer Science',
    title: 'SQL Term Project Submission Guidelines',
    content: 'The PostgreSQL Schema design document and ER diagrams for the hospital management project are due on Friday, Dec 1st. Please submit via the portal or directly to your Course Rep.',
    authorId: 'lec_02',
    authorName: 'Prof. Comfort Nwachukwu',
    authorRole: 'lecturer',
    createdAt: '2024-11-14T14:00:00Z',
    priority: 'normal'
  }
];

export const INITIAL_PERSONAL_COLLECTIONS: PersonalCollection[] = [
  {
    id: 'col_01',
    name: 'My CSC 301 Exam Preparation',
    description: 'Past exam papers, pointers handout, and AI copilot code walkthroughs for CSC 301.',
    courseCode: 'CSC 301',
    color: '#059669',
    createdAt: '2024-10-15T08:00:00Z',
    itemIds: [
      {
        id: 'pq_1',
        type: 'past_question',
        title: 'CSC 301 Past Examination (2023/2024)',
        subtitle: 'University of Ibadan • 300L First Semester',
        dateAdded: '2024-10-15'
      },
      {
        id: 'mat_1',
        type: 'study_material',
        title: 'Complete Pointer & Memory Allocation Lecture Handout',
        subtitle: 'Lecture Notes • 48 pages',
        dateAdded: '2024-10-16'
      }
    ]
  },
  {
    id: 'col_02',
    name: 'General Studies Revision Hub',
    description: 'GST 222 & GST 111 summaries and objective practice questions.',
    courseCode: 'GST 222',
    color: '#3b82f6',
    createdAt: '2024-10-20T14:00:00Z',
    itemIds: [
      {
        id: 'pq_2',
        type: 'past_question',
        title: 'GST 222 Peace Studies & Conflict Resolution (2022/2023)',
        subtitle: 'National University Curriculum Benchmark',
        dateAdded: '2024-10-20'
      }
    ]
  }
];

export const INITIAL_LECTURER_REP_MESSAGES: Record<string, LecturerRepMessage[]> = {
  'CSC 301': [
    {
      id: 'lrm_1',
      courseCode: 'CSC 301',
      senderId: 'lec_01',
      senderName: 'Dr. Babatunde Ogunlesi',
      senderRole: 'lecturer',
      message: 'Good day Chinedu, please remind the class that Lab Assignment 2 on Binary Trees is due this Friday by 11:59 PM. Let me know if there are any venue conflicts.',
      timestamp: '2 days ago'
    },
    {
      id: 'lrm_2',
      courseCode: 'CSC 301',
      senderId: 'stu_01',
      senderName: 'Chinedu Adeleke (Course Rep)',
      senderRole: 'course_rep',
      message: 'Good day sir! Duly noted. I have published an announcement on our StudentHub course board and coordinated with the lab assistant for Friday revision.',
      timestamp: 'Yesterday at 4:15 PM'
    },
    {
      id: 'lrm_3',
      courseCode: 'CSC 301',
      senderId: 'lec_01',
      senderName: 'Dr. Babatunde Ogunlesi',
      senderRole: 'lecturer',
      message: 'Excellent work Chinedu. I have also uploaded the updated sample questions for pointers into the materials vault.',
      timestamp: 'Today at 08:30 AM'
    }
  ]
};
