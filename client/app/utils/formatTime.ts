const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp);

  const years = date.getFullYear();
  const months = date.getMonth() + 1;
  const days = date.getDate();

  return `${years}년 ${months}월 ${days}일`;
};

export default formatTime;
