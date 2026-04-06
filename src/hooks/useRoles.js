import useAuthStore from "../store/authStore";
import { ROLES } from "../config/constants";

const useRoles = () => {
  const { role, profile } = useAuthStore();

  // ─── Role Checks ────────────────────────────────────────────────────────────
  const isCEO = role === ROLES.CEO;
  const isDirector = role === ROLES.DIRECTOR;
  const isAccountant = role === ROLES.ACCOUNTANT;
  const isPromoter = role === ROLES.PROMOTER;
  const isMember = role === ROLES.MEMBER;

  // ─── Permission Groups ──────────────────────────────────────────────────────
  const isManagement = [ROLES.CEO, ROLES.DIRECTOR].includes(role);
  const isFinance = [ROLES.CEO, ROLES.ACCOUNTANT].includes(role);
  const isFieldWorker = [ROLES.PROMOTER, ROLES.MEMBER].includes(role);
  const canViewReports = [ROLES.CEO, ROLES.DIRECTOR, ROLES.ACCOUNTANT].includes(
    role,
  );
  const canManageUsers = [ROLES.CEO, ROLES.DIRECTOR].includes(role);
  const canEditData = [ROLES.CEO, ROLES.DIRECTOR, ROLES.ACCOUNTANT].includes(
    role,
  );

  // ─── Generic Role Check ──────────────────────────────────────────────────────
  const hasRole = (checkRole) => role === checkRole;
  const hasAnyRole = (roles) => roles.includes(role);

  // ─── Permission Check ───────────────────────────────────────────────────────
  const can = (permission) => {
    const permissions = {
      // Dashboard
      "view:ceo_dashboard": isCEO,
      "view:director_dashboard": isDirector,
      "view:accountant_dashboard": isAccountant,
      "view:promoter_dashboard": isPromoter,
      "view:member_dashboard": isMember,

      // Members
      "manage:members": canManageUsers,
      "view:members": true,

      // Finance
      "view:finance": isFinance,
      "edit:finance": isCEO || isAccountant,

      // Reports
      "view:reports": canViewReports,
      "export:reports": isManagement,

      // FPO
      "create:fpo": isCEO,
      "edit:fpo": isManagement,
      "delete:fpo": isCEO,

      // Livestock
      "manage:livestock": true,

      // BuySell
      "manage:buysell": true,

      // Transport
      "manage:transport": isManagement || isPromoter,

      // IoT
      "view:iot": canViewReports,
      "manage:iot": isManagement,

      // Notifications
      "send:notifications": canManageUsers,
    };

    return permissions[permission] ?? false;
  };

  return {
    role,
    profile,
    // Role flags
    isCEO,
    isDirector,
    isAccountant,
    isPromoter,
    isMember,
    // Group flags
    isManagement,
    isFinance,
    isFieldWorker,
    canViewReports,
    canManageUsers,
    canEditData,
    // Functions
    hasRole,
    hasAnyRole,
    can,
  };
};

export default useRoles;
