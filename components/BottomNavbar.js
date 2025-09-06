import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconMap } from '../utils/iconMap';

const BottomNavbar = memo(function BottomNavbar({ navigationData, contentData, iconsData, selectedRoleKey }) {
  const [showNav, setShowNav] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // --- LOGIKA NAVIGASI DIPERBARUI ---
  const isMainRole = selectedRoleKey === 'main';

  const availableNavItems = navigationData.items.filter(item => {
    // Selalu tampilkan home
    if (item.id === 'home') return true;

    const sectionData = contentData[item.id];
    if (!sectionData || sectionData.length === 0) {
      return false;
    }

    const filteredData = sectionData.filter(dataItem =>
      isMainRole || !dataItem.roles || dataItem.roles.length === 0 || dataItem.roles.includes(selectedRoleKey)
    );

    if (item.id === 'skills') {
        const filteredSkills = sectionData.filter(skillCategory => 
            isMainRole || (skillCategory.roles && skillCategory.roles.includes(selectedRoleKey))
        );
        return filteredSkills.length > 0;
    }

    return filteredData.length > 0;
  });
  // --- AKHIR PERUBAHAN ---

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
  
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
            setShowNav(false);
          } else {
            setShowNav(true);
          }
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = useCallback((e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  if (!navigationData || !navigationData.items) return null;

  return (
    <nav
      className={`lg:hidden fixed bottom-0 w-full bg-surface border-t border-border z-20 transition-transform duration-300 ease-in-out ${showNav ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="flex justify-around items-center h-16">
        {availableNavItems.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleNavClick(e, item.id)}
            title={item.text}
            className={`flex flex-col items-center justify-center text-text-secondary hover:text-primary transition-colors w-full h-full ${activeSection === item.id ? 'nav-active' : ''}`}
          >
            <FontAwesomeIcon icon={iconMap[iconsData[item.icon_key]]} className="text-fluid-lg"/>
            <span className="text-fluid-xs mt-1">{item.text}</span>
          </a>
        ))}
      </div>
    </nav>
  );
});

export default BottomNavbar;