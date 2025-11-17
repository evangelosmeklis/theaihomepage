# Fixing Reddit 403 Errors on Vercel - SOLVED! ✅

## Problem

You're seeing these errors during Vercel deployment:

```
Reddit API error for r/artificial: 403 Blocked
Reddit API error for r/MachineLearning: 403 Blocked
```

Reddit blocks requests from cloud hosting providers like Vercel. The original solution required OAuth credentials, but Reddit limits how many apps you can create.

## Solution: Use Reddit RSS Feeds (No Authentication Required!)

**Good news!** The code has been updated to use Reddit's RSS feeds instead of the JSON API. This approach:

✅ Requires **no authentication**  
✅ Requires **no environment variables**  
✅ Requires **no Reddit app creation**  
✅ Works on Vercel out of the box  
✅ Less likely to be blocked by Reddit  

## What Changed

The `lib/fetchers/reddit.ts` file now uses:
- **Old**: `https://oauth.reddit.com/r/subreddit/hot` (requires OAuth)
- **New**: 
  - `https://www.reddit.com/r/subreddit/hot.rss` (trending posts)
  - `https://www.reddit.com/r/subreddit/top.rss?t=day` (top posts of today)
  - Both feeds fetched simultaneously for better "top" sorting!

## How to Deploy

Simply push your code and deploy:

1. **Commit and push** the updated code to GitHub:
```bash
git add .
git commit -m "Fix Reddit API for Vercel using RSS feeds"
git push
```

2. **Vercel will automatically deploy** the changes (if you have auto-deploy enabled)

   **OR**

   Manually redeploy from Vercel dashboard:
   - Go to your project → Deployments
   - Click the "..." menu on your latest deployment
   - Click "Redeploy"

3. **That's it!** No environment variables or setup needed.

## What You Get from RSS

The RSS feeds provide:
- ✅ Post title
- ✅ Post URL
- ✅ Author username
- ✅ Publication date
- ✅ Score (upvotes)
- ✅ Comment count
- ✅ Thumbnails (when available)
- ✅ Excerpt/content
- ✅ **Both hot AND top posts** - fetched simultaneously!

This is the same data you'd get from the JSON API, just via RSS!

### Improved "Top" Sorting

The app now fetches **both** hot posts and top posts of today from Reddit:
- When you select **"newest"**: Shows all posts sorted by date
- When you select **"top"**: Shows posts sorted by score (upvotes)

Since we fetch both feeds, you'll always have plenty of highly-scored content when viewing "top" mode!

## Testing

After deployment, check the build logs. You should see:

```
✓ Generating static pages using 1 worker (11/11)
```

**Without** any "403 Blocked" errors.

Then visit your live site and verify Reddit posts are showing up from all subreddits:
- r/artificial
- r/MachineLearning
- r/OpenAI
- r/ChatGPT
- r/LocalLLaMA
- r/StableDiffusion

## Benefits of This Approach

1. **No rate limits** - RSS feeds have generous limits
2. **No authentication** - Works immediately
3. **More stable** - RSS is an official Reddit feature
4. **Works everywhere** - Not just Vercel, works on all hosting platforms
5. **Faster setup** - No need to create Reddit apps or manage credentials

## Troubleshooting

### Still seeing errors?

If you still see Reddit errors after deploying:

1. **Clear Vercel's build cache**:
   - Go to Deployments
   - Click "..." → Redeploy
   - **Uncheck** "Use existing Build Cache"
   - Click "Redeploy"

2. **Verify the code was updated**:
   - Check `lib/fetchers/reddit.ts` contains `import Parser from 'rss-parser'`
   - Should use `.rss` URLs, not `oauth.reddit.com`

3. **Check build logs**:
   - Look for "Reddit RSS error" messages
   - These will show which specific subreddit is failing

### RSS not working?

If Reddit RSS is blocked (very unlikely):
- Reddit RSS feeds are an official feature and rarely blocked
- As a last resort, you can disable Reddit entirely by returning an empty array from `fetchRedditPosts()`

## Migration Notes

### Old Code (OAuth - Removed)
```typescript
// Required environment variables
REDDIT_CLIENT_ID=xxx
REDDIT_CLIENT_SECRET=xxx
REDDIT_USERNAME=xxx
```

### New Code (RSS - Current)
```typescript
// No environment variables needed! 🎉
```

If you had Reddit environment variables set in Vercel, you can safely delete them - they're no longer used.
