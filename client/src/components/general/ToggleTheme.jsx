import React, { useContext } from 'react';
import {ThemeContext} from '../../context/ThemeContext';
import { MoonStar, SunMedium } from 'lucide-react'
import { Button } from '../ui/button';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Button
      variant={'outline'}
      onClick={toggleTheme}
      className="p-2 rounded-md bg-primary-light dark:bg-primary-dark text-black transition dark:text-white"
    >
      {theme === 'light' ? <MoonStar /> : <SunMedium />}
    </Button>
  );
};

export default ThemeToggle;