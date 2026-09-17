import { 
  StudyGroup, 
  GroupChatMessage, 
  DirectConversation, 
  DirectChatMessage, 
  CommunityNotification,
  CommunityPost
} from '../types';

export const INITIAL_STUDY_GROUPS: StudyGroup[] = [
  {
    id: 'grp_csc301_unilag',
    name: 'UNILAG Computer Science 300L Revision Hub',
    description: 'Collaborative revision circle for 300L Computer Science students at UNILAG. Discussing Data Structures, Operating Systems, Algorithm Analysis and sharing exam notes.',
    institution: 'University of Lagos',
    faculty: 'Faculty of Science',
    department: 'Computer Science',
    courseCode: 'CSC 301',
    level: '300L',
    privacy: 'public',
    creatorId: 'std_farouk',
    creatorName: 'Farouk Usman',
    creatorInstitution: 'University of Lagos',
    createdAt: '2 weeks ago',
    memberCount: 42,
    avatarColor: 'from-teal-600 to-emerald-700',
    tags: ['CSC301', 'DataStructures', 'Algorithms', 'Exams'],
    rules: [
      'Strictly academic inquiries and course-related discussions.',
      'No spam, promotions, or unverified exam rumors.',
      'Always credit student notes or lecturer handouts when sharing.'
    ],
    lastActivity: '10 mins ago',
    members: [
      {
        id: 'std_farouk',
        name: 'Farouk Usman',
        institution: 'University of Lagos',
        department: 'Computer Science',
        level: '300L',
        role: 'creator',
        joinedAt: '2 weeks ago'
      },
      {
        id: 'std_blessing',
        name: 'Blessing Okoro',
        institution: 'University of Lagos',
        department: 'Computer Science',
        level: '300L',
        role: 'admin',
        joinedAt: '12 days ago'
      },
      {
        id: 'current_student',
        name: 'Babatunde Adeleke',
        institution: 'University of Lagos',
        department: 'Computer Science',
        level: '300L',
        role: 'member',
        joinedAt: '5 days ago'
      },
      {
        id: 'std_samuel',
        name: 'Samuel Danjuma',
        institution: 'University of Lagos',
        department: 'Computer Science',
        level: '300L',
        role: 'member',
        joinedAt: '3 days ago'
      }
    ],
    studySessions: [
      {
        id: 'ses_1',
        title: 'CSC 301 Mid-Semester Mock Sprint: AVL Trees & Graph Traversal',
        date: 'Tomorrow, 5:00 PM',
        time: '5:00 PM - 7:00 PM',
        topic: 'Graph BFS/DFS Implementations and Time Complexity Proofs',
        venueOrLink: 'Faculty of Science Basement Lab / Google Meet',
        hostName: 'Farouk Usman',
        attendeesCount: 28,
        isAttending: true,
        notes: 'Bring your laptop or notebook with written recursive traversal pseudocode.'
      },
      {
        id: 'ses_2',
        title: 'Operating Systems: Process Synchronization & Deadlock Practice',
        date: 'Saturday, 11:00 AM',
        time: '11:00 AM - 1:30 PM',
        topic: 'Semaphores, Dining Philosophers, and Banker Algorithm',
        venueOrLink: 'Main University Library Reading Room 3',
        hostName: 'Blessing Okoro',
        attendeesCount: 19,
        isAttending: false,
        notes: 'Reviewing 2022/2023 theory past questions.'
      }
    ],
    sharedResources: [
      {
        id: 'res_1',
        title: 'CSC 301 Comprehensive Data Structures Handout (with C++ & Java Examples)',
        type: 'Lecture Material',
        courseCode: 'CSC 301',
        sharedBy: 'Farouk Usman',
        sharedAt: '3 days ago',
        description: 'Complete departmental slide transcript covering asymptotic notation, red-black trees, and hash tables.',
        urlOrSnippet: 'https://studenthub.ng/resources/csc301-handout.pdf'
      },
      {
        id: 'res_2',
        title: '2023/2024 UNILAG CSC 301 Harmattan Exam Worked Solutions',
        type: 'Past Question',
        courseCode: 'CSC 301',
        sharedBy: 'Blessing Okoro',
        sharedAt: '1 day ago',
        description: 'Detailed answer keys for Questions 1 through 5 with complexity proofs.',
        urlOrSnippet: 'https://studenthub.ng/pastquestions/unilag-csc301-2023'
      }
    ]
  },
  {
    id: 'grp_mee201_abu',
    name: 'Engineering Mechanics & Statics Alliance',
    description: 'Collaborative group for mechanical, civil, and electrical engineering students tackling MEE 201 statics, equilibrium vectors, and centroids.',
    institution: 'Ahmadu Bello University',
    faculty: 'Faculty of Engineering',
    department: 'Mechanical Engineering',
    courseCode: 'MEE 201',
    level: '200L',
    privacy: 'public',
    creatorId: 'std_samuel',
    creatorName: 'Samuel Danjuma',
    creatorInstitution: 'Ahmadu Bello University',
    createdAt: '3 weeks ago',
    memberCount: 68,
    avatarColor: 'from-amber-600 to-orange-700',
    tags: ['MEE201', 'Engineering', 'Statics', 'Dynamics'],
    rules: [
      'Draw free-body diagrams clearly when posting problem questions.',
      'Respect everyone’s learning pace.'
    ],
    lastActivity: '2 hours ago',
    members: [
      {
        id: 'std_samuel',
        name: 'Samuel Danjuma',
        institution: 'Ahmadu Bello University',
        department: 'Mechanical Engineering',
        level: '200L',
        role: 'creator',
        joinedAt: '3 weeks ago'
      },
      {
        id: 'std_tunde',
        name: 'Tunde Bakare',
        institution: 'Ahmadu Bello University',
        department: 'Civil Engineering',
        level: '200L',
        role: 'admin',
        joinedAt: '2 weeks ago'
      }
    ],
    studySessions: [
      {
        id: 'ses_mee_1',
        title: 'Trusses & Method of Joints vs Sections Workshop',
        date: 'Friday, 4:00 PM',
        time: '4:00 PM - 6:00 PM',
        topic: 'Solving 2D Bridge Trusses without calculator errors',
        venueOrLink: 'Faculty of Engineering Drawing Studio 2',
        hostName: 'Samuel Danjuma',
        attendeesCount: 34,
        isAttending: false
      }
    ],
    sharedResources: [
      {
        id: 'res_mee_1',
        title: 'MEE 201 Vector Statics Formula Sheet & Centroids Table',
        type: 'Summary Note',
        courseCode: 'MEE 201',
        sharedBy: 'Samuel Danjuma',
        sharedAt: '4 days ago',
        description: 'Single-sheet PDF cheat sheet with moments of inertia and centroid equations.'
      }
    ]
  },
  {
    id: 'grp_pha401_ui',
    name: 'UI Pharmacy 400L Clinical Therapeutics Circle',
    description: 'Private research and case-study circle for UI Pharmacy students preparing for clinical pharmacy rotations and therapeutic exams.',
    institution: 'University of Ibadan',
    faculty: 'Faculty of Pharmacy',
    department: 'Clinical Pharmacy',
    courseCode: 'PHA 401',
    level: '400L',
    privacy: 'private',
    creatorId: 'std_blessing_ui',
    creatorName: 'Blessing Okoro',
    creatorInstitution: 'University of Ibadan',
    createdAt: '1 month ago',
    memberCount: 23,
    avatarColor: 'from-purple-600 to-indigo-800',
    tags: ['Pharmacy', 'ClinicalRotations', 'Therapeutics'],
    rules: [
      'Verification required: Only for verified 400L/500L Pharmacy students.',
      'Maintain patient confidentiality in case presentations.'
    ],
    lastActivity: '45 mins ago',
    members: [
      {
        id: 'std_blessing_ui',
        name: 'Blessing Okoro',
        institution: 'University of Ibadan',
        department: 'Pharmacy',
        level: '400L',
        role: 'creator',
        joinedAt: '1 month ago'
      }
    ],
    pendingRequests: [
      {
        id: 'req_1',
        studentId: 'std_emeka_ui',
        studentName: 'Emeka Nwosu',
        studentInstitution: 'University of Ibadan',
        department: 'Pharmacy',
        level: '400L',
        requestedAt: 'Yesterday, 3:20 PM',
        message: 'Hi Blessing, would love to join for the cardiovascular case studies.'
      }
    ],
    studySessions: [
      {
        id: 'ses_pha_1',
        title: 'Hypertension Clinical Guidelines & Dosage Calculations',
        date: 'Thursday, 6:00 PM',
        time: '6:00 PM - 7:30 PM',
        topic: 'Nigerian Hypertension Society Clinical Review',
        venueOrLink: 'Zoom Meeting Room',
        hostName: 'Blessing Okoro',
        attendeesCount: 18,
        isAttending: false
      }
    ],
    sharedResources: [
      {
        id: 'res_pha_1',
        title: 'Clinical Pharmacology Drug Interaction Summary Guide',
        type: 'Lecture Material',
        courseCode: 'PHA 401',
        sharedBy: 'Blessing Okoro',
        sharedAt: '5 days ago',
        description: 'Comprehensive table on CYP450 inhibitors and inducers.'
      }
    ]
  },
  {
    id: 'grp_gst101_national',
    name: 'National GST 101/102 English & Communication Club',
    description: 'Cross-campus national revision circle for freshers tackling Use of English, Concord, Phonetics, and Reading Comprehension.',
    institution: 'All Nigerian Institutions',
    faculty: 'General Studies Unit',
    department: 'General Studies',
    courseCode: 'GST 101',
    level: '100L / ND I',
    privacy: 'public',
    creatorId: 'std_chinedu',
    creatorName: 'Chinedu Eze',
    creatorInstitution: 'University of Nigeria, Nsukka',
    createdAt: '1 month ago',
    memberCount: 189,
    avatarColor: 'from-blue-600 to-cyan-700',
    tags: ['GST101', 'UseOfEnglish', 'Phonetics', 'Freshers'],
    rules: [
      'Open to all Nigerian universities and polytechnics.',
      'Daily 5-question CBT drills posted at 8:00 PM.'
    ],
    lastActivity: '5 mins ago',
    members: [
      {
        id: 'std_chinedu',
        name: 'Chinedu Eze',
        institution: 'University of Nigeria, Nsukka',
        department: 'Mass Communication',
        level: '100L',
        role: 'creator',
        joinedAt: '1 month ago'
      },
      {
        id: 'current_student',
        name: 'Babatunde Adeleke',
        institution: 'University of Lagos',
        department: 'Computer Science',
        level: '300L',
        role: 'member',
        joinedAt: '10 days ago'
      }
    ],
    studySessions: [
      {
        id: 'ses_gst_1',
        title: 'GST 101 Phonetics Masterclass: Vowels, Diphthongs & Stress Patterns',
        date: 'Sunday, 7:00 PM',
        time: '7:00 PM - 8:30 PM',
        topic: 'Mastering the 44 English Phonemes for CBT Exams',
        venueOrLink: 'StudentHub Community Live Room',
        hostName: 'Chinedu Eze',
        attendeesCount: 94,
        isAttending: true
      }
    ],
    sharedResources: [
      {
        id: 'res_gst_1',
        title: '150 High-Frequency Concord Questions with Explanations',
        type: 'Past Question',
        courseCode: 'GST 101',
        sharedBy: 'Chinedu Eze',
        sharedAt: '1 week ago',
        description: 'Compilation of NUC benchmarked GST questions from UNILAG, UI, OAU, and UNN.'
      }
    ]
  },
  {
    id: 'grp_law_oau',
    name: 'OAU Law - Constitutional Jurisprudence Syndicate',
    description: 'Private discussion chamber for Obafemi Awolowo University law students dissecting constitutional case law, judicial review, and separation of powers.',
    institution: 'Obafemi Awolowo University',
    faculty: 'Faculty of Law',
    department: 'Public Law',
    courseCode: 'PUL 201',
    level: '200L',
    privacy: 'private',
    creatorId: 'std_folake',
    creatorName: 'Folake Adeyemi',
    creatorInstitution: 'Obafemi Awolowo University',
    createdAt: '3 weeks ago',
    memberCount: 34,
    avatarColor: 'from-rose-600 to-red-800',
    tags: ['Law', 'Constitution', 'CaseLaw', 'PUL201'],
    rules: [
      'Cite Nigerian Supreme Court & Court of Appeal law reports (NWLR) accurately.',
      'Private syndicate: requests reviewed within 24 hours.'
    ],
    lastActivity: '3 hours ago',
    members: [
      {
        id: 'std_folake',
        name: 'Folake Adeyemi',
        institution: 'Obafemi Awolowo University',
        department: 'Law',
        level: '200L',
        role: 'creator',
        joinedAt: '3 weeks ago'
      }
    ],
    studySessions: [
      {
        id: 'ses_law_1',
        title: 'Marbury v. Madison & Lakanmi v. AG Western State Case Analysis',
        date: 'Saturday, 2:00 PM',
        time: '2:00 PM - 4:00 PM',
        topic: 'Supremacy of the Constitution vs Military Decrees',
        venueOrLink: 'Law Library Seminar Room',
        hostName: 'Folake Adeyemi',
        attendeesCount: 22,
        isAttending: false
      }
    ],
    sharedResources: [
      {
        id: 'res_law_1',
        title: 'Nigerian Constitutional Law Case Summary Compendium',
        type: 'Summary Note',
        courseCode: 'PUL 201',
        sharedBy: 'Folake Adeyemi',
        sharedAt: '1 week ago',
        description: 'Digest of 50 landmark Nigerian constitutional judgments.'
      }
    ]
  }
];

export const INITIAL_GROUP_CHAT_MESSAGES: Record<string, GroupChatMessage[]> = {
  grp_csc301_unilag: [
    {
      id: 'gmsg_1',
      groupId: 'grp_csc301_unilag',
      senderId: 'std_farouk',
      senderName: 'Farouk Usman',
      senderInstitution: 'University of Lagos',
      text: 'Good afternoon scholars! Reminder that we are reviewing AVL tree balance factors and Dijkstra shortest path algorithm during tomorrow\'s session.',
      sentAt: 'Yesterday, 4:15 PM'
    },
    {
      id: 'gmsg_2',
      groupId: 'grp_csc301_unilag',
      senderId: 'std_blessing',
      senderName: 'Blessing Okoro',
      senderInstitution: 'University of Lagos',
      text: 'I have uploaded the worked solutions for the 2023 Harmattan semester exam in the Shared Resources tab. Question 3 on B-Tree node splitting is especially high-yield!',
      sentAt: 'Yesterday, 4:32 PM',
      attachedResource: {
        id: 'res_2',
        title: '2023/2024 UNILAG CSC 301 Harmattan Exam Worked Solutions',
        type: 'Past Question',
        courseCode: 'CSC 301',
        sharedBy: 'Blessing Okoro',
        sharedAt: 'Yesterday',
        description: 'Complete breakdown of past question 3.'
      }
    },
    {
      id: 'gmsg_3',
      groupId: 'grp_csc301_unilag',
      senderId: 'std_samuel',
      senderName: 'Samuel Danjuma',
      senderInstitution: 'University of Lagos',
      text: 'Thanks Blessing! Will the mock test tomorrow cover Hash collision handling (linear probing vs quadratic)?',
      sentAt: 'Today, 10:12 AM',
      replyToMessageId: 'gmsg_1',
      replyToSenderName: 'Farouk Usman',
      replyToText: 'Reminder that we are reviewing AVL tree balance factors...'
    },
    {
      id: 'gmsg_4',
      groupId: 'grp_csc301_unilag',
      senderId: 'std_farouk',
      senderName: 'Farouk Usman',
      senderInstitution: 'University of Lagos',
      text: 'Yes Samuel! We will do 3 rapid questions on open addressing and separate chaining.',
      sentAt: 'Today, 10:18 AM'
    }
  ],
  grp_gst101_national: [
    {
      id: 'gmsg_gst_1',
      groupId: 'grp_gst101_national',
      senderId: 'std_chinedu',
      senderName: 'Chinedu Eze',
      senderInstitution: 'University of Nigeria, Nsukka',
      text: 'Welcome to all 100L freshers joining today! Check the group resources for the 150 Concord Rules summary sheet.',
      sentAt: 'Yesterday, 8:00 AM'
    },
    {
      id: 'gmsg_gst_2',
      groupId: 'grp_gst101_national',
      senderId: 'current_student',
      senderName: 'Babatunde Adeleke',
      senderInstitution: 'University of Lagos',
      text: 'Great initiative Chinedu. The phonetics drills are very helpful for our upcoming CBT test.',
      sentAt: 'Today, 9:45 AM'
    }
  ]
};

export const INITIAL_CONVERSATIONS: DirectConversation[] = [
  {
    id: 'conv_farouk',
    participantId: 'std_farouk',
    participantName: 'Farouk Usman',
    participantInstitution: 'University of Lagos',
    participantDepartment: 'Computer Science (300L)',
    lastMessageText: 'Here is the pseudocode for the Dijkstra algorithm implementation we discussed.',
    lastMessageTime: '20 mins ago',
    unreadCount: 1
  },
  {
    id: 'conv_blessing',
    participantId: 'std_blessing_ui',
    participantName: 'Blessing Okoro',
    participantInstitution: 'University of Ibadan',
    participantDepartment: 'Pharmacy (400L)',
    lastMessageText: 'Thanks for sharing the study timetable template! Worked like magic.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0
  },
  {
    id: 'conv_samuel',
    participantId: 'std_samuel_abu',
    participantName: 'Samuel Danjuma',
    participantInstitution: 'Ahmadu Bello University',
    participantDepartment: 'Mechanical Engineering (200L)',
    lastMessageText: 'Are you attending the national engineering study session on Friday?',
    lastMessageTime: '3 days ago',
    unreadCount: 0
  }
];

export const INITIAL_DIRECT_MESSAGES: Record<string, DirectChatMessage[]> = {
  conv_farouk: [
    {
      id: 'dm_1',
      conversationId: 'conv_farouk',
      senderId: 'std_farouk',
      senderName: 'Farouk Usman',
      senderInstitution: 'University of Lagos',
      recipientId: 'current_student',
      recipientName: 'Babatunde Adeleke',
      text: 'Hello Babatunde! Saw your question on the CSC 301 discussion board about priority queues.',
      sentAt: '10:00 AM',
      isRead: true
    },
    {
      id: 'dm_2',
      conversationId: 'conv_farouk',
      senderId: 'current_student',
      senderName: 'Babatunde Adeleke',
      senderInstitution: 'University of Lagos',
      recipientId: 'std_farouk',
      recipientName: 'Farouk Usman',
      text: 'Hi Farouk! Yes, I was trying to clarify whether our lecturer prefers min-heap representation using 1-indexed or 0-indexed arrays.',
      sentAt: '10:15 AM',
      isRead: true
    },
    {
      id: 'dm_3',
      conversationId: 'conv_farouk',
      senderId: 'std_farouk',
      senderName: 'Farouk Usman',
      senderInstitution: 'University of Lagos',
      recipientId: 'current_student',
      recipientName: 'Babatunde Adeleke',
      text: 'He always marks 1-indexed parent/child relationships (parent = i/2, left = 2i, right = 2i+1). Here is the pseudocode for the Dijkstra algorithm implementation we discussed.',
      sentAt: '20 mins ago',
      isRead: false
    }
  ],
  conv_blessing: [
    {
      id: 'dm_b1',
      conversationId: 'conv_blessing',
      senderId: 'current_student',
      senderName: 'Babatunde Adeleke',
      senderInstitution: 'University of Lagos',
      recipientId: 'std_blessing_ui',
      recipientName: 'Blessing Okoro',
      text: 'Hi Blessing, admired your GST 101 revision tips on the community feed!',
      sentAt: '2 days ago',
      isRead: true
    },
    {
      id: 'dm_b2',
      conversationId: 'conv_blessing',
      senderId: 'std_blessing_ui',
      senderName: 'Blessing Okoro',
      senderInstitution: 'University of Ibadan',
      recipientId: 'current_student',
      recipientName: 'Babatunde Adeleke',
      text: 'Thanks for sharing the study timetable template! Worked like magic.',
      sentAt: 'Yesterday',
      isRead: true
    }
  ],
  conv_samuel: [
    {
      id: 'dm_s1',
      conversationId: 'conv_samuel',
      senderId: 'std_samuel_abu',
      senderName: 'Samuel Danjuma',
      senderInstitution: 'Ahmadu Bello University',
      recipientId: 'current_student',
      recipientName: 'Babatunde Adeleke',
      text: 'Are you attending the national engineering study session on Friday?',
      sentAt: '3 days ago',
      isRead: true
    }
  ]
};

export const INITIAL_COMMUNITY_NOTIFICATIONS: CommunityNotification[] = [
  {
    id: 'cnotif_1',
    title: 'New Reaction',
    message: 'Farouk Usman and 8 others marked your post as "Helpful".',
    timestamp: '25 mins ago',
    type: 'reaction',
    isRead: false,
    actionLink: 'post_1'
  },
  {
    id: 'cnotif_2',
    title: 'New Comment on Your Discussion',
    message: 'Blessing Okoro replied: "Spot on! The phonetics section carries almost 30% of the CBT questions..."',
    timestamp: '1 hour ago',
    type: 'comment',
    isRead: false,
    actionLink: 'post_1'
  },
  {
    id: 'cnotif_3',
    title: 'Study Session Reminder',
    message: 'Upcoming: "CSC 301 Mid-Semester Mock Sprint" starts tomorrow at 5:00 PM.',
    timestamp: '3 hours ago',
    type: 'study_session',
    isRead: true,
    actionLink: 'grp_csc301_unilag'
  },
  {
    id: 'cnotif_4',
    title: 'New Direct Message',
    message: 'Farouk Usman sent you a message in Private Chat.',
    timestamp: '20 mins ago',
    type: 'direct_message',
    isRead: false,
    actionLink: 'conv_farouk'
  }
];
