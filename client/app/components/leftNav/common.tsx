import IconButton from '../common/button/iconButton';
import ArrowIcon from '../svgs/ArrowIcon';
import HomeIcon from '../svgs/HomeIcon';

interface CommonContainerProps {
  goToHome: () => void;
}
const Common = ({ goToHome }: CommonContainerProps) => {
  return (
    <>
      <IconButton
        variant="neutral"
        icon={<HomeIcon />}
        value={'홈'}
        onClick={goToHome}
      />
      <IconButton variant="neutral" icon={<ArrowIcon />} value={'인기'} />
    </>
  );
};

export default Common;
