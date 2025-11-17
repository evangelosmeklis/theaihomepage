'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDarkMode } from '@/hooks/useDarkMode';

export function Navigation() {
  const pathname = usePathname();
  const { isDark, toggle } = useDarkMode();

  return (
    <nav className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-1">
            <Link href="/" className="block hover:opacity-70 transition-opacity">
              <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                the ai homepage
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                a piece of AI news history
              </div>
            </Link>
          </div>

          {/* Centered Navigation */}
          <div className="flex-1 flex justify-center gap-12">
            <Link
              href="/"
              className={`text-base font-medium transition-colors ${
                pathname === '/'
                  ? 'text-gray-900 dark:text-gray-100'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              home
            </Link>
            <Link
              href="/about"
              className={`text-base font-medium transition-colors ${
                pathname === '/about'
                  ? 'text-gray-900 dark:text-gray-100'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              about
            </Link>
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex-1 flex justify-end">
            <button
              onClick={toggle}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                // Sun icon for light mode
                <svg className="w-5 h-5 text-gray-900 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                // Moon icon for dark mode
                <svg className="w-5 h-5 text-gray-900 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
