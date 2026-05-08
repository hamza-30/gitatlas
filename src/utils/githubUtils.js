export function calculateStats(repoData) {
  let totalStars = repoData.reduce(
    (acc, repo) => acc + repo.stargazers_count,
    0,
  );

  const rawStarsCount = totalStars

  if (totalStars > 1000) {
    totalStars = `${(totalStars / 1000).toFixed(1)}K`;
  }

  let totalForks = repoData.reduce((acc, repo) => acc + repo.forks_count, 0);

  const rawForksCount = totalForks

  if (totalForks > 1000) {
    totalForks = `${(totalForks / 1000).toFixed(1)}K`;
  }

  let totalLanguages = new Set(
    repoData.map((repo) => repo.language).filter(Boolean),
  ).size;

  return { totalStars, rawStarsCount, totalForks, rawForksCount, totalLanguages };
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

export function convertToUpdatedAgoTime(date) {
  let today = new Date();
  let repoDate = new Date(date);

  let diffInSeconds = Math.floor((today - repoDate) / 1000);

  const years = Math.floor(diffInSeconds / 31536000);
  if (years >= 1) {
    return years > 1 ? `${years} years ago` : `${years} year ago`;
  }

  const months = Math.floor(diffInSeconds / 2592000);
  if (months >= 1) {
    return months > 1 ? `${months} months ago` : `${months} month ago`;
  }

  const weeks = Math.floor(diffInSeconds / 604800);
  if (weeks >= 1) {
    return weeks > 1 ? `${weeks} weeks ago` : `${weeks} week ago`;
  }

  const days = Math.floor(diffInSeconds / 86400);
  if (days >= 1) {
    return days > 1 ? `${days} days ago` : `${days} day ago`;
  }

  const hours = Math.floor(diffInSeconds / 3600);
  if (hours >= 1) {
    return hours > 1 ? `${hours} hours ago` : `${hours} hour ago`;
  }

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes >= 1) {
    return minutes > 1 ? `${minutes} minutes ago` : `${minutes} minute ago`;
  }

  return `just now`;
}