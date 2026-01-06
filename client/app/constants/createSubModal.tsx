import BrowserFillIcon from '../components/svgs/BrowserFillIcon';
import BrowserIcon from '../components/svgs/BrowserIcon';
import LockFillIcon from '../components/svgs/LockFillIcon';
import LockIcon from '../components/svgs/LockIcon';
import ShowFillIcon from '../components/svgs/ShowFillIcon';
import ShowIcon from '../components/svgs/ShowIcon';

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
