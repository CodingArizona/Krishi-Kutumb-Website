import React from "react";
import { FileText } from "lucide-react";

// ─── Fields ───────────────────────────────────────────────────────────────────
const FIELDS = [
  "Place & Date of Board Meeting",
  "Agenda: FPO Management Cost Period",
  "FPO Legal Status (formation basis)",
  "AGM/EGM Date Reference",
  "Resolution 1: Submit claim to NCDC/IA",
  "Resolution 2: Funds to be used per Operational Guidelines",
  "Resolution 3: Accounts of grant to be maintained",
  "Resolution 4: Expenditure Statement + UC to be submitted on time",
  "Authorized Signatory (CEO + Chairman — Signed & Sealed)",
];

// ─── HTML Builder ─────────────────────────────────────────────────────────────
function buildAnnexB() {
  return `<div style="font-family:Arial,sans-serif;font-size:12px;color:#111;max-width:700px;margin:auto;padding:32px;">
    <div style="text-align:center;margin-bottom:20px;">
      <div style="font-size:15px;font-weight:bold;">BOARD RESOLUTION</div>
      <div style="font-size:11px;margin-top:4px;">(Annex-B — Passed by FPO Board of Directors)</div>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
      ${[
        ["Place of Meeting", ""],
        ["Date of Meeting", ""],
        ["Agenda", "To avail FPO Management Cost for the period ___ to ___"],
        ["FPO Formed Under", ""],
        ["AGM/EGM Date", "On the basis of AGM/EGM held on ___________"],
      ]
        .map(
          ([k, v]) =>
            `<tr>
              <td style="border:1px solid #aaa;padding:7px 10px;width:200px;font-weight:bold;">${k}</td>
              <td style="border:1px solid #aaa;padding:7px 10px;">${v || "&nbsp;"}</td>
            </tr>`,
        )
        .join("")}
    </table>

    <div style="font-weight:bold;margin-bottom:10px;">Resolutions Passed by Board of Directors:</div>
    <ol style="line-height:2.2;padding-left:20px;">
      <li>Claim for FPO Management Cost shall be submitted to NCDC / Implementing Agency.</li>
      <li>Funds received shall be utilized as per the Operational Guidelines of the scheme.</li>
      <li>Accounts of the grant shall be maintained properly and made available for inspection.</li>
      <li>Expenditure Statement and Utilization Certificate will be submitted within prescribed timeline.</li>
    </ol>

    <div style="margin-top:48px;display:flex;justify-content:space-between;border-top:1px solid #ccc;padding-top:20px;">
      <div style="text-align:center;">
        Signature of CEO<br/>Name: ___________<br/>Date: ___________<br/>Seal:
      </div>
      <div style="text-align:center;">
        Signature of Chairman<br/>Name: ___________<br/>Date: ___________<br/>Seal:
      </div>
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
const AnnexBPDF = ({ c }) => {
  const handleGenerate = () => {
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
      <title>Annex-B: Board Resolution</title>
      <style>@media print{body{margin:0;}}</style>
      </head><body>${buildAnnexB()}
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

export default AnnexBPDF;
