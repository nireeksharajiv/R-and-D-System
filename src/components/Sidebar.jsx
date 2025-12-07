import { LayoutDashboard, FolderKanban, Users, BookOpen, DollarSign, LogOut, User } from 'lucide-react';
import { Button } from './ui/button';

export function Sidebar({ activeView, setActiveView, user, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'researchers', label: 'Researchers', icon: Users },
    { id: 'publications', label: 'Publications', icon: BookOpen },
    { id: 'funding', label: 'Funding', icon: DollarSign },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-blue-600">RNS Institute of Technology</h1>
        <p className="text-sm text-gray-500 mt-1">R&D Monitoring System</p>
      </div>
      
      {user && (
        <div className="px-3 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <User className="w-4 h-4 text-gray-600" />
              <p className="text-sm text-gray-900 truncate">{user.email}</p>
            </div>
            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
      )}

      <nav className="px-3 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-colors ${
                activeView === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
}
