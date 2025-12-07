import { useState } from 'react';
import { ProjectsView } from './components/ProjectsView';
import { ResearchersView } from './components/ResearchersView';
import { PublicationsView } from './components/PublicationsView';
import { FundingView } from './components/FundingView';
import { PatentsView } from './components/PatentsView';
import { LoginPage } from './components/LoginPage';
import { HomePage } from './components/HomePage';
import { SidebarDrawer } from './components/SidebarDrawer';
import { Menu } from 'lucide-react';
import rnsitLogo from "./assets/7729111e9bb179f17e012a0b791872ccab93c1de.png";


export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (email, role) => {
    setUser({ email, role });
    setIsAuthenticated(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setActiveView('home');
  };

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: '#1F3FAF' }}>
      {/* Top Header Section */}
      <div className="w-full bg-white px-8 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo and Title */}
            <img
              src={rnsitLogo}
              alt="RNSIT Logo"
              className="w-16 h-16 object-contain"
            />
            <div className="flex flex-col">
              <h2 className="text-gray-700">RNS Institute of Technology</h2>
              <h1 className="text-gray-900">R&D Monitoring System</h1>
            </div>
          </div>
          
          {/* Login/Logout Button */}
          <div>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-[#09015f] hover:bg-[#0a0270] text-white px-6 py-2 rounded-md transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-[#09015f] hover:bg-[#0a0270] text-white px-6 py-2 rounded-md transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Top Navigation Bar */}
      <nav className="w-full bg-[#0a3d79] border-b border-gray-200 shadow-md">
        <div className="max-w-full px-8 py-3">
          <div className="flex items-center justify-between">
            {/* Hamburger Menu */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors mr-4"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>

            <ul className="flex items-center justify-center gap-8 flex-wrap flex-1">
              <li>
                <button onClick={() => setActiveView('home')} className="text-white hover:text-blue-200 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <a href="#about" className="text-white hover:text-blue-200 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#people" className="text-white hover:text-blue-200 transition-colors">
                  People
                </a>
              </li>
              <li>
                <a href="#centres" className="text-white hover:text-blue-200 transition-colors">
                  Centres
                </a>
              </li>
              <li>
                <a href="#facility" className="text-white hover:text-blue-200 transition-colors">
                  Facility
                </a>
              </li>
              <li>
                <a href="#events" className="text-white hover:text-blue-200 transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#forms" className="text-white hover:text-blue-200 transition-colors">
                  Forms
                </a>
              </li>
              <li>
                <a href="#faq" className="text-white hover:text-blue-200 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white hover:text-blue-200 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Sidebar Drawer */}
      <SidebarDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeView={activeView}
        setActiveView={setActiveView}
        onLogout={handleLogout}
      />

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowLoginModal(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <LoginPage
              onLogin={handleLogin}
              onSwitchToSignup={() => {}}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {activeView === 'home' && <HomePage onNavigate={setActiveView} />}
        {activeView === 'projects' && <ProjectsView />}
        {activeView === 'researchers' && <ResearchersView />}
        {activeView === 'publications' && <PublicationsView />}
        {activeView === 'funding' && <FundingView />}
        {activeView === 'patents' && <PatentsView />}
      </main>
    </div>
  );
}
