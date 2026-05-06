import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  BookOpen, 
  Code2, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: BookOpen, label: 'Resources', href: '/resources' },
  { icon: Code2, label: 'Editor', href: '/editor' },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-app-surface border-r border-app h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          DevSignal
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              isActive 
                ? "bg-blue-600/10 text-blue-400 font-medium" 
                : "text-slate-400 hover:opacity-90 hover:text-app"
            )}
          >
            <item.icon size={20} className={cn(
              "transition-transform duration-200 group-hover:scale-110",
              "group-[.active]:text-blue-400"
            )} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:opacity-90 hover:text-app w-full transition-all group">
          <Settings size={20} className="group-hover:rotate-45 transition-transform" />
          <span>Settings</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 w-full transition-all group">
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
