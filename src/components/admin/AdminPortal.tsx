import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Video, 
  BookOpen, 
  FolderKanban, 
  Star, 
  Users, 
  Settings, 
  Globe,
  LogOut, 
  Menu, 
  X, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import AdminLogin from './AdminLogin';
import DashboardView from './DashboardView';
import LiveWebinarView from './LiveWebinarView';
import ProgramsView from './ProgramsView';
import MediaAssetLibraryView from './MediaAssetLibraryView';
import TestimonialsView from './TestimonialsView';
import FacultyView from './FacultyView';
import SettingsView from './SettingsView';
import SEOManagerView from './SEOManagerView';

interface AdminPortalProps {
  navigate: (path: string) => void;
  currentPath: string;
}

export type AdminTab = 'dashboard' | 'webinar' | 'programs' | 'media' | 'testimonials' | 'faculty' | 'settings' | 'seo';

export default function AdminPortal({ navigate }: AdminPortalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('leo_admin_auth') === 'true';
  });

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('leo_admin_auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const menuItems = [
    { id: 'dashboard' as AdminTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'webinar' as AdminTab, label: 'Live Webinar', icon: Video },
    { id: 'programs' as AdminTab, label: 'Programs', icon: BookOpen },
    { id: 'media' as AdminTab, label: 'Media Library', icon: FolderKanban },
    { id: 'testimonials' as AdminTab, label: 'Testimonials', icon: Star },
    { id: 'faculty' as AdminTab, label: 'Faculty', icon: Users },
    { id: 'seo' as AdminTab, label: 'SEO Manager', icon: Globe },
    { id: 'settings' as AdminTab, label: 'Settings', icon: Settings },
  ];

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'webinar':
        return <LiveWebinarView />;
      case 'programs':
        return <ProgramsView />;
      case 'media':
        return <MediaAssetLibraryView />;
      case 'testimonials':
        return <TestimonialsView />;
      case 'faculty':
        return <FacultyView />;
      case 'seo':
        return <SEOManagerView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex font-sans antialiased">
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)} 
          className="fixed inset-0 bg-stone-950/50 z-40 lg:hidden backdrop-blur-xs" 
        />
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-stone-900 text-stone-100 flex flex-col transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand Header */}
        <div className="p-6 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-cinzel font-bold tracking-wider text-sm uppercase text-amber-400 block">
                LEO Family
              </span>
              <span className="text-[11px] text-stone-400 font-medium tracking-wide">
                Admin Control Center
              </span>
            </div>
          </div>
          <button 
            onClick={() => setMobileSidebarOpen(false)} 
            className="lg:hidden text-stone-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-stone-500 px-3 mb-2">
            Main Management
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-medium transition-all group
                  ${isActive 
                    ? 'bg-amber-600 text-white shadow-md font-semibold' 
                    : 'text-stone-300 hover:bg-stone-800/80 hover:text-white'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-amber-400 group-hover:scale-110 transition-transform'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 opacity-75" />}
              </button>
            );
          })}
        </nav>

        {/* Return to Public Website Quick Link */}
        <div className="p-4 border-t border-stone-800">
          <button
            onClick={() => navigate('/')}
            className="w-full py-2.5 px-3 rounded-xl bg-stone-800/60 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-medium transition-colors flex items-center justify-center gap-2 border border-stone-700/50"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span>View Public Website</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col lg:pl-72 min-w-0">
        {/* TOP HEADER */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200 h-16 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 hidden sm:inline">Admin</span>
              <span className="text-stone-300 hidden sm:inline">/</span>
              <h1 className="text-sm font-bold text-stone-900 font-cinzel capitalize">
                {activeTab === 'dashboard' ? 'Overview Dashboard' : activeTab}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-medium border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Firebase Auth Ready
            </div>

            <div className="h-6 w-px bg-stone-200 hidden sm:block" />

            {/* User Profile & Logout */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <div className="text-xs font-bold text-stone-900">Master Admin</div>
                <div className="text-[11px] text-stone-500">admin@leofamily.com</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-amber-600/10 text-amber-800 font-bold flex items-center justify-center text-xs border border-amber-500/30">
                MA
              </div>
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-2 rounded-xl text-stone-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* CONTENT BODY */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}
