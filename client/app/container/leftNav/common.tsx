import { useRouter } from 'next/navigation';

import IconButton from '../../components/common/button/iconButton';
import ArrowIcon from '../../components/svgs/ArrowIcon';
import HomeIcon from '../../components/svgs/HomeIcon';

const CommonContainer = () => {
  const router = useRouter();

  const goToHome = () => {
    router.push('/');
  };

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

export default CommonContainer;
