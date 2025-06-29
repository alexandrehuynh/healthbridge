import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * ScrollToTop component that automatically scrolls to the top of the page
 * whenever the route changes. This ensures a consistent user experience
 * where users always see the beginning of new pages.
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to top immediately when route changes
    window.scrollTo(0, 0);
  }, [location]);

  // This component doesn't render anything
  return null;
}