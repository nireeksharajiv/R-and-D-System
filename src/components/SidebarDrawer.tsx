import { LayoutDashboard, FolderKanban, Users, BookOpen, DollarSign, LogOut, X, FileCheck } from 'lucide-react';
import { Button } from './ui/button';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
  onLogout: () => void;
}

export function SidebarDrawer({ isOpen, onClose, activeView, setActiveView, onLogout }: SidebarDrawerProps) {
  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'researchers', label: 'Researchers', icon: Users },
    { id: 'publications', label: 'Publications', icon: BookOpen },
    { id: 'funding', label: 'Funding', icon: DollarSign },
    { id: 'patents', label: 'Patents', icon: FileCheck },
  ];

  const handleNavigation = (viewId: string) => {
    setActiveView(viewId);
    onClose();
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 border-r border-gray-200 flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: '#09015f' }}
      >
        <div className="p-6 border-b border-white/20 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">RNSIT</h1>
            <p className="text-sm text-white/80 mt-1">Research and Development System</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <nav className="px-3 flex-1 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-colors ${
                  activeView === item.id
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-white/20">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-white/80 hover:text-red-300 hover:bg-white/10"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>
    </>
  );
}
