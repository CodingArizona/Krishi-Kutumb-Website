import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FPOProvider } from "./context/FPOContext";
import AppRoutes from "./routes/index";

const FullScreenLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-fpo-cream">
    <div className="flex flex-col items-center gap-4">
      <div className="w-14 h-14 border-4 border-fpo-green border-t-transparent rounded-full animate-spin" />
      <p className="text-fpo-green font-bold text-xl tracking-wide">
        K2KrishiKutumb
      </p>
      <p className="text-gray-500 text-sm">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <FPOProvider>
          <Suspense fallback={<FullScreenLoader />}>
            <AppRoutes />
          </Suspense>
        </FPOProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
