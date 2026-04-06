import React from "react";
import useAuthStore from "../../../store/authStore";
import ProduceAdmin from "../Member/Produce/ProduceAdmin";
import ProduceMember from "../Member/Produce/Producemember";

/**
 * ADMIN roles — anyone in this list sees the full admin panel.
 * Adjust to match your actual role strings.
 */
const ADMIN_ROLES = [
  "CEO",
  "Director",
  "Admin",
  "Accountant",
  "K2 Support",
  "Promoter",
];

const Produce = () => {
  const { role, selectedUnit, profile } = useAuthStore();

  // ── derive the effective role ──────────────────────────────────────────────
  // Priority: explicit role from store → memberTypePrimary from selectedUnit
  // → memberTypePrimary from profile unitDetails
  const effectiveRole =
    role ||
    selectedUnit?.memberTypePrimary ||
    profile?.unitDetails?.[0]?.memberTypePrimary ||
    "Member";

  const isAdmin = ADMIN_ROLES.includes(effectiveRole);

  // return isAdmin ? <ProduceMember /> : <ProduceAdmin />;
  return isAdmin ? <ProduceAdmin /> : <ProduceMember />;
};

export default Produce;
