import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col">
      <Navigation />

      <main className="max-w-3xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 flex-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 sm:mb-8">about</h1>

        <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 space-y-4 sm:space-y-6 leading-relaxed">
          <p>
            the ai homepage is a news aggregator that brings you the latest AI news from multiple trusted sources,
            all in one clean, easy-to-browse interface. instead of checking multiple websites and forums, you get
            everything here, updated automatically every 5 minutes.
          </p>

          <p>
            we aggregate content from Reddit (r/artificial, r/MachineLearning, r/OpenAI, r/ChatGPT, r/LocalLLaMA,
            r/StableDiffusion), TechCrunch's AI category, Hacker News top stories, and Startupper.gr. all sources
            are filtered to show only AI-related content.
          </p>

          <p>
            we use official public APIs and RSS feeds to gather news. no web scraping, no paywalls bypassed,
            just legitimate data sources that are designed for sharing. all articles link back to their original
            sources, giving proper credit to the publishers and creators.
          </p>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-8">
            <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">contact</p>
            <p>
              built with passion for the AI community. for any questions, request for features, or if you want an ad placement
              contact me at:{' '}
              <a
                href="mailto:vaggelis98.work@gmail.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                vaggelis98.work@gmail.com
              </a>
            </p>


            <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Made with ♥️ in Greece</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
