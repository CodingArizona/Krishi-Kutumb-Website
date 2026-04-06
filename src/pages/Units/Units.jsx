import React, { useState, useEffect } from "react";
import { Building2, Users } from "lucide-react";
import useAuthStore from "../../store/authStore";
import useAuth from "../../hooks/useAuth";
import Header from "../../components/Common/Header";
import MyFPO from "./MyFPO";
import AllFPO from "./AllFPO";
import { getAllFPONearBy } from "../../services/api/authApi";

const Units = () => {
  const { profile, setSelectedUnit } = useAuthStore();
  const { syncProfile, startProfileWatch, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState(null);
  const [syncing, setSyncing] = useState(true);
  const [fpoList, setFpoList] = useState([]);
  const myFPOCount = profile?.unitDetails?.length || 0;

  useEffect(() => {
    setSelectedUnit(null);
    syncProfile().finally(() => setSyncing(false));
    const watchInterval = startProfileWatch(3000);

    // ─── Fetch All FPO once ───────────────────────────────────────────────
    getAllFPONearBy().then((data) => {
      setFpoList(Array.isArray(data) ? data : []);
    });

    return () => clearInterval(watchInterval);
  }, []);

  if (activeTab === "myFPO")
    return <MyFPO onBack={() => setActiveTab(null)} fpoList={fpoList} />;
  if (activeTab === "allFPO")
    return <AllFPO onBack={() => setActiveTab(null)} fpoList={fpoList} />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <Header title="FPO Units" />

        {syncing || isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-15 h-15 border-4 border-black-500 border-t-transparent
                              rounded-full animate-spin"
              />
              <p className="text-xl text-gray-500 font-semibold">Loading...</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Select Your FPO
              </h1>
              <p className="text-lg text-gray-600">
                Choose which FPO you want to access
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
              {/* My FPO Card */}
              <div
                onClick={() => setActiveTab("myFPO")}
                className="group relative bg-gradient-to-br from-green-50 to-green-100
                           border-2 border-green-200 rounded-2xl p-6 cursor-pointer
                           transition-all duration-300 hover:shadow-xl hover:scale-105
                           overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100
                                transition-opacity duration-300"
                >
                  <div
                    className="absolute -right-12 -top-12 w-40 h-40 bg-white
                                  rounded-full opacity-10"
                  />
                </div>
                <div className="relative z-10">
                  <div
                    className="mb-4 inline-block p-3 bg-white rounded-xl
                                  group-hover:shadow-lg transition-shadow duration-300"
                  >
                    <Building2 className="w-14 h-14 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">My FPO</h3>
                  <p className="text-xs text-gray-600 mb-4">
                    Your FPO units on the platform
                  </p>
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs
                                  font-semibold bg-green-100 text-green-700"
                  >
                    {myFPOCount} Units Joined
                  </div>
                  <div
                    className="mt-4 h-1 w-8 bg-gradient-to-r from-green-500
                                  to-teal-500 rounded-full opacity-0
                                  group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>

              {/* All FPO Card */}
              <div
                onClick={() => setActiveTab("allFPO")}
                className="group relative bg-gradient-to-br from-green-50 to-green-100
                           border-2 border-green-200 rounded-2xl p-6 cursor-pointer
                           transition-all duration-300 hover:shadow-xl hover:scale-105
                           overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100
                                transition-opacity duration-300"
                >
                  <div
                    className="absolute -right-12 -top-12 w-40 h-40 bg-white
                                  rounded-full opacity-10"
                  />
                </div>
                <div className="relative z-10">
                  <div
                    className="mb-4 inline-block p-3 bg-white rounded-xl
                                  group-hover:shadow-lg transition-shadow duration-300"
                  >
                    <Users className="w-14 h-14 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    All FPO
                  </h3>
                  <p className="text-xs text-gray-600 mb-4">
                    View Registered FPO units on the platform
                  </p>
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs
                                  font-semibold bg-green-100 text-green-700"
                  >
                    {fpoList.length} FPOs Listed
                  </div>
                  <div
                    className="mt-4 h-1 w-8 bg-gradient-to-r from-green-500
                                  to-teal-500 rounded-full opacity-0
                                  group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-600 w-full max-w-2xl mt-12" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Units;