import React, { useState } from "react";
import Header from "../../components/Common/Header";
import Sidebar from "../DashboardSubsections/Sidebar";
import DashboardPage from "../DashboardSubsections/Member/Dashboard";
import MembersPage from "../DashboardSubsections/Member/Member";
import StorePage from "../DashboardSubsections/Member/Store";
import ProducePage from "../DashboardSubsections/Member/Produce";
import ServicesPage from "../DashboardSubsections/Member/Services";
import IssueBoxPage from "../DashboardSubsections/Member/IssueBox";
import ReportsPage from "../DashboardSubsections/Member/Reports";
import Inventory from "../DashboardSubsections/Member/Inventory";

const CEODashboard = ({ onSwitchRole }) => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-50">
      <Header onSwitchRole={onSwitchRole} />

      <div className="flex">
        {/* Sidebar Navigation */}
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

        {/* Main Content */}
        <main className="ml-64 flex-1">
          <div className="p-3 max-w-7xl">
            {/* DASHBOARD PAGE */}
            {currentPage === "dashboard" && <DashboardPage />}
            {/* MEMBERS PAGE */}
            {currentPage === "members" && <MembersPage />}
            {/* CAPACITY HUB PAGE */}
            {currentPage === "inventory" && <Inventory />}
            {/* STORE PAGE */}
            {currentPage === "store" && <StorePage />}
            {/* PRODUCE PAGE */}
            {currentPage === "produce" && <ProducePage />}
            {/* SERVICES PAGE */}
            {currentPage === "services" && <ServicesPage />}
            {/* ISSUE BOX PAGE */}
            {currentPage === "issuebox" && <IssueBoxPage />}
            {/* main content mein */}
            {currentPage === "reports" && <ReportsPage />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CEODashboard;

// import React, { useState } from "react";
// import Header from "../../components/Common/Header";
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import {
//   Users,
//   TrendingUp,
//   AlertCircle,
//   CheckCircle,
//   Clock,
//   Target,
//   Home,
//   BarChart3,
//   FileText,
//   ChevronRight,
//   Download,
//   Calendar,
//   Activity,
//   IndianRupee,
//   Shield,
// } from "lucide-react";

// const DashboardView = () => {
//   const salesData = [
//     { month: "Jan", sales: 20, target: 18, profit: 5 },
//     { month: "Feb", sales: 22, target: 18, profit: 5.5 },
//     { month: "Mar", sales: 25, target: 20, profit: 7 },
//     { month: "Apr", sales: 21, target: 20, profit: 6 },
//     { month: "May", sales: 24, target: 22, profit: 6.8 },
//     { month: "Jun", sales: 28, target: 22, profit: 8 },
//   ];

//   const memberData = [
//     { name: "Active", value: 142, color: "#10b981" },
//     { name: "Inactive", value: 8, color: "#ef4444" },
//   ];

//   const kpis = [
//     {
//       title: "Total Members",
//       value: "150",
//       change: "+10 (↑6.7%)",
//       icon: Users,
//       color: "blue",
//     },
//     {
//       title: "Monthly Sales",
//       value: "₹25 Lakh",
//       change: "+₹3L (↑15%)",
//       icon: TrendingUp,
//       color: "green",
//     },
//     {
//       title: "Monthly Profit",
//       value: "₹2.5 Lakh",
//       change: "+₹500K (↑25%)",
//       icon: BarChart3,
//       color: "purple",
//     },
//     {
//       title: "Member Income (Avg)",
//       value: "₹42,000",
//       change: "+₹3,300 (↑8.5%)",
//       icon: Target,
//       color: "orange",
//     },
//   ];

//   const pendingItems = [
//     { type: "Member Applications", count: 5, priority: "high" },
//     { type: "Loan Requests", count: 3, priority: "high" },
//     { type: "Purchase Orders", count: 2, priority: "medium" },
//     { type: "Complaints", count: 1, priority: "medium" },
//   ];

//   return (
//     <div>
//       <h1 className="text-4xl font-bold text-slate-900 mb-8">CEO Dashboard 👔</h1>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {kpis.map((kpi, idx) => {
//           const Icon = kpi.icon;
//           const colorClasses = {
//             blue: "from-blue-50 to-blue-100 text-blue-600",
//             green: "from-green-50 to-green-100 text-green-600",
//             purple: "from-purple-50 to-purple-100 text-purple-600",
//             orange: "from-orange-50 to-orange-100 text-orange-600",
//           };
//           return (
//             <div
//               key={idx}
//               className={`bg-gradient-to-br ${colorClasses[kpi.color]} rounded-xl p-6 shadow-lg hover:shadow-xl transition`}
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <h3 className="text-sm font-semibold text-slate-700">{kpi.title}</h3>
//                 <Icon size={24} />
//               </div>
//               <p className="text-2xl font-bold text-slate-900 mb-2">{kpi.value}</p>
//               <p className="text-xs font-medium text-green-600">{kpi.change}</p>
//             </div>
//           );
//         })}
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//         <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
//           <h2 className="text-xl font-bold text-slate-900 mb-6">Sales & Profit Trend</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={salesData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//               <XAxis dataKey="month" stroke="#9ca3af" />
//               <YAxis stroke="#9ca3af" />
//               <Tooltip
//                 contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#fff" }}
//               />
//               <Legend />
//               <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} name="Sales (₹L)" />
//               <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} name="Profit (₹L)" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h2 className="text-xl font-bold text-slate-900 mb-6">Member Status</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie data={memberData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
//                 {memberData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//           <div className="mt-4 space-y-2">
//             {memberData.map((item, idx) => (
//               <div key={idx} className="flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
//                   <span className="text-sm text-slate-600">{item.name}</span>
//                 </div>
//                 <span className="font-bold text-slate-900">{item.value}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-bold text-slate-900">Pending Approvals & Actions</h2>
//           <AlertCircle size={24} className="text-orange-500" />
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {pendingItems.map((item, idx) => (
//             <div
//               key={idx}
//               className={`p-4 rounded-lg border-2 ${item.priority === "high" ? "border-red-300 bg-red-50" : "border-yellow-300 bg-yellow-50"}`}
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="font-semibold text-slate-900 text-sm">{item.type}</h3>
//                 <Clock size={18} className="text-slate-500" />
//               </div>
//               <p className="text-2xl font-bold text-slate-900 mb-3">{item.count}</p>
//               <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
//                 Review & Approve
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-sm font-semibold">Cash Balance</h3>
//             <CheckCircle size={24} />
//           </div>
//           <p className="text-3xl font-bold">₹12.5 Lakh</p>
//           <p className="text-indigo-100 text-sm mt-2">Available</p>
//         </div>
//         <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-sm font-semibold">Pending Payments</h3>
//             <AlertCircle size={24} />
//           </div>
//           <p className="text-3xl font-bold">₹1.2 Lakh</p>
//           <p className="text-red-100 text-sm mt-2">From Members</p>
//         </div>
//         <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-sm font-semibold">Member Satisfaction</h3>
//             <CheckCircle size={24} />
//           </div>
//           <p className="text-3xl font-bold">4.2/5</p>
//           <p className="text-green-100 text-sm mt-2">⭐⭐⭐⭐</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ReportsView = () => {
//   const [activeReport, setActiveReport] = useState(null);

//   const reportSections = [
//     {
//       id: "annex-a",
//       title: "Annex-A: Management Cost Application",
//       subtitle: "Fund claim form — Submit to CBBO / NCDC as needed",
//       icon: IndianRupee,
//       color: "blue",
//       frequency: "As Needed",
//       fields: [
//         "FPO Name & Registration Number",
//         "Complete Address with Email",
//         "Mobile – Chairman / Secretary",
//         "CEO/Manager Name + Date of Appointment",
//         "Accountant Name + Date of Appointment",
//         "Brief Account of FPO's Business",
//         "Total Shareholder Members",
//         "Small / Marginal / Landless Count",
//         "Paid-up Capital (₹)",
//         "Max Shareholding by One Individual (%)",
//         "Bank Name, Account No., IFSC",
//         "Number of Directors + Mode of Board Formation",
//         "Number of Women Directors",
//         "Dates of BOD Meetings (Last Year)",
//         "Member Category Breakdown (SC/ST/Others, M/F)",
//       ],
//     },
//     {
//       id: "annex-d",
//       title: "Annex-D: Expenditure Statement + UC",
//       subtitle: "Submitted every 6 months. FPO fills, CBBO certifies → NCDC/NABARD",
//       icon: BarChart3,
//       color: "green",
//       frequency: "Half-Yearly",
//       fields: [
//         "Salary – CEO/Manager",
//         "Salary – Accountant",
//         "Sub-Total (Salaries)",
//         "Office Rent",
//         "Electricity Charges",
//         "Telephone Charges",
//         "Travel Cost",
//         "Meeting Cost",
//         "Stationery, Cleaning, Misc.",
//         "Sub-Total (Recurring)",
//         "One-time Registration Charges",
//         "One-time Equipment/Furniture",
//         "GRAND TOTAL",
//         "Utilization Certificate (UC) — Signed by CEO / Authorized Director",
//         "CBBO Verification — Signature, Name, Designation, Date, Seal",
//       ],
//     },
//     {
//       id: "annex-b",
//       title: "Annex-B: Board Resolution",
//       subtitle: "FPO Board authorizes fund claims. CBBO checks before disbursement.",
//       icon: Shield,
//       color: "purple",
//       frequency: "Per Claim",
//       fields: [
//         "Place & Date of Board Meeting",
//         "Agenda: FPO Management Cost Period",
//         "FPO Legal Status (formation basis)",
//         "AGM/EGM Date Reference",
//         "Resolution 1: Submit claim to NCDC/IA",
//         "Resolution 2: Funds to be used per Operational Guidelines",
//         "Resolution 3: Accounts of grant to be maintained",
//         "Resolution 4: Expenditure Statement + UC to be submitted on time",
//         "Authorized Signatory (CEO + Chairman — Signed & Sealed)",
//       ],
//     },
//     {
//       id: "monthly-apr",
//       title: "Monthly APR: Activity Performance Report",
//       subtitle: "Submitted monthly by CBBO to NABARD/FDRVC. FPO fills its section.",
//       icon: Activity,
//       color: "orange",
//       frequency: "Monthly",
//       fields: [
//         "Month, CBBO Name, FPO Name",
//         "District, Block, Cluster",
//         "Activity Log: BOD Meeting (Date, Venue, Participants, Outcome)",
//         "Activity Log: FIG Meeting",
//         "Activity Log: Market Linkage Visit",
//         "Activity Log: Input Supply Activity",
//         "Activity Log: Farmer Training",
//         "Members Added + Total Members",
//         "Share Capital Collected (₹)",
//         "Procurement Volume (Quintals)",
//         "Sales Revenue (₹)",
//         "NPMA Portal Updated: Yes / No",
//         "Prepared by CBBO Rep (Signature + Date)",
//         "FPO CEO Signature",
//       ],
//     },
//     {
//       id: "timeline",
//       title: "Reporting Timeline Summary",
//       subtitle: "Overview of all reporting frequencies and deadlines",
//       icon: Calendar,
//       color: "teal",
//       frequency: "Reference",
//       timeline: [
//         { freq: "Monthly", items: ["Activity Performance Report (APR) to CBBO", "NPMA Portal data entry"] },
//         { freq: "Quarterly", items: ["BOD Meeting minutes", "Business performance review"] },
//         { freq: "Half-Yearly", items: ["Expenditure Statement + UC to CBBO", "CBBO reports to FDRVC"] },
//         { freq: "Annually", items: ["Audited Accounts + Annual Return (ROC)", "AGM conducted & documented", "Business Plan review & update"] },
//         { freq: "One-Time (Yr 1)", items: ["Registration documents", "Baseline survey", "Initial business plan submission"] },
//       ],
//     },
//   ];

//   const colorMap = {
//     blue: { card: "border-blue-200 bg-blue-50", badge: "bg-blue-100 text-blue-700", icon: "text-blue-600", btn: "bg-blue-600 hover:bg-blue-700" },
//     green: { card: "border-green-200 bg-green-50", badge: "bg-green-100 text-green-700", icon: "text-green-600", btn: "bg-green-600 hover:bg-green-700" },
//     purple: { card: "border-purple-200 bg-purple-50", badge: "bg-purple-100 text-purple-700", icon: "text-purple-600", btn: "bg-purple-600 hover:bg-purple-700" },
//     orange: { card: "border-orange-200 bg-orange-50", badge: "bg-orange-100 text-orange-700", icon: "text-orange-600", btn: "bg-orange-600 hover:bg-orange-700" },
//     teal: { card: "border-teal-200 bg-teal-50", badge: "bg-teal-100 text-teal-700", icon: "text-teal-600", btn: "bg-teal-600 hover:bg-teal-700" },
//   };

//   if (activeReport) {
//     const report = reportSections.find((r) => r.id === activeReport);
//     const c = colorMap[report.color];
//     const Icon = report.icon;

//     return (
//       <div>
//         <button
//           onClick={() => setActiveReport(null)}
//           className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-6 transition"
//         >
//           <ChevronRight size={18} className="rotate-180" />
//           <span className="font-medium">Back to Reports</span>
//         </button>

//         <div className={`rounded-xl border-2 ${c.card} p-6 mb-6`}>
//           <div className="flex items-start justify-between mb-2">
//             <div className="flex items-center space-x-3">
//               <Icon size={28} className={c.icon} />
//               <div>
//                 <h2 className="text-2xl font-bold text-slate-900">{report.title}</h2>
//                 <p className="text-slate-600 mt-1">{report.subtitle}</p>
//               </div>
//             </div>
//             <span className={`px-3 py-1 rounded-full text-xs font-semibold ${c.badge}`}>
//               {report.frequency}
//             </span>
//           </div>
//         </div>

//         {report.timeline ? (
//           <div className="space-y-4">
//             {report.timeline.map((t, i) => (
//               <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
//                 <div className="flex items-center space-x-3 mb-3">
//                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${c.badge}`}>{t.freq}</span>
//                 </div>
//                 <ul className="space-y-2">
//                   {t.items.map((item, j) => (
//                     <li key={j} className="flex items-center space-x-2 text-sm text-slate-700">
//                       <CheckCircle size={15} className={c.icon} />
//                       <span>{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <h3 className="font-semibold text-slate-700 mb-4 text-sm uppercase tracking-wide">
//               Required Data Fields ({report.fields.length})
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               {report.fields.map((field, i) => (
//                 <div key={i} className="flex items-start space-x-2 text-sm text-slate-700">
//                   <span className={`mt-0.5 font-bold text-xs ${c.icon} min-w-[20px]`}>{i + 1}.</span>
//                   <span>{field}</span>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-6 pt-4 border-t border-gray-100 flex space-x-3">
//               <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition ${c.btn}`}>
//                 <Download size={15} />
//                 <span>Generate PDF</span>
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1 className="text-4xl font-bold text-slate-900 mb-2">Reports</h1>
//       <p className="text-slate-500 mb-8">FPO Reporting — NABARD / CBBO / NCDC Compliance</p>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {reportSections.map((report) => {
//           const c = colorMap[report.color];
//           const Icon = report.icon;
//           return (
//             <div
//               key={report.id}
//               onClick={() => setActiveReport(report.id)}
//               className={`border-2 ${c.card} rounded-xl p-6 cursor-pointer hover:shadow-md transition group`}
//             >
//               <div className="flex items-start justify-between mb-3">
//                 <Icon size={24} className={c.icon} />
//                 <span className={`px-3 py-1 rounded-full text-xs font-semibold ${c.badge}`}>
//                   {report.frequency}
//                 </span>
//               </div>
//               <h3 className="font-bold text-slate-900 text-base mb-1">{report.title}</h3>
//               <p className="text-slate-500 text-sm mb-4">{report.subtitle}</p>
//               <div className="flex items-center text-sm font-medium text-slate-600 group-hover:text-slate-900 transition">
//                 <span>View Details</span>
//                 <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// const DocumentsView = () => {
//   const docs = [
//     { name: "Annex-A — Management Cost Application.pdf", date: "Mar 2025", size: "245 KB", status: "Submitted" },
//     { name: "Annex-D — Expenditure Statement H1.pdf", date: "Oct 2024", size: "312 KB", status: "Approved" },
//     { name: "Board Resolution — Fund Claim.pdf", date: "Feb 2025", size: "128 KB", status: "Pending" },
//     { name: "Monthly APR — Feb 2025.pdf", date: "Mar 2025", size: "189 KB", status: "Submitted" },
//     { name: "Audited Accounts FY 2023-24.pdf", date: "Sep 2024", size: "1.2 MB", status: "Approved" },
//     { name: "Business Plan 2024-25.pdf", date: "Apr 2024", size: "560 KB", status: "Approved" },
//   ];

//   const statusColor = {
//     Submitted: "bg-blue-100 text-blue-700",
//     Approved: "bg-green-100 text-green-700",
//     Pending: "bg-yellow-100 text-yellow-700",
//   };

//   return (
//     <div>
//       <h1 className="text-4xl font-bold text-slate-900 mb-2">Documents</h1>
//       <p className="text-slate-500 mb-8">All FPO compliance documents</p>

//       <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//         <div className="divide-y divide-gray-100">
//           {docs.map((doc, i) => (
//             <div key={i} className="flex items-center justify-between p-5 hover:bg-slate-50 transition">
//               <div className="flex items-center space-x-4">
//                 <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
//                   <FileText size={20} className="text-red-500" />
//                 </div>
//                 <div>
//                   <p className="font-medium text-slate-900 text-sm">{doc.name}</p>
//                   <p className="text-xs text-slate-400 mt-0.5">{doc.date} · {doc.size}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[doc.status]}`}>
//                   {doc.status}
//                 </span>
//                 <button className="p-2 hover:bg-slate-100 rounded-lg transition">
//                   <Download size={16} className="text-slate-500" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const CEODashboard = ({ onSwitchRole }) => {
//   const [activePage, setActivePage] = useState("dashboard");

//   const navItems = [
//     { id: "dashboard", icon: Home, label: "Dashboard" },
//     { id: "reports", icon: BarChart3, label: "Reports" },
//     { id: "documents", icon: FileText, label: "Documents" },
//   ];

//   const renderPage = () => {
//     switch (activePage) {
//       case "dashboard": return <DashboardView />;
//       case "reports": return <ReportsView />;
//       case "documents": return <DocumentsView />;
//       default: return <DashboardView />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
//       <Header onSwitchRole={onSwitchRole} />

//       <div className="flex">
//         <aside className="w-64 bg-white h-[calc(100vh-64px)] fixed left-0 top-16 shadow-lg border-r border-gray-100">
//           <nav className="p-6 space-y-3">
//             {navItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => setActivePage(item.id)}
//                 className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all ${
//                   activePage === item.id
//                     ? "bg-emerald-50 text-emerald-700"
//                     : "text-gray-700 hover:bg-green-50 hover:text-emerald-600"
//                 }`}
//               >
//                 <item.icon
//                   size={20}
//                   className={activePage === item.id ? "text-emerald-600" : "text-gray-600"}
//                 />
//                 <span className={`font-medium text-sm ${activePage === item.id ? "text-emerald-700" : ""}`}>
//                   {item.label}
//                 </span>
//               </button>
//             ))}
//           </nav>
//         </aside>

//         <main className="ml-64 flex-1">
//           <div className="p-8 max-w-7xl">
//             {renderPage()}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default CEODashboard;
