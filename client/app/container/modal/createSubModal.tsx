import BaseModal from '@/app/container/modal/base';

import CreateSub from '../sub/create';

const CreateSubModal = () => {
  return (
    <BaseModal
      modalkey={'createSubModal'}
      width="768px"
      headerInfo="Create a Community"
      headerSubInfo="커뮤니티를 만들어 보세요."
    >
      <CreateSub />
    </BaseModal>
  );
};

export default CreateSubModal;
