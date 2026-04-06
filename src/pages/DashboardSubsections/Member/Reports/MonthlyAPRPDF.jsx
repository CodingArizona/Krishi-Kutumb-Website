import React from "react";
import { FileText } from "lucide-react";

// ─── Fields ───────────────────────────────────────────────────────────────────
const FIELDS = [
  "Month, CBBO Name, FPO Name",
  "District, Block, Cluster",
  "Activity Log: BOD Meeting (Date, Venue, Participants, Outcome)",
  "Activity Log: FIG Meeting",
  "Activity Log: Market Linkage Visit",
  "Activity Log: Input Supply Activity",
  "Activity Log: Farmer Training",
  "Members Added + Total Members",
  "Share Capital Collected (₹)",
  "Procurement Volume (Quintals)",
  "Sales Revenue (₹)",
  "NPMA Portal Updated: Yes / No",
  "Prepared by CBBO Rep (Signature + Date)",
  "FPO CEO Signature",
];

// ─── HTML Builder ─────────────────────────────────────────────────────────────
function buildAPR() {
  return `<div style="font-family:Arial,sans-serif;font-size:12px;color:#111;max-width:700px;margin:auto;padding:32px;">
    <div style="text-align:center;margin-bottom:20px;">
      <div style="font-size:15px;font-weight:bold;">MONTHLY ACTIVITY PERFORMANCE REPORT (APR)</div>
      <div style="font-size:11px;margin-top:4px;">(Submitted monthly by CBBO to NABARD/FDRVC)</div>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
      <tr>
        <td style="border:1px solid #aaa;padding:6px 10px;width:33%;font-weight:bold;">Month</td>
        <td style="border:1px solid #aaa;padding:6px 10px;width:33%;font-weight:bold;">CBBO Name</td>
        <td style="border:1px solid #aaa;padding:6px 10px;width:34%;font-weight:bold;">FPO Name</td>
      </tr>
      <tr>
        <td style="border:1px solid #aaa;padding:6px 10px;">&nbsp;</td>
        <td style="border:1px solid #aaa;padding:6px 10px;">&nbsp;</td>
        <td style="border:1px solid #aaa;padding:6px 10px;">&nbsp;</td>
      </tr>
      <tr>
        <td style="border:1px solid #aaa;padding:6px 10px;font-weight:bold;">District</td>
        <td style="border:1px solid #aaa;padding:6px 10px;font-weight:bold;">Block</td>
        <td style="border:1px solid #aaa;padding:6px 10px;font-weight:bold;">Cluster</td>
      </tr>
      <tr>
        <td style="border:1px solid #aaa;padding:6px 10px;">&nbsp;</td>
        <td style="border:1px solid #aaa;padding:6px 10px;">&nbsp;</td>
        <td style="border:1px solid #aaa;padding:6px 10px;">&nbsp;</td>
      </tr>
    </table>

    <div style="font-weight:bold;margin-bottom:8px;">Activity Log:</div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
      <tr style="background:#fff3cd;">
        <th style="border:1px solid #aaa;padding:6px 8px;width:30px;">S.No</th>
        <th style="border:1px solid #aaa;padding:6px 8px;width:80px;">Date</th>
        <th style="border:1px solid #aaa;padding:6px 8px;">Activity Type</th>
        <th style="border:1px solid #aaa;padding:6px 8px;">Venue</th>
        <th style="border:1px solid #aaa;padding:6px 8px;width:90px;">Participants</th>
        <th style="border:1px solid #aaa;padding:6px 8px;">Outcome</th>
      </tr>
      ${["BOD Meeting", "FIG Meeting", "Market Linkage Visit", "Input Supply Activity", "Farmer Training"]
        .map(
          (act, i) =>
            `<tr>
              <td style="border:1px solid #aaa;padding:5px 8px;text-align:center;">${i + 1}</td>
              <td style="border:1px solid #aaa;padding:5px 8px;">&nbsp;</td>
              <td style="border:1px solid #aaa;padding:5px 8px;">${act}</td>
              <td style="border:1px solid #aaa;padding:5px 8px;">&nbsp;</td>
              <td style="border:1px solid #aaa;padding:5px 8px;">&nbsp;</td>
              <td style="border:1px solid #aaa;padding:5px 8px;">&nbsp;</td>
            </tr>`,
        )
        .join("")}
    </table>

    <div style="font-weight:bold;margin-bottom:10px;">Key Business Metrics This Month:</div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      ${[
        ["Members Added", "Total Members"],
        ["Share Capital Collected (₹)", "Procurement Volume (Quintals)"],
        ["Sales Revenue (₹)", "NPMA Portal Updated"],
      ]
        .map(
          ([l, r]) =>
            `<tr>
              <td style="border:1px solid #aaa;padding:6px 10px;font-weight:bold;width:25%;">${l}</td>
              <td style="border:1px solid #aaa;padding:6px 10px;width:25%;">&nbsp;</td>
              <td style="border:1px solid #aaa;padding:6px 10px;font-weight:bold;width:25%;">${r}</td>
              <td style="border:1px solid #aaa;padding:6px 10px;width:25%;">&nbsp;</td>
            </tr>`,
        )
        .join("")}
    </table>

    <div style="display:flex;justify-content:space-between;margin-top:32px;border-top:1px solid #ccc;padding-top:16px;">
      <div>Prepared by (CBBO Rep): ___________<br/>Date: ___________</div>
      <div>FPO CEO Signature: ___________<br/>Date: ___________</div>
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
const MonthlyAPRPDF = ({ c }) => {
  const handleGenerate = () => {
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
      <title>Monthly APR: Activity Performance Report</title>
      <style>@media print { body { margin: 0; } }</style>
      </head><body>${buildAPR()}
      <script>window.onload = function () { window.print(); };<\/script>
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
          <div key={i} className="flex items-start gap-2 text-sm text-slate-700">
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

export default MonthlyAPRPDF;