export interface TagCategory {
  id: string;
  name: string;
  subTags: string[];
}

export const TAG_CATEGORIES: TagCategory[] = [
  {
    id: 'game',
    name: '게임',
    subTags: [
      '액션 게임',
      '전략 게임',
      'RPG',
      '스포츠 게임',
      '퍼즐 게임',
      '시뮬레이션',
    ],
  },
  {
    id: 'sports',
    name: '스포츠',
    subTags: ['축구', '농구', '야구', '배구', '테니스', '골프'],
  },
  {
    id: 'movie',
    name: '영화',
    subTags: ['스릴러', '공포', '코미디', '로맨스', 'SF', '액션'],
  },
  {
    id: 'music',
    name: '음악',
    subTags: ['K-POP', '힙합', '록', '재즈', '클래식', 'EDM'],
  },
  {
    id: 'tech',
    name: '기술',
    subTags: ['프로그래밍', 'AI', '웹 개발', '모바일', '클라우드', '보안'],
  },
  {
    id: 'food',
    name: '음식',
    subTags: ['한식', '양식', '중식', '일식', '디저트', '베이킹'],
  },
  {
    id: 'travel',
    name: '여행',
    subTags: ['국내 여행', '해외 여행', '배낭 여행', '호캉스', '캠핑', '등산'],
  },
  {
    id: 'fashion',
    name: '패션',
    subTags: ['스트릿', '캐주얼', '포멀', '빈티지', '스포츠웨어', '액세서리'],
  },
];

export const MAX_TAGS = 3;
