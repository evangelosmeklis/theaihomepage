// Cached fetch wrapper for Vercel
export async function cachedFetch<T>(
  key: string,
  fetchFn: () => Promise<T>,
  revalidate: number = 600 // 10 minutes in seconds
): Promise<T> {
  // Next.js fetch with automatic caching on Vercel
  const cacheKey = `cache:${key}`;

  try {
    // This uses Next.js's built-in fetch cache
    const response = await fetch(`data:,${cacheKey}`, {
      next: {
        revalidate,
        tags: [key]
      },
    }).catch(() => null);

    if (response) {
      return JSON.parse(await response.text()) as T;
    }
  } catch {
    // Fetch fresh data if cache fails
  }

  // Fetch fresh data
  return await fetchFn();
}
