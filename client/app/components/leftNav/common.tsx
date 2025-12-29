import { usePathname } from 'next/navigation';

import IconButton from '../common/button/iconButton';
import HomeFillIcon from '../svgs/HomeFillIcon';
import HomeIcon from '../svgs/HomeIcon';
import PlusIcon from '../svgs/PlusIcon';

interface CommonProps {
  goToHome: () => void;
  openCreateSubModal: () => void;
}
const Common = ({ goToHome, openCreateSubModal }: CommonProps) => {
  const pathname = usePathname();

  return (
    <>
      <IconButton
        variant="neutral"
        icon={pathname === '/' ? <HomeFillIcon /> : <HomeIcon />}
        selected={pathname === '/'}
        value={'홈'}
        onClick={goToHome}
      />
      <IconButton
        variant="neutral"
        icon={<PlusIcon />}
        value={'커뮤니티 만들기'}
        onClick={() => openCreateSubModal()}
      />
    </>
  );
};

export default Common;
