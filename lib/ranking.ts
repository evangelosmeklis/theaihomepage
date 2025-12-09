/**
 * Hacker News ranking algorithm
 * Score = (P-1) / (T+2)^G
 * where:
 * P = points (upvotes)
 * T = time since submission (in hours)
 * G = gravity (1.8 by default)
 */
export function calculateHotScore(
  points: number,
  createdAt: Date,
  gravity: number = 1.8
): number {
  const hoursAgo = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60);
  return (points - 1) / Math.pow(hoursAgo + 2, gravity);
}

/**
 * Sort posts by hot score
 */
export function sortByHot<T extends { points: number; createdAt: Date }>(
  items: T[]
): T[] {
  return items.sort((a, b) => {
    const scoreA = calculateHotScore(a.points, a.createdAt);
    const scoreB = calculateHotScore(b.points, b.createdAt);
    return scoreB - scoreA;
  });
}

/**
 * Sort posts by newest
 */
export function sortByNewest<T extends { createdAt: Date }>(items: T[]): T[] {
  return items.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
}
