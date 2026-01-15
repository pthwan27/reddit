import { usePathname } from 'next/navigation';

import IconButton from '../common/button/iconButton';
import ArrowFillIcon from '../svgs/ArrowFillIcon';
import ArrowIcon from '../svgs/ArrowIcon';
import HomeFillIcon from '../svgs/HomeFillIcon';
import HomeIcon from '../svgs/HomeIcon';
import PlusIcon from '../svgs/PlusIcon';

interface CommonProps {
  goToHome: () => void;
  goToPopular: () => void;
  openCreateSubModal: () => void;
}
const Common = ({ goToHome, goToPopular, openCreateSubModal }: CommonProps) => {
  const pathname = usePathname();

  return (
    <>
      <IconButton
        variant="neutral"
        icon={pathname === '/' ? <HomeFillIcon /> : <HomeIcon />}
        selected={pathname === '/'}
        value={'홈'}
        radius="var(--radius-sm)"
        onClick={goToHome}
      />
      <IconButton
        variant="neutral"
        icon={pathname === '/r/popular' ? <ArrowFillIcon /> : <ArrowIcon />}
        selected={pathname === '/r/popular'}
        value={'인기'}
        radius="var(--radius-sm)"
        onClick={goToPopular}
      />
      <IconButton
        variant="neutral"
        icon={<PlusIcon />}
        value={'커뮤니티 만들기'}
        radius="var(--radius-sm)"
        onClick={() => openCreateSubModal()}
      />
    </>
  );
};

export default Common;
