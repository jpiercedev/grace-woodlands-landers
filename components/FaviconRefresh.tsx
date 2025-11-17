'use client';

import { useEffect } from 'react';

export default function FaviconRefresh() {
  useEffect(() => {
    // Check if we've already refreshed the favicon for this user
    const faviconRefreshed = localStorage.getItem('favicon-refreshed-v2');
    
    if (!faviconRefreshed) {
      // Force favicon refresh by updating all favicon links
      const links = document.querySelectorAll("link[rel*='icon']");
      links.forEach((link) => {
        const href = (link as HTMLLinkElement).href;
        if (href) {
          // Add timestamp to force reload
          const url = new URL(href);
          url.searchParams.set('v', Date.now().toString());
          (link as HTMLLinkElement).href = url.toString();
        }
      });
      
      // Mark as refreshed so we don't do this again
      localStorage.setItem('favicon-refreshed-v2', 'true');
      
      console.log('✅ Favicon cache refreshed');
    }
  }, []);

  return null; // This component doesn't render anything
}

