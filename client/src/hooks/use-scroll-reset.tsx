import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Custom hook that provides scroll reset functionality for navigation
 * Handles both programmatic navigation and browser back/forward
 */
export function useScrollReset() {
  const [location] = useLocation();

  useEffect(() => {
    // Reset scroll position when location changes
    window.scrollTo(0, 0);
  }, [location]);
}

/**
 * Hook for custom navigation with automatic scroll reset
 * Use this for programmatic navigation to ensure consistent behavior
 */
export function useNavigateWithScroll() {
  const [, setLocation] = useLocation();

  const navigate = (path: string) => {
    setLocation(path);
    // Small delay to ensure DOM updates before scroll
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };

  return navigate;
}

/**
 * Higher-order component that adds scroll reset to page components
 */
export function withScrollReset<T extends object>(Component: React.ComponentType<T>) {
  return function ScrollResetWrapper(props: T) {
    useScrollReset();
    return <Component {...props} />;
  };
}