import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
      resources:{
          en: {
              translations: {
                "Overview": "Overview",
                "Weekly Sales": "Weekly Sales",
                "Increased by": "Increased by",
                "Decreased by": "Decreased by",
                "Weekly Orders": "Weekly Orders",
                "Visitors Online": "Visitors Online",
                "Visit And Sales Statistics": "Visit And Sales Statistics",
                "CHN": "CHN",
                "USA": "USA",
                "UK": "UK",
                "Search Engines": "Search Engines",
                "Direct Click": "Direct Click",
                "Bookmarks Click": "Bookmarks Click",
                "Recent Tickets": "Recent Tickets",
                "Assignee": "Assignee",
                "Subject": "Subject",
                "Status": "Status",
                "Last Update": "Last Update",
                "Tracking ID": "Tracking ID",
                "Fund is not recieved": "Fund is not recieved",
                "DONE": "DONE",
                "Dec": "Dec",
                "Stella Johnson": "Stella Johnson",
                "High loading time": "High loading time",
                "PROGRESS": "PROGRESS",
                "Marina Michel": "Marina Michel",
                "Website down for one week": "Website down for one week",
                "ON HOLD": "ON HOLD",
                "John Doe": "John Doe",
                "Loosing control on server": "Loosing control on server",
                "REJECTED": "REJECTED",
                "Recent Updates": "Recent Updates",
                "October": "October",
                "School Website": "School Website",
                "Authentication Module": "Authentication Module",
                "It is a long established fact that a reader will be distracted by the readable content of a page": "It is a long established fact that a reader will be distracted by the readable content of a page",
                "Project Status": "Project Status",
                "Name": "Name",
                "Due Date": "Due Date",
                "Progress": "Progress",
                "Herman Beck": "Herman Beck",
                "May": "May",
                "Messsy Adam": "Messsy Adam",
                "Jul": "Jul",
                "John Richards": "John Richards",
                "Apr": "Apr",
                "Peter Meggik": "Peter Meggik",
                "Edward": "Edward",
                "Ronald": "Ronald",
                "Add": "Add",
                "jack Menqu": "jack Menqu",
                "Traffic Sources": "Traffic Sources",
                "Main": "Main",
                "Dashboard": "Dashboard",
                "Widgets": "Widgets",
                "UI Elements": "UI Elements",
                "UI Features": "UI Features",
                "Basic UI Elements": "Basic UI Elements",
                "Accordions": "Accordions",
                "Buttons": "Buttons",
                "Badges": "Badges",
                "Breadcrumbs": "Breadcrumbs",
                "Form Elements": "Form Elements",
                "Data Representation": "Data Representation",
                "Dropdowns": "Dropdowns",
                "Modals": "Modals",
                "Progress bar": "Progress bar",
                "Pagination": "Pagination",
                "Tabs": "Tabs",
                "Typography": "Typography",
                "Tooltips": "Tooltips",
                "Advanced UI": "Advanced UI",
                "Clipboard": "Clipboard",
                "Context menu": "Context menu",
                "Sliders": "Sliders",
                "Carousel": "Carousel",
                "Loaders": "Loaders",
                "Form elements": "Form elements",
                "Basic Elements": "Basic Elements",
                "Advanced Elements": "Advanced Elements",
                "Validation": "Validation",
                "Wizard": "Wizard",
                "Editors": "Editors",
                "Text Editor": "Text Editor",
                "Code Editor": "Code Editor",
                "Charts": "Charts",
                "Tables": "Tables",
                "Basic Table": "Basic Table",
                "Data Table": "Data Table",
                "Sortable Table": "Sortable Table",
                "Popups": "Popups",
                "Notifications": "Notifications",
                "Icons": "Icons",
                "Maps": "Maps",
                "Sample Pages": "Sample Pages",
                "User Pages": "User Pages",
                "User Listing": "User Listing",
                "Login": "Login",
                "Login 2": "Login 2",
                "Register": "Register",
                "Register 2": "Register 2",
                "Lockscreen": "Lockscreen",
                "Error Pages": "Error Pages",
                "General Pages": "General Pages",
                "Blank Page": "Blank Page",
                "Profile": "Profile",
                "FAQ": "FAQ",
                "FAQ 2": "FAQ 2",
                "News Grid": "News Grid",
                "Timeline": "Timeline",
                "Search Results": "Search Results",
                "Chats": "Chats",
                "Tickets": "Tickets",
                "Gallery": "Gallery",
                "Todo List": "Todo List",
                "E-commerce": "E-commerce",
                "Invoice": "Invoice",
                "Pricing": "Pricing",
                "Apps": "Apps",
                "E-mail": "E-mail",
                "Kanban Board": "Kanban Board",
                "Calendar": "Calendar",
                "Help": "Help",
                "Documentation": "Documentation",
                "Project Manager": "Project Manager",
                "Take Tour": "Take Tour",
                "Log Out": "Log Out",
                "Gold Member": "Gold Member",
                "Tree View": "Tree View",
                "Landing Page": "Landing Page",
                "Product Catalogue": "Product Catalogue",
                "Project List": "Project List",
                "Orders": "Orders",
                "Navigation": "Navigation",
                "Account settings": "Account settings",
                "Change Password": "Change Password",
                "To-do list": "To-do list",
                "Richard V.Welsh": "Richard V.Welsh",
                "Manager": "Manager",
                "New Project": "New Project",
                "Reports": "Reports",
                "PDF": "PDF",
                "doc": "doc",
                "Projects": "Projects",
                "View Project": "View Project",
                "Edit Project": "Edit Project",
                "English": "English",
                "Arabic": "Arabic",
                "User Options": "User Options",
                "Actions": "Actions",
                "Lock Account": "Lock Account",
                "Messages": "Messages",
                "Mark send you a message": "Mark send you a message",
                "Minutes ago": "Minutes ago",
                "Cregh send you a message": "Cregh send you a message",
                "Profile picture updated": "Profile picture updated",
                "Update dashboard": "Update dashboard",
                "new messages": "new messages",
                "Event today": "Event today",
                "Just a reminder that you have an event today": "Just a reminder that you have an event today",
                "Launch Admin": "Launch Admin",
                "New admin wow": "New admin wow",
                "See all notifications": "See all notifications",
                "Inbox": "Inbox",
                "All rights reserved": "All rights reserved",
                "Hand-crafted": "Hand-crafted",
                "made with": "made with",
                "Copyright": "Copyright",
                "Settings": "Settings",
                "Advanced settings": "Advanced settings",
                "Create New Project": "Create New Project",
                "Software Development": "Software Development",
                "UI Development": "UI Development",
                "Software Testing": "Software Testing",
                "See all projects": "See all projects",
                "Manage Accounts": "Manage Accounts",
                "Check Inbox": "Check Inbox",
                "Sign Out": "Sign Out",
                "Score": "Score",
                "Schedule": "Schedule",
                "New": "New",
                "You have": "You have",
                "Application Error": "Application Error",
                "Just now": "Just now",
                "View all": "View all",
                "Private message": "Private message",
                "New user registration": "New user registration",
                "days ago": "days ago",
                "unread mails": "unread mails",
                "Marian Garner": "Marian Garner",
                "The meeting is cancelled": "The meeting is cancelled",
                "Travis Jenkins": "Travis Jenkins",
                "new notifications": "new notifications",
                "Activity Log": "Activity Log",
                "Signout": "Signout",
                "Creating component page": "Creating component page",
                "build a js based app": "build a js based app",
                "Meeting with Alisa": "Meeting with Alisa",
                "Call Sarah Graves": "Call Sarah Graves",
                "FRIENDS": "FRIENDS",
                "See All": "See All",
                "Thomas Douglas": "Thomas Douglas",
                "Available": "Available",
                "Catherine": "Catherine",
                "min": "min",
                "Daniel Russell": "Daniel Russell",
                "James Richardson": "James Richardson",
                "Madeline Kennedy": "Madeline Kennedy",
                "Sarah Graves": "Sarah Graves",
                "Feb": "Feb",
                "Away": "Away"
              }
          },
          ar: {
              translations: {
                "Overview":   "نظرة عامة",
                "Weekly Sales":   "المبيعات الأسبوعية",
                "Increased by":   "زيادة بمعدل",
                "Decreased by":   "انخفضت من قبل",
                "Weekly Orders":   "الطلبات الأسبوعية",
                "Visitors Online":   "الزوار على الانترنت",
                "Visit And Sales Statistics":   "إحصائيات الزيارة والمبيعات",
                "CHN":   "كوشين",
                "USA":   "الولايات المتحدة الامريكيه",
                "UK":   "المملكة المتحدة",
                "Search Engines":   "محركات البحث",
                "Direct Click":   "انقر مباشرة",
                "Bookmarks Click":   "الإشارات المرجعية انقر",
                "Recent Tickets":   "التذاكر الحديثة",
                "Assignee":   "تعيين",
                "Subject":   "موضوع",
                "Status":   "قضية",
                "Last Update":   "آخر تحديث",
                "Tracking ID":   "تتبع الهوية",
                "Fund is not recieved":   "لم يتم تلقي مربع",
                "DONE":   "هو فعل",
                "Dec":   "ديسمبر",
                "Stella Johnson":   "ستيلا جونسون",
                "High loading time":   "ارتفاع وقت التحميل",
                "PROGRESS":   "تقدم",
                "Marina Michel":   "مارينا ميشيل",
                "Website down for one week":   "الموقع لأسفل لمدة أسبوع واحد",
                "ON HOLD":   "أنا منتظر",
                "John Doe":   "فلان الفلاني",
                "Loosing control on server":   "فقدان تحكم الخادم",
                "REJECTED":   "غير مقبول",
                "Recent Updates":   "التحديثات الأخيرة",
                "October":   "شهر اكتوبر",
                "School Website":   "موقع المدرسة",
                "Authentication Module":   "وحدة المصادقة",
                "It is a long established fact that a reader will be distracted by the readable content of a page":   "إنها حقيقة ثابتة منذ فترة طويلة وهي أن القراء سوف يصرفهم المحتوى المقروء للصفحة",
                "Project Status":   "حالة المشروع",
                "Name":   "نون",
                "Due Date":   "تاريخ الاستحقاق",
                "Progress":   "تقدم",
                "Herman Beck":   "هيرمان بيك",
                "May":   "مايو",
                "Messsy Adam":   "آدم فوضوي",
                "Jul":   "يوليو",
                "John Richards":   "جون ريتشاردز",
                "Apr":   "أبريل",
                "Peter Meggik":   "بيتر ميجيك",
                "Edward":   "إدوارد",
                "Ronald":   "رونالد",
                "Add":   "حفظ",
                "jack Menqu":"جاك مينكو",
                "Traffic Sources":"مصادر حركة المرور",
                

                "Main":                         "الرئيسي",
                "Dashboard":                    "لوحة القيادة",
                "Widgets":                      "الحاجيات",
                "UI Elements":                  "عناصر واجهة المستخدم",
                "UI Features":                  "ميزات واجهة المستخدم",
                "Basic UI Elements":            "العناصر الأساسية",
                "Accordions":                   "أكورديون",
                "Buttons":                      "زر",
                "Badges":                       "شارات",
                "Breadcrumbs":                  "فتات الخبز",
                "Form Elements":                        "نماذج",
                "Data Representation":          "شرح البيانات",
                "Dropdowns":                    "قائِمة مُنْسَدِلة",
                "Modals":                       "الحوار",
                "Progress bar":                 "شريط التقدم",
                "Pagination":                   "ترقيم الصفحات",
                "Tabs":                         "علامات التبويب",
                "Typography":                   "الاسلوب والظهور",
                "Tooltips":                     "تلميح",
                "Advanced UI":                  "واجهة المستخدم المتقدمة",
                "Clipboard":                    "الحافظة",
                "Context menu":                 "قائمة السياق",
                "Sliders":                      "الانزلاق",
                "Carousel":                     "دائري",
                "Loaders":                      "رافعاتs",
                "Form elements":                "نماذج",
                "Basic Elements":               "عناصر النموذج",
                "Advanced Elements":            "العناصر المتقدمة",
                "Validation":                   "التحقق من صحة",
                "Wizard":                       "ساحر",
                "Editors":                      "المحررين",
                "Text Editor":                 "محرري النصوص",
                "Code Editor":                 "محرري الكود",
                "Charts":                       "الرسوم البيانية",
                "Tables":                       "الطاولةs",
                "Basic Table":                  "الجداول الأساسية",
                "Data Table":                   "جداول البيانات",
                "Sortable Table": "جدول قابل للفرز",
                "Popups":                       "يظهر فجأةs",
                "Notifications":                "إخطاراتs",
                "Icons":                        "الرموز",
                "Maps":                         "خرائط",
                "Sample Pages":                  "صفحات عينة",
                "User Pages":                   "صفحات المستخدم",
                "User Listing": "قائمة المستخدم",
                "Login":                        "تسجيل الدخول",
                "Login 2":                      " تسجيل الدخول 2 ",
                "Register":                     "سجل",
                "Register 2":                   " سجل 2 ",
                "Lockscreen":                   " قفل الشاشة ",
                "Error Pages":                  "صفحات خطأ",
                "General Pages":                "الصفحات العامة",
                "Blank Page":                   " صفحة فارغة ",
                "Profile":                      "الملف الشخصي ",
                "FAQ":"تعليمات",  
                "FAQ 2":                        " أسئلة مكررة 2 ",
                "News Grid":                    " شبكة الأخبار ",
                "Timeline":                     " الجدول الزمني ",
                "Search Results":               " نتائج البحث ",
                "Chats":                         " دردشة",
                "Tickets":                      " تذاكر ",
                "Gallery":                      " صالة عرض",
                "Todo List":                    "قوائم المهام",
                "E-commerce":                   "التجارة الإلكترونية",
                "Invoice":                      " فاتورة ",
                "Pricing":                " جدول التسعير ",
                "Apps":                 "تطبيقات",
                "E-mail":                       "البريد الإلكتروني",
                "Kanban Board" :"كانبان بورد",
                "Calendar":                     "التقويم",
                "Help":                         "مساعدة",
                "Documentation":                "توثيق",
                "Project Manager":"مدير المشروع",
                "Take Tour":                    "خذ جولة",
                "Log Out":                      "تسجيل خروج",
                "Gold Member": "عضو ذهبي",
                "Tree View":"عرض الشجرة",
                "Landing Page":"الصفحة المقصودة",
                "Product Catalogue":"بيان المنتج",
                "Project List":"قائمة المشروع",
                "Orders": "طلب",
                "Navigation":"قائمة طعام",
                "Account settings": "إعدادت الحساب",
                "Change Password":"تغيير كلمة السر",
                "To-do list":"حضر قائمة",
                "Richard V.Welsh":"ريتشارد ف. ولش",
                "Manager":"مدير",
                "New Project":"مشروع جديد",


                "Reports":"تقارير",
                "PDF":"بي دي إف",
                "doc":"وثيقة",
                "Projects":"وثيقة",
                "View Project":"عرض المشاريع",
                "Edit Project":"تحرير المشاريع",
                "English":"الإنجليزية",
                "Arabic":"عربى",
                "User Options":"خيارات المستخدم",
                "Actions":"عمل",
                "Lock Account":"قفل الحساب",
                "Messages":"رسائل",
                "Mark send you a message":"مارك يرسل لك رسالة",
                "Minutes ago":"منذ 1 دقيقة",
                "Cregh send you a message":"إنشاء نرسل لك رسالة",
                "Profile picture updated":"تحديث صورة ملفك الشخصي",
                "Update dashboard" : "تحديث لوحة القيادة",
                "new messages":"4 رسائل جديدة",
                "Event today":"حدث اليوم",
                "Just a reminder that you have an event today":"مجرد تذكير بأن لديك حدث اليوم",
                "Launch Admin":"تشغيل المسؤول",
                "New admin wow":"مشرف جديد واو!",
                "See all notifications":"اطلع على جميع الإشعارات",
                "Inbox" : "صندوق الوارد",
                "All rights reserved":"كل الحقوق محفوظة",
                "Hand-crafted":"الحرف اليدوية",
                "made with":"مصنوع من",
                "Copyright":"حقوق التأليف والنشر",
                "Settings":"الإعدادات",
                "Advanced settings":"إعدادات متقدمة",
                "Create New Project":"إنشاء مشروع جديد",
                "Software Development": "تطوير البرمجيات",
                "UI Development": "تطوير واجهة المستخدم",
                "Software Testing":"اختبار البرمجيات",
                "See all projects": "رؤية جميع المشاريع",
                "Manage Accounts":"ادارة الحساب",
                "Check Inbox":"تحقق من بريدك الوارد",
                "Sign Out":"خروج",
                "Score":"أحرز هدفا",
                "Schedule" : "الطاولة",
                "New": "جديد",
                "You have":"عندك",
                "Application Error": "خطأ في تطبيق",
                "Just now":"الان فقط",
                "View all": "عرض الكل",
                "Private message":"رسالة خاصة",
                "New user registration":"تسجيل مستخدم جديد",
                "days ago":"أيام مضت",
                "unread mails":"رسائل غير مقروءة",
                "Marian Garner":"ماريان غارنر",
                "The meeting is cancelled":"تم الغاء الاجتماع",
                "Travis Jenkins":"ترافيس جنكينز",
                "new notifications":"إخطارات جديدة",
                "Activity Log":"سجل الأنشطة",
                "Signout":"خروج",

                "Creating component page":"إنشاء صفحة المكون",
                "build a js based app":"بناء التطبيق على أساس JS",
                "Meeting with Alisa":"مقابلة مع اليسا",
                "Call Sarah Graves":"استدعاء سارة القبور",
                "FRIENDS":"اصحاب",
                "See All":"عرض الكل",
                "Thomas Douglas":"توماس دوغلاس",
                "Available":"متاح",
                "Catherine":"كاثرين",
                "min":"دقيق",
                "Daniel Russell":"دانيال راسل",
                "James Richardson":"جيمس ريتشاردسون",
                "Madeline Kennedy":"مادلين كينيدي",
                "Sarah Graves":"مقابر سارة",
                "Feb": "شهر فبراير"

            }
          }
      },
      fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;