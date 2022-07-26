import { useState, useEffect } from 'react';

export const useViewport = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const handleResize = () =>
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return {
    xs: windowSize.width < 640,
    sm: 640 <= windowSize.width,
    md: 768 <= windowSize.width,
    lg: 1024 <= windowSize.width,
    xl: 1280 <= windowSize.width,
    xxl: 1536 <= windowSize.width,
    width: windowSize.width,
    height: windowSize.height,
  };
};
