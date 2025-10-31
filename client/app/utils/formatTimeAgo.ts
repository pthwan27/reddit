const formatTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const past = new Date(timestamp);

  const diffMs = now.getTime() - past.getTime();

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears >= 1) {
    return `${diffYears}년 전`;
  }
  if (diffMonths >= 1) {
    return `${diffMonths}달 전`;
  }
  if (diffDays >= 1) {
    return `${diffDays}일 전`;
  }
  if (diffHours >= 1) {
    return `${diffHours}시간 전`;
  }
  return `${diffMinutes}분 전`;
};

export default formatTimeAgo;
