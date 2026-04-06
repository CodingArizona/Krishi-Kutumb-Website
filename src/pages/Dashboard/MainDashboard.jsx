import React, { useState } from "react";
import Header from "../../components/Common/Header";
import CEODashboard from "../../pages/Dashboard/CEODashboard";
import DirectorDashboard from "../../pages/Dashboard/DirectorDashboard";
import AccountantDashboard from "../../pages/Dashboard/AccountantDashboard";
import PromoterDashboard from "../../pages/Dashboard/PromoterDashboard";
import MemberDashboard from "../../pages/Dashboard/MemberDashboard";
import {
  Building2,
  Users,
  Crown,
  Calculator,
  TrendingUp,
  Lock,
} from "lucide-react";
import useAuthStore from "../../store/authStore";
import { ROLES } from "../../config/constants";

// ─── Role Card Component ───────────────────────────────────────────────────────
function RoleCard({
  icon,
  title,
  subtitle,
  description,
  badge,
  badgeColor,
  bgGradient,
  borderColor,
  onClick,
  locked = false,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={locked ? undefined : onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative bg-gradient-to-br ${bgGradient} border-2 ${borderColor} rounded-2xl p-6 overflow-hidden
                  ${locked ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
      style={{
        transition: "all 0.28s cubic-bezier(0.34,1.56,0.64,1)",
        transform:
          !locked && hovered
            ? "translateY(-8px) scale(1.03)"
            : "translateY(0) scale(1)",
        boxShadow:
          !locked && hovered
            ? "0 20px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.07)"
            : "0 2px 12px rgba(0,0,0,0.05)",
      }}
    >
      {/* ── Lock Icon — top right ── */}
      {locked && (
        <div className="absolute top-3 right-3 z-20 bg-gray-200 rounded-full p-1.5 shadow">
          <Lock className="w-4 h-4 text-gray-500" />
        </div>
      )}

      {/* Decorative orb */}
      <div
        className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white"
        style={{ opacity: hovered ? 0.12 : 0.06, transition: "opacity 0.3s" }}
      />

      {/* Icon */}
      <div
        className="mb-4 inline-flex items-center justify-center p-3 bg-white rounded-xl text-gray-700"
        style={{
          boxShadow: hovered
            ? "0 4px 18px rgba(0,0,0,0.13)"
            : "0 2px 8px rgba(0,0,0,0.08)",
          transition: "box-shadow 0.28s",
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm font-semibold text-gray-700 mb-2">{subtitle}</p>
      <p className="text-xs text-gray-600 mb-4 leading-relaxed">
        {description}
      </p>

      {/* Badge */}
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}`}
      >
        {badge}
      </span>

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 rounded-b-2xl"
        style={{
          opacity: !locked && hovered ? 1 : 0,
          transition: "opacity 0.28s",
        }}
      />
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────
const MainDashboard = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const { userType, _hasHydrated } = useAuthStore(); // ✅ userType alag, profile nahi chahiye

  // ✅ Hydration complete hone tak loading dikhao
  if (!_hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  // ✅ userType ab directly store se aata hai — profile se nahi
  const isMember = userType?.toLowerCase() === ROLES.MEMBER.toLowerCase();

  // Role-based rendering
  if (selectedRole === "ceo")
    return <CEODashboard onSwitchRole={() => setSelectedRole(null)} />;
  if (selectedRole === "director")
    return <DirectorDashboard onSwitchRole={() => setSelectedRole(null)} />;
  if (selectedRole === "accountant")
    return <AccountantDashboard onSwitchRole={() => setSelectedRole(null)} />;
  if (selectedRole === "promoter")
    return <PromoterDashboard onSwitchRole={() => setSelectedRole(null)} />;
  if (selectedRole === "member")
    return <MemberDashboard onSwitchRole={() => setSelectedRole(null)} />;

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="flex-1 flex items-center justify-center px-4 overflow-y-auto py-8">
          <div className="w-full max-w-6xl">
            {/* Heading */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Select Your Administrative Role
              </h1>
              <p className="text-lg text-gray-600">
                Choose how you want to access the FPO system
              </p>
            </div>

            {/* Cards */}
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {/* <RoleCard
                  icon={<Users className="w-14 h-14" />}
                  title="CEO"
                  subtitle="Executive Leadership"
                  description="Strategic oversight & organization management"
                  badge="Executive"
                  badgeColor="bg-teal-100 text-teal-700"
                  bgGradient="from-teal-50 to-teal-100"
                  borderColor="border-teal-200"
                  locked={false}
                  onClick={() => setSelectedRole("member")}
                /> */}
             
                <RoleCard
                  icon={<Crown className="w-14 h-14" />}
                  title="CEO"
                  subtitle="Executive Leadership"
                  description="Strategic oversight & organization management"
                  badge="Executive"
                  badgeColor="bg-purple-100 text-purple-700"
                  bgGradient="from-purple-50 to-purple-c100"
                  borderColor="border-purple-200"
                  locked={isMember}
                  onClick={() => setSelectedRole("ceo")}
                />

                <RoleCard
                  icon={<Building2 className="w-14 h-14" />}
                  title="Director"
                  subtitle="Operations Head"
                  description="Project & resource management"
                  badge="Operations"
                  badgeColor="bg-blue-100 text-blue-700"
                  bgGradient="from-blue-50 to-blue-100"
                  borderColor="border-blue-200"
                  locked={isMember}
                  onClick={() => setSelectedRole("director")}
                />

                <RoleCard
                  icon={<Calculator className="w-14 h-14" />}
                  title="Accountant"
                  subtitle="Finance Manager"
                  description="Financial records & budget tracking"
                  badge="Finance"
                  badgeColor="bg-green-100 text-green-700"
                  bgGradient="from-green-50 to-green-100"
                  borderColor="border-green-200"
                  locked={isMember}
                  onClick={() => setSelectedRole("accountant")}
                />

                <RoleCard
                  icon={<TrendingUp className="w-14 h-14" />}
                  title="Promoter"
                  subtitle="Growth Manager"
                  description="Marketing & member engagement"
                  badge="Growth"
                  badgeColor="bg-orange-100 text-orange-700"
                  bgGradient="from-orange-50 to-orange-100"
                  borderColor="border-orange-200"
                  locked={isMember}
                  onClick={() => setSelectedRole("promoter")}
                />

                    {/* <RoleCard
                  icon={<Users className="w-14 h-14" />}
                  title="FPO Member"
                  subtitle="Member Portal"
                  description="Access your farm data & community resources"
                  badge="Member Access"
                  badgeColor="bg-teal-100 text-teal-700"
                  bgGradient="from-teal-50 to-teal-100"
                  borderColor="border-teal-200"
                  locked={false}
                  onClick={() => setSelectedRole("member")}
                /> */}
              </div>
            </div>

            <div className="border-t pt-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
