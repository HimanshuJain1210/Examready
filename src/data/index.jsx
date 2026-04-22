// ─── EXAM DATES 2025 ─────────────────────────────────────────────────────────
export const EXAM_DATES = [
  // JEE MAIN
  { exam:"JEE Main", session:"Session 1 Registration", date:"Nov 2024", status:"done", type:"registration", color:"#6366f1" },
  { exam:"JEE Main", session:"Session 1 Exam", date:"22 Jan – 31 Jan 2025", status:"done", type:"exam", color:"#6366f1" },
  { exam:"JEE Main", session:"Session 1 Result", date:"Feb 2025", status:"done", type:"result", color:"#6366f1" },
  { exam:"JEE Main", session:"Session 2 Registration", date:"Feb – Mar 2025", status:"done", type:"registration", color:"#6366f1" },
  { exam:"JEE Main", session:"Session 2 Exam", date:"1 Apr – 8 Apr 2025", status:"upcoming", type:"exam", color:"#6366f1" },
  { exam:"JEE Main", session:"Session 2 Result", date:"Apr 2025", status:"upcoming", type:"result", color:"#6366f1" },
  // JEE ADVANCED
  { exam:"JEE Advanced", session:"Registration Opens", date:"Apr 2025", status:"upcoming", type:"registration", color:"#f59e0b" },
  { exam:"JEE Advanced", session:"Exam Date", date:"18 May 2025", status:"upcoming", type:"exam", color:"#f59e0b" },
  { exam:"JEE Advanced", session:"Result", date:"Jun 2025", status:"upcoming", type:"result", color:"#f59e0b" },
  // BITSAT
  { exam:"BITSAT", session:"Registration", date:"Jan – Apr 2025", status:"upcoming", type:"registration", color:"#10b981" },
  { exam:"BITSAT", session:"Exam (Phase 1)", date:"20 May – 26 May 2025", status:"upcoming", type:"exam", color:"#10b981" },
  { exam:"BITSAT", session:"Exam (Phase 2)", date:"22 Jun – 26 Jun 2025", status:"upcoming", type:"exam", color:"#10b981" },
  { exam:"BITSAT", session:"Admissions Begin", date:"Jul 2025", status:"upcoming", type:"admission", color:"#10b981" },
  // VITEEE
  { exam:"VITEEE", session:"Registration", date:"Nov 2024 – Mar 2025", status:"done", type:"registration", color:"#ec4899" },
  { exam:"VITEEE", session:"Exam", date:"21 Apr – 27 Apr 2025", status:"upcoming", type:"exam", color:"#ec4899" },
  { exam:"VITEEE", session:"Result & Counselling", date:"May 2025", status:"upcoming", type:"result", color:"#ec4899" },
  // WBJEE
  { exam:"WBJEE", session:"Registration", date:"Dec 2024 – Jan 2025", status:"done", type:"registration", color:"#14b8a6" },
  { exam:"WBJEE", session:"Exam", date:"27 Apr 2025", status:"upcoming", type:"exam", color:"#14b8a6" },
  { exam:"WBJEE", session:"Result", date:"Jun 2025", status:"upcoming", type:"result", color:"#14b8a6" },
  { exam:"WBJEE", session:"Counselling", date:"Jul 2025", status:"upcoming", type:"admission", color:"#14b8a6" },
  // COMEDK
  { exam:"COMEDK", session:"Registration", date:"Feb – Apr 2025", status:"upcoming", type:"registration", color:"#f97316" },
  { exam:"COMEDK", session:"Exam", date:"11 May 2025", status:"upcoming", type:"exam", color:"#f97316" },
  { exam:"COMEDK", session:"Result", date:"May 2025", status:"upcoming", type:"result", color:"#f97316" },
  { exam:"COMEDK", session:"Counselling Round 1", date:"Jun 2025", status:"upcoming", type:"admission", color:"#f97316" },
  // MHT-CET
  { exam:"MHT-CET", session:"Registration", date:"Jan – Mar 2025", status:"done", type:"registration", color:"#8b5cf6" },
  { exam:"MHT-CET", session:"PCM Exam", date:"April 2025", status:"upcoming", type:"exam", color:"#8b5cf6" },
  { exam:"MHT-CET", session:"Result", date:"Jun 2025", status:"upcoming", type:"result", color:"#8b5cf6" },
];

// ─── COLLEGES DATA ────────────────────────────────────────────────────────────
export const COLLEGES = [
  // IITs
  {
    name: "IIT Bombay", short:"IITB", city:"Mumbai", state:"Maharashtra", type:"IIT",
    exam:"JEE Advanced", rating:5, nirf:3, fees:"~₹2.2L/yr",
    established:1958, accreditation:"NAAC A++",
    highlights:["#3 in NIRF 2024","Top placements avg ₹21 LPA","Strong research culture"],
    branches:[
      { name:"Computer Science", openRank:1, closeRank:67, category:"General" },
      { name:"Electrical Engineering", openRank:68, closeRank:400, category:"General" },
      { name:"Mechanical Engineering", openRank:401, closeRank:900, category:"General" },
      { name:"Chemical Engineering", openRank:800, closeRank:1400, category:"General" },
    ],
    admissionCriteria:"JEE Advanced rank. Must qualify JEE Main for JEE Advanced eligibility. Min 75% in Class 12 (65% for SC/ST).",
    website:"https://www.iitb.ac.in",
    color:"#6366f1",
  },
  {
    name: "IIT Delhi", short:"IITD", city:"New Delhi", state:"Delhi", type:"IIT",
    exam:"JEE Advanced", rating:5, nirf:2, fees:"~₹2.2L/yr",
    established:1961, accreditation:"NAAC A++",
    highlights:["#2 in NIRF 2024","Best placement record","Located in capital"],
    branches:[
      { name:"Computer Science", openRank:1, closeRank:60, category:"General" },
      { name:"Electrical Engineering", openRank:55, closeRank:380, category:"General" },
      { name:"Civil Engineering", openRank:500, closeRank:1100, category:"General" },
    ],
    admissionCriteria:"JEE Advanced rank. Min 75% in Class 12. Category relaxation applicable.",
    website:"https://home.iitd.ac.in",
    color:"#6366f1",
  },
  {
    name: "IIT Madras", short:"IITM", city:"Chennai", state:"Tamil Nadu", type:"IIT",
    exam:"JEE Advanced", rating:5, nirf:1, fees:"~₹2.2L/yr",
    established:1959, accreditation:"NAAC A++",
    highlights:["#1 in NIRF 2024","Largest IIT campus","Excellent research output"],
    branches:[
      { name:"Computer Science", openRank:52, closeRank:125, category:"General" },
      { name:"Electrical Engineering", openRank:110, closeRank:480, category:"General" },
      { name:"Aerospace Engineering", openRank:400, closeRank:900, category:"General" },
    ],
    admissionCriteria:"JEE Advanced rank. Min 75% in Class 12. Home state quota applies.",
    website:"https://www.iitm.ac.in",
    color:"#6366f1",
  },
  {
    name: "IIT Kharagpur", short:"IITKgp", city:"Kharagpur", state:"West Bengal", type:"IIT",
    exam:"JEE Advanced", rating:5, nirf:5, fees:"~₹1.4L/yr",
    established:1951, accreditation:"NAAC A++",
    highlights:["Oldest IIT","500+ acre campus","Strong alumni network"],
    branches:[
      { name:"Computer Science", openRank:100, closeRank:280, category:"General" },
      { name:"Electronics & Electrical", openRank:280, closeRank:700, category:"General" },
      { name:"Mining Engineering", openRank:2000, closeRank:5000, category:"General" },
    ],
    admissionCriteria:"JEE Advanced rank. Min 75% in Class 12.",
    website:"https://www.iitkgp.ac.in",
    color:"#6366f1",
  },
  // NITs
  {
    name: "NIT Trichy", short:"NITT", city:"Tiruchirappalli", state:"Tamil Nadu", type:"NIT",
    exam:"JEE Main", rating:4.5, nirf:9, fees:"~₹1.5L/yr",
    established:1964, accreditation:"NAAC A++",
    highlights:["Top NIT in South India","Excellent placements","Strong alumni"],
    branches:[
      { name:"Computer Science (HS)", openRank:1200, closeRank:4500, category:"General-HS" },
      { name:"Computer Science (OS)", openRank:100, closeRank:2000, category:"General-OS" },
      { name:"Electronics (OS)", openRank:2000, closeRank:6000, category:"General-OS" },
      { name:"Mechanical (OS)", openRank:5000, closeRank:12000, category:"General-OS" },
    ],
    admissionCriteria:"JEE Main CRL/Category rank. 50% seats for Home State (HS), 50% for Other State (OS). Min 75% in Class 12.",
    website:"https://www.nitt.edu",
    color:"#10b981",
  },
  {
    name: "NIT Warangal", short:"NITW", city:"Warangal", state:"Telangana", type:"NIT",
    exam:"JEE Main", rating:4.5, nirf:28, fees:"~₹1.4L/yr",
    established:1959, accreditation:"NAAC A+",
    highlights:["Strong CS & ECE dept","Good placement record","Research-focused"],
    branches:[
      { name:"Computer Science (OS)", openRank:300, closeRank:4800, category:"General-OS" },
      { name:"Electronics (OS)", openRank:3000, closeRank:8000, category:"General-OS" },
      { name:"Civil (OS)", openRank:10000, closeRank:22000, category:"General-OS" },
    ],
    admissionCriteria:"JEE Main rank via JoSAA counselling. Min 75% in Class 12.",
    website:"https://www.nitw.ac.in",
    color:"#10b981",
  },
  // BITS
  {
    name: "BITS Pilani", short:"BITS-P", city:"Pilani", state:"Rajasthan", type:"Deemed",
    exam:"BITSAT", rating:5, nirf:27, fees:"~₹5.5L/yr",
    established:1964, accreditation:"NAAC A",
    highlights:["No donation/management quota","Dual degree option","Industry-linked curriculum"],
    branches:[
      { name:"Computer Science", openScore:380, closeScore:430, category:"BITSAT Score" },
      { name:"Electronics & Instrumentation", openScore:350, closeScore:380, category:"BITSAT Score" },
      { name:"Mechanical Engineering", openScore:310, closeScore:345, category:"BITSAT Score" },
      { name:"Chemical Engineering", openScore:290, closeScore:320, category:"BITSAT Score" },
    ],
    admissionCriteria:"BITSAT score (out of 450). No counselling — direct admission based on merit. Min 75% PCM in Class 12.",
    website:"https://www.bits-pilani.ac.in",
    color:"#f59e0b",
    scoreType:"score",
  },
  {
    name: "BITS Goa", short:"BITS-G", city:"Goa", state:"Goa", type:"Deemed",
    exam:"BITSAT", rating:4.5, nirf:null, fees:"~₹5.2L/yr",
    established:2004, accreditation:"NAAC A",
    highlights:["Beach campus","Same curriculum as Pilani","Strong placement"],
    branches:[
      { name:"Computer Science", openScore:350, closeScore:380, category:"BITSAT Score" },
      { name:"Electronics", openScore:330, closeScore:355, category:"BITSAT Score" },
      { name:"Mechanical Engineering", openScore:290, closeScore:315, category:"BITSAT Score" },
    ],
    admissionCriteria:"BITSAT score. Students choose campus preference after exam. Min 75% PCM in Class 12.",
    website:"https://www.bits-pilani.ac.in/goa",
    color:"#f59e0b",
    scoreType:"score",
  },
  {
    name: "BITS Hyderabad", short:"BITS-H", city:"Hyderabad", state:"Telangana", type:"Deemed",
    exam:"BITSAT", rating:4.5, nirf:null, fees:"~₹5.2L/yr",
    established:2008, accreditation:"NAAC A",
    highlights:["Fastest growing BITS campus","Excellent industry connects","Modern infrastructure"],
    branches:[
      { name:"Computer Science", openScore:345, closeScore:375, category:"BITSAT Score" },
      { name:"Electronics", openScore:320, closeScore:348, category:"BITSAT Score" },
      { name:"Civil Engineering", openScore:260, closeScore:285, category:"BITSAT Score" },
    ],
    admissionCriteria:"BITSAT score. Min 75% PCM in Class 12.",
    website:"https://www.bits-pilani.ac.in/hyderabad",
    color:"#f59e0b",
    scoreType:"score",
  },
  // VIT
  {
    name: "VIT Vellore", short:"VIT-V", city:"Vellore", state:"Tamil Nadu", type:"Deemed",
    exam:"VITEEE", rating:4, nirf:11, fees:"~₹2.0L/yr",
    established:1984, accreditation:"NAAC A++",
    highlights:["100% campus placement drive","50,000+ students","Strong international MoUs"],
    branches:[
      { name:"Computer Science", openRank:1, closeRank:5000, category:"General" },
      { name:"CSE (AI & ML)", openRank:5001, closeRank:15000, category:"General" },
      { name:"Electronics", openRank:15000, closeRank:35000, category:"General" },
      { name:"Mechanical", openRank:35000, closeRank:80000, category:"General" },
    ],
    admissionCriteria:"VITEEE rank or direct admission based on Class 12 marks if exam not taken. Min 60% in PCM.",
    website:"https://vit.ac.in",
    color:"#ec4899",
  },
  {
    name: "VIT Chennai", short:"VIT-C", city:"Chennai", state:"Tamil Nadu", type:"Deemed",
    exam:"VITEEE", rating:4, nirf:null, fees:"~₹2.0L/yr",
    established:2010, accreditation:"NAAC A++",
    highlights:["City campus advantage","Same curriculum as Vellore","Growing industry ties"],
    branches:[
      { name:"Computer Science", openRank:5000, closeRank:18000, category:"General" },
      { name:"Electronics", openRank:20000, closeRank:45000, category:"General" },
    ],
    admissionCriteria:"VITEEE rank. Min 60% in PCM.",
    website:"https://chennai.vit.ac.in",
    color:"#ec4899",
  },
  // WBJEE Colleges
  {
    name: "Jadavpur University", short:"JU", city:"Kolkata", state:"West Bengal", type:"State University",
    exam:"WBJEE", rating:4.5, nirf:17, fees:"~₹20K/yr",
    established:1955, accreditation:"NAAC A++",
    highlights:["Lowest fees for quality","Strong research tradition","Excellent alumni"],
    branches:[
      { name:"Computer Science", openRank:1, closeRank:180, category:"General-WB" },
      { name:"Electronics", openRank:150, closeRank:500, category:"General-WB" },
      { name:"Mechanical", openRank:450, closeRank:900, category:"General-WB" },
      { name:"Civil Engineering", openRank:800, closeRank:1500, category:"General-WB" },
    ],
    admissionCriteria:"WBJEE rank. West Bengal domicile preferred. Min 45% in PCM for General.",
    website:"https://jadavpuruniversity.in",
    color:"#14b8a6",
  },
  {
    name: "IIEST Shibpur", short:"IIEST", city:"Howrah", state:"West Bengal", type:"Deemed (Central)",
    exam:"WBJEE + JEE Main", rating:4, nirf:null, fees:"~₹1.2L/yr",
    established:1856, accreditation:"NAAC A",
    highlights:["Oldest engineering college in Asia","Heritage campus","Affordable fees"],
    branches:[
      { name:"Computer Science (WBJEE)", openRank:200, closeRank:800, category:"General-WB" },
      { name:"Electronics (WBJEE)", openRank:700, closeRank:2000, category:"General-WB" },
    ],
    admissionCriteria:"Seats via WBJEE (state quota) and JEE Main (central quota). Min 60% in PCM.",
    website:"https://www.iiest.ac.in",
    color:"#14b8a6",
  },
  // COMEDK
  {
    name: "RV College of Engineering", short:"RVCE", city:"Bangalore", state:"Karnataka", type:"Private",
    exam:"COMEDK / JEE Main", rating:4.5, nirf:null, fees:"~₹1.9L/yr",
    established:1963, accreditation:"NAAC A+",
    highlights:["Top private college in Karnataka","Excellent Bangalore placements","Strong industry connect"],
    branches:[
      { name:"Computer Science (COMEDK)", openRank:1, closeRank:500, category:"General" },
      { name:"Electronics (COMEDK)", openRank:400, closeRank:1500, category:"General" },
      { name:"Mechanical (COMEDK)", openRank:1200, closeRank:4000, category:"General" },
    ],
    admissionCriteria:"COMEDK rank or JEE Main score. Management/NRI quota seats available. Min 45% PCM.",
    website:"https://www.rvce.edu.in",
    color:"#f97316",
  },
  {
    name: "BMS College of Engineering", short:"BMSCE", city:"Bangalore", state:"Karnataka", type:"Private",
    exam:"COMEDK / JEE Main", rating:4, nirf:null, fees:"~₹1.8L/yr",
    established:1946, accreditation:"NAAC A+",
    highlights:["One of oldest in Karnataka","Central Bangalore location","Good placement history"],
    branches:[
      { name:"Computer Science (COMEDK)", openRank:500, closeRank:1800, category:"General" },
      { name:"Electronics (COMEDK)", openRank:1500, closeRank:4500, category:"General" },
    ],
    admissionCriteria:"COMEDK rank. Min 45% PCM for General category.",
    website:"https://bmsce.ac.in",
    color:"#f97316",
  },
];

// ─── NEWS CATEGORIES ──────────────────────────────────────────────────────────
export const NEWS_CATEGORIES = [
  { id:"jee",     label:"JEE Main & Advanced", icon:"⚡", color:"#6366f1", query:"JEE Main Advanced 2025 exam date result admission" },
  { id:"bitsat",  label:"BITSAT",              icon:"🎯", color:"#f59e0b", query:"BITSAT 2025 BITS Pilani admission exam" },
  { id:"viteee",  label:"VITEEE",              icon:"🌟", color:"#ec4899", query:"VITEEE VIT 2025 exam admission result" },
  { id:"wbjee",   label:"WBJEE",               icon:"🔵", color:"#14b8a6", query:"WBJEE 2025 West Bengal engineering exam" },
  { id:"comedk",  label:"COMEDK",              icon:"🏛️", color:"#f97316", query:"COMEDK 2025 Karnataka engineering exam" },
  { id:"josaa",   label:"JoSAA / Counselling", icon:"📋", color:"#8b5cf6", query:"JoSAA counselling 2025 IIT NIT IIIT seat allotment" },
  { id:"all",     label:"All Exam News",       icon:"📰", color:"#64748b", query:"JEE BITSAT VITEEE WBJEE engineering entrance exam 2025 India" },
];

// ─── STAR RATING HELPER ───────────────────────────────────────────────────────
export function Stars({ rating }) {
  return (
    <span>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.floor(rating) ? "#f59e0b" : i - 0.5 <= rating ? "#f59e0b" : "#374151", fontSize:"13px" }}>
          {i <= Math.floor(rating) ? "★" : i - 0.5 <= rating ? "★" : "☆"}
        </span>
      ))}
      <span style={{ fontSize:"12px", color:"#9ca3af", marginLeft:"4px" }}>{rating}/5</span>
    </span>
  );
}
