import React, { useState } from "react";
import {
  ArrowLeft,
  Search,
  Building2,
  MapPin,
  Users,
  Leaf,
} from "lucide-react";

const AllFPO = ({ onBack, fpoList = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredList = fpoList.filter((unit) => {
    const q = searchQuery.toLowerCase();
    return (
      unit.groupName?.toLowerCase().includes(q) ||
      unit.district?.toLowerCase().includes(q) ||
      unit.state?.toLowerCase().includes(q) ||
      unit.groupType?.toLowerCase().includes(q)
    );
  });

  const cardColors = [
    {
      bg: "from-violet-500 to-purple-600",
      border: "border-violet-200",
      icon: "bg-violet-100",
      iconText: "text-violet-600",
    },
    {
      bg: "from-emerald-500 to-teal-600",
      border: "border-emerald-200",
      icon: "bg-emerald-100",
      iconText: "text-emerald-600",
    },
    {
      bg: "from-blue-500 to-cyan-600",
      border: "border-blue-200",
      icon: "bg-blue-100",
      iconText: "text-blue-600",
    },
    {
      bg: "from-orange-500 to-amber-600",
      border: "border-orange-200",
      icon: "bg-orange-100",
      iconText: "text-orange-600",
    },
    {
      bg: "from-rose-500 to-pink-600",
      border: "border-rose-200",
      icon: "bg-rose-100",
      iconText: "text-rose-600",
    },
  ];

  return (
    <div className="flex flex-col bg-gray-50 h-screen overflow-hidden">
      {/* ── Hero Header ── */}
      <div className="relative px-6 pt-6 pb-10 overflow-hidden flex-shrink-0 bg-gradient-to-br from-green-600 to-emerald-900">
        <div className="absolute -top-10 -right-10 w-52 h-52 bg-white/5 rounded-full" />
        <div className="absolute -bottom-16 -left-10 w-72 h-72 bg-white/5 rounded-full" />
        <div className="text-center relative z-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl mb-3 backdrop-blur-sm">
            <Leaf size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white mb-1 tracking-tight">
            All FPO
          </h1>
          <p className="text-green-200 text-sm font-medium">
            Explore all Farmer Producer Organizations
          </p>
        </div>
      </div>

      {/* ── Floating Search Bar ── */}
      <div className="px-4 -mt-6 mb-2 relative z-10 max-w-lg mx-auto w-full flex-shrink-0">
        <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 shadow-xl shadow-gray-200/80 border border-gray-100">
          <Search size={18} className="text-gray-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, state, district..."
            className="flex-1 outline-none text-sm font-semibold text-gray-700 placeholder-gray-400 bg-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="w-5 h-5 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <span className="text-gray-500 text-xs font-bold">✕</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Back Button + Count ── */}
      <div className="px-4 max-w-6xl mx-auto w-full flex-shrink-0 flex items-center justify-between mb-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-green-600 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Units
        </button>
        {filteredList.length > 0 && (
          <span className="bg-green-100 text-green-700 text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase">
            {filteredList.length} FPO{filteredList.length > 1 ? "s" : ""} Found
          </span>
        )}
      </div>

      {/* ── Scrollable Cards Area ── */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 max-w-6xl mx-auto w-full [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        {fpoList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="relative w-16 h-16 mb-5">
              <div className="absolute inset-0 border-4 border-green-100 rounded-full" />
              <div className="absolute inset-0 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-gray-500 text-sm font-semibold">
              Loading FPOs...
            </p>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mb-6">
              <Search size={40} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-black text-gray-800 mb-2">
              No Results
            </h2>
            <p className="text-gray-400 text-sm text-center mb-8">
              No FPO matches "{searchQuery}".
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-95"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
            {filteredList.map((unit, index) => {
              const color = cardColors[index % cardColors.length];
              return (
                <div
                  key={unit.groupId}
                  className={`group relative rounded-2xl overflow-visible border ${color.border} bg-white cursor-default transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl`}
                >
                  <div
                    className={`h-24 bg-gradient-to-br ${color.bg} relative overflow-hidden rounded-t-2xl`}
                  >
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-6 -left-4 w-16 h-16 bg-white/10 rounded-full" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold bg-white/20 text-white backdrop-blur-sm">
                      {unit.groupType || "FPO"}
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-lg px-2.5 py-1">
                      <Users size={11} className="text-white" />
                      <span className="text-white text-xs font-bold">
                        {unit.count}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`absolute top-[72px] left-5 w-12 h-12 ${color.icon} rounded-xl shadow-lg flex items-center justify-center border-2 border-white z-10 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Building2 className={`w-6 h-6 ${color.iconText}`} />
                  </div>

                  <div className="pt-9 px-5 pb-5">
                    <h3 className="text-base font-black text-gray-900 leading-tight mb-1 truncate">
                      {unit.groupName}
                    </h3>
                    <p className="text-xs font-semibold text-gray-400 mb-3 truncate">
                      {unit.groupOwnerFirstName} {unit.groupOwnerLastName}
                    </p>
                    <div className="border-t border-gray-100 mb-3" />
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-green-500 shrink-0" />
                      <p className="text-xs font-semibold text-gray-500 truncate">
                        {[unit.village, unit.district, unit.state]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 group-hover:from-white/5 transition-all duration-300 pointer-events-none rounded-2xl" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllFPO;
