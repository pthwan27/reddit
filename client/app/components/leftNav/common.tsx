import IconButton from '../common/button/iconButton';
import ArrowIcon from '../svgs/ArrowIcon';
import HomeIcon from '../svgs/HomeIcon';

interface CommonProps {
  goToHome: () => void;
}
const Common = ({ goToHome }: CommonProps) => {
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
