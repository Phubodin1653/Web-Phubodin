import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import { AnimatePresence } from 'framer-motion';
import notfound from "./Pages/404";
import NotFoundPage from "./Pages/404";

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />
          <Home />
          <About />
          <Portofolio />
          <ContactPage />
          <footer>
            <center>
              <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
              <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
                © 2025{" "}
                <a href="https://flowbite.com/" className="hover:underline">
                  Phubodin™
                </a>
                . All Rights Reserved.
              </span>
            </center>
          </footer>
        </>
      )}
    </>
  );
};

const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <footer>
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          © 2025{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Phubodin™
          </a>
          . All Rights Reserved.
        </span>
      </center>
    </footer>
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication on component mount
    const checkAuth = () => {
      const authStatus = localStorage.getItem("AUTH_LOGIN");
      const expiryTime = localStorage.getItem("AUTH_EXPIRY_TIME");
      const currentTime = Date.now();
      
      console.log("🔐 Auth Check:", { authStatus, expiryTime, currentTime }); 
      
      // ✅ เช็ค session timeout
      if (authStatus === "1" && expiryTime) {
        if (currentTime > parseInt(expiryTime)) {
          console.log("⏰ Session expired - Redirecting to login");
          localStorage.removeItem("AUTH_LOGIN");
          localStorage.removeItem("AUTH_LOGIN_TIME");
          localStorage.removeItem("AUTH_EXPIRY_TIME");
          window.location.href = "/login.html";
        } else {
          console.log("✅ Authenticated!");
          setIsAuthenticated(true);
        }
      } else {
        console.log("❌ Not authenticated - Redirecting to login");
        window.location.href = "/login.html";
      }
    };

    checkAuth();
    
    // ✅ เช็ค session timeout ทุก 5 วินาที
    const sessionCheckInterval = setInterval(() => {
      const authStatus = localStorage.getItem("AUTH_LOGIN");
      const expiryTime = localStorage.getItem("AUTH_EXPIRY_TIME");
      const currentTime = Date.now();
      
      if (authStatus === "1" && expiryTime && currentTime > parseInt(expiryTime)) {
        console.log("⏰ Session expired - Redirecting to login");
        localStorage.removeItem("AUTH_LOGIN");
        localStorage.removeItem("AUTH_LOGIN_TIME");
        localStorage.removeItem("AUTH_EXPIRY_TIME");
        window.location.href = "/login.html";
      }
    }, 5000);

    // ✅ ป้องกันการย้อนกลับ
    const preventBackNavigation = (e) => {
      const authStatus = localStorage.getItem("AUTH_LOGIN");
      if (authStatus === "1") {
        // เมื่อ back แล้ว ให้ push state ใหม่เพื่อป้องกัน
        history.pushState(null, null, window.location.href);
      }
    };

    window.addEventListener("popstate", preventBackNavigation);
    
    // ✅ Push initial state เมื่อ load หน้า
    history.pushState(null, null, window.location.href);

    return () => {
      clearInterval(sessionCheckInterval);
      window.removeEventListener("popstate", preventBackNavigation);
    };
  }, []);

  if (!isAuthenticated) {
    return <div></div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;