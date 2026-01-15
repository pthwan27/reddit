import BrowserFillIcon from '../components/svgs/BrowserFillIcon';
import BrowserIcon from '../components/svgs/BrowserIcon';
import LockFillIcon from '../components/svgs/LockFillIcon';
import LockIcon from '../components/svgs/LockIcon';
import ShowFillIcon from '../components/svgs/ShowFillIcon';
import ShowIcon from '../components/svgs/ShowIcon';

export const CREATE_SUB_MODAL_STEPS = [
  {
    sequence: 1,
    header: '커뮤니티에서 다루는 주제는 무엇인가요?',
    subHeader: '커뮤니티를 잘 발견할 수 있도록 주제를 선택하세요.',
  },
  {
    sequence: 2,
    header: '어떤 성격의 커뮤니티인가요?',
    subHeader:
      '커뮤니티를 열람하고 기여할 수 있는 사람을 결정합니다. 검색 결과에는 공개 커뮤니티만 표시됩니다.',
  },
  {
    sequence: 3,
    header: '커뮤니티 정보를 기재해주세요',
    subHeader:
      '이름과 설명을 통해 사람들에게 커뮤니티가 어떤 곳인지 소개해 보세요.',
  },
  {
    sequence: 4,
    header: '커뮤니티를 꾸며보세요',
    subHeader:
      '시각적 플레어를 추가하면 새로운 멤버의 눈길을 사로잡는 건 물론 커뮤니티만의 문화를 정립할 수도 있습니다! 언제든지 업데이트할 수 있습니다.',
  },
];

export const SubVisibilityOptions = [
  {
    id: 'public',
    name: '공개',
    svg: <BrowserIcon />,
    fillSvg: <BrowserFillIcon />,
    desc: '누구나 이 커뮤니티를 열람하고, 게시물을 올리고, 댓글을 남길 수 있습니다',
  },

  {
    id: 'restricted',
    name: '제한됨',
    svg: <ShowIcon />,
    fillSvg: <ShowFillIcon />,
    desc: '누구나 이 커뮤니티를 열람할 수 있지만, 게시물 작성과 댓글 작성은 승인된 회원만 가능합니다',
  },

  {
    id: 'private',
    name: '비공개',
    svg: <LockIcon />,
    fillSvg: <LockFillIcon />,
    desc: '승인된 사용자만 열람 및 기여할 수 있습니다.',
  },
];
