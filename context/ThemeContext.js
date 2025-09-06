import { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('default');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('cv_theme') || 'default';
    const savedDarkMode = localStorage.getItem('cv_dark_mode') === 'true';
    setTheme(savedTheme);
    setIsDarkMode(savedDarkMode);
    
    // Terapkan kelas tema awal saat pertama kali load
    document.body.className = ''; // Hapus semua kelas tema sebelumnya
    if (savedTheme !== 'default') {
      document.body.classList.add(`theme-${savedTheme}`);
    }
    document.documentElement.classList.toggle('dark', savedDarkMode);
  }, []);

  // --- REVISI UNTUK INP DIMULAI ---
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    // Langsung ubah tampilan secara visual
    document.body.classList.remove('theme-green', 'theme-purple', 'theme-red');
    if (newTheme !== 'default') {
      document.body.classList.add(`theme-${newTheme}`);
    }
    // Tunda penyimpanan ke localStorage
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        localStorage.setItem('cv_theme', newTheme);
      });
    } else {
      localStorage.setItem('cv_theme', newTheme);
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    // Langsung ubah tampilan secara visual
    document.documentElement.classList.toggle('dark', newDarkMode);
    // Tunda penyimpanan ke localStorage
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        localStorage.setItem('cv_dark_mode', String(newDarkMode));
      });
    } else {
      localStorage.setItem('cv_dark_mode', String(newDarkMode));
    }
  };

  const value = { theme, setTheme: changeTheme, isDarkMode, setIsDarkMode: toggleDarkMode };
  // --- REVISI SELESAI ---

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);