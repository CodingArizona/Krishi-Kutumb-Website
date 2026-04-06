import React from "react";
import { FileText } from "lucide-react";

// ─── Fields ───────────────────────────────────────────────────────────────────
const FIELDS = [
  "Salary – CEO/Manager",
  "Salary – Accountant",
  "Sub-Total (Salaries)",
  "Office Rent",
  "Electricity Charges",
  "Telephone Charges",
  "Travel Cost",
  "Meeting Cost",
  "Stationery, Cleaning, Misc.",
  "Sub-Total (Recurring)",
  "One-time Registration Charges",
  "One-time Equipment/Furniture",
  "GRAND TOTAL",
  "Utilization Certificate (UC) — Signed by CEO / Authorized Director",
  "CBBO Verification — Signature, Name, Designation, Date, Seal",
];

const ROWS = [
  { sr: "1", label: "Salary of CEO/Manager", bold: false },
  { sr: "2", label: "Salary of Accountant", bold: false },
  { sr: "", label: "Sub-Total (Salaries)", bold: true },
  { sr: "3", label: "Office Rent", bold: false },
  { sr: "4a", label: "Electricity Charges", bold: false },
  { sr: "4b", label: "Telephone Charges", bold: false },
  { sr: "5a", label: "Travel Cost", bold: false },
  { sr: "5b", label: "Meeting Cost", bold: false },
  { sr: "6a", label: "Stationery Items", bold: false },
  { sr: "6b", label: "Cleaning", bold: false },
  { sr: "6c", label: "Other Miscellaneous", bold: false },
  { sr: "", label: "Sub-Total (Recurring)", bold: true },
  { sr: "7", label: "One-time Registration Charges", bold: false },
  { sr: "8", label: "One-time Equipment/Furniture", bold: false },
  { sr: "", label: "GRAND TOTAL", bold: true },
];

// ─── HTML Builder ─────────────────────────────────────────────────────────────
function buildAnnexD() {
  return `<div style="font-family:Arial,sans-serif;font-size:12px;color:#111;max-width:700px;margin:auto;padding:32px;">
    <div style="text-align:center;margin-bottom:20px;">
      <div style="font-size:15px;font-weight:bold;">EXPENDITURE STATEMENT + UTILIZATION CERTIFICATE</div>
      <div style="font-size:11px;margin-top:4px;">(Annex-D — Submitted every 6 months)</div>
    </div>

    <div style="margin-bottom:12px;">
      Statement showing expenditure for the period from
      <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u> to
      <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr style="background:#d4edda;">
        <th style="border:1px solid #aaa;padding:6px 8px;width:50px;">Sr. No.</th>
        <th style="border:1px solid #aaa;padding:6px 8px;">Particulars</th>
        <th style="border:1px solid #aaa;padding:6px 8px;width:90px;">Rate</th>
        <th style="border:1px solid #aaa;padding:6px 8px;width:80px;">Period</th>
        <th style="border:1px solid #aaa;padding:6px 8px;width:100px;">Amount (₹)</th>
      </tr>
      ${ROWS.map(
        (r) =>
          `<tr style="background:${r.bold ? "#f0f9f0" : "white"}">
            <td style="border:1px solid #aaa;padding:5px 8px;text-align:center;">${r.sr}</td>
            <td style="border:1px solid #aaa;padding:5px 8px;font-weight:${r.bold ? "bold" : "normal"}">${r.label}</td>
            <td style="border:1px solid #aaa;padding:5px 8px;">&nbsp;</td>
            <td style="border:1px solid #aaa;padding:5px 8px;">&nbsp;</td>
            <td style="border:1px solid #aaa;padding:5px 8px;">&nbsp;</td>
          </tr>`,
      ).join("")}
    </table>

    <div style="border:1px solid #aaa;padding:16px;margin-bottom:24px;background:#f9fff9;">
      <div style="font-weight:bold;margin-bottom:8px;">Utilization Certificate (UC)</div>
      <div style="line-height:2;">
        It is certified that an expenditure of ₹ <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>
        has been incurred by <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>
        (Name of FPO) for the period from <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>
        to <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u> on the items indicated above.
      </div>
      <div style="margin-top:20px;">
        Signature of CEO / Authorized Director<br/>
        Name: ___________&nbsp;&nbsp;Designation: ___________&nbsp;&nbsp;Date: ___________
      </div>
    </div>

    <div style="border:1px solid #888;padding:16px;background:#f5f5f5;">
      <div style="font-weight:bold;margin-bottom:8px;text-align:center;">── CBBO Verification ──</div>
      <div style="display:flex;justify-content:space-between;margin-top:12px;">
        <div>Signature: ___________<br/>Name: ___________<br/>Designation: ___________</div>
        <div>Organization: ___________<br/>Date: ___________<br/>Place: ___________<br/>Seal:</div>
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
const AnnexDPDF = ({ c }) => {
  const handleGenerate = () => {
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
      <title>Annex-D: Expenditure Statement + UC</title>
      <style>@media print{body{margin:0;}}</style>
      </head><body>${buildAnnexD()}
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

export default AnnexDPDF;
