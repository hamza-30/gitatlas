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

export function calculateLanguageUsageData(repoData) {
  let languageUsageFrequency = {};
  for (const repo of repoData) {
    if (repo.language) {
      languageUsageFrequency[repo.language] =
        (languageUsageFrequency[repo.language] || 0) + 1;
    }
  }

  let languageUsagePieData = [
    ...Object.entries(languageUsageFrequency).map((lang) => ({
      name: lang[0],
      value: lang[1],
    })),
  ];

  let reposWithLanguage = repoData.filter((repo) => repo.language);

  let languageUsagePercentage = languageUsagePieData
    .map((lang) => ({
      language: lang.name,
      percentage: ((lang.value / reposWithLanguage.length) * 100).toFixed(1),
    }))
    .sort((a, b) => b.percentage - a.percentage);

  return { languageUsagePieData, languageUsagePercentage };
}
