import { memo, useCallback, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

import { Container } from 'components/reusable';

const Component = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  return (
    <header className="sticky mb-8 z-20 w-full border-b backdrop-blur border-neutral-300 dark:border-neutral-600 -top-[3.9rem] md:-top-15">
      <div className="absolute flex -z-10 w-full h-full opacity-80 bg-white dark:bg-black" />
      <Container className="flex items-center justify-between w-auto py-4">
        <Link passHref href="/">
          <div className="inline-flex text-xl cursor-pointer">
            <h1 className="tracking-wide font-extrabold select-none">B3K3N</h1>
            &nbsp;
            <p className="tracking-wider select-none">APP</p>
          </div>
        </Link>
        <div
          className="cursor-pointer select-none hover:text-black dark:hover:text-white"
          onClick={toggleTheme}>
          {mounted && (
            // @ts-ignore
            <ion-icon
              name={theme !== 'dark' ? 'sunny' : 'moon'}
              style={{ fontSize: '18px' }}
            />
          )}
        </div>
      </Container>
    </header>
  );
};

const Navbar = memo(Component);

export default Navbar;
