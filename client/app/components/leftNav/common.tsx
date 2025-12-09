import IconButton from '../common/button/iconButton';
import ArrowIcon from '../svgs/ArrowIcon';
import HomeIcon from '../svgs/HomeIcon';
import PlusIcon from '../svgs/PlusIcon';

interface CommonProps {
  goToHome: () => void;
  openCreateSubModal: () => void;
}
const Common = ({ goToHome, openCreateSubModal }: CommonProps) => {
  return (
    <>
      <IconButton
        variant="neutral"
        icon={<HomeIcon />}
        value={'홈'}
        onClick={goToHome}
      />
      <IconButton variant="neutral" icon={<ArrowIcon />} value={'인기'} />
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
