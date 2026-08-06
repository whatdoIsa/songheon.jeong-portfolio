export const projects = [
  {
    id: 100,
    title: 'SmartEdge',
    category: 'macOS',
    type: 'SwiftUI',
    thumbnail: '/images/projects/smartedge/music.jpg',
    description: 'macOS menu-bar app that turns the MacBook notch into a micro-workspace (music, calendar, file shelf, Pomodoro). Free + Pro IAP on the App Store.',
    techStack: ['SwiftUI', 'AppKit', 'App Sandbox', 'StoreKit 2', 'EventKit'],
    github: null,
    appstore: 'https://apps.apple.com/kr/app/smartedge/id6787634027?mt=12',
    duration: '2025.12 - 현재',
    role: 'Personal Project (Planning, Development, Design, Release & Ops 100%)',
    highlights: [
      'Problem: Checking music, sharing files and viewing schedules each required switching apps; the notch was dead space, and always-on-top UI collides with macOS system constraints (sandbox, TCC, window levels).',
      'Action: Combined AppKit window-level control with SwiftUI; resolved kernel-level sandbox blocking of Apple Events via targeted exception entitlements and made drag & drop work by dynamically lowering the window level; built a free + Pro (non-consumable IAP) model with StoreKit 2 and shipped worldwide in KO/EN.',
      'Result: Passed App Store review and shipped; operating v1.1 with global hotkeys and multi-file sharing — completed the full cycle of planning → development → review → monetization → operations solo.'
    ]
  },
  {
    id: 2,
    title: 'Show(X)',
    category: 'iOS',
    type: 'SwiftUI',
    thumbnail: '/images/projects/showx.jpg',
    description: 'Indoor map app for Showcase 2025. Navigation and information app for Apple Developer Academy event participants.',
    what_one_liner: "Indoor map navigation for event venues (MapKit + GeoJSON)",
    problem: "200+ attendees struggled indoors, increasing on-site guidance load",
    result: "Reduced guidance inquiries by 40%; achieved Apple Indoor Map approval",
    techStack: ['SwiftUI', 'MapKit', 'Swift Data','Indoor Positioning', 'Localization'],
    features: [
      'Indoor map-based booth location and route guidance',
      'Exhibition search with category-based filtering',
      'Integrated event schedule and team project information',
      'Korean/English multilingual support',
      'App Store Navigation Chart #37'
    ],
    webConnection: 'Applied web map API experience to MapKit learning.',
    github: null,
    appstore: 'https://apps.apple.com/kr/app/showx/id6755496321',
    duration: '2025.09 - 2025.11',
    role: 'iOS Developer (Team Project - 6 people / Development Lead)',
    highlights: [
      'Problem: 200+ participants at Showcase event struggled with indoor navigation and booth locations, creating burden on guidance staff and dispersed event experience.',
      'Action: Implemented floor/zone/booth level data modeling with MapKit Indoor Positioning API and GeoJSON-based custom overlays. Independently developed indoor map module in SwiftUI (handled 50% of total development), iterated 5 updates for improvement, and completed Korean/English localization through Figma-based collaboration with 6 planners and designers.',
      'Result: 40% reduction in on-site guidance inquiries during Showcase period, achieved Korea\'s first approval for Apple Indoor Map. Secured indoor navigation domain expertise through 5 updates. Achieved App Store Navigation Chart #37.'
    ]
  },
  {
    id: 1,
    title: 'kip!',
    category: 'iOS',
    type: 'SwiftUI',
    thumbnail: '/images/projects/kip.jpg',
    // Description, what, problem, result are now handled by translation files
    description: 'On-device AI-based screenshot auto-organization productivity app. Local AI processing with privacy protection.',
    what_one_liner: "On-device screenshot classifier + local organizer",
    problem: "Users waste ~5 min finding info in 300+ screenshots; 70% reject cloud AI",
    result: "Cut organizing time 60% (5→2 min); 95% reported higher trust",
    techStack: ['SwiftUI', 'Apple Intelligence', 'Foundation Model', 'Vision', 'Notifications'],
    // Features and webConnection are handled by translation files
    features: [
      'Quick save with Share Sheet integration',
      'Automatic date/time/memo extraction with on-device AI',
      'Smart location recognition and reminder notifications',
      'Local personal data processing (no server transmission)',
      'App Store Productivity #66'
    ],
    webConnection: 'Extended React component reusability concept to SwiftUI View Modifier. Applied web UX patterns to native apps.',
    github: null,
    appstore: 'https://apps.apple.com/kr/app/kip/id6754709167',
    duration: '2025.09 - 2025.11',
    role: 'iOS Developer (Team Project - 6 people / 1 of 3 developers)',
    // Highlights are handled by translation files
    highlights: [
      'Problem: 15 test users averaged 300+ saved screenshots, taking average 5 minutes to find needed information. Cloud AI had 70% rejection rate due to privacy concerns. 68% frequently forgot and missed saved information.',
      'Action: Implemented on-device image classification pipeline with Apple Intelligence Writing Tools API and Vision framework (handled 40% of total development) achieving 85% accuracy. Optimized asynchronous processing with SwiftUI Combine. Designed complete privacy-assured architecture with SwiftData-based local storage.',
      'Result: 60% reduction in screenshot organization time for test users (5min → 2min). 95% satisfaction with "no server transmission, feels secure". Secured balance between on-device AI design, performance, and privacy. Introduced Gemini & GPT for Apple Intelligence unavailable cases. Achieved App Store Productivity #66.'
    ]
  },
  {
    id: 4,
    title: 'ReToU (오늘의 넌)',
    category: 'iOS',
    type: 'SwiftUI',
    thumbnail: '/images/projects/retou.jpg',
    description: 'Daily one-line emotional reflection and self-reflection iOS app. Wellbeing application for organizing mind through daily emotional records.',
    what_one_liner: "30-second daily reflection app with mood + context recall",
    problem: "Journaling is heavy; mood apps lose context and churn quickly",
    result: "Achieved 70% 30-day retention with privacy-first local storage",
    techStack: ['SwiftUI', 'Face ID', 'Charts'],
    features: [
      'Consistent recording habit formation with once-daily reflection',
      'Multilingual support for Korean and English',
      'Monthly emotional statistics and feedback messages',
      'Face ID/password security features',
      'Light/dark mode support and local storage'
    ],
    webConnection: 'Natural transition from React useState pattern to SwiftUI @State. Applied component-based UI design experience.',
    github: 'https://github.com/whatdoIsa/ReToU',
    appstore: 'https://apps.apple.com/kr/app/re-tou/id6745058969',
    duration: '2025.04 - 현재',
    role: 'iOS Developer (Personal Project)',
    highlights: [
      'Problem: 8 out of 10 test users "couldn\'t sustain diary writing for more than 3 days due to burden", emotion check apps led to dropout with "can\'t recall reasons after 30 days".',
      'Action: Designed UX with minimal input structure of "daily 1 question + emotion selection" (handled 100% of development) providing burden-free input experience with average 30-second writing time. Implemented date-wise and emotion-wise statistical visualization with Swift Charts. Ensured complete privacy with Face ID security and local storage. Reflected test user feedback 3 times for UI improvements.',
      'Result: Achieved 70% 30-day retention rate (3x compared to existing diary apps). 85% satisfaction with "can see emotional patterns". Secured local data-based wellbeing app UX design and implementation experience.'
    ]
  },
  {
    id: 3,
    title: 'Rootrip',
    category: 'iOS',
    type: 'SwiftUI',
    thumbnail: '/images/projects/rootrip.jpg',
    description: 'Travel planning and productivity app using MapKit and PencilKit. iPad OS app development based on MVVM architecture.',
    what_one_liner: "iPad travel planner combining map + Pencil-based planning",
    problem: "Planning is fragmented across maps/notes/routes, slowing iteration",
    result: "Unified planning workflow to iterate itineraries faster",
    techStack: ['Swift', 'SwiftUI', 'UIKit', 'PencilKit', 'MapKit', 'MVVM', 'Firebase'],
    features: [
      'PencilKit + MapKit integrated map drawing functionality',
      'MVVM/MVC/Clean Architecture application',
      'Firebase backend integration'
    ],
    webConnection: 'Extended React component architecture experience to SwiftUI MVVM pattern. Applied frontend state management concepts.',
    github: null,
    appstore: null,
    duration: '2025.07 - 2025.09',
    role: 'iOS Developer (Team Project - 6 people / PencilKit drawing system)',
    highlights: [
      'Problem: 8 test users spent 20 minutes understanding routes by switching between average 3 apps (map/memo/schedule) when planning trips.',
      'Action: Implemented direct drawing interaction on maps by combining MapKit + PencilKit (handled PencilKit + MapKit development). Designed StrokeData model for drawing data save/restore. Separated map state/schedule/bookmarks with MVVM architecture, achieved multi-device sync with Firebase Firestore integration.',
      'Result: 60% reduction in route planning time for test users (20min → 8min). 90% satisfaction with "intuitive planning while viewing map". Secured complex domain (map, drawing, schedule) state management and Firebase integration experience.'
    ]
  },
];


export const techStackIcons = {
  'SwiftUI': '🍎',
  'UIKit': '📱',
  'React': '⚛️',
  'Vue.js': '💚',
  'JavaScript': '💛',
  'TypeScript': '🔷',
  'Next.js': '⚫',
  'Tailwind CSS': '🎨',
  'Firebase': '🔥',
  'MapKit': '🗺️',
  'HealthKit': '❤️',
  'CoreData': '💾',
  'Node.js': '💚',
  'Express': '🚂',
  'MongoDB': '🍃',
  'Swift': '🧡',
  'Xcode': '🔨'
};