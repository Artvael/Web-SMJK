// Authentic Data for FORM 6 @ SMJK CHUNG HWA, KELANTAN (PETINAM)
// Verified with historical records of SMJK Chung Hwa Kota Bharu (DEB1139, Est. 1918)

export const schoolInfo = {
  name: "FORM 6 @ SMJK CHUNG HWA",
  stateName: "KELANTAN",
  chineseName: "吉蘭丹中華國民型中學 • 大學先修班",
  shortChineseName: "吉兰丹中华华中",
  motto: "Your Voice. Your Future. Our Journey.",
  schoolTagline: "Sekolah Menengah Jenis Kebangsaan Cina Tertua di Kelantan (Sejak 1918)",
  councilName: "PETINAM (Persatuan Tingkatan Enam SMJK Chung Hwa Kelantan)",
  academicYear: "2026 / 2027",
  stpmCountdownDate: "2026-11-15T08:00:00",
  establishedYear: 1918,
  schoolCode: "DEB1139",
  address: "Jalan Atas Banggol, 15300 Kota Bharu, Kelantan Darul Naim",
  phone: "+60 9-744 2086",
  fax: "+60 9-747 3495",
  logoUrl: "/smjk-chung-hwa-kelantan-logo.png",
};

export const FORM_6_CLASSES = [
  "Lower 6 Science Biology (L6SB)",
  "Lower 6 Science Physics (L6SP)",
  "Lower Six Arts 1 (L6A1)",
  "Lower Six Arts 2 (L6A2)",
  "Lower 6 Arts 3 (L6A3)",
  "Upper 6 Science Biology (U6SB)",
  "Upper 6 Science Physics (U6SP)",
  "Upper Six Arts 1 (U6A1)",
  "Upper Six Arts 2 (U6A2)",
  "Upper 6 Arts 3 (U6A3)",
  "General Form 6 Student"
];

export const SHORT_CLASSES = [
  "L6SB",
  "L6SP",
  "L6A1",
  "L6A2",
  "L6A3",
  "U6SB",
  "U6SP",
  "U6A1",
  "U6A2",
  "U6A3"
];

export const weeklyActivities = [
  {
    id: "w1",
    day: "Monday",
    date: "Sep 08",
    title: "MUET Speaking Intensive Workshop (Lower 6)",
    time: "02:00 PM - 03:30 PM",
    venue: "Bilik Gerakan Tingkatan 6, SMJK Chung Hwa",
    category: "Academic",
    badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
    isUrgent: false,
  },
  {
    id: "w2",
    day: "Wednesday",
    date: "Sep 10",
    title: "Chemistry Lab Practicals & Extra Coaching",
    time: "03:00 PM - 04:30 PM",
    venue: "Makmal Kimia 2",
    category: "Important",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    isUrgent: true,
  },
  {
    id: "w3",
    day: "Thursday",
    date: "Sep 11",
    title: "PETINAM High Committee Meeting",
    time: "01:30 PM - 02:30 PM",
    venue: "Bilik Majlis PETINAM",
    category: "Meeting",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    isUrgent: false,
  },
  {
    id: "w4",
    day: "Friday",
    date: "Sep 12",
    title: "Kelantan State Debate Championship Selection",
    time: "02:30 PM - 05:00 PM",
    venue: "Dewan Sekolah Chung Hwa",
    category: "Competition",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    isUrgent: true,
  },
];

export const announcements = [
  {
    id: "ann-1",
    type: "IMPORTANT",
    categoryColor: "bg-rose-50 text-rose-700 border-rose-200",
    tag: "📢 PENTING",
    title: "Chemistry Tuition Rescheduled to Wednesday 3:00 PM",
    content: "Please note that Mr. Tan's Chemistry extra class will be shifted to Wednesday at 3:00 PM in Makmal Kimia 2. Bring your Sem 1 physical chemistry past year booklet.",
    date: "Today, 10:15 AM",
    author: "Mr. Tan (Chemistry Unit)",
    pinned: true,
  },
  {
    id: "ann-2",
    type: "ACADEMIC",
    categoryColor: "bg-blue-50 text-blue-700 border-blue-200",
    tag: "📚 AKADEMIK",
    title: "STPM Semester 1 Examination Timetable Released by MPM",
    content: "Majlis Peperiksaan Malaysia (MPM) has published the official Sem 1 exam timetable. Download the full PDF from our Academic Hub or check the Form 6 notice board.",
    date: "Yesterday",
    author: "Form 6 Administration SMCH",
    pinned: true,
  },
  {
    id: "ann-3",
    type: "COMPETITION",
    categoryColor: "bg-amber-50 text-amber-700 border-amber-200",
    tag: "🏆 PERTANDINGAN",
    title: "Registration for Kelantan State-Level Debate 2026",
    content: "SMJK Chung Hwa is sending teams for the Kelantan State Parliamentary Debate. Auditions take place this Friday at Dewan Sekolah. Alumni debaters will provide training.",
    date: "Sep 05, 2026",
    author: "PETINAM Exco Co-Curriculum",
    pinned: false,
  },
  {
    id: "ann-4",
    type: "PETINAM",
    categoryColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    tag: "👑 DEWAN SISWA",
    title: "PETINAM Chung Hwa Official Batch Polo Pre-Order",
    content: "Official SMJK Chung Hwa Kelantan Form 6 batch hoodies and polo shirts are open for pre-order until next Tuesday. Submit your sizes to your class representatives.",
    date: "Sep 03, 2026",
    author: "Council Treasurer",
    pinned: false,
  },
];

export const academicSubjects = [
  {
    "id": "pa",
    "name": "Pengajian Am",
    "code": "900",
    "badge": "Wajib MPM",
    "tagColor": "bg-[#fde047] text-black border-black",
    "color": "bg-[#fde047]",
    "description": "Kenegaraan, Tadbir Urus Negara, Isu Semasa & Kemahiran Alih Bentuk Komunikasi Graf.",
    "resources": [
      {
        "title": "Nota Lengkap Kenegaraan & Perlembagaan Persekutuan",
        "type": "PDF Note",
        "pages": "48 Pages",
        "downloads": 342,
        "link": "#"
      },
      {
        "title": "Format Esei STPM: Rumusan Format (4+1) & (3+2)",
        "type": "Essay Guide",
        "pages": "12 Pages",
        "downloads": 512,
        "link": "#"
      },
      {
        "title": "Koleksi Soalan Percubaan Kelantan & Negeri 2020-2025",
        "type": "Past Papers",
        "pages": "120 Pages",
        "downloads": 890,
        "link": "#"
      }
    ]
  },
  {
    "id": "pp",
    "name": "Pengajian Perniagaan",
    "code": "946",
    "badge": "Aliran Sastera",
    "tagColor": "bg-[#fed7aa] text-black border-black",
    "color": "bg-[#fed7aa]",
    "description": "Pengurusan Perniagaan, Pemasaran, Kewangan, Sumber Manusia & Operasi Pengeluaran.",
    "resources": [
      {
        "title": "Modul Teori Pengurusan & Kepimpinan Organisasi",
        "type": "PDF Note",
        "pages": "35 Pages",
        "downloads": 240,
        "link": "#"
      },
      {
        "title": "Kajian Kes Perniagaan Sebenar & Skema Jawapan MPM",
        "type": "Case Study",
        "pages": "42 Pages",
        "downloads": 380,
        "link": "#"
      }
    ]
  },
  {
    "id": "sej",
    "name": "Sejarah",
    "code": "940",
    "badge": "Aliran Sastera",
    "tagColor": "bg-[#fbcfe8] text-black border-black",
    "color": "bg-[#fbcfe8]",
    "description": "Sejarah Dunia (1500-1955), Sejarah Islam, Sejarah Asia Tenggara & Pembentukan Malaysia.",
    "resources": [
      {
        "title": "Peta Minda Kronologi Sejarah Dunia & Transformasi Eropah",
        "type": "PDF Note",
        "pages": "30 Pages",
        "downloads": 295,
        "link": "#"
      },
      {
        "title": "Teknik Menjawab Esei Fakta Sejarah STPM Format Baharu",
        "type": "Essay Guide",
        "pages": "18 Pages",
        "downloads": 410,
        "link": "#"
      }
    ]
  },
  {
    "id": "eko",
    "name": "Ekonomi",
    "code": "944",
    "badge": "Aliran Sastera",
    "tagColor": "bg-[#c4b5fd] text-black border-black",
    "color": "bg-[#c4b5fd]",
    "description": "Mikroekonomi, Teori Gelagat Pengguna, Pasaran Struktur & Makroekonomi Negara.",
    "resources": [
      {
        "title": "Himpunan Formula & Graf Utama Mikroekonomi STPM",
        "type": "Formula Sheet",
        "pages": "16 Pages",
        "downloads": 460,
        "link": "#"
      },
      {
        "title": "Koleksi Soalan Kuantitatif & Esei Percubaan STPM",
        "type": "Past Questions",
        "pages": "54 Pages",
        "downloads": 510,
        "link": "#"
      }
    ]
  },
  {
    "id": "matht",
    "name": "Matematik T",
    "code": "954",
    "badge": "Aliran Sains",
    "tagColor": "bg-[#67e8f9] text-black border-black",
    "color": "bg-[#67e8f9]",
    "description": "Functions, Calculus, Trigonometry, Coordinate Geometry, Vectors & Statistics.",
    "resources": [
      {
        "title": "MPM Official Mathematical Formula Booklet & Statistical Tables",
        "type": "Formula Sheet",
        "pages": "8 Pages",
        "downloads": 980,
        "link": "#"
      },
      {
        "title": "Calculus & Vectors: 50 Soalan Percubaan Diselesaikan Langkah Demi Langkah",
        "type": "Worked Solutions",
        "pages": "42 Pages",
        "downloads": 840,
        "link": "#"
      }
    ]
  },
  {
    "id": "mathm",
    "name": "Matematik M",
    "code": "950",
    "badge": "Pengurusan",
    "tagColor": "bg-[#bae6fd] text-black border-black",
    "color": "bg-[#bae6fd]",
    "description": "Algebra, Matriks, Kalkulus Perniagaan, Matematik Kewangan & Analisis Data.",
    "resources": [
      {
        "title": "Nota Lengkap Matriks, Pengaturcaraan Linear & Kewangan",
        "type": "PDF Note",
        "pages": "28 Pages",
        "downloads": 310,
        "link": "#"
      },
      {
        "title": "Bank Soalan Aplikasi Pengurusan Perniagaan STPM",
        "type": "Past Questions",
        "pages": "38 Pages",
        "downloads": 290,
        "link": "#"
      }
    ]
  },
  {
    "id": "bm",
    "name": "Bahasa Melayu",
    "code": "910",
    "badge": "Bahasa",
    "tagColor": "bg-[#fef08a] text-black border-black",
    "color": "bg-[#fef08a]",
    "description": "Morfologi, Sintaksis, Wacana, Retorik, Semantik & Kemahiran Menulis Esei Ilmiah.",
    "resources": [
      {
        "title": "Manual Tatabahasa Dewan Morfologi & Sintaksis STPM",
        "type": "PDF Note",
        "pages": "40 Pages",
        "downloads": 430,
        "link": "#"
      },
      {
        "title": "Koleksi Contoh Esei Tidak Berformat Gred A+ STPM",
        "type": "Essay Guide",
        "pages": "25 Pages",
        "downloads": 550,
        "link": "#"
      }
    ]
  },
  {
    "id": "bc",
    "name": "Bahasa Cina",
    "code": "911",
    "badge": "Bahasa",
    "tagColor": "bg-[#fecdd3] text-black border-black",
    "color": "bg-[#fecdd3]",
    "description": "Tatabahasa Bahasa Cina Klasik, Apresiasi Kesusasteraan, Puisi & Prosa Moden.",
    "resources": [
      {
        "title": "Panduan Analisis Petikan Prosa Klasik & Puisi Dinasti Tang/Song",
        "type": "PDF Note",
        "pages": "32 Pages",
        "downloads": 380,
        "link": "#"
      },
      {
        "title": "Teknik Menjawab Kertas 1 & Kertas 2 Bahasa Cina STPM",
        "type": "Exam Guide",
        "pages": "22 Pages",
        "downloads": 410,
        "link": "#"
      }
    ]
  },
  {
    "id": "kimia",
    "name": "Kimia",
    "code": "962",
    "badge": "Aliran Sains",
    "tagColor": "bg-[#67e8f9] text-black border-black",
    "color": "bg-[#67e8f9]",
    "description": "Physical Chemistry, Inorganic Chemistry, Reaction Kinetics, Equilibria & Organic Chemistry.",
    "resources": [
      {
        "title": "Complete Sem 1 Physical Chemistry Formula & Derivation Sheet",
        "type": "Formula Sheet",
        "pages": "6 Pages",
        "downloads": 670,
        "link": "#"
      },
      {
        "title": "Gas Laws, Thermodynamics & Electrochemistry Summary",
        "type": "PDF Note",
        "pages": "36 Pages",
        "downloads": 410,
        "link": "#"
      },
      {
        "title": "STPM Past 5-Year Chapterwise Drill with Full Solutions",
        "type": "Past Questions",
        "pages": "95 Pages",
        "downloads": 730,
        "link": "#"
      }
    ]
  },
  {
    "id": "fizik",
    "name": "Fizik",
    "code": "960",
    "badge": "Aliran Sains",
    "tagColor": "bg-[#a5f3fc] text-black border-black",
    "color": "bg-[#a5f3fc]",
    "description": "Mechanics, Thermodynamics, Waves, Oscillations, Electric Fields & Modern Physics.",
    "resources": [
      {
        "title": "Ringkasan Hukum Mekanik & Termodinamik STPM",
        "type": "PDF Note",
        "pages": "26 Pages",
        "downloads": 510,
        "link": "#"
      },
      {
        "title": "Lembaran Rumus Rasmi Fizik MPM Beserta Penerangan Pembolehubah",
        "type": "Formula Sheet",
        "pages": "8 Pages",
        "downloads": 620,
        "link": "#"
      }
    ]
  },
  {
    "id": "bio",
    "name": "Biologi",
    "code": "964",
    "badge": "Aliran Sains",
    "tagColor": "bg-[#4ade80] text-black border-black",
    "color": "bg-[#4ade80]",
    "description": "Biochemistry, Cellular Respiration, Genetics, Physiology, Ecology & Biodiversity.",
    "resources": [
      {
        "title": "High-Resolution Anatomical Diagrams & Calvin Cycle Flowchart",
        "type": "Diagrams",
        "pages": "16 Pages",
        "downloads": 520,
        "link": "#"
      },
      {
        "title": "Recombinant DNA Technology & PCR Step-by-Step Breakdown",
        "type": "PDF Note",
        "pages": "22 Pages",
        "downloads": 415,
        "link": "#"
      }
    ]
  },
  {
    "id": "muet",
    "name": "MUET",
    "code": "800",
    "badge": "CEFR C1",
    "tagColor": "bg-[#f472b6] text-black border-black",
    "color": "bg-[#f472b6]",
    "description": "Listening (800/1), Speaking (800/2), Reading (800/3), Writing (800/4).",
    "resources": [
      {
        "title": "Speaking Paper: Band 5+ Individual & Group Discussion Prompts",
        "type": "Speaking Templates",
        "pages": "20 Pages",
        "downloads": 1120,
        "link": "#"
      },
      {
        "title": "Writing Task 1 (Email) & Task 2 (Discursive/Argumentative Essay)",
        "type": "Writing Formats",
        "pages": "28 Pages",
        "downloads": 990,
        "link": "#"
      }
    ]
  }
];

export const calendarEvents = [
  {
    "id": "ev-trial-sem3",
    "title": "Peperiksaan Percubaan STPM Sem 3 (Tingkatan 6 Atas)",
    "date": "27 Sep - 1 Okt 2026",
    "category": "School Exam",
    "badgeClass": "bg-amber-100 text-amber-800 border-amber-300",
    "dotColor": "bg-amber-500",
    "description": "Peperiksaan Percubaan STPM Semester 3 peringkat sekolah SMJK Chung Hwa Kelantan."
  },
  {
    "id": "ev-trial-sem1",
    "title": "Peperiksaan Percubaan STPM Sem 1 (Tingkatan 6 Rendah)",
    "date": "4 Okt - 8 Okt 2026",
    "category": "School Exam",
    "badgeClass": "bg-sky-100 text-sky-800 border-sky-300",
    "dotColor": "bg-sky-500",
    "description": "Peperiksaan Percubaan STPM Semester 1 untuk kohort junior Form 6 SMJK Chung Hwa."
  },
  {
    "id": "ev-1",
    "title": "STPM 2026 Semester 3 Examination Begins (Sebenar)",
    "date": "Nov 16, 2026",
    "category": "STPM Exam",
    "badgeClass": "bg-rose-100 text-rose-800 border-rose-300",
    "dotColor": "bg-rose-500",
    "description": "Official examination conducted nationwide by Majlis Peperiksaan Malaysia (MPM)."
  },
  {
    "id": "ev-3",
    "title": "Chemistry & Physics Coursework (PBS) Deadline",
    "date": "Sep 25, 2026",
    "category": "Deadline",
    "badgeClass": "bg-amber-100 text-amber-800 border-amber-300",
    "dotColor": "bg-amber-500",
    "description": "Final submission of practical experiment reports to teacher."
  },
  {
    "id": "ev-4",
    "title": "PETINAM Student Townhall & Dialogue",
    "date": "Sep 28, 2026",
    "category": "PETINAM",
    "badgeClass": "bg-emerald-100 text-emerald-800 border-emerald-300",
    "dotColor": "bg-emerald-500",
    "description": "Open floor meeting for student suggestions, welfare review, and council updates."
  },
  {
    "id": "ev-5",
    "title": "Mid-Term School Break (Cuti Penggal Persekolahan)",
    "date": "Sep 13 - Sep 21, 2026",
    "category": "Holidays",
    "badgeClass": "bg-purple-100 text-purple-800 border-purple-300",
    "dotColor": "bg-purple-500",
    "description": "Ministry of Education scheduled school holidays."
  },
  {
    "id": "ev-6",
    "title": "Kelantan State Inter-School Robotics Competition",
    "date": "Oct 03, 2026",
    "category": "Competition",
    "badgeClass": "bg-orange-100 text-orange-800 border-orange-300",
    "dotColor": "bg-orange-500",
    "description": "Representing SMJK Chung Hwa Kelantan in state and national robotics."
  }
];

export const petinamTeam = {
  "mission": "Your Voice. Your Future. Our Journey.",
  "description": "PETINAM (Persatuan Tingkatan Enam SMJK Chung Hwa Kelantan) merupakan Majlis Perwakilan Pelajar rasmi Tingkatan 6 yang berdedikasi mewakili suara pelajar, memacu kecemerlangan akademik STPM, dan menyemarakkan komuniti pra-universiti di S.M.C.H. Kota Bharu.",
  "highCommittee": [
    {
      "name": "Vannie Liew",
      "role": "Presiden",
      "roleEn": "President",
      "class": "L6SB",
      "badge": "Council Head",
      "quote": "Menerajui PETINAM dengan integriti, membawa suara dan aspirasi pelajar Tingkatan 6 terus ke pihak pentadbiran sekolah.",
      "avatar": "👩‍💼",
      "isPresident": true,
      "color": "bg-[#fef08a]"
    },
    {
      "name": "Jerry See Khai Chen",
      "role": "Naib Presiden",
      "roleEn": "Vice President",
      "class": "L6A1",
      "badge": "Deputy Head",
      "quote": "Memastikan kebajikan, keselesaan pembelajaran, dan ukhuwah warga Tingkatan 6 sentiasa terpelihara.",
      "avatar": "👨‍💼",
      "isPresident": false,
      "color": "bg-[#bae6fd]"
    },
    {
      "name": "Tan Yon Jian",
      "role": "Setiausaha",
      "roleEn": "Secretary",
      "class": "L6SP",
      "badge": "Documentation",
      "quote": "Pengurusan surat-menyurat telus, minit mesyuarat tersusun, dan penyampaian notis rasmi yang pantas.",
      "avatar": "🧑‍💻",
      "isPresident": false,
      "color": "bg-[#bbf7d0]"
    },
    {
      "name": "Sit Kenneth",
      "role": "Penolong Setiausaha",
      "roleEn": "Asst. Secretary",
      "class": "L6A1",
      "badge": "Archives",
      "quote": "Menyelaras arkib dokumen digital persatuan dan membantu pengurusan pentadbiran harian.",
      "avatar": "📝",
      "isPresident": false,
      "color": "bg-[#fed7aa]"
    },
    {
      "name": "Kor Lewis",
      "role": "Bendahari",
      "roleEn": "Treasurer",
      "class": "L6A3",
      "badge": "Finance Lead",
      "quote": "Pengurusan dana dan perancangan belanjawan yang berhemah demi menyokong setiap program pelajar.",
      "avatar": "💰",
      "isPresident": false,
      "color": "bg-[#e9d5ff]"
    },
    {
      "name": "Joane Theng Zhi En",
      "role": "Penolong Bendahari",
      "roleEn": "Asst. Treasurer",
      "class": "L6SB",
      "badge": "Finance Audit",
      "quote": "Memastikan ketepatan kira-kira kewangan dan ketelusan audit perbelanjaan aktiviti persatuan.",
      "avatar": "📊",
      "isPresident": false,
      "color": "bg-[#fecdd3]"
    }
  ],
  "excoList": [
    {
      "name": "Michelle Tiu Mei Qi",
      "role": "Exco Akademik",
      "class": "L6A3",
      "icon": "📚",
      "color": "bg-[#bae6fd]",
      "desc": "Kecemerlangan STPM, bank soalan ramalan, nota rujukan & bimbingan rakan sebaya."
    },
    {
      "name": "Lee Wen Lin",
      "role": "Exco Kebajikan dan Kerohanian",
      "class": "L6SB",
      "icon": "🤝",
      "color": "bg-[#fef08a]",
      "desc": "Welfare pelajar, bantuan sokongan moral, dan program motivasi kendiri."
    },
    {
      "name": "Lim Quan Qi",
      "role": "Exco Komunikasi dan Media",
      "class": "L6SP",
      "icon": "📣",
      "color": "bg-[#fbcfe8]",
      "desc": "Penerbitan buletin berkala, liputan fotografi & pengurusan saluran media."
    },
    {
      "name": "Phinthra Lee Siew Phing",
      "role": "Exco Kesukarelawan dan Kemasyarakatan",
      "class": "L6SB",
      "icon": "🌱",
      "color": "bg-[#bbf7d0]",
      "desc": "Aktiviti kesukarelawanan, khidmat masyarakat & projek kelestarian sekolah."
    },
    {
      "name": "Lee Jia Xuan",
      "role": "Exco Teknologi dan Inovasi",
      "class": "L6SP",
      "icon": "⚡",
      "color": "bg-[#fed7aa]",
      "desc": "Portal digital Tingkatan 6, inovasi STEM & sokongan teknologi maklumat."
    },
    {
      "name": "Max Ng Juo Yi",
      "role": "Exco Sukan dan Rekreasi",
      "class": "L6SB",
      "icon": "🏆",
      "color": "bg-[#e9d5ff]",
      "desc": "Kejohanan sukan antara kelas, aktiviti riadah sihat & kecergasan fizikal."
    },
    {
      "name": "Ou Guanle",
      "role": "Exco Kebudayaan dan Kesenian",
      "class": "L6A3",
      "icon": "🎨",
      "color": "bg-[#fecdd3]",
      "desc": "Aktiviti silang budaya, persembahan seni tradisi & sambutan perayaan."
    },
    {
      "name": "Tan Ying Xing",
      "role": "Exco Hubungan Luar dan Antarabangsa",
      "class": "L6SP",
      "icon": "🌐",
      "color": "bg-[#c7d2fe]",
      "desc": "Jaringan kerjasama antara sekolah PPD Kota Bharu & pendedahan global."
    }
  ],
  "committee": [
    {
      "name": "Vannie Liew",
      "role": "Presiden",
      "roleEn": "President",
      "class": "L6SB",
      "badge": "Council Head",
      "quote": "Menerajui PETINAM dengan integriti, membawa suara dan aspirasi pelajar Tingkatan 6 terus ke pihak pentadbiran sekolah.",
      "avatar": "👩‍💼",
      "isPresident": true
    },
    {
      "name": "Jerry See Khai Chen",
      "role": "Naib Presiden",
      "roleEn": "Vice President",
      "class": "L6A1",
      "badge": "Deputy Head",
      "quote": "Memastikan kebajikan, keselesaan pembelajaran, dan ukhuwah warga Tingkatan 6 sentiasa terpelihara.",
      "avatar": "👨‍💼"
    },
    {
      "name": "Tan Yon Jian",
      "role": "Setiausaha",
      "roleEn": "Secretary",
      "class": "L6SP",
      "badge": "Documentation",
      "quote": "Pengurusan surat-menyurat telus, minit mesyuarat tersusun, dan penyampaian notis rasmi yang pantas.",
      "avatar": "🧑‍💻"
    },
    {
      "name": "Sit Kenneth",
      "role": "Penolong Setiausaha",
      "roleEn": "Asst. Secretary",
      "class": "L6A1",
      "badge": "Archives",
      "quote": "Menyelaras arkib dokumen digital persatuan dan membantu pengurusan pentadbiran harian.",
      "avatar": "📝"
    },
    {
      "name": "Kor Lewis",
      "role": "Bendahari",
      "roleEn": "Treasurer",
      "class": "L6A3",
      "badge": "Finance Lead",
      "quote": "Pengurusan dana dan perancangan belanjawan yang berhemah demi menyokong setiap program pelajar.",
      "avatar": "💰"
    },
    {
      "name": "Joane Theng Zhi En",
      "role": "Penolong Bendahari",
      "roleEn": "Asst. Treasurer",
      "class": "L6SB",
      "badge": "Finance Audit",
      "quote": "Memastikan ketepatan kira-kira kewangan dan ketelusan audit perbelanjaan aktiviti persatuan.",
      "avatar": "📊"
    }
  ],
  "manifestos": [
    "Digital Resource Centralization: Making all past papers and notes free & 1-click accessible.",
    "Quiet Study Room Initiative: Transforming Bilik 603 into a dedicated after-school study zone.",
    "Direct Feedback Protocol: 48-hour response guarantee for student issues submitted via portal.",
    "Form 6 Mentorship Circle: Connecting Upper 6 high achievers with incoming Lower 6 juniors."
  ]
};

export const seniorAdvice = [
  {
    title: "Things I wish I knew before starting STPM in Chung Hwa",
    author: "Alvin Khor (STPM 2025, CGPA 4.0, Now at UM Medicine)",
    category: "Mindset",
    snippet: "Don't treat STPM like SPM. Consistent 2-hour daily revision beats 20-hour cramming every single time.",
  },
  {
    title: "How to survive Semester 1 & avoid CGPA panic",
    author: "Rachel Wong (STPM 2025, CGPA 3.92, Law at UKM)",
    category: "Strategy",
    snippet: "Semester 1 feels fast and intense. Master Pengajian Am essay formats within the first 3 weeks.",
  },
  {
    title: "How I studied Chemistry without expensive tuition",
    author: "Darren Lim (Chemistry 4.0, Chemical Eng at USM)",
    category: "Chemistry",
    snippet: "Focus on understanding mechanism questions rather than memorizing textbooks word-for-word.",
  },
  {
    title: "MUET Speaking Band 5.0+ Cheat Sheet",
    author: "Sarah Teoh (Band 5.0 in MUET)",
    category: "MUET",
    snippet: "Structure your Part 1 answers using the PEEL method (Point, Explanation, Example, Link).",
  },
];

export const universityCorner = [
  {
    name: "Universiti Malaya (UM)",
    location: "Kuala Lumpur",
    badge: "QS World #60",
    notableCourses: "Medicine, Law, Computer Science, Economics",
    stpmRequirement: "CGPA 3.80 - 4.00 (Competitive faculties)",
  },
  {
    name: "Universiti Sains Malaysia (USM)",
    location: "Penang / Kubang Kerian (Health Campus Kelantan)",
    badge: "APEX University",
    notableCourses: "Pharmacy, Medicine (USM Kubang Kerian), Engineering, Sciences",
    stpmRequirement: "CGPA 3.50 - 4.00",
  },
  {
    name: "Universiti Kebangsaan Malaysia (UKM)",
    location: "Bangi, Selangor",
    badge: "Research University",
    notableCourses: "Health Sciences, Accountancy, Political Science",
    stpmRequirement: "CGPA 3.30 - 3.90",
  },
  {
    name: "Universiti Putra Malaysia (UPM)",
    location: "Serdang, Selangor",
    badge: "Top Agriculture & Vet",
    notableCourses: "Veterinary, Biotechnology, Software Eng, Agribusiness",
    stpmRequirement: "CGPA 3.40 - 3.95",
  },
];

export const contactsList = [
  {
    title: "Form 6 Senior Assistant (PK Tingkatan 6)",
    person: "Pn. Tan Siew Hwa",
    contact: "pkform6@smjkchunghwaktn.edu.my",
    office: "Pejabat Pentadbiran Tingkatan 6 (Aras 2)",
    type: "Admin",
  },
  {
    title: "Bimbingan & Kaunseling (BK)",
    person: "Guru Kaunseling SMJK Chung Hwa",
    contact: "kaunseling@smjkchunghwaktn.edu.my",
    office: "Bilik Kaunseling Blok B",
    type: "Counselling",
  },
  {
    title: "PETINAM Official Helpdesk",
    person: "Majlis Tertinggi PETINAM 2026/27",
    contact: "petinam@smjkchunghwaktn.edu.my",
    office: "Bilik Majlis Pelajar Tingkatan 6",
    type: "Student Body",
  },
  {
    title: "School Library & Pusat Sumber",
    person: "Guru Perpustakaan Sekolah",
    contact: "library@smjkchunghwaktn.edu.my",
    office: "Pusat Sumber Sekolah",
    type: "Library",
  },
];
