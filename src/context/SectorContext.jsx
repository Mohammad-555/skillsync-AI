import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const SectorContext = createContext();

// Helper to convert sector + tabs into a canonical URL hash
export const getHashForRoute = (sector, govTab = 'jobs', itTab = 'jobfinder', dashboardTab = 'overview') => {
  if (sector === 'landing') return '#/';
  if (sector === 'dashboard') {
    return dashboardTab && dashboardTab !== 'overview' ? `#/dashboard/${dashboardTab}` : '#/dashboard';
  }
  if (sector === 'government') {
    return `#/government/${govTab || 'jobs'}`;
  }
  if (sector === 'it') {
    return `#/it/${itTab || 'jobfinder'}`;
  }
  return '#/';
};

// Helper to parse the current URL (hash or pathname) into route state
export const parseRouteFromLocation = () => {
  if (typeof window === 'undefined') {
    return { sector: 'landing', govTab: 'jobs', itTab: 'jobfinder', dashboardTab: 'overview' };
  }

  const rawHash = window.location.hash ? window.location.hash.replace(/^#\/?/, '').trim().toLowerCase() : '';
  const rawPath = (!rawHash && window.location.pathname && window.location.pathname !== '/')
    ? window.location.pathname.replace(/^\//, '').trim().toLowerCase()
    : '';

  const route = rawHash || rawPath;

  if (!route || route === '' || route === 'home' || route === 'landing') {
    return { sector: 'landing', govTab: 'jobs', itTab: 'jobfinder', dashboardTab: 'overview' };
  }

  // Dashboard routes
  if (route.startsWith('dashboard')) {
    const parts = route.split('/');
    const dTab = parts[1] || 'overview';
    return { sector: 'dashboard', govTab: 'jobs', itTab: 'jobfinder', dashboardTab: dTab };
  }

  // Government routes
  if (
    route.startsWith('gov') ||
    route === 'jobs' ||
    route === 'mocktest' ||
    route === 'govresources' ||
    route === 'job-notifications'
  ) {
    let tab = 'jobs';
    if (route.includes('mock') || route === 'mocktest') tab = 'mocktest';
    else if (route.includes('resource') || route === 'govresources') tab = 'resources';
    else if (route.includes('job') || route === 'jobs' || route === 'job-notifications') tab = 'jobs';
    return { sector: 'government', govTab: tab, itTab: 'jobfinder', dashboardTab: 'overview' };
  }

  // IT routes
  if (
    route.startsWith('it') ||
    route === 'jobfinder' ||
    route === 'resumebuilder' ||
    route === 'skillsync' ||
    route === 'ats' ||
    route === 'mockinterview' ||
    route === 'itresources' ||
    route === 'resume-builder' ||
    route === 'mock-interview' ||
    route === 'role-matcher' ||
    route === 'ats-evaluator'
  ) {
    let tab = 'jobfinder';
    if (route.includes('resume') || route === 'resumebuilder' || route === 'resume-builder') tab = 'resumebuilder';
    else if (route.includes('skill') || route.includes('role') || route === 'skillsync' || route === 'role-matcher') tab = 'skillsync';
    else if (route.includes('ats') || route === 'ats-evaluator') tab = 'ats';
    else if (route.includes('interview') || route === 'mockinterview' || route === 'mock-interview') tab = 'mockinterview';
    else if (route.includes('resource') || route === 'itresources') tab = 'resources';
    else if (route.includes('job') || route === 'jobfinder') tab = 'jobfinder';
    return { sector: 'it', govTab: 'jobs', itTab: tab, dashboardTab: 'overview' };
  }

  return { sector: 'landing', govTab: 'jobs', itTab: 'jobfinder', dashboardTab: 'overview' };
};

export const SectorProvider = ({ children }) => {
  const initialRoute = parseRouteFromLocation();
  const [activeSector, setActiveSectorState] = useState(initialRoute.sector);
  const [govTab, setGovTabState] = useState(initialRoute.govTab);
  const [itTab, setItTabState] = useState(initialRoute.itTab);
  const [dashboardTab, setDashboardTabState] = useState(initialRoute.dashboardTab);

  // Tracks if popstate / hashchange is actively syncing to avoid pushing history on browser back/forward
  const isNavigatingFromHistoryRef = useRef(false);

  // Sync state to URL and history stack
  const syncRouteToHistory = useCallback((sector, gTab, iTab, dTab, replace = false) => {
    if (isNavigatingFromHistoryRef.current) return;
    const targetHash = getHashForRoute(sector, gTab, iTab, dTab);
    if (window.location.hash !== targetHash) {
      if (replace) {
        window.history.replaceState({ sector, govTab: gTab, itTab: iTab, dashboardTab: dTab }, '', targetHash);
      } else {
        window.history.pushState({ sector, govTab: gTab, itTab: iTab, dashboardTab: dTab }, '', targetHash);
      }
    }
  }, []);

  const setActiveSector = (sector, replace = false) => {
    setActiveSectorState(sector);
    syncRouteToHistory(sector, govTab, itTab, dashboardTab, replace);
  };

  const setGovTab = (tab, replace = false) => {
    setActiveSectorState('government');
    setGovTabState(tab);
    syncRouteToHistory('government', tab, itTab, dashboardTab, replace);
  };

  const setItTab = (tab, replace = false) => {
    setActiveSectorState('it');
    setItTabState(tab);
    syncRouteToHistory('it', govTab, tab, dashboardTab, replace);
  };

  const setDashboardTab = (tab, replace = false) => {
    setActiveSectorState('dashboard');
    setDashboardTabState(tab);
    syncRouteToHistory('dashboard', govTab, itTab, tab, replace);
  };

  const selectGovSector = (tab = 'jobs') => {
    setActiveSectorState('government');
    setGovTabState(tab);
    syncRouteToHistory('government', tab, itTab, dashboardTab, false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectITSector = (tab = 'jobfinder') => {
    setActiveSectorState('it');
    setItTabState(tab);
    syncRouteToHistory('it', govTab, tab, dashboardTab, false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectDashboard = (tab = 'overview') => {
    setActiveSectorState('dashboard');
    setDashboardTabState(tab);
    syncRouteToHistory('dashboard', govTab, itTab, tab, false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setActiveSectorState('landing');
    syncRouteToHistory('landing', govTab, itTab, dashboardTab, false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Google Chrome Navigation Event Listeners: Back (←) and Forward (→)
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseRouteFromLocation();
      isNavigatingFromHistoryRef.current = true;
      setActiveSectorState(parsed.sector);
      setGovTabState(parsed.govTab);
      setItTabState(parsed.itTab);
      setDashboardTabState(parsed.dashboardTab);
      isNavigatingFromHistoryRef.current = false;
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    // Initial normalization of URL hash for Reload (↻) persistence
    const currentHash = window.location.hash;
    const expectedHash = getHashForRoute(
      initialRoute.sector,
      initialRoute.govTab,
      initialRoute.itTab,
      initialRoute.dashboardTab
    );
    if (!currentHash || currentHash === '#') {
      window.history.replaceState(
        {
          sector: initialRoute.sector,
          govTab: initialRoute.govTab,
          itTab: initialRoute.itTab,
          dashboardTab: initialRoute.dashboardTab
        },
        '',
        expectedHash
      );
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  return (
    <SectorContext.Provider
      value={{
        activeSector,
        setActiveSector,
        govTab,
        setGovTab,
        itTab,
        setItTab,
        dashboardTab,
        setDashboardTab,
        selectGovSector,
        selectITSector,
        selectDashboard,
        goHome,
      }}
    >
      {children}
    </SectorContext.Provider>
  );
};

export const useSector = () => useContext(SectorContext);
