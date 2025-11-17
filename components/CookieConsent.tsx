'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem('cookieConsent');
    if (consent === null) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
    // Trigger Google Analytics initialization
    window.dispatchEvent(new Event('cookieConsentAccepted'));
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  if (!mounted || !showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-center sm:text-left">
            we use cookies to analyze site traffic via google analytics.{' '}
            <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
              privacy policy
            </Link>
            {' '}|{' '}
            <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
              terms
            </Link>
          </div>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={handleDecline}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors touch-manipulation"
            >
              decline
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm bg-blue-600 text-white rounded hover:bg-blue-700 active:bg-blue-800 transition-colors touch-manipulation"
            >
              accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
