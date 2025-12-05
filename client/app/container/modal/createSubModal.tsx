import BaseModal from '@/app/container/modal/base';

import { ModalKey } from '@/app/context/modalContext';

import CreateSub from '../sub/create';

const CreateSubModal = () => {
  const modalKey: ModalKey = 'createSubModal';

  return (
    <BaseModal
      modalkey={modalKey}
      width="768px"
      headerInfo="Create a Community"
      headerSubInfo="커뮤니티를 만들어 보세요."
    >
      <CreateSub />
    </BaseModal>
  );
};

export default CreateSubModal;
