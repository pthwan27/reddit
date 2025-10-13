import BaseModal from '@/app/container/modal/baseModal';

import { ModalKey } from '@/app/context/modalContext';

import CreateSubContainer from '../sub/createSubContainer';

const CreateSubModal = () => {
  const modalKey: ModalKey = 'createSubModal';

  return (
    <BaseModal
      modalkey={modalKey}
      width="720px"
      headerInfo="Create a Community"
      headerSubInfo="커뮤니티를 만들어 보세요."
    >
      <CreateSubContainer />
    </BaseModal>
  );
};

export default CreateSubModal;
