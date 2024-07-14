// src/hooks/useAutoScroll.js
import { useEffect } from 'react';

function useAutoScroll() {
  useEffect(() => {
    const handleDragOver = (event) => {
      const scrollThreshold = 100; // Distance from the edge to start scrolling
      const scrollSpeed = 10; // Speed of scrolling
      const { clientY } = event;

      if (clientY < scrollThreshold) {
        window.scrollBy(0, -scrollSpeed);
      } else if (clientY > window.innerHeight - scrollThreshold) {
        window.scrollBy(0, scrollSpeed);
      }
    };

    window.addEventListener('dragover', handleDragOver);

    return () => {
      window.removeEventListener('dragover', handleDragOver);
    };
  }, []);
}

export default useAutoScroll;
