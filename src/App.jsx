import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { SectorProvider, useSector } from './context/SectorContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { LoginPage } from './components/Auth/LoginPage';
import { UserDashboard } from './components/Dashboard/UserDashboard';
import SoftAurora from './components/Common/SoftAurora';

// Government Sector Modules
import { JobNotifications } from './components/GovSector/JobNotifications';
import { GovMockTest } from './components/GovSector/GovMockTest';
import { GovResources } from './components/GovSector/GovResources';

// IT Sector Modules
import { ITJobFinder } from './components/ITSector/ITJobFinder';
import { ResumeBuilder } from './components/ITSector/ResumeBuilder';
import { SkillSyncRoleMatcher } from './components/ITSector/SkillSyncRoleMatcher';
import { ATSScoreEvaluator } from './components/ITSector/ATSScoreEvaluator';
import { AIMockInterview } from './components/ITSector/AIMockInterview';
import { ITResources } from './components/ITSector/ITResources';

const MainContent = () => {
  const { activeSector, govTab, itTab } = useSector();
  const { isLoggedIn } = useAuth();
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Shared Ambient Aurora WebGL Backdrop */}
      <div className="soft-aurora-bg-fixed">
        <SoftAurora
          speed={0.35}
          scale={1.2}
          brightness={isDark ? 1.1 : 0.95}
          color1={isDark ? '#8b5cf6' : '#8b5cf6'}
          color2={isDark ? '#06b6d4' : '#0284c7'}
          color3={isDark ? '#ec4899' : '#ec4899'}
          bandHeight={0.45}
          bandSpread={0.85}
          lightMode={!isDark}
          enableMouseInteraction={true}
          mouseInfluence={0.25}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {!isLoggedIn ? (
          <LoginPage />
        ) : (
          <>
            <Header />
            <main className="container" style={{ minHeight: 'calc(100vh - 200px)', flex: 1 }}>
              {activeSector === 'landing' && <Hero />}
              {activeSector === 'dashboard' && <UserDashboard />}

              {activeSector === 'government' && (
                <section style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
                  {govTab === 'jobs' && <JobNotifications />}
                  {govTab === 'mocktest' && <GovMockTest />}
                  {govTab === 'resources' && <GovResources />}
                </section>
              )}

              {activeSector === 'it' && (
                <section style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
                  {itTab === 'jobfinder' && <ITJobFinder />}
                  {itTab === 'resumebuilder' && <ResumeBuilder />}
                  {itTab === 'skillsync' && <SkillSyncRoleMatcher />}
                  {itTab === 'ats' && <ATSScoreEvaluator />}
                  {itTab === 'mockinterview' && <AIMockInterview />}
                  {itTab === 'resources' && <ITResources />}
                </section>
              )}
            </main>
            <Footer />
          </>
        )}
      </div>
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SectorProvider>
          <MainContent />
        </SectorProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
