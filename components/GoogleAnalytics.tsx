'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export function GoogleAnalytics() {
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    // Check initial consent
    const savedConsent = localStorage.getItem('cookieConsent');
    setConsent(savedConsent);

    // Listen for consent changes
    const handleConsentChange = () => {
      const newConsent = localStorage.getItem('cookieConsent');
      setConsent(newConsent);
    };

    window.addEventListener('cookieConsentAccepted', handleConsentChange);
    return () => {
      window.removeEventListener('cookieConsentAccepted', handleConsentChange);
    };
  }, []);

  // Only load GA if user has accepted cookies
  if (consent !== 'accepted') {
    return null;
  }

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-SM6T3D4SVE"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SM6T3D4SVE');
        `}
      </Script>
    </>
  );
}
