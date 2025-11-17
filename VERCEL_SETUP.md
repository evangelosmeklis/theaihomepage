# Fixing Reddit 403 Errors on Vercel

## Problem

You're seeing these errors during Vercel deployment:

```
Reddit API error for r/artificial: 403 Blocked
Reddit API error for r/MachineLearning: 403 Blocked
```

Reddit blocks requests from cloud hosting providers like Vercel, even with proper credentials. The solution is to use Reddit's OAuth API with proper authentication.

## Solution: Set Up Reddit OAuth

### Step 1: Create a Reddit App

1. **Log in to Reddit** and go to: https://www.reddit.com/prefs/apps
2. Scroll to the bottom and click **"create another app..."**
3. Fill in the form:
   - **name**: `theaihomepage.com` (or any name you prefer)
   - **App type**: Select **"script"**
   - **description**: (leave blank or add a description)
   - **about url**: (leave blank)
   - **redirect uri**: Enter `http://localhost` (required but not used)
4. Click **"create app"**
5. You'll see your new app. Copy these two values:
   - **Client ID**: The string right under "personal use script" (looks like: `xXxXxXxXxXxXx`)
   - **Secret**: The string next to "secret" (looks like: `xXxXxXxXxXxXxXxXxXxXxXxXxXxXxX`)

### Step 2: Add Environment Variables to Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project (`theaihomepage` or whatever you named it)
3. Click **"Settings"** in the top navigation
4. Click **"Environment Variables"** in the left sidebar
5. Add these three environment variables:

   **Variable 1:**
   - Name: `REDDIT_CLIENT_ID`
   - Value: (paste your Client ID from Step 1)
   - Environment: Check all three: Production, Preview, Development

   **Variable 2:**
   - Name: `REDDIT_CLIENT_SECRET`
   - Value: (paste your Secret from Step 1)
   - Environment: Check all three: Production, Preview, Development

   **Variable 3:**
   - Name: `REDDIT_USERNAME`
   - Value: (your Reddit username without the /u/ prefix)
   - Environment: Check all three: Production, Preview, Development

6. Click **"Save"** for each variable

### Step 3: Redeploy

1. Go to the **"Deployments"** tab in your Vercel project
2. Click the **three dots (...)** on your latest deployment
3. Click **"Redeploy"**
4. Check **"Use existing Build Cache"** is UNCHECKED (to ensure fresh build)
5. Click **"Redeploy"**

### Step 4: Verify

Watch the build logs. You should now see:

```
✓ Generating static pages using 1 worker (11/11)
```

Without any "403 Blocked" errors for Reddit.

## Testing Locally (Optional)

To test with Reddit OAuth locally:

1. Create a `.env.local` file in your project root:

```bash
REDDIT_CLIENT_ID=your_client_id_here
REDDIT_CLIENT_SECRET=your_secret_here
REDDIT_USERNAME=your_reddit_username
```

2. Restart your development server:

```bash
npm run dev
```

## Troubleshooting

### Still seeing 403 errors?

1. **Double-check your credentials** - Make sure you copied the full Client ID and Secret
2. **Verify environment variables** - Check they're set in Vercel's dashboard
3. **Check the app type** - Make sure you selected "script" not "web app"
4. **Clear build cache** - Redeploy without using the existing build cache

### Reddit OAuth token errors?

Check the Vercel function logs:
1. Go to your deployment
2. Click **"Functions"** tab
3. Look for errors related to Reddit OAuth

### Need help?

The code changes have already been applied to:
- `lib/fetchers/reddit.ts` - Updated to use proper OAuth with better error messages

The changes include:
- Proper Reddit OAuth authentication
- Better User-Agent string format
- More detailed error logging
- Cache prevention for blocked requests

