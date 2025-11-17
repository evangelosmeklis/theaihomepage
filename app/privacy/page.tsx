import { Navigation } from '@/components/Navigation';
import Link from 'next/link';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navigation />

      <main className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            privacy policy
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6 sm:mb-8">
            last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-4 sm:space-y-6 text-sm sm:text-base text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">
                introduction
              </h2>
              <p>
                the ai homepage (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates theaihomepage.com. this page informs you of our policies regarding the collection, use, and disclosure of personal information when you use our service.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">
                information we collect
              </h2>
              <p className="mb-3">
                we collect minimal information to provide and improve our service:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>analytics data:</strong> if you consent to cookies, we use google analytics to collect anonymous usage data including pages visited, time spent on site, and general location (country/city level).
                </li>
                <li>
                  <strong>no personal data:</strong> we do not collect names, email addresses, or any personally identifiable information through our website unless you contact us directly.
                </li>
                <li>
                  <strong>local storage:</strong> we store cached news content (including reddit posts) in your browser&apos;s local storage to improve loading times. this data stays on your device and is never sent to our servers.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">
                cookies
              </h2>
              <p className="mb-3">
                we use cookies only with your explicit consent:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>google analytics cookies:</strong> used to understand how visitors interact with our site (only if you accept cookies).
                </li>
                <li>
                  <strong>preference cookies:</strong> used to remember your cookie consent choice and dark mode preference.
                </li>
              </ul>
              <p className="mt-3">
                you can change your cookie preferences at any time by clearing your browser&apos;s local storage for this site.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">
                third-party content & direct requests
              </h2>
              <p className="mb-3">
                our site aggregates and displays news content from third-party sources. here&apos;s how content is fetched:
              </p>
              
              <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">⚠️ important: reddit data fetching</h3>
                <p className="mb-2">
                  <strong>your browser fetches reddit content directly.</strong> when you visit our site, your browser automatically makes requests to reddit.com to fetch posts from ai-related subreddits.
                </p>
                <p className="mb-2">
                  this means:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>reddit can see your ip address and browser information</li>
                  <li>reddit may set cookies or track your request</li>
                  <li>reddit&apos;s privacy policy applies to these requests</li>
                  <li>the requests come from your device, not our servers</li>
                </ul>
                <p className="mt-2 text-sm">
                  <strong>why we do this:</strong> reddit blocks requests from hosting providers like vercel. by fetching from your browser, we ensure reddit posts load successfully for all users.
                </p>
              </div>

              <p className="mb-3">
                <strong>other sources (techcrunch, hacker news, startupper.gr):</strong> these are fetched by our servers, so your ip address is not directly exposed to them.
              </p>

              <p>
                when you click on article links, you will be directed to external websites which have their own privacy policies. we are not responsible for the privacy practices of these third-party sites.
              </p>

              <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-sm">
                <strong>relevant privacy policies:</strong>
                <ul className="mt-2 space-y-1">
                  <li>• reddit: <a href="https://www.reddit.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">reddit.com/policies/privacy-policy</a></li>
                  <li>• google analytics: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">policies.google.com/privacy</a></li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">
                data retention
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>server data:</strong> we do not store any personal data on our servers.
                </li>
                <li>
                  <strong>local storage cache:</strong> reddit posts are cached in your browser&apos;s local storage for 10 minutes to improve performance. this data is automatically refreshed and can be cleared at any time by clearing your browser data.
                </li>
                <li>
                  <strong>google analytics:</strong> analytics data is retained according to google&apos;s data retention policies (default 26 months).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">
                your rights
              </h2>
              <p className="mb-3">
                depending on your location, you may have rights including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>the right to access your data</li>
                <li>the right to request deletion of your data</li>
                <li>the right to object to data processing</li>
                <li>the right to withdraw consent</li>
              </ul>
              <p className="mt-3">
                since we collect minimal anonymous data, most of these rights can be exercised by declining cookies or clearing your browser data.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">
                children&apos;s privacy
              </h2>
              <p>
                our service is not directed to children under 13. we do not knowingly collect information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">
                changes to this policy
              </h2>
              <p>
                we may update this privacy policy from time to time. changes will be posted on this page with an updated date.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">
                contact us
              </h2>
              <p>
                if you have questions about this privacy policy, contact us at:{' '}
                <a
                  href="mailto:vaggelis98.work@gmail.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  vaggelis98.work@gmail.com
                </a>
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
