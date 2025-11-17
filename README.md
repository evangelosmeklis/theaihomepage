# The AI Homepage

A modern AI news aggregator that pulls the latest articles from multiple sources into one clean, easy-to-read interface.

## Features

- **Multi-Source Aggregation**: Fetches news from:
  - Reddit (r/artificial, r/MachineLearning, r/OpenAI, r/ChatGPT, r/LocalLLaMA, r/StableDiffusion)
  - TechCrunch AI category
  - Hacker News
  - Startupper.gr

- **Clean UI**: Modern, responsive design with Tailwind CSS
- **Source Filtering**: Filter articles by source with one click
- **Auto-Refresh**: News updates every 5 minutes
- **Score & Comments**: See popularity metrics from Reddit and Hacker News
- **Timestamps**: Human-readable relative timestamps for all articles

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**:
  - Reddit JSON API
  - RSS feeds (TechCrunch, Startupper.gr)
  - Hacker News API

## Getting Started

### Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Production

Build for production:
```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

This is a standard Next.js app and can be deployed to:
- Netlify
- Railway
- AWS Amplify
- Any Node.js hosting platform

## Configuration

### Adding More Subreddits

Edit `lib/fetchers/reddit.ts` and add subreddit names to the `SUBREDDITS` array:

```typescript
const SUBREDDITS = [
  'artificial',
  'MachineLearning',
  // Add more here
];
```

### Adjusting Cache Time

The news is cached for 5 minutes by default. To change this, edit the `revalidate` value in:
- `app/api/news/route.ts`
- Individual fetcher files

### Customizing Feed Limits

Each fetcher has a default limit for the number of articles. Adjust these in `lib/fetchers/index.ts`:

```typescript
const [reddit, techcrunch, hackernews, startupper] = await Promise.all([
  fetchRedditPosts(30),  // Adjust these numbers
  fetchTechCrunchPosts(20),
  fetchHackerNewsPosts(30),
  fetchStartupperPosts(15)
]);
```

## Project Structure

```
theaihomepage/
├── app/
│   ├── api/news/route.ts    # API endpoint for aggregated news
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main homepage
├── components/
│   ├── NewsCard.tsx          # Individual news item component
│   └── SourceFilter.tsx      # Source filtering component
├── lib/
│   ├── types.ts              # TypeScript interfaces
│   └── fetchers/
│       ├── reddit.ts         # Reddit API fetcher
│       ├── techcrunch.ts     # TechCrunch RSS fetcher
│       ├── hackernews.ts     # Hacker News API fetcher
│       ├── startupper.ts     # Startupper RSS fetcher
│       └── index.ts          # Aggregation logic
└── package.json
```

## License

MIT

## Contributing

Feel free to open issues or submit PRs to improve the aggregator!
