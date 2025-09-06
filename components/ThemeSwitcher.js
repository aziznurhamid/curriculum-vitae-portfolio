import { useState, useEffect, useRef, memo } from 'react'; // Impor 'memo'
import { useTheme } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconMap } from '../utils/iconMap';

// Bungkus komponen dengan memo
const ThemeSwitcher = memo(function ThemeSwitcher({ settings, ui, iconsData }) {
  const { setTheme, isDarkMode, setIsDarkMode } = useTheme();
  const [showThemes, setShowThemes] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowThemes(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);


  return (
    <div className="flex items-center gap-4">
      <div className="relative" ref={wrapperRef}>
        <button
          onClick={() => setShowThemes(!showThemes)}
          className="text-text-secondary text-xl"
          title={ui.theme_switcher_tooltip}
          aria-label={ui.theme_switcher_tooltip}
        >
          <FontAwesomeIcon icon={iconMap[iconsData[ui.theme_selector_icon_key]]} />
        </button>

        {showThemes && (
          <div className="absolute top-full right-0 mt-3 p-2 bg-surface border border-border rounded-md shadow-lg flex gap-2 animate-fade-in-down">
            {settings.themes.map(themeOption => (
              <button
                key={themeOption.name}
                onClick={() => {
                  setTheme(themeOption.name);
                  setShowThemes(false);
                }}
                className="w-6 h-6 rounded-full border-2 border-border transition-transform hover:scale-110"
                style={{ backgroundColor: themeOption.color }}
                title={themeOption.name}
                aria-label={`Switch to ${themeOption.name} theme`}
              />
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="text-text-secondary text-xl"
        title={ui.dark_mode_tooltip}
        aria-label={ui.dark_mode_tooltip}
      >
        <FontAwesomeIcon icon={iconMap[iconsData[isDarkMode ? ui.light_mode_icon_key : ui.dark_mode_icon_key]]} />
      </button>
    </div>
  );
});

export default ThemeSwitcher;