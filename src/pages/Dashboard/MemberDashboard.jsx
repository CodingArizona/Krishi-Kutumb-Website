import React, { useState } from "react";
import Header from "../../components/Common/Header";
import Sidebar from "../DashboardSubsections/Sidebar";
import DashboardPage from "../DashboardSubsections/Member/Dashboard";
import MembersPage from "../DashboardSubsections/Member/Member";
import StorePage from "../DashboardSubsections/Member/Store";
import ProducePage from "../DashboardSubsections/Member/Produce";
import ServicesPage from "../DashboardSubsections/Member/Services";
import IssueBoxPage from "../DashboardSubsections/Member/IssueBox";
import ReportsPage from "../DashboardSubsections/Member/Reports";
import Inventory from "../DashboardSubsections/Member/Inventory";

const MemberDashboard = ({ onSwitchRole }) => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header onSwitchRole={onSwitchRole} />

      <div className="flex">
        {/* Sidebar Navigation */}
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

        {/* Main Content */}
        <main className="ml-64 flex-1">
          <div className="p-8 max-w-7xl">
            {/* DASHBOARD PAGE */}
            {currentPage === "dashboard" && <DashboardPage />}
            {/* MEMBERS PAGE */}
            {currentPage === "members" && <MembersPage />}
            {/* CAPACITY HUB PAGE */}
            {currentPage === "capacity" && <Inventory />}
            {/* STORE PAGE */}
            {currentPage === "store" && <StorePage />}
            {/* PRODUCE PAGE */}
            {currentPage === "produce" && <ProducePage />}
            {/* SERVICES PAGE */}
            {currentPage === "services" && <ServicesPage />}
            {/* ISSUE BOX PAGE */}
            {currentPage === "issuebox" && <IssueBoxPage />}
            {/* main content mein */}
            {currentPage === "reports" && <ReportsPage />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MemberDashboard;
