import React, { useState } from "react";
import {
  Sprout,
  Plus,
  Search,
  Eye,
  ClipboardList,
  Scale,
  CheckCircle,
  AlertCircle,
  X,
  Leaf,
  ArrowUpDown,
  Package,
  TrendingUp,
  Clock,
  MapPin,
  CalendarDays,
  ChevronRight,
  BadgeCheck,
  Hourglass,
} from "lucide-react";

// ─── MOCK — only this member's data ──────────────────────────────────────────
const MY_MEMBER = {
  name: "Ramesh Patel",
  memberId: "M001",
  village: "Rampur",
  unit: "Quintal",
};

const MY_COMMODITIES = [
  {
    id: 1,
    name: "Wheat",
    category: "Grains",
    unit: "Quintal",
    quantity: 180,
    grade: "A",
    msp: 2275,
    marketPrice: 2400,
    season: "Rabi",
    status: "Active",
    harvestDate: "2024-04-10",
    village: "Rampur",
  },
  {
    id: 2,
    name: "Mustard",
    category: "Oilseeds",
    unit: "Quintal",
    quantity: 60,
    grade: "A",
    msp: 5650,
    marketPrice: 5800,
    season: "Rabi",
    status: "Active",
    harvestDate: "2024-04-01",
    village: "Rampur",
  },
  {
    id: 3,
    name: "Maize",
    category: "Grains",
    unit: "Quintal",
    quantity: 25,
    grade: "B",
    msp: 2090,
    marketPrice: 2050,
    season: "Kharif",
    status: "Low Stock",
    harvestDate: "2024-12-01",
    village: "Rampur",
  },
];

const MY_SUBMISSIONS = [
  {
    id: 1,
    commodity: "Wheat",
    quantity: 50,
    unit: "Quintal",
    grade: "A",
    price: 2300,
    date: "2024-04-08",
    status: "Approved",
    payment: 115000,
    collectionPoint: "FPO Warehouse, Rampur",
  },
  {
    id: 2,
    commodity: "Mustard",
    quantity: 30,
    unit: "Quintal",
    grade: "A",
    price: 5700,
    date: "2024-04-02",
    status: "Approved",
    payment: 171000,
    collectionPoint: "FPO Warehouse, Rampur",
  },
  {
    id: 3,
    commodity: "Wheat",
    quantity: 40,
    unit: "Quintal",
    grade: "B",
    price: 2200,
    date: "2024-04-12",
    status: "Pending",
    payment: 88000,
    collectionPoint: "FPO Warehouse, Rampur",
  },
  {
    id: 4,
    commodity: "Maize",
    quantity: 20,
    unit: "Quintal",
    grade: "B",
    price: 2050,
    date: "2024-12-05",
    status: "Rejected",
    payment: 0,
    collectionPoint: "FPO Warehouse, Rampur",
  },
];

const CATEGORIES = [
  "Grains",
  "Pulses",
  "Vegetables",
  "Oilseeds",
  "Spices",
  "Fruits",
  "Dairy",
  "Others",
];
const SEASONS = ["Kharif", "Rabi", "Zaid"];
const GRADES = ["A", "B", "C"];
const UNITS = ["Quintal", "Kg", "Ton", "Box", "Bundle"];

const EMPTY_PRODUCE = {
  name: "",
  category: "Grains",
  unit: "Quintal",
  quantity: "",
  grade: "A",
  msp: "",
  marketPrice: "",
  season: "Rabi",
  harvestDate: "",
  village: MY_MEMBER.village,
  status: "Active",
};

const EMPTY_SUBMISSION = {
  commodityId: "",
  quantity: "",
  grade: "A",
  price: "",
  date: new Date().toISOString().slice(0, 10),
  collectionPoint: "FPO Warehouse, Rampur",
};

const fmt = (n) => Number(n).toLocaleString("en-IN");

const statusStyle = (s) =>
  ({
    Active: "bg-emerald-100 text-emerald-700",
    "Low Stock": "bg-amber-100 text-amber-700",
    Approved: "bg-emerald-100 text-emerald-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-600",
  })[s] || "bg-slate-100 text-slate-500";

const statusIcon = (s) =>
  ({
    Approved: <BadgeCheck size={13} />,
    Pending: <Hourglass size={13} />,
    Rejected: <AlertCircle size={13} />,
  })[s] || null;

const Field = ({ label, error, children }) => (
  <div>
    <label className="text-xs font-bold text-slate-600 mb-1 block">
      {label}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const inputCls = (err) =>
  "w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all " +
  (err
    ? "border-red-400 bg-red-50"
    : "border-slate-200 bg-white hover:border-slate-300");

// ═════════════════════════════════════════════════════════════════════════════
const ProduceMember = () => {
  const [commodities, setCommodities] = useState(MY_COMMODITIES);
  const [submissions, setSubmissions] = useState(MY_SUBMISSIONS);
  const [activeTab, setActiveTab] = useState("myProduce");
  const [search, setSearch] = useState("");
  const [showAddProduce, setShowAddProduce] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [produceForm, setProduceForm] = useState(EMPTY_PRODUCE);
  const [submitForm, setSubmitForm] = useState(EMPTY_SUBMISSION);
  const [produceErrors, setProduceErrors] = useState({});
  const [submitErrors, setSubmitErrors] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editId, setEditId] = useState(null);

  // ── computed ──
  const totalQty = commodities.reduce((s, c) => s + Number(c.quantity), 0);
  const totalValue = commodities.reduce(
    (s, c) => s + Number(c.quantity) * Number(c.msp),
    0,
  );
  const approvedPayment = submissions
    .filter((s) => s.status === "Approved")
    .reduce((s, r) => s + r.payment, 0);
  const pendingCount = submissions.filter((s) => s.status === "Pending").length;

  const filtered = commodities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  // ── produce CRUD ──
  const validateProduce = () => {
    const e = {};
    if (!produceForm.name.trim()) e.name = "Required";
    if (!produceForm.quantity || Number(produceForm.quantity) <= 0)
      e.quantity = "Enter valid quantity";
    if (!produceForm.msp || Number(produceForm.msp) <= 0)
      e.msp = "Enter valid MSP";
    if (!produceForm.harvestDate) e.harvestDate = "Required";
    return e;
  };

  const saveProduce = () => {
    const e = validateProduce();
    if (Object.keys(e).length) {
      setProduceErrors(e);
      return;
    }
    if (editId) {
      setCommodities((p) =>
        p.map((c) => (c.id === editId ? { ...produceForm, id: editId } : c)),
      );
      setEditId(null);
    } else {
      setCommodities((p) => [...p, { ...produceForm, id: Date.now() }]);
    }
    setShowAddProduce(false);
    setProduceErrors({});
  };

  const openEdit = (item) => {
    setProduceForm({ ...item });
    setEditId(item.id);
    setProduceErrors({});
    setShowAddProduce(true);
    setShowDetail(null);
  };

  const deleteProduce = (id) => {
    setCommodities((p) => p.filter((c) => c.id !== id));
    setDeleteConfirm(null);
    setShowDetail(null);
  };

  // ── submission ──
  const validateSubmit = () => {
    const e = {};
    if (!submitForm.commodityId) e.commodityId = "Select a commodity";
    if (!submitForm.quantity || Number(submitForm.quantity) <= 0)
      e.quantity = "Enter valid quantity";
    if (!submitForm.price || Number(submitForm.price) <= 0)
      e.price = "Enter valid price";
    return e;
  };

  const saveSubmission = () => {
    const e = validateSubmit();
    if (Object.keys(e).length) {
      setSubmitErrors(e);
      return;
    }
    const com = commodities.find(
      (c) => c.id === Number(submitForm.commodityId),
    );
    setSubmissions((p) => [
      {
        id: Date.now(),
        commodity: com ? com.name : "",
        quantity: Number(submitForm.quantity),
        unit: com ? com.unit : "Quintal",
        grade: submitForm.grade,
        price: Number(submitForm.price),
        date: submitForm.date,
        status: "Pending",
        payment: 0,
        collectionPoint: submitForm.collectionPoint,
      },
      ...p,
    ]);
    setShowSubmit(false);
    setSubmitErrors({});
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 px-6 py-5 mb-6 shadow-sm">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Sprout size={24} className="text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                My Produce
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-slate-500">{MY_MEMBER.name}</span>
                <span className="text-slate-300">·</span>
                <span className="text-xs font-mono text-slate-400">
                  {MY_MEMBER.memberId}
                </span>
                <span className="text-slate-300">·</span>
                <MapPin size={11} className="text-slate-400" />
                <span className="text-xs text-slate-500">
                  {MY_MEMBER.village}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setSubmitForm(EMPTY_SUBMISSION);
                setSubmitErrors({});
                setShowSubmit(true);
              }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-all shadow-sm"
            >
              <ClipboardList size={16} /> Submit to FPO
            </button>
            <button
              onClick={() => {
                setProduceForm(EMPTY_PRODUCE);
                setEditId(null);
                setProduceErrors({});
                setShowAddProduce(true);
              }}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-all shadow-sm"
            >
              <Plus size={16} /> Add Produce
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto px-6">
        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              title: "My Produce Items",
              value: String(commodities.length),
              sub: "Registered",
              Icon: Package,
              grad: "from-blue-50 to-blue-100",
              ic: "text-blue-600",
            },
            {
              title: "Total Stock",
              value: fmt(totalQty) + " Qtl",
              sub: "Available with me",
              Icon: Scale,
              grad: "from-emerald-50 to-emerald-100",
              ic: "text-emerald-600",
            },
            {
              title: "Est. Value",
              value: "₹" + (totalValue / 100000).toFixed(1) + "L",
              sub: "At MSP rate",
              Icon: TrendingUp,
              grad: "from-purple-50 to-purple-100",
              ic: "text-purple-600",
            },
            {
              title: "Payment Received",
              value: "₹" + (approvedPayment / 1000).toFixed(0) + "K",
              sub: String(pendingCount) + " submissions pending",
              Icon: BadgeCheck,
              grad: "from-amber-50 to-amber-100",
              ic: "text-amber-600",
            },
          ].map((s, i) => (
            <div
              key={i}
              className={
                "bg-gradient-to-br " +
                s.grad +
                " rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              }
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xs font-semibold text-slate-600">
                  {s.title}
                </h3>
                <s.Icon size={20} className={s.ic} />
              </div>
              <p className="text-2xl font-bold text-slate-900 mb-0.5">
                {s.value}
              </p>
              <p className="text-xs text-slate-500">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="flex border-b border-slate-200">
            {[
              { key: "myProduce", label: "My Produce", Icon: Leaf },
              {
                key: "submissions",
                label: "FPO Submissions",
                Icon: ClipboardList,
              },
            ].map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={
                  "flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all border-b-2 " +
                  (activeTab === key
                    ? "border-emerald-600 text-emerald-700 bg-emerald-50"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50")
                }
              >
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>

          {/* ── MY PRODUCE ── */}
          {activeTab === "myProduce" && (
            <div className="p-6">
              <div className="relative mb-5">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
                  placeholder="Search your produce..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <Sprout size={40} className="mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No produce found</p>
                  <p className="text-xs mt-1">
                    Click "Add Produce" to register your crop
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                    >
                      {/* card top bar */}
                      <div
                        className={
                          "h-1.5 w-full " +
                          (item.status === "Active"
                            ? "bg-emerald-400"
                            : item.status === "Low Stock"
                              ? "bg-amber-400"
                              : "bg-red-400")
                        }
                      />
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-extrabold text-slate-900 text-base">
                              {item.name}
                            </h3>
                            <span className="text-xs text-slate-400">
                              {item.category} · {item.season}
                            </span>
                          </div>
                          <span
                            className={
                              "text-xs font-bold px-2 py-1 rounded-full " +
                              statusStyle(item.status)
                            }
                          >
                            {item.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                          <div className="bg-slate-50 rounded-lg p-2">
                            <p className="text-slate-400">Quantity</p>
                            <p className="font-extrabold text-slate-800">
                              {fmt(item.quantity)} {item.unit}
                            </p>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-2">
                            <p className="text-slate-400">Grade</p>
                            <p
                              className={
                                "font-extrabold " +
                                (item.grade === "A"
                                  ? "text-emerald-700"
                                  : item.grade === "B"
                                    ? "text-blue-700"
                                    : "text-amber-700")
                              }
                            >
                              Grade {item.grade}
                            </p>
                          </div>
                          <div className="bg-emerald-50 rounded-lg p-2">
                            <p className="text-slate-400">MSP</p>
                            <p className="font-extrabold text-emerald-700">
                              {"₹" + fmt(item.msp)}
                            </p>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-2">
                            <p className="text-slate-400">Market</p>
                            <p className="font-extrabold text-slate-700">
                              {"₹" + fmt(item.marketPrice)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-slate-400 mb-3">
                          <CalendarDays size={11} /> Harvest: {item.harvestDate}
                        </div>

                        <div className="flex gap-2 pt-2 border-t border-slate-100">
                          <button
                            onClick={() => setShowDetail(item)}
                            className="flex-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1"
                          >
                            <Eye size={13} /> View
                          </button>
                          <button
                            onClick={() => openEdit(item)}
                            className="flex-1 text-xs font-semibold text-amber-600 hover:bg-amber-50 py-1.5 rounded-lg transition-all"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(item.id)}
                            className="flex-1 text-xs font-semibold text-red-500 hover:bg-red-50 py-1.5 rounded-lg transition-all"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── FPO SUBMISSIONS ── */}
          {activeTab === "submissions" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-bold text-slate-800">
                    My Submission History
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Track your produce submissions to FPO
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSubmitForm(EMPTY_SUBMISSION);
                    setSubmitErrors({});
                    setShowSubmit(true);
                  }}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-3 py-2 rounded-lg transition-all"
                >
                  <Plus size={15} /> New Submission
                </button>
              </div>

              {/* submission status summary */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  {
                    label: "Approved",
                    count: submissions.filter((s) => s.status === "Approved")
                      .length,
                    col: "from-emerald-50 to-emerald-100",
                    tc: "text-emerald-700",
                    ic: "text-emerald-600",
                    Icon: BadgeCheck,
                  },
                  {
                    label: "Pending",
                    count: submissions.filter((s) => s.status === "Pending")
                      .length,
                    col: "from-yellow-50 to-yellow-100",
                    tc: "text-yellow-700",
                    ic: "text-yellow-600",
                    Icon: Hourglass,
                  },
                  {
                    label: "Rejected",
                    count: submissions.filter((s) => s.status === "Rejected")
                      .length,
                    col: "from-red-50 to-red-100",
                    tc: "text-red-700",
                    ic: "text-red-600",
                    Icon: AlertCircle,
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className={
                      "bg-gradient-to-br " + s.col + " rounded-xl p-4 shadow-md"
                    }
                  >
                    <div className="flex justify-between items-start mb-1">
                      <p className={"text-xs font-semibold " + s.tc}>
                        {s.label}
                      </p>
                      <s.Icon size={16} className={s.ic} />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">
                      {s.count}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {submissions.map((rec) => (
                  <div
                    key={rec.id}
                    className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-slate-900">
                            {rec.commodity}
                          </h4>
                          <span
                            className={
                              "text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 " +
                              statusStyle(rec.status)
                            }
                          >
                            {statusIcon(rec.status)} {rec.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                          <span>
                            📦 {rec.quantity} {rec.unit}
                          </span>
                          <span>⭐ Grade {rec.grade}</span>
                          <span>💰 ₹{fmt(rec.price)}/Qtl</span>
                          <span>📍 {rec.collectionPoint}</span>
                          <span className="flex items-center gap-1">
                            <CalendarDays size={11} /> {rec.date}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        {rec.status === "Approved" ? (
                          <>
                            <p className="text-xs text-slate-400">Payment</p>
                            <p className="font-extrabold text-emerald-700 text-lg">
                              {"₹" + fmt(rec.payment)}
                            </p>
                          </>
                        ) : rec.status === "Pending" ? (
                          <span className="text-xs bg-yellow-50 text-yellow-700 font-semibold px-3 py-1.5 rounded-lg border border-yellow-200">
                            Awaiting Approval
                          </span>
                        ) : (
                          <span className="text-xs bg-red-50 text-red-600 font-semibold px-3 py-1.5 rounded-lg border border-red-200">
                            Not Accepted
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* MSP INFO BANNER */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-5 mb-8 text-white">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <TrendingUp size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base mb-1">
                Current MSP Rates — {new Date().getFullYear()}
              </h3>
              <div className="flex flex-wrap gap-4 text-sm">
                {[
                  { name: "Wheat", msp: "₹2,275/Qtl" },
                  { name: "Chana", msp: "₹5,440/Qtl" },
                  { name: "Mustard", msp: "₹5,650/Qtl" },
                  { name: "Soybean", msp: "₹4,600/Qtl" },
                  { name: "Maize", msp: "₹2,090/Qtl" },
                ].map((r) => (
                  <div key={r.name} className="flex items-center gap-1.5">
                    <ChevronRight size={14} className="text-emerald-300" />
                    <span className="text-emerald-100">{r.name}:</span>
                    <span className="font-bold">{r.msp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ADD / EDIT PRODUCE MODAL */}
      {showAddProduce && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 rounded-t-2xl flex justify-between items-center z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Leaf size={18} className="text-emerald-600" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-slate-900">
                    {editId ? "Edit Produce" : "Add My Produce"}
                  </h2>
                  <p className="text-slate-400 text-xs">
                    Register your crop details
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowAddProduce(false);
                  setEditId(null);
                  setProduceErrors({});
                }}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <Field label="Crop Name *" error={produceErrors.name}>
                <input
                  className={inputCls(produceErrors.name)}
                  placeholder="e.g. Wheat, Tomato"
                  value={produceForm.name}
                  onChange={(e) =>
                    setProduceForm({ ...produceForm, name: e.target.value })
                  }
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Category">
                  <select
                    className={inputCls(false)}
                    value={produceForm.category}
                    onChange={(e) =>
                      setProduceForm({
                        ...produceForm,
                        category: e.target.value,
                      })
                    }
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Season">
                  <select
                    className={inputCls(false)}
                    value={produceForm.season}
                    onChange={(e) =>
                      setProduceForm({ ...produceForm, season: e.target.value })
                    }
                  >
                    {SEASONS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Quantity *" error={produceErrors.quantity}>
                  <input
                    type="number"
                    className={inputCls(produceErrors.quantity)}
                    placeholder="e.g. 100"
                    value={produceForm.quantity}
                    onChange={(e) =>
                      setProduceForm({
                        ...produceForm,
                        quantity: e.target.value,
                      })
                    }
                  />
                </Field>
                <Field label="Unit">
                  <select
                    className={inputCls(false)}
                    value={produceForm.unit}
                    onChange={(e) =>
                      setProduceForm({ ...produceForm, unit: e.target.value })
                    }
                  >
                    {UNITS.map((u) => (
                      <option key={u}>{u}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Grade">
                  <select
                    className={inputCls(false)}
                    value={produceForm.grade}
                    onChange={(e) =>
                      setProduceForm({ ...produceForm, grade: e.target.value })
                    }
                  >
                    {GRADES.map((g) => (
                      <option key={g} value={g}>
                        Grade {g}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Harvest Date *" error={produceErrors.harvestDate}>
                  <input
                    type="date"
                    className={inputCls(produceErrors.harvestDate)}
                    value={produceForm.harvestDate}
                    onChange={(e) =>
                      setProduceForm({
                        ...produceForm,
                        harvestDate: e.target.value,
                      })
                    }
                  />
                </Field>
              </div>
              <Field label="Expected MSP (₹/unit) *" error={produceErrors.msp}>
                <input
                  type="number"
                  className={inputCls(produceErrors.msp)}
                  placeholder="e.g. 2275"
                  value={produceForm.msp}
                  onChange={(e) =>
                    setProduceForm({ ...produceForm, msp: e.target.value })
                  }
                />
              </Field>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowAddProduce(false);
                    setEditId(null);
                    setProduceErrors({});
                  }}
                  className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-lg hover:bg-slate-50 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProduce}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg text-sm shadow-md transition-all"
                >
                  {editId ? "Save Changes" : "Add Produce"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBMIT TO FPO MODAL */}
      {showSubmit && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ClipboardList size={18} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-slate-900">
                    Submit Produce to FPO
                  </h2>
                  <p className="text-slate-400 text-xs">
                    Your submission will be reviewed by admin
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowSubmit(false);
                  setSubmitErrors({});
                }}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <Field
                label="Select Your Produce *"
                error={submitErrors.commodityId}
              >
                <select
                  className={inputCls(submitErrors.commodityId)}
                  value={submitForm.commodityId}
                  onChange={(e) =>
                    setSubmitForm({
                      ...submitForm,
                      commodityId: e.target.value,
                    })
                  }
                >
                  <option value="">-- Select Crop --</option>
                  {commodities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.quantity} {c.unit} available)
                    </option>
                  ))}
                </select>
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Quantity to Submit *"
                  error={submitErrors.quantity}
                >
                  <input
                    type="number"
                    className={inputCls(submitErrors.quantity)}
                    placeholder="Qtl"
                    value={submitForm.quantity}
                    onChange={(e) =>
                      setSubmitForm({ ...submitForm, quantity: e.target.value })
                    }
                  />
                </Field>
                <Field label="Grade">
                  <select
                    className={inputCls(false)}
                    value={submitForm.grade}
                    onChange={(e) =>
                      setSubmitForm({ ...submitForm, grade: e.target.value })
                    }
                  >
                    {GRADES.map((g) => (
                      <option key={g} value={g}>
                        Grade {g}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field
                label="Expected Price (₹/unit) *"
                error={submitErrors.price}
              >
                <input
                  type="number"
                  className={inputCls(submitErrors.price)}
                  placeholder="e.g. 2300"
                  value={submitForm.price}
                  onChange={(e) =>
                    setSubmitForm({ ...submitForm, price: e.target.value })
                  }
                />
              </Field>
              <Field label="Collection Date">
                <input
                  type="date"
                  className={inputCls(false)}
                  value={submitForm.date}
                  onChange={(e) =>
                    setSubmitForm({ ...submitForm, date: e.target.value })
                  }
                />
              </Field>
              <Field label="Collection Point">
                <input
                  className={inputCls(false)}
                  value={submitForm.collectionPoint}
                  onChange={(e) =>
                    setSubmitForm({
                      ...submitForm,
                      collectionPoint: e.target.value,
                    })
                  }
                />
              </Field>

              {submitForm.quantity && submitForm.price && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-3">
                  <Clock size={16} className="text-blue-500 shrink-0" />
                  <div>
                    <p className="text-blue-700 font-semibold text-sm">
                      {"Expected: ₹" +
                        fmt(
                          Number(submitForm.quantity) *
                            Number(submitForm.price),
                        )}
                    </p>
                    <p className="text-blue-500 text-xs">
                      Pending FPO approval — actual payment may vary
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowSubmit(false);
                    setSubmitErrors({});
                  }}
                  className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-lg hover:bg-slate-50 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={saveSubmission}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm shadow-md transition-all"
                >
                  Submit to FPO
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 rounded-t-2xl flex justify-between items-center">
              <div>
                <h2 className="text-white font-extrabold text-lg">
                  {showDetail.name}
                </h2>
                <p className="text-emerald-200 text-xs">
                  {showDetail.category + " · " + showDetail.season}
                </p>
              </div>
              <button
                onClick={() => setShowDetail(null)}
                className="text-white/70 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              {[
                {
                  l: "Quantity",
                  v: fmt(showDetail.quantity) + " " + showDetail.unit,
                },
                { l: "Grade", v: "Grade " + showDetail.grade },
                { l: "MSP", v: "₹" + fmt(showDetail.msp) },
                { l: "Market Price", v: "₹" + fmt(showDetail.marketPrice) },
                { l: "Harvest Date", v: showDetail.harvestDate },
                { l: "Status", v: showDetail.status },
              ].map((r) => (
                <div key={r.l} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">{r.l}</p>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">
                    {r.v}
                  </p>
                </div>
              ))}
            </div>
            <div className="px-4 pb-4 flex gap-2">
              <button
                onClick={() => openEdit(showDetail)}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-lg text-sm transition-all"
              >
                Edit
              </button>
              <button
                onClick={() => setDeleteConfirm(showDetail.id)}
                className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-semibold py-2 rounded-lg text-sm transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <AlertCircle size={40} className="text-red-500 mx-auto mb-3" />
            <h3 className="font-extrabold text-slate-900 text-lg mb-1">
              Remove this produce?
            </h3>
            <p className="text-slate-500 text-sm mb-5">
              This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-slate-200 font-semibold py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteProduce(deleteConfirm)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-all"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProduceMember;
