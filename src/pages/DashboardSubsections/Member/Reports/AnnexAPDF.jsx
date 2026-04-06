import React from "react";
import { FileText } from "lucide-react";

// ─── Fields ───────────────────────────────────────────────────────────────────
const FIELDS = [
  "FPO Name & Registration Number",
  "Complete Address with Email",
  "Mobile – Chairman / Secretary",
  "CEO/Manager Name + Date of Appointment",
  "Accountant Name + Date of Appointment",
  "Brief Account of FPO's Business",
  "Total Shareholder Members",
  "Small / Marginal / Landless Count",
  "Paid-up Capital (₹)",
  "Max Shareholding by One Individual (%)",
  "Bank Name, Account No., IFSC",
  "Number of Directors + Mode of Board Formation",
  "Number of Women Directors",
  "Dates of BOD Meetings (Last Year)",
  "Member Category Breakdown (SC/ST/Others, M/F)",
];

// ─── HTML Builder ─────────────────────────────────────────────────────────────
function buildAnnexA() {
  return `<div style="font-family:Arial,sans-serif;font-size:12px;color:#111;max-width:700px;margin:auto;padding:32px;">
    <div style="text-align:center;margin-bottom:24px;">
      <div style="font-size:15px;font-weight:bold;">APPLICATION FOR FPO MANAGEMENT COST</div>
      <div style="font-size:12px;">Under 10,000 FPOs Scheme</div>
      <div style="margin-top:8px;font-size:11px;">To, The Managing Director, NCDC / Implementing Agency</div>
      <div style="font-size:11px;">Date: ___________</div>
    </div>

    <div style="font-weight:bold;margin-bottom:8px;border-bottom:1px solid #333;padding-bottom:4px;">Section 1 — FPO Basic Details</div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
      <tr style="background:#e8f0fe;">
        <th style="border:1px solid #aaa;padding:6px 8px;width:40px;">Sl.</th>
        <th style="border:1px solid #aaa;padding:6px 8px;">Particulars</th>
        <th style="border:1px solid #aaa;padding:6px 8px;">Details</th>
      </tr>
      ${[
        "Name of FPO",
        "Complete Address (with Email)",
        "Mobile Number of Chairman / Secretary",
        "Registration Number",
        "Date of Registration",
        "Name of CEO/Manager + Date of Appointment",
        "Name of Accountant + Date of Appointment",
        "Brief Account of FPO's Business",
        "Total Shareholder Members",
        "Small / Marginal / Landless Shareholders",
        "Paid-up Capital (₹)",
        "Max Shareholding by One Individual (%)",
        "Bank Name",
        "Account Number",
        "Branch & IFSC Code",
        "Number of Directors (with briefs)",
        "Mode of Board Formation",
        "Number of Women Directors",
        "Dates of Board Meetings held last year",
      ]
        .map(
          (item, i) =>
            `<tr><td style="border:1px solid #aaa;padding:5px 8px;text-align:center;">${i + 1}</td>
             <td style="border:1px solid #aaa;padding:5px 8px;">${item}</td>
             <td style="border:1px solid #aaa;padding:5px 8px;">&nbsp;</td></tr>`,
        )
        .join("")}
    </table>

    <div style="font-weight:bold;margin-bottom:8px;border-bottom:1px solid #333;padding-bottom:4px;">Section 2 — Member Category Breakdown</div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:32px;">
      <tr style="background:#e8f0fe;">
        <th style="border:1px solid #aaa;padding:6px 8px;">Category</th>
        <th style="border:1px solid #aaa;padding:6px 8px;">SC (M/F)</th>
        <th style="border:1px solid #aaa;padding:6px 8px;">ST (M/F)</th>
        <th style="border:1px solid #aaa;padding:6px 8px;">Others (M/F)</th>
        <th style="border:1px solid #aaa;padding:6px 8px;">Total</th>
      </tr>
      ${["Small", "Marginal", "Tenant", "Other", "Total"]
        .map(
          (cat) =>
            `<tr><td style="border:1px solid #aaa;padding:5px 8px;font-weight:${cat === "Total" ? "bold" : "normal"}">${cat}</td>
             <td style="border:1px solid #aaa;padding:5px 8px;">&nbsp;</td>
             <td style="border:1px solid #aaa;padding:5px 8px;">&nbsp;</td>
             <td style="border:1px solid #aaa;padding:5px 8px;">&nbsp;</td>
             <td style="border:1px solid #aaa;padding:5px 8px;">&nbsp;</td></tr>`,
        )
        .join("")}
    </table>

    <div style="margin-top:40px;display:flex;justify-content:space-between;">
      <div>Date: ___________</div>
      <div style="text-align:center;">Signature of CEO<br/>Name: ___________<br/>Seal:</div>
      <div style="text-align:center;">Signature of Chairman<br/>Name: ___________<br/>Seal:</div>
    </div>
  </div>`;
}

function openPrintWindow(html) {
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
  if (win) win.onafterprint = () => URL.revokeObjectURL(url);
}

// ─── Component ────────────────────────────────────────────────────────────────
const AnnexAPDF = ({ c }) => {
  const handleGenerate = () => {
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
      <title>Annex-A: Management Cost Application</title>
      <style>@media print{body{margin:0;}}</style>
      </head><body>${buildAnnexA()}
      <script>window.onload=function(){window.print()};<\/script>
      </body></html>`;
    openPrintWindow(html);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="font-semibold text-slate-700 mb-4 text-sm uppercase tracking-wide">
        Required Data Fields ({FIELDS.length})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {FIELDS.map((field, i) => (
          <div
            key={i}
            className="flex items-start space-x-2 text-sm text-slate-700"
          >
            <span className={`mt-0.5 font-bold text-xs ${c.icon} min-w-[20px]`}>
              {i + 1}.
            </span>
            <span>{field}</span>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-gray-100 flex items-center gap-4">
        <button
          onClick={handleGenerate}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-medium transition ${c.btn}`}
        >
          <FileText size={15} />
          Generate PDF (Print / Save)
        </button>
        <span className="text-xs text-slate-400">
          Document format ke hisab se generate hoga
        </span>
      </div>
    </div>
  );
};

export default AnnexAPDF;
