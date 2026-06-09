import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';
import HeroSection from './HeroSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import LoadingScreen from './LoadingScreen';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  if (isAuthenticated===false) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const tabs = [
    { id: 0, label: 'Hero Section' },
    { id: 1, label: 'Skills' },
    { id: 2, label: 'Projects' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {isAuthenticated === null && <LoadingScreen />}
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(96,165,250,0.15)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(167,139,250,0.15)_0%,transparent_50%)]" />

      {/* AppBar */}
      <div className="relative z-10 bg-[#111111]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-slate-100">
              Portfolio Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="bg-[#111111]/70 backdrop-blur-xl border border-white/10 rounded-xl mb-6">
          <div className="flex border-b border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 0 && <HeroSection />}
          {activeTab === 1 && <SkillsSection />}
          {activeTab === 2 && <ProjectsSection />}
        </div>
      </div>
    </div>
  );
}
