import IconButton from '../common/button/iconButton';
import ArrowIcon from '../svgs/ArrowIcon';
import HomeIcon from '../svgs/HomeIcon';

const CommonLeftNavMenu = () => {
  return (
    <>
      <IconButton icon={<HomeIcon />} value={'홈'} />
      <IconButton icon={<ArrowIcon />} value={'인기'} />
    </>
  );
};

export default CommonLeftNavMenu;
