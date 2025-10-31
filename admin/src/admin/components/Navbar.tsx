import { useState, useEffect } from 'react';
import { Menu, LogOut, Moon, Sun, User } from 'lucide-react';
import { getUserProfile, signOut } from '../../lib/auth';
import { Profile } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const data = await getUserProfile();
    setProfile(data);
  }

  async function handleLogout() {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  return (
    <nav className="bg-white border-b border-slate-200 px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-600 hover:text-slate-900"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="hidden lg:block">
          <h1 className="text-xl font-semibold text-slate-800">Admin Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-slate-600" />
            ) : (
              <Moon className="h-5 w-5 text-slate-600" />
            )}
          </button>

          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-50">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name || 'Admin'}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <User className="h-4 w-4 text-blue-600" />
              )}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-slate-800">
                {profile?.full_name || 'Admin'}
              </p>
              <p className="text-xs text-slate-500">{profile?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
