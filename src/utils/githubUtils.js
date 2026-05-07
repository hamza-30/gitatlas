export function calculateStats(repoData) {
  let totalStars = repoData.reduce(
    (acc, repo) => acc + repo.stargazers_count,
    0,
  );

  if (totalStars > 1000) {
    totalStars = `${(totalStars / 1000).toFixed(1)}K`;
  }

  let totalForks = repoData.reduce((acc, repo) => acc + repo.forks_count, 0);

  if (totalForks > 1000) {
    totalForks = `${(totalForks / 1000).toFixed(1)}K`;
  }

  let totalLanguages = new Set(
    repoData.map((repo) => repo.language).filter(Boolean),
  ).size;

  return { totalStars, totalForks, totalLanguages };
}
