import { Navigation } from '@/components/Navigation';
import Link from 'next/link';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            privacy policy
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                introduction
              </h2>
              <p>
                the ai homepage (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates theaihomepage.com. this page informs you of our policies regarding the collection, use, and disclosure of personal information when you use our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
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
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
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
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                third-party content
              </h2>
              <p>
                our site aggregates and displays news content from third-party sources including reddit, techcrunch, hacker news, and startupper.gr. when you click on article links, you will be directed to these external websites which have their own privacy policies. we are not responsible for the privacy practices of these third-party sites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                data retention
              </h2>
              <p>
                we do not store any personal data on our servers. google analytics data is retained according to google&apos;s data retention policies (default 26 months).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
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
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                children&apos;s privacy
              </h2>
              <p>
                our service is not directed to children under 13. we do not knowingly collect information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                changes to this policy
              </h2>
              <p>
                we may update this privacy policy from time to time. changes will be posted on this page with an updated date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
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
