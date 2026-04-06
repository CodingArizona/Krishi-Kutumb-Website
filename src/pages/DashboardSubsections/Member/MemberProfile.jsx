import React, { useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Tractor,
  PackageCheck,
  PackageOpen,
  Map,
  PawPrint,
  Boxes,
  Briefcase,
  Wrench,
  FileText,
  Phone,
  MapPin,
  UserCheck,
  CalendarDays,
  User,
  ClipboardCheck,
  ClipboardX,
  Download,
  Printer,
  X,
  CheckCircle2,
  XCircle,
  Building2,
  Hash,
} from "lucide-react";

const TABS = [
  { id: "farms", label: "Farms", icon: Tractor },
  { id: "collection", label: "Collection", icon: PackageCheck },
  { id: "distribution", label: "Distribution", icon: PackageOpen },
  { id: "land", label: "Land Record", icon: Map },
  { id: "livestock", label: "Live Stock", icon: PawPrint },
  { id: "assets", label: "Assets", icon: Boxes },
  { id: "business", label: "Business", icon: Briefcase },
  { id: "services", label: "Services", icon: Wrench },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "profile", label: "Profile", icon: User },
];

// ─── Report Modal ────────────────────────────────────────────────────────────
const ReportModal = ({ member, onClose }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const content = printRef.current.innerHTML;
    const win = window.open("", "_blank");
    win.document.write(`
      <html><head><title>Member Report - ${member.name}</title>
      <style>
        body { font-family: Georgia, serif; padding: 40px; color: #1e293b; }
        h1 { font-size: 22px; border-bottom: 2px solid #059669; padding-bottom: 8px; margin-bottom: 20px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .field { margin-bottom: 10px; }
        .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; }
        .value { font-size: 14px; font-weight: 600; color: #0f172a; margin-top: 2px; }
        .badge { display: inline-block; padding: 2px 10px; border-radius: 99px; font-size: 12px; font-weight: 700; }
        .badge-done { background: #d1fae5; color: #065f46; }
        .badge-pending { background: #fee2e2; color: #991b1b; }
        .badge-active { background: #dcfce7; color: #166534; }
        .section { margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; }
        .footer { margin-top: 40px; font-size: 11px; color: #94a3b8; text-align: center; }
      </style></head><body>${content}
      <div class="footer">Generated on ${new Date().toLocaleString("en-IN")} &bull; FPO Management System</div>
      </body></html>`);
    win.document.close();
    win.print();
  };

  const surveyDone = member.surveyDone ?? false;
  const reportDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit", month: "long", year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-emerald-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center">
              <FileText size={18} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base leading-tight">Member Report</h2>
              <p className="text-xs text-slate-400">{reportDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              <Printer size={14} />
              Print / Download
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="overflow-y-auto flex-1 p-6" ref={printRef}>
          {/* Report Title */}
          <h1 className="text-xl font-bold text-slate-900 border-b-2 border-emerald-500 pb-3 mb-5">
            Member Report — {member.name}
          </h1>

          {/* Personal Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Full Name", value: member.name, icon: User },
              { label: "Member ID", value: member.id || "—", icon: Hash },
              { label: "Phone", value: member.phone || "—", icon: Phone },
              { label: "Village", value: member.village || "—", icon: MapPin },
              { label: "Managed By", value: member.managedBy || "—", icon: UserCheck },
              { label: "Join Date", value: member.joinDate || "—", icon: CalendarDays },
              { label: "Organisation", value: member.org || "—", icon: Building2 },
              { label: "Type", value: member.typeSecondary || "—", icon: Briefcase },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon size={12} className="text-emerald-500" />
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</span>
                </div>
                <p className="text-sm font-semibold text-slate-800">{value}</p>
              </div>
            ))}
          </div>

          {/* Status Section */}
          <div className="mt-5 grid grid-cols-2 gap-4">
            {/* Member Status */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Member Status</p>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${
                member.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500"
              }`}>
                {member.status === "Active"
                  ? <CheckCircle2 size={14} />
                  : <XCircle size={14} />}
                {member.status || "Unknown"}
              </span>
            </div>

            {/* Survey Status */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Survey Status</p>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${
                surveyDone
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-600"
              }`}>
                {surveyDone
                  ? <><ClipboardCheck size={14} /> Survey Done</>
                  : <><ClipboardX size={14} /> Survey Pending</>}
              </span>
            </div>
          </div>

          {/* Summary Note */}
          <div className="mt-5 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-1">Summary</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {member.name} is {member.status === "Active" ? "an active" : "an inactive"} member
              {member.village ? ` from ${member.village}` : ""}{member.managedBy ? `, managed by ${member.managedBy}` : ""}.
              Survey is currently <strong>{surveyDone ? "completed" : "pending"}</strong>.
              {member.joinDate ? ` Joined on ${member.joinDate}.` : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const MemberProfile = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("farms");
  const [showReport, setShowReport] = useState(false);

  const member = state?.member;
  const landData = state?.landData || [];

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-100">
        <p className="text-slate-600">Member data not found.</p>
      </div>
    );
  }

  const surveyDone = member.surveyDone ?? false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-100">
      {/* Report Modal */}
      {showReport && (
        <ReportModal member={member} onClose={() => setShowReport(false)} />
      )}

      {/* Top Bar */}
      <div className="px-6 pt-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-medium transition-colors text-sm"
        >
          <ArrowLeft size={18} />
          Back to Members
        </button>

        {/* Report Button */}
        <button
          onClick={() => setShowReport(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <Download size={15} />
          Generate Report
        </button>
      </div>

      {/* Profile Header Card */}
      <div className="px-6 py-5">
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden">
          {/* Green accent strip */}
          <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-emerald-600 to-teal-500" />

          <div className="p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-2xl border-4 border-emerald-100 shadow-md object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl border-4 border-emerald-100 shadow-md bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
                  <User size={38} className="text-emerald-400" />
                </div>
              )}
              {/* Online/Status dot */}
              <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white shadow-sm ${
                member.status === "Active" ? "bg-green-400" : "bg-slate-300"
              }`} />
            </div>

            <div className="flex-1 text-center md:text-left min-w-0">
              <h1 className="text-2xl font-bold text-slate-900 leading-tight">{member.name}</h1>

              {/* Badges Row */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2 mb-3">
                {member.typeSecondary && (
                  <span className="px-3 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100">
                    {member.typeSecondary}
                  </span>
                )}
                {member.status && (
                  <span className={`px-3 py-0.5 text-xs font-bold rounded-full border ${
                    member.status === "Active"
                      ? "bg-green-50 text-green-700 border-green-100"
                      : "bg-slate-50 text-slate-500 border-slate-200"
                  }`}>
                    {member.status}
                  </span>
                )}

                {/* ── Survey Status Badge ── */}
                <span className={`flex items-center gap-1.5 px-3 py-0.5 text-xs font-bold rounded-full border ${
                  surveyDone
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                    : "bg-red-50 text-red-600 border-red-100"
                }`}>
                  {surveyDone
                    ? <><ClipboardCheck size={11} /> Survey Done</>
                    : <><ClipboardX size={11} /> Survey Pending</>}
                </span>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-1.5 text-sm text-slate-500">
                {member.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone size={13} className="text-emerald-500" />
                    {member.phone}
                  </span>
                )}
                {member.village && (
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-emerald-500" />
                    {member.village}
                  </span>
                )}
                {member.managedBy && (
                  <span className="flex items-center gap-1.5">
                    <UserCheck size={13} className="text-emerald-500" />
                    {member.managedBy}
                  </span>
                )}
                {member.joinDate && (
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={13} className="text-emerald-500" />
                    {member.joinDate}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6">
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all border ${
                activeTab === id
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                  : "bg-white text-slate-500 border-slate-200 hover:border-emerald-300 hover:text-emerald-600"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-6 py-5">
        <div className="bg-white rounded-2xl shadow-md border border-emerald-100 min-h-64 flex items-center justify-center">
          {(() => {
            const tab = TABS.find((t) => t.id === activeTab);
            const Icon = tab?.icon;
            return (
              <div className="text-center text-slate-300 py-16">
                {Icon && <Icon size={48} className="mx-auto mb-3 opacity-40" />}
                <p className="text-lg font-bold text-slate-400">{tab?.label}</p>
                <p className="text-sm mt-1 text-slate-300">Data coming soon...</p>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;