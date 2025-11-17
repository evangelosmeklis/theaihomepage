import { Navigation } from '@/components/Navigation';
import Link from 'next/link';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            terms of service
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                acceptance of terms
              </h2>
              <p>
                by accessing and using theaihomepage.com (the &quot;service&quot;), you accept and agree to be bound by these terms of service. if you do not agree to these terms, please do not use the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                description of service
              </h2>
              <p>
                the ai homepage is a news aggregation website that curates and displays ai-related content from various public sources including reddit, techcrunch, hacker news, and startupper.gr. we provide links to third-party content for informational purposes only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                use of service
              </h2>
              <p className="mb-3">
                you agree to use the service only for lawful purposes. you must not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>attempt to gain unauthorized access to our systems or networks</li>
                <li>interfere with or disrupt the service or servers</li>
                <li>use automated systems (bots, scrapers) without permission</li>
                <li>violate any applicable laws or regulations</li>
                <li>infringe on intellectual property rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                third-party content
              </h2>
              <p>
                the service aggregates content from third-party sources. we do not own, control, or endorse this content. all content belongs to its respective owners. we are not responsible for the accuracy, completeness, or legality of third-party content. when you click on external links, you leave our service and are subject to the terms and privacy policies of those websites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                intellectual property
              </h2>
              <p>
                the service&apos;s design, layout, and original content are owned by the ai homepage and protected by copyright laws. third-party content and trademarks belong to their respective owners. we aggregate content under fair use principles for news aggregation purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                disclaimer of warranties
              </h2>
              <p>
                the service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. we do not guarantee that the service will be uninterrupted, secure, or error-free. we do not warrant the accuracy or reliability of any content displayed on the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                limitation of liability
              </h2>
              <p>
                to the maximum extent permitted by law, the ai homepage shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. this includes damages for lost profits, data loss, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                external links
              </h2>
              <p>
                our service contains links to external websites. we have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. you access third-party websites at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                content removal
              </h2>
              <p>
                if you believe that content on our service infringes your copyright or other rights, please contact us at{' '}
                <a
                  href="mailto:vaggelis98.work@gmail.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  vaggelis98.work@gmail.com
                </a>
                {' '}with details of your claim. we will review and respond to legitimate requests.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                modifications to service
              </h2>
              <p>
                we reserve the right to modify, suspend, or discontinue the service (or any part thereof) at any time without notice. we shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                changes to terms
              </h2>
              <p>
                we may update these terms from time to time. continued use of the service after changes constitutes acceptance of the updated terms. we encourage you to review these terms periodically.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                governing law
              </h2>
              <p>
                these terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                contact information
              </h2>
              <p>
                for questions about these terms, contact us at:{' '}
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
