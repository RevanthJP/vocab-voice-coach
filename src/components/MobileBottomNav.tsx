import React from 'react';
import { Home, BookOpen, Mic, Award, User } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  isDemo?: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  isDemo
}) => {
  const baseTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Mic, isHero: true },
    { id: 'progress', label: 'Progress', icon: Award }
  ];

  const tabs = isDemo
    ? baseTabs
    : [...baseTabs, { id: 'profile', label: 'Profile', icon: User }];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.isHero) {
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className="relative -top-3 flex flex-col items-center group focus:outline-hidden"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all ${
                    isActive
                      ? 'bg-gradient-to-tr from-[#0B749C] to-[#1FBAC0] text-white ring-4 ring-[#1FBAC0]/20 scale-105'
                      : 'bg-gradient-to-tr from-[#0B749C] to-[#1FBAC0] text-white opacity-95 group-hover:scale-105'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span
                  className={`text-[11px] font-bold mt-1 ${
                    isActive ? 'text-[#0B749C]' : 'text-slate-600'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors focus:outline-hidden ${
                isActive ? 'text-[#0B749C]' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className={`text-[11px] mt-1 font-medium ${isActive ? 'font-bold text-[#0B749C]' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
