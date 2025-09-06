import { useState, useEffect, useCallback, memo } from 'react';
import Image from 'next/image';
import MemoizedFontAwesomeIcon from './MemoizedFontAwesomeIcon';
import { getUrlByKey } from '../utils/urlUtils';
import { iconMap } from '../utils/iconMap';

const Sidebar = memo(function Sidebar({ siteData, navigationData, contentData, isCollapsed, setCollapsed, onProfileClick, urlsData, iconsData, currentRole, selectedRoleKey }) {
  const [activeSection, setActiveSection] = useState('home');
  const ui = siteData.ui_text;
  const profileImageUrl = getUrlByKey(currentRole.image_url_key, urlsData);

  const handleNavClick = useCallback((e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    navigationData.items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [navigationData.items]);

  // --- LOGIKA NAVIGASI DIPERBARUI ---
  const isMainRole = selectedRoleKey === 'main';

  const availableNavItems = navigationData.items.filter(item => {
    const sectionData = contentData[item.id];
    if (!sectionData || sectionData.length === 0) {
      return false; // Sembunyikan jika tidak ada data sama sekali
    }

    // Lakukan filter berdasarkan peran
    const filteredData = sectionData.filter(dataItem =>
      isMainRole || !dataItem.roles || dataItem.roles.length === 0 || dataItem.roles.includes(selectedRoleKey)
    );
    
    // Khusus untuk skills, gunakan logika yang lebih ketat
    if (item.id === 'skills') {
        const filteredSkills = sectionData.filter(skillCategory => 
            isMainRole || (skillCategory.roles && skillCategory.roles.includes(selectedRoleKey))
        );
        return filteredSkills.length > 0;
    }

    return filteredData.length > 0;
  });
  // --- AKHIR PERUBAHAN ---


  return (
    <aside className={`fixed top-0 left-0 h-full bg-surface shadow-lg z-20 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} hidden lg:flex flex-col`}>
      <div className={`flex justify-center items-center flex-shrink-0 ${isCollapsed ? 'h-20' : 'h-auto py-8'}`}>
        <div
          onClick={onProfileClick}
          className={`relative flex-shrink-0 cursor-pointer group rounded-full transition-all duration-300 ${isCollapsed ? 'w-14 h-14' : 'w-40 h-40'}`}
        >
          <Image
            src={profileImageUrl}
            alt={`Foto Profil ${currentRole.name}`}
            fill
            sizes={isCollapsed ? "56px" : "160px"}
            style={{ objectFit: 'cover' }}
            className="transition-all duration-300 rounded-full border-4 border-primary"
            priority={true}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100 rounded-full">
            <p className={`text-white text-center font-bold transition-opacity ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
              {currentRole.name}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 mt-4">
        <ul>
          {navigationData.items.map(item => {
              if (item.id === 'home' || availableNavItems.some(nav => nav.id === item.id)) {
                  return (
                    <li key={item.id} title={item.text}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => handleNavClick(e, item.id)}
                        className={`flex items-center p-4 text-text-secondary hover:bg-primary/10 hover:text-primary rounded-md mx-2 ${activeSection === item.id ? 'nav-active' : ''}`}
                      >
                        <MemoizedFontAwesomeIcon icon={iconMap[iconsData[item.icon_key]]} className="w-6 text-center text-fluid-lg"/>
                        <span className={`ml-4 whitespace-nowrap transition-opacity ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>{item.text}</span>
                      </a>
                    </li>
                  );
              }
              return null;
          })}
        </ul>
      </nav>
      
      <button
        onClick={() => setCollapsed(!isCollapsed)}
        className={`flex items-center p-4 border-t border-border text-text-secondary hover:text-primary w-full ${isCollapsed ? 'justify-center' : ''}`}
        title={ui.nav_toggle_tooltip}
        aria-label={ui.nav_toggle_tooltip}
      >
        <MemoizedFontAwesomeIcon 
          icon={iconMap[iconsData[isCollapsed ? ui.nav_toggle_open_icon_key : ui.nav_toggle_close_icon_key]]} 
          size="lg" 
          className="w-6 text-center flex-shrink-0"
        />
        <span className={`ml-4 whitespace-nowrap ${isCollapsed ? 'hidden' : ''}`}>
          {ui.nav_toggle_tooltip}
        </span>
      </button>
    </aside>
  );
});

export default Sidebar;