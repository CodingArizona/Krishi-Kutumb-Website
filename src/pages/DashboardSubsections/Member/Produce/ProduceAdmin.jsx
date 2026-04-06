import React, { useState } from "react";
import {
  Sprout, Plus, Search, Eye, ClipboardList, Scale,
  CheckCircle, AlertCircle, Edit2, Trash2, X, Leaf,
  ArrowUpDown, Package, TrendingUp, TrendingDown,
  Warehouse, DollarSign, BarChart3, ShieldCheck,
  RefreshCw, Users, BadgeCheck, Hourglass, Ban,
  FileDown, Filter,
} from "lucide-react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const ALL_COMMODITIES = [
  { id: 1, name: "Wheat",   category: "Grains",     unit: "Quintal", currentStock: 1200, procured: 1400, distributed: 200, gradeA: 800, gradeB: 300, gradeC: 100, msp: 2275, marketPrice: 2400, village: "Rampur",   season: "Rabi",   status: "Active",    lastUpdated: "2024-04-10" },
  { id: 2, name: "Chana",   category: "Pulses",     unit: "Quintal", currentStock: 450,  procured: 500,  distributed: 50,  gradeA: 300, gradeB: 120, gradeC: 30,  msp: 5440, marketPrice: 5600, village: "Sehore",   season: "Rabi",   status: "Active",    lastUpdated: "2024-03-28" },
  { id: 3, name: "Tomato",  category: "Vegetables", unit: "Quintal", currentStock: 90,   procured: 120,  distributed: 30,  gradeA: 70,  gradeB: 15,  gradeC: 5,   msp: 1200, marketPrice: 1350, village: "Harda",    season: "Zaid",   status: "Low Stock", lastUpdated: "2024-06-02" },
  { id: 4, name: "Mustard", category: "Oilseeds",   unit: "Quintal", currentStock: 310,  procured: 350,  distributed: 40,  gradeA: 210, gradeB: 75,  gradeC: 25,  msp: 5650, marketPrice: 5800, village: "Khirkiya", season: "Rabi",   status: "Active",    lastUpdated: "2024-04-01" },
  { id: 5, name: "Soybean", category: "Oilseeds",   unit: "Quintal", currentStock: 680,  procured: 750,  distributed: 70,  gradeA: 500, gradeB: 140, gradeC: 40,  msp: 4600, marketPrice: 4750, village: "Timarni",  season: "Kharif", status: "Active",    lastUpdated: "2024-11-15" },
  { id: 6, name: "Maize",   category: "Grains",     unit: "Quintal", currentStock: 20,   procured: 300,  distributed: 280, gradeA: 180, gradeB: 90,  gradeC: 30,  msp: 2090, marketPrice: 2150, village: "Handia",   season: "Kharif", status: "Critical",  lastUpdated: "2024-12-01" },
];

const ALL_SUBMISSIONS = [
  { id: 1, farmerName: "Ramesh Patel",  memberId: "M001", commodity: "Wheat",   commodityId: 1, quantity: 50,  unit: "Quintal", grade: "A", price: 2300, date: "2024-04-08", village: "Rampur",   status: "Pending",  totalAmount: 115000 },
  { id: 2, farmerName: "Suresh Verma",  memberId: "M002", commodity: "Chana",   commodityId: 2, quantity: 30,  unit: "Quintal", grade: "B", price: 5400, date: "2024-03-25", village: "Sehore",   status: "Approved", totalAmount: 162000 },
  { id: 3, farmerName: "Mahesh Sharma", memberId: "M003", commodity: "Mustard", commodityId: 4, quantity: 45,  unit: "Quintal", grade: "A", price: 5700, date: "2024-03-30", village: "Khirkiya", status: "Pending",  totalAmount: 256500 },
  { id: 4, farmerName: "Dinesh Kumar",  memberId: "M004", commodity: "Soybean", commodityId: 5, quantity: 80,  unit: "Quintal", grade: "A", price: 4650, date: "2024-11-10", village: "Timarni",  status: "Approved", totalAmount: 372000 },
  { id: 5, farmerName: "Vijay Singh",   memberId: "M005", commodity: "Wheat",   commodityId: 1, quantity: 120, unit: "Quintal", grade: "B", price: 2250, date: "2024-04-05", village: "Rampur",   status: "Rejected", totalAmount: 0      },
  { id: 6, farmerName: "Kamlesh Gupta", memberId: "M006", commodity: "Tomato",  commodityId: 3, quantity: 20,  unit: "Quintal", grade: "A", price: 1300, date: "2024-05-28", village: "Harda",    status: "Pending",  totalAmount: 26000  },
];

const CATEGORIES = ["All", "Grains", "Pulses", "Vegetables", "Oilseeds", "Spices", "Fruits", "Dairy"];
const SEASONS    = ["Kharif", "Rabi", "Zaid"];
const GRADES     = ["A", "B", "C"];
const UNITS      = ["Quintal", "Kg", "Ton", "Box", "Bundle"];
const STATUSES   = ["Active", "Low Stock", "Critical", "Inactive"];

const EMPTY_COMMODITY = {
  name: "", category: "Grains", unit: "Quintal", currentStock: "",
  msp: "", marketPrice: "", village: "", season: "Rabi", status: "Active",
  gradeA: 0, gradeB: 0, gradeC: 0, procured: 0, distributed: 0,
  lastUpdated: new Date().toISOString().slice(0, 10),
};

const fmt = (n) => Number(n).toLocaleString("en-IN");

const statusStyle = (s) => ({
  Active:      "bg-emerald-100 text-emerald-700",
  "Low Stock": "bg-amber-100 text-amber-700",
  Critical:    "bg-red-100 text-red-700",
  Inactive:    "bg-slate-100 text-slate-500",
  Approved:    "bg-emerald-100 text-emerald-700",
  Pending:     "bg-yellow-100 text-yellow-700",
  Rejected:    "bg-red-100 text-red-600",
}[s] || "bg-slate-100 text-slate-500");

const Field = ({ label, error, children }) => (
  <div>
    <label className="text-xs font-bold text-slate-600 mb-1 block">{label}</label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const inputCls = (err) =>
  "w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all " +
  (err ? "border-red-400 bg-red-50" : "border-slate-200 bg-white hover:border-slate-300");

// ═════════════════════════════════════════════════════════════════════════════
const ProduceAdmin = () => {
  const [commodities,   setCommodities]   = useState(ALL_COMMODITIES);
  const [submissions,   setSubmissions]   = useState(ALL_SUBMISSIONS);
  const [activeTab,     setActiveTab]     = useState("commodities");
  const [search,        setSearch]        = useState("");
  const [catFilter,     setCatFilter]     = useState("All");
  const [subFilter,     setSubFilter]     = useState("All");
  const [showComModal,  setShowComModal]  = useState(false);
  const [showDetail,    setShowDetail]    = useState(null);
  const [showSubDetail, setShowSubDetail] = useState(null);
  const [editCom,       setEditCom]       = useState(null);
  const [comForm,       setComForm]       = useState(EMPTY_COMMODITY);
  const [comErrors,     setComErrors]     = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [sortKey,       setSortKey]       = useState("name");
  const [sortDir,       setSortDir]       = useState("asc");
  const [rejectReason,  setRejectReason]  = useState("");
  const [showRejectBox, setShowRejectBox] = useState(null);

  // ── computed ──
  const totalStock    = commodities.reduce((s, c) => s + Number(c.currentStock), 0);
  const totalValue    = commodities.reduce((s, c) => s + Number(c.currentStock) * Number(c.msp), 0);
  const totalProcured = commodities.reduce((s, c) => s + Number(c.procured), 0);
  const alertCount    = commodities.filter((c) => c.status === "Low Stock" || c.status === "Critical").length;
  const pendingSubCount = submissions.filter((s) => s.status === "Pending").length;

  const filteredCom = commodities
    .filter((c) => {
      const matchCat    = catFilter === "All" || c.category === catFilter;
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                          c.village.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      const cmp = typeof av === "number" ? av - bv : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });

  const filteredSub = submissions.filter((s) => {
    const matchStatus = subFilter === "All" || s.status === subFilter;
    const matchSearch = s.farmerName.toLowerCase().includes(search.toLowerCase()) ||
                        s.memberId.toLowerCase().includes(search.toLowerCase()) ||
                        s.commodity.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  // ── commodity CRUD ──
  const validateCom = () => {
    const e = {};
    if (!comForm.name.trim())                                      e.name        = "Required";
    if (!comForm.village.trim())                                   e.village     = "Required";
    if (!comForm.msp         || Number(comForm.msp)         <= 0) e.msp         = "Enter valid MSP";
    if (!comForm.marketPrice || Number(comForm.marketPrice) <= 0) e.marketPrice = "Enter valid price";
    return e;
  };

  const saveCommodity = () => {
    const e = validateCom();
    if (Object.keys(e).length) { setComErrors(e); return; }
    if (editCom) {
      setCommodities((p) => p.map((c) => (c.id === editCom ? { ...comForm, id: editCom } : c)));
    } else {
      setCommodities((p) => [...p, { ...comForm, id: Date.now(), procured: 0, distributed: 0, gradeA: 0, gradeB: 0, gradeC: 0 }]);
    }
    setShowComModal(false); setEditCom(null); setComErrors({});
  };

  const openEditCom = (item) => {
    setComForm({ ...item }); setEditCom(item.id);
    setComErrors({}); setShowComModal(true); setShowDetail(null);
  };

  const deleteCom = (id) => {
    setCommodities((p) => p.filter((c) => c.id !== id));
    setDeleteConfirm(null); setShowDetail(null);
  };

  // ── submission actions ──
  const approveSubmission = (id) => {
    const sub = submissions.find((s) => s.id === id);
    setSubmissions((p) => p.map((s) => s.id === id ? { ...s, status: "Approved", totalAmount: s.quantity * s.price } : s));
    if (sub) {
      setCommodities((p) => p.map((c) => {
        if (c.id === sub.commodityId) {
          const gk = "grade" + sub.grade;
          return { ...c, currentStock: c.currentStock + sub.quantity, procured: c.procured + sub.quantity, [gk]: (c[gk] || 0) + sub.quantity };
        }
        return c;
      }));
    }
    setShowSubDetail(null);
  };

  const rejectSubmission = (id) => {
    setSubmissions((p) => p.map((s) => s.id === id ? { ...s, status: "Rejected", totalAmount: 0 } : s));
    setShowRejectBox(null); setRejectReason(""); setShowSubDetail(null);
  };

  // ── analytics ──
  const catData  = CATEGORIES.slice(1).map((cat) => {
    const items = commodities.filter((c) => c.category === cat);
    return { cat, count: items.length, stock: items.reduce((s, c) => s + c.currentStock, 0) };
  }).filter((d) => d.count > 0);
  const maxStock = Math.max(...catData.map((d) => d.stock), 1);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 px-6 py-5 mb-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Sprout size={24} className="text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 leading-tight">Produce</h1>
                <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full">ADMIN</span>
              </div>
              <p className="text-sm text-slate-500">Full commodity control — all members & stock</p>
            </div>
          </div>
          <div className="flex gap-3">
            {pendingSubCount > 0 && (
              <button onClick={() => setActiveTab("approvals")}
                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-all shadow-sm relative">
                <Hourglass size={16} /> Pending Approvals
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {pendingSubCount}
                </span>
              </button>
            )}
            <button
              onClick={() => { setComForm(EMPTY_COMMODITY); setEditCom(null); setComErrors({}); setShowComModal(true); }}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-all shadow-sm"
            >
              <Plus size={16} /> Add Commodity
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Commodities", value: String(commodities.length),           sub: "Registered",          Icon: Package,     grad: "from-blue-50 to-blue-100",       ic: "text-blue-600"    },
            { title: "Total Stock",       value: fmt(totalStock) + " Qtl",             sub: "Current inventory",   Icon: Warehouse,   grad: "from-emerald-50 to-emerald-100", ic: "text-emerald-600" },
            { title: "Total Procured",    value: fmt(totalProcured) + " Qtl",          sub: "All members",         Icon: TrendingUp,  grad: "from-purple-50 to-purple-100",   ic: "text-purple-600"  },
            { title: "Pending Approvals", value: String(pendingSubCount),              sub: "Submissions to review",Icon: Hourglass,  grad: "from-yellow-50 to-yellow-100",   ic: "text-yellow-600"  },
          ].map((s, i) => (
            <div key={i} className={"bg-gradient-to-br " + s.grad + " rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-semibold text-slate-700">{s.title}</h3>
                <s.Icon size={24} className={s.ic} />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-1">{s.value}</p>
              <p className="text-xs text-slate-500 font-medium">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* VALUE BANNER + ALERTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 shadow-lg text-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-emerald-100 text-sm">Total Estimated Stock Value (at MSP)</h3>
              <DollarSign size={22} className="text-emerald-200" />
            </div>
            <p className="text-4xl font-bold mb-1">{"₹" + (totalValue / 100000).toFixed(2) + " L"}</p>
            <p className="text-emerald-200 text-xs">Based on current stock × MSP rates</p>
            <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-emerald-500">
              {["Grains", "Pulses", "Oilseeds"].map((cat) => (
                <div key={cat}>
                  <p className="text-emerald-200 text-xs">{cat}</p>
                  <p className="text-white font-bold">
                    {fmt(commodities.filter((c) => c.category === cat).reduce((s, c) => s + c.currentStock, 0))} Qtl
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-semibold text-slate-700 text-sm mb-4 flex items-center gap-2">
              <AlertCircle size={16} className="text-red-400" /> Stock Alerts
            </h3>
            <div className="space-y-2">
              {commodities.filter((c) => c.status === "Critical" || c.status === "Low Stock").length === 0 ? (
                <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                  <CheckCircle size={16} /> All stock levels healthy
                </div>
              ) : commodities.filter((c) => c.status !== "Active" && c.status !== "Inactive").map((c) => (
                <div key={c.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{c.name}</p>
                    <p className="text-xs text-slate-400">{fmt(c.currentStock)} {c.unit}</p>
                  </div>
                  <span className={"text-xs font-bold px-2 py-1 rounded-full " + statusStyle(c.status)}>{c.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="flex border-b border-slate-200 overflow-x-auto">
            {[
              { key: "commodities", label: "Commodities",      Icon: Leaf        },
              { key: "approvals",   label: "Member Submissions",Icon: ClipboardList, badge: pendingSubCount },
              { key: "grading",     label: "Grading & Stock",  Icon: Scale       },
              { key: "analytics",   label: "Analytics",        Icon: BarChart3   },
            ].map(({ key, label, Icon, badge }) => (
              <button key={key} onClick={() => setActiveTab(key)}
                className={"relative flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2 " +
                  (activeTab === key ? "border-emerald-600 text-emerald-700 bg-emerald-50" : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50")}
              >
                <Icon size={15} /> {label}
                {badge > 0 && (
                  <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ── COMMODITIES ── */}
          {activeTab === "commodities" && (
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-3 mb-5">
                <div className="flex-1 relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
                    placeholder="Search commodity or village..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {CATEGORIES.map((c) => (
                    <button key={c} onClick={() => setCatFilter(c)}
                      className={"px-3 py-2 rounded-lg text-xs font-semibold border transition-all " +
                        (catFilter === c ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-400")}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wider">
                    <tr>
                      {[
                        { key: "name",         label: "Commodity"   },
                        { key: "category",     label: "Category"    },
                        { key: "currentStock", label: "Stock (Qtl)" },
                        { key: "procured",     label: "Procured"    },
                        { key: "msp",          label: "MSP (₹)"     },
                        { key: "marketPrice",  label: "Market (₹)"  },
                        { key: "village",      label: "Village"     },
                        { key: "season",       label: "Season"      },
                        { key: "status",       label: "Status"      },
                      ].map((col) => (
                        <th key={col.key} onClick={() => toggleSort(col.key)}
                          className="px-4 py-3 text-left cursor-pointer hover:bg-slate-100 select-none">
                          <span className="flex items-center gap-1">{col.label} <ArrowUpDown size={11} /></span>
                        </th>
                      ))}
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCom.length === 0 ? (
                      <tr><td colSpan={10} className="text-center py-14 text-slate-400">
                        <Leaf size={32} className="mx-auto mb-2 opacity-30" />
                        <p>No commodities found</p>
                      </td></tr>
                    ) : filteredCom.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-bold text-slate-900">{item.name}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">{item.category}</span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-700">{fmt(item.currentStock)}</td>
                        <td className="px-4 py-3 text-slate-500">{fmt(item.procured)}</td>
                        <td className="px-4 py-3 text-emerald-700 font-semibold">{"₹" + fmt(item.msp)}</td>
                        <td className="px-4 py-3">
                          <span className={"font-semibold flex items-center gap-1 " + (item.marketPrice >= item.msp ? "text-emerald-600" : "text-red-600")}>
                            {"₹" + fmt(item.marketPrice)}
                            {item.marketPrice >= item.msp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-500 text-xs">{item.village}</td>
                        <td className="px-4 py-3 text-slate-500 text-xs">{item.season}</td>
                        <td className="px-4 py-3">
                          <span className={"px-2 py-1 text-xs font-bold rounded-full " + statusStyle(item.status)}>{item.status}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1.5">
                            <button onClick={() => setShowDetail(item)}       className="p-1.5 hover:bg-blue-50  text-blue-500  rounded-lg transition-all" title="View">  <Eye   size={14} /></button>
                            <button onClick={() => openEditCom(item)}         className="p-1.5 hover:bg-amber-50 text-amber-500 rounded-lg transition-all" title="Edit">  <Edit2 size={14} /></button>
                            <button onClick={() => setDeleteConfirm(item.id)} className="p-1.5 hover:bg-red-50   text-red-500   rounded-lg transition-all" title="Delete"><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── MEMBER SUBMISSIONS / APPROVALS ── */}
          {activeTab === "approvals" && (
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-5">
                <div>
                  <h3 className="font-bold text-slate-800">Member Submissions</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Review and approve/reject farmer produce submissions</p>
                </div>
                <div className="flex gap-2">
                  {["All", "Pending", "Approved", "Rejected"].map((f) => (
                    <button key={f} onClick={() => setSubFilter(f)}
                      className={"px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all " +
                        (subFilter === f ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-400")}>
                      {f}
                      {f === "Pending" && pendingSubCount > 0 && (
                        <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{pendingSubCount}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* submission stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Total",    val: submissions.length,                                   grad: "from-blue-50 to-blue-100",       Icon: ClipboardList, ic: "text-blue-600"    },
                  { label: "Approved", val: submissions.filter((s) => s.status === "Approved").length, grad: "from-emerald-50 to-emerald-100", Icon: BadgeCheck,   ic: "text-emerald-600" },
                  { label: "Pending",  val: submissions.filter((s) => s.status === "Pending").length,  grad: "from-yellow-50 to-yellow-100",  Icon: Hourglass,    ic: "text-yellow-600"  },
                  { label: "Rejected", val: submissions.filter((s) => s.status === "Rejected").length, grad: "from-red-50 to-red-100",        Icon: Ban,          ic: "text-red-600"     },
                ].map((s, i) => (
                  <div key={i} className={"bg-gradient-to-br " + s.grad + " rounded-xl p-4 shadow-md hover:scale-105 transition-all duration-300"}>
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-xs font-semibold text-slate-600">{s.label}</p>
                      <s.Icon size={18} className={s.ic} />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{s.val}</p>
                  </div>
                ))}
              </div>

              {/* search */}
              <div className="relative mb-4">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
                  placeholder="Search by farmer, member ID or commodity..."
                  value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>

              <div className="space-y-3">
                {filteredSub.map((sub) => (
                  <div key={sub.id}
                    className={"border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all " +
                      (sub.status === "Pending" ? "border-yellow-300 bg-yellow-50/30" :
                       sub.status === "Approved" ? "border-emerald-200 bg-white" : "border-red-200 bg-white")}
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                            <Users size={18} className="text-slate-500" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-slate-900">{sub.farmerName}</h4>
                              <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{sub.memberId}</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">{sub.village} · {sub.date}</p>
                          </div>
                        </div>
                        <span className={"text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 " + statusStyle(sub.status)}>
                          {sub.status === "Approved" && <BadgeCheck size={12} />}
                          {sub.status === "Pending"  && <Hourglass  size={12} />}
                          {sub.status === "Rejected" && <Ban        size={12} />}
                          {sub.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs mb-3">
                        {[
                          { l: "Commodity", v: sub.commodity },
                          { l: "Quantity",  v: sub.quantity + " " + sub.unit },
                          { l: "Grade",     v: "Grade " + sub.grade },
                          { l: "Price",     v: "₹" + fmt(sub.price) + "/Qtl" },
                          { l: "Total Amt", v: sub.status === "Approved" ? "₹" + fmt(sub.totalAmount) : "—" },
                        ].map((r) => (
                          <div key={r.l} className="bg-white rounded-lg p-2 border border-slate-100">
                            <p className="text-slate-400">{r.l}</p>
                            <p className="font-bold text-slate-800">{r.v}</p>
                          </div>
                        ))}
                      </div>

                      {sub.status === "Pending" && (
                        <div className="flex gap-2 pt-2 border-t border-slate-200">
                          <button onClick={() => approveSubmission(sub.id)}
                            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all">
                            <CheckCircle size={13} /> Approve
                          </button>
                          <button onClick={() => setShowRejectBox(sub.id)}
                            className="flex items-center gap-1.5 bg-red-100 hover:bg-red-200 text-red-600 text-xs font-semibold px-4 py-2 rounded-lg transition-all">
                            <Ban size={13} /> Reject
                          </button>
                          <button onClick={() => setShowSubDetail(sub)}
                            className="flex items-center gap-1.5 text-blue-600 hover:bg-blue-50 text-xs font-semibold px-3 py-2 rounded-lg transition-all ml-auto">
                            <Eye size={13} /> Details
                          </button>
                        </div>
                      )}

                      {showRejectBox === sub.id && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-xs font-bold text-red-700 mb-2">Rejection Reason (optional)</p>
                          <input className="w-full border border-red-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 bg-white mb-2"
                            placeholder="e.g. Quality not meeting standard..."
                            value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} />
                          <div className="flex gap-2">
                            <button onClick={() => { setShowRejectBox(null); setRejectReason(""); }}
                              className="flex-1 border border-slate-200 text-slate-600 text-xs font-semibold py-2 rounded-lg hover:bg-slate-50">Cancel</button>
                            <button onClick={() => rejectSubmission(sub.id)}
                              className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2 rounded-lg transition-all">Confirm Reject</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── GRADING & STOCK ── */}
          {activeTab === "grading" && (
            <div className="p-6">
              <h3 className="font-bold text-slate-800 mb-5">Grading & Stock Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {commodities.map((item) => {
                  const total = (item.gradeA + item.gradeB + item.gradeC) || 1;
                  return (
                    <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-slate-900">{item.name}</h4>
                          <p className="text-xs text-slate-400">{item.category} · {item.village} · {item.season}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-extrabold text-slate-800">{fmt(item.currentStock)}</p>
                          <p className="text-xs text-slate-400">{item.unit} in stock</p>
                        </div>
                      </div>
                      <div className="space-y-2.5">
                        {[
                          { g: "A", val: item.gradeA, bar: "bg-emerald-500", tc: "text-emerald-700" },
                          { g: "B", val: item.gradeB, bar: "bg-blue-500",    tc: "text-blue-700"    },
                          { g: "C", val: item.gradeC, bar: "bg-amber-500",   tc: "text-amber-700"   },
                        ].map(({ g, val, bar, tc }) => (
                          <div key={g} className="flex items-center gap-3">
                            <span className={"text-xs font-bold w-9 " + tc}>Grade {g}</span>
                            <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                              <div className={"h-full " + bar + " rounded-full transition-all duration-700"}
                                style={{ width: ((val / total) * 100) + "%" }} />
                            </div>
                            <span className="text-xs font-semibold text-slate-600 w-20 text-right">{fmt(val)} Qtl</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 text-center text-xs gap-2">
                        <div className="bg-slate-50 rounded-lg p-2"><p className="text-slate-400">Procured</p><p className="font-bold text-slate-700">{fmt(item.procured)}</p></div>
                        <div className="bg-slate-50 rounded-lg p-2"><p className="text-slate-400">Distributed</p><p className="font-bold text-slate-700">{fmt(item.distributed)}</p></div>
                        <div className="bg-emerald-50 rounded-lg p-2"><p className="text-slate-400">MSP (₹)</p><p className="font-bold text-emerald-700">{"₹" + fmt(item.msp)}</p></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── ANALYTICS ── */}
          {activeTab === "analytics" && (
            <div className="p-6 space-y-8">
             

              <div>
                <h3 className="font-bold text-slate-800 mb-4">MSP vs Market Price</h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wider">
                      <tr>
                        {["Commodity", "Category", "Season", "MSP", "Market", "Difference", "Action"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {commodities.map((c) => {
                        const diff = c.marketPrice - c.msp;
                        return (
                          <tr key={c.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 font-bold text-slate-900">{c.name}</td>
                            <td className="px-4 py-3 text-slate-500">{c.category}</td>
                            <td className="px-4 py-3 text-slate-500">{c.season}</td>
                            <td className="px-4 py-3 text-emerald-700 font-semibold">{"₹" + fmt(c.msp)}</td>
                            <td className="px-4 py-3 font-semibold text-slate-800">{"₹" + fmt(c.marketPrice)}</td>
                            <td className="px-4 py-3">
                              <span className={"font-bold " + (diff >= 0 ? "text-emerald-600" : "text-red-600")}>
                                {(diff >= 0 ? "+" : "") + "₹" + fmt(diff)}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={"text-xs font-bold px-2 py-1 rounded-full " + (diff >= 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700")}>
                                {diff >= 0 ? "✅ Sell Now" : "⏳ Hold Stock"}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-800 mb-4">Overall Grade Distribution</h3>
                <div className="grid grid-cols-3 gap-4">
                  {["A", "B", "C"].map((g) => {
                    const total = commodities.reduce((s, c) => s + (c["grade" + g] || 0), 0);
                    const pct   = ((total / (totalProcured || 1)) * 100).toFixed(1);
                    const cfg   = {
                      A: { grad: "from-emerald-50 to-emerald-100", tc: "text-emerald-700", bar: "bg-emerald-500" },
                      B: { grad: "from-blue-50 to-blue-100",       tc: "text-blue-700",    bar: "bg-blue-500"    },
                      C: { grad: "from-amber-50 to-amber-100",     tc: "text-amber-700",   bar: "bg-amber-500"   },
                    }[g];
                    return (
                      <div key={g} className={"bg-gradient-to-br " + cfg.grad + " rounded-xl p-5 shadow-md text-center"}>
                        <div className="flex items-center justify-center gap-1.5 mb-2">
                          <ShieldCheck size={16} className={cfg.tc} />
                          <p className="text-xs font-semibold text-slate-500">Grade {g}</p>
                        </div>
                        <p className={"text-3xl font-extrabold " + cfg.tc}>{fmt(total)}</p>
                        <p className="text-xs text-slate-500 mt-0.5">Quintal</p>
                        <div className="w-full bg-white/60 rounded-full h-2 mt-3">
                          <div className={"h-full " + cfg.bar + " rounded-full"} style={{ width: pct + "%" }} />
                        </div>
                        <p className="text-xs text-slate-500 mt-2">{pct}% of total</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ADD/EDIT COMMODITY MODAL */}
      {showComModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 rounded-t-2xl flex justify-between items-center z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Leaf size={18} className="text-emerald-600" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-slate-900">{editCom ? "Edit Commodity" : "Add Commodity"}</h2>
                  <p className="text-slate-400 text-xs">Admin: manage FPO commodity registry</p>
                </div>
              </div>
              <button onClick={() => { setShowComModal(false); setEditCom(null); setComErrors({}); }}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <Field label="Commodity Name *" error={comErrors.name}>
                <input className={inputCls(comErrors.name)} placeholder="e.g. Wheat, Tomato"
                  value={comForm.name} onChange={(e) => setComForm({ ...comForm, name: e.target.value })} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Category">
                  <select className={inputCls(false)} value={comForm.category} onChange={(e) => setComForm({ ...comForm, category: e.target.value })}>
                    {CATEGORIES.slice(1).map((c) => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Season">
                  <select className={inputCls(false)} value={comForm.season} onChange={(e) => setComForm({ ...comForm, season: e.target.value })}>
                    {SEASONS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Unit">
                  <select className={inputCls(false)} value={comForm.unit} onChange={(e) => setComForm({ ...comForm, unit: e.target.value })}>
                    {UNITS.map((u) => <option key={u}>{u}</option>)}
                  </select>
                </Field>
                <Field label="Opening Stock">
                  <input type="number" className={inputCls(false)} placeholder="0"
                    value={comForm.currentStock} onChange={(e) => setComForm({ ...comForm, currentStock: e.target.value })} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="MSP (₹/unit) *" error={comErrors.msp}>
                  <input type="number" className={inputCls(comErrors.msp)} placeholder="e.g. 2275"
                    value={comForm.msp} onChange={(e) => setComForm({ ...comForm, msp: e.target.value })} />
                </Field>
                <Field label="Market Price (₹) *" error={comErrors.marketPrice}>
                  <input type="number" className={inputCls(comErrors.marketPrice)} placeholder="e.g. 2400"
                    value={comForm.marketPrice} onChange={(e) => setComForm({ ...comForm, marketPrice: e.target.value })} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Village / Block *" error={comErrors.village}>
                  <input className={inputCls(comErrors.village)} placeholder="Village name"
                    value={comForm.village} onChange={(e) => setComForm({ ...comForm, village: e.target.value })} />
                </Field>
                <Field label="Status">
                  <select className={inputCls(false)} value={comForm.status} onChange={(e) => setComForm({ ...comForm, status: e.target.value })}>
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </Field>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => { setShowComModal(false); setEditCom(null); setComErrors({}); }}
                  className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-lg hover:bg-slate-50 text-sm">Cancel</button>
                <button onClick={saveCommodity}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg text-sm shadow-md transition-all">
                  {editCom ? "Save Changes" : "Add Commodity"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMMODITY DETAIL MODAL */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5 rounded-t-2xl flex justify-between items-center">
              <div>
                <h2 className="text-white font-extrabold text-xl">{showDetail.name}</h2>
                <p className="text-emerald-200 text-xs">{showDetail.category + " · " + showDetail.season + " · " + showDetail.village}</p>
              </div>
              <button onClick={() => setShowDetail(null)} className="text-white/70 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-5 grid grid-cols-2 gap-3">
              {[
                { l: "Current Stock",  v: fmt(showDetail.currentStock) + " " + showDetail.unit },
                { l: "Total Procured", v: fmt(showDetail.procured) + " " + showDetail.unit     },
                { l: "Distributed",    v: fmt(showDetail.distributed) + " " + showDetail.unit  },
                { l: "MSP",            v: "₹" + fmt(showDetail.msp)                            },
                { l: "Market Price",   v: "₹" + fmt(showDetail.marketPrice)                    },
                { l: "Status",         v: showDetail.status                                     },
                { l: "Grade A",        v: fmt(showDetail.gradeA) + " Qtl"                      },
                { l: "Grade B",        v: fmt(showDetail.gradeB) + " Qtl"                      },
                { l: "Grade C",        v: fmt(showDetail.gradeC) + " Qtl"                      },
                { l: "Last Updated",   v: showDetail.lastUpdated                                },
              ].map((r) => (
                <div key={r.l} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">{r.l}</p>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">{r.v}</p>
                </div>
              ))}
            </div>
            <div className="px-5 pb-5 flex gap-3">
              <button onClick={() => openEditCom(showDetail)}        className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 rounded-lg text-sm transition-all"><Edit2 size={14} /> Edit</button>
              <button onClick={() => setDeleteConfirm(showDetail.id)} className="flex-1 flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 font-semibold py-2.5 rounded-lg text-sm transition-all"><Trash2 size={14} /> Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <AlertCircle size={44} className="text-red-500 mx-auto mb-3" />
            <h3 className="font-extrabold text-slate-900 text-lg mb-1">Delete Commodity?</h3>
            <p className="text-slate-500 text-sm mb-5">All related data will be removed. This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 border border-slate-200 font-semibold py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
              <button onClick={() => deleteCom(deleteConfirm)} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-all">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProduceAdmin;