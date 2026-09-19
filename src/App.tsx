import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AuthModal } from './components/AuthModal';
import { OnboardingModal } from './components/OnboardingModal';
import { HomeView } from './views/HomeView';
import { LearnView } from './views/LearnView';
import { PracticeView } from './views/PracticeView';
import { ProgressView } from './views/ProgressView';
import { ProfileView } from './views/ProfileView';
import { AdminVocabularyView } from './views/AdminVocabularyView';
import { storageService } from './services/storageService';
import { UserProfile, EnglishLevel, TargetImprovementArea } from './types';

export function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile>(() =>
    storageService.getCurrentUser()
  );
  const [activeTab, setActiveTab] = useState<string>('home');
  const [practiceWordId, setPracticeWordId] = useState<string | undefined>(undefined);

  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Keep state in sync with local storage service
  useEffect(() => {
    const user = storageService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleAuthSuccess = (user: UserProfile, isNewSignUp?: boolean) => {
    setCurrentUser(user);
    if (isNewSignUp) {
      setIsOnboardingOpen(true);
    }
  };

  const handleOnboardingComplete = (
    level: EnglishLevel,
    improvement: TargetImprovementArea
  ) => {
    if (!currentUser) return;
    const updated = storageService.updateUserProfile(currentUser.id, {
      currentLevel: level,
      targetImprovement: improvement
    });
    if (updated) {
      setCurrentUser(updated);
    }
    setIsOnboardingOpen(false);
    setActiveTab('practice');
  };

  const handleLogout = () => {
    storageService.logout();
    // Return smoothly to demo mode without showing a login wall
    const demo = storageService.getCurrentUser();
    setCurrentUser(demo);
    setActiveTab('home');
  };

  const handleEnterDemo = () => {
    const demo = storageService.enterDemoMode();
    setCurrentUser(demo);
    setActiveTab('home');
    setPracticeWordId(undefined);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToPractice = (wordId?: string) => {
    setPracticeWordId(wordId);
    setActiveTab('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tab: string, wordId?: string) => {
    // Strictly protect Admin access from demo users
    if (tab === 'admin' && (!currentUser?.isAdmin || currentUser?.isDemo)) {
      setActiveTab('home');
      return;
    }
    // Strictly protect Profile access from demo users
    if (tab === 'profile' && currentUser?.isDemo) {
      setActiveTab('home');
      setIsAuthOpen(true);
      return;
    }
    setPracticeWordId(wordId);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Guard against demo users landing on profile view
  useEffect(() => {
    if (currentUser?.isDemo && activeTab === 'profile') {
      setActiveTab('home');
    }
  }, [currentUser?.isDemo, activeTab]);

  const handleResetDemo = () => {
    const fresh = storageService.resetDemoData();
    setCurrentUser(fresh);
    setPracticeWordId(undefined);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-[#1FBAC0]/20 selection:text-[#0B749C]">
      {/* Top Navigation */}
      <Navbar
        user={currentUser}
        activeTab={activeTab}
        isDemoEntered={storageService.isDemoEntered()}
        onEnterDemo={handleEnterDemo}
        onSelectTab={handleSelectTab}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 pb-24 md:pb-12">
        {activeTab === 'home' && (
          <HomeView user={currentUser} onNavigate={handleSelectTab} />
        )}

        {activeTab === 'learn' && (
          <LearnView
            userId={currentUser.id}
            onSelectWordToPractice={(id) => handleNavigateToPractice(id)}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeView
            user={currentUser}
            selectedWordId={practiceWordId}
            onUserUpdated={setCurrentUser}
            onBackToDashboard={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressView
            user={currentUser}
            onSelectWordToPractice={(id) => handleNavigateToPractice(id)}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {/* Profile strictly available only to authenticated users */}
        {activeTab === 'profile' && !currentUser.isDemo && (
          <ProfileView
            user={currentUser}
            onUserUpdated={setCurrentUser}
            onLogout={handleLogout}
            onOpenAuth={() => setIsAuthOpen(true)}
            onResetDemo={handleResetDemo}
          />
        )}

        {/* Admin Vocabulary Management: Strictly accessible only to authenticated admins */}
        {activeTab === 'admin' && !currentUser.isDemo && currentUser.isAdmin && (
          <AdminVocabularyView />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        isDemo={currentUser?.isDemo}
      />

      {/* Auth Modal (Optional sign-in for recruiter / account save) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Onboarding Modal */}
      {isOnboardingOpen && currentUser && (
        <OnboardingModal
          initialLevel={currentUser.currentLevel}
          initialImprovement={currentUser.targetImprovement}
          onSave={handleOnboardingComplete}
        />
      )}
    </div>
  );
}

export default App;
