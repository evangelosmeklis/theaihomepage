import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { CookieConsent } from "@/components/CookieConsent";
import { SessionProvider } from "@/components/SessionProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://theaihomepage.com'),
  title: {
    default: "The AI Homepage - Your Daily AI News Aggregator",
    template: "%s | The AI Homepage"
  },
  description: "Stay updated with the latest AI news from Reddit, TechCrunch, Hacker News, and Startupper.gr. Curated AI news, machine learning updates, and artificial intelligence breakthroughs - all in one place.",
  keywords: ['AI news', 'artificial intelligence', 'machine learning', 'AI aggregator', 'tech news', 'AI updates', 'ChatGPT news', 'OpenAI', 'Claude', 'LLM news', 'deep learning', 'neural networks', 'AI research', 'AI tools', 'generative AI'],
  authors: [{ name: 'The AI Homepage' }],
  creator: 'The AI Homepage',
  publisher: 'The AI Homepage',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theaihomepage.com',
    title: 'The AI Homepage - Your Daily AI News Aggregator',
    description: 'Stay updated with the latest AI news from Reddit, TechCrunch, Hacker News, and Startupper.gr. All in one place.',
    siteName: 'The AI Homepage',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'The AI Homepage',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The AI Homepage - Your Daily AI News Aggregator',
    description: 'Stay updated with the latest AI news from multiple sources. All in one place.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: 'https://theaihomepage.com',
  },
  verification: {
    // Add Google Search Console verification here when available
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'The AI Homepage',
    description: 'Your daily AI news aggregator featuring updates from Reddit, TechCrunch, Hacker News, and Startupper.gr',
    url: 'https://theaihomepage.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://theaihomepage.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'The AI Homepage',
      url: 'https://theaihomepage.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://theaihomepage.com/logo.png',
      },
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <GoogleAnalytics />
        <SessionProvider>
          {children}
        </SessionProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
