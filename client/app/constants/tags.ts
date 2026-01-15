export interface TagCategory {
  id: string;
  name: string;
  emoji: string;
}

export const TAGS: TagCategory[] = [
  {
    id: 'health',
    name: '건강',
    emoji: '💊',
  },
  {
    id: 'game',
    name: '게임',
    emoji: '🎮',
  },
  {
    id: 'science',
    name: '과학',
    emoji: '🧪',
  },
  {
    id: 'education',
    name: '교육 & 커리어',
    emoji: '📚',
  },
  {
    id: 'news',
    name: '뉴스 & 정치',
    emoji: '📰',
  },
  {
    id: 'culture',
    name: '대중문화',
    emoji: '✨',
  },
  {
    id: 'reading',
    name: '독서 & 글쓰기',
    emoji: '📖',
  },
  {
    id: 'business',
    name: '비즈니스 & 금융',
    emoji: '💼',
  },
  {
    id: 'housing',
    name: '수집 & 기타 취미',
    emoji: '🧩',
  },
  {
    id: 'sports',
    name: '스포츠',
    emoji: '🏆',
  },
  {
    id: 'movie',
    name: '영화 & TV',
    emoji: '🎬',
  },
  {
    id: 'art',
    name: '예술',
    emoji: '🎨',
  },
  {
    id: 'wellness',
    name: '웰빙',
    emoji: '🔥',
  },
  {
    id: 'meta',
    name: '으스스 섬뜩 주의',
    emoji: '👀',
  },
  {
    id: 'food',
    name: '음식 & 음료',
    emoji: '🍔',
  },
  {
    id: 'music',
    name: '음악',
    emoji: '🎵',
  },
  {
    id: 'humanities',
    name: '인문학 & 법',
    emoji: '📜',
  },
  {
    id: 'internet',
    name: '인터넷 문화',
    emoji: '🌐',
  },
  {
    id: 'anime',
    name: '일본 애니메이션 & 코스프레',
    emoji: '🚗',
  },
  {
    id: 'nature',
    name: '자연 & 아웃도어',
    emoji: '🌿',
  },
  {
    id: 'place',
    name: '장소 & 여행',
    emoji: '🌍',
  },
  {
    id: 'politics',
    name: '정체성 & 관계',
    emoji: '🌈',
  },
  {
    id: 'car',
    name: '차량',
    emoji: '🚗',
  },
  {
    id: 'tech',
    name: '테크놀로지',
    emoji: '💻',
  },
  {
    id: 'fashion',
    name: '패션 & 뷰티',
    emoji: '💎',
  },
  {
    id: 'home',
    name: '홈 & 가드닝',
    emoji: '🏡',
  },
  {
    id: 'qa',
    name: 'Q&A 및 이야기',
    emoji: '✏️',
  },
  {
    id: 'mature',
    name: '성인용 주제',
    emoji: '🔞',
  },
  {
    id: 'adult',
    name: '성인용 콘텐츠',
    emoji: '🟥',
  },
];

export const MAX_TAGS = 3;
