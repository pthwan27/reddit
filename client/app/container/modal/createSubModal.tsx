import { useState } from 'react';

import BaseModal from '@/app/container/modal/base';

import { CREATE_SUB_MODAL_STEPS } from '@/app/constants/createSubModal';

import CreateSub from '../sub/create';

const CreateSubModal = () => {
  const [curInputBoxNum, setCurInputBoxNum] = useState<number>(0);

  return (
    <BaseModal
      modalkey={'createSubModal'}
      width="768px"
      headerInfo={CREATE_SUB_MODAL_STEPS[curInputBoxNum].header}
      headerSubInfo={CREATE_SUB_MODAL_STEPS[curInputBoxNum].subHeader}
    >
      <CreateSub
        curInputBoxNum={curInputBoxNum}
        setCurInputBoxNum={setCurInputBoxNum}
      />
    </BaseModal>
  );
};

export default CreateSubModal;
