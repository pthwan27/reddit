import IconButton from '../../components/common/button/iconButton';
import ArrowIcon from '../../components/svgs/ArrowIcon';
import HomeIcon from '../../components/svgs/HomeIcon';

const CommonLeftNavMenu = () => {
  return (
    <>
      <IconButton icon={<HomeIcon />} value={'홈'} />
      <IconButton icon={<ArrowIcon />} value={'인기'} />
    </>
  );
};

export default CommonLeftNavMenu;
