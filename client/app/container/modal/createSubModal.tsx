import { useState } from 'react';

import BaseModal from '@/app/container/modal/base';

import CreateSub from '../sub/create';

const CreateSubModal = () => {
  const [curInputBoxNum, setCurInputBoxNum] = useState<number>(0);

  const [headerInfos] = useState<string[]>([
    '주제를 선택해주세요',
    '어떤 성격의 커뮤니티인가요?',
    '커뮤니티 정보를 기재해주세요',
    '커뮤니티 꾸미기',
  ]);
  const [headerSubInfos] = useState<string[]>([
    '관심사가 같은 레디터가 커뮤니티를 발견할 수 있도록 최대 3개의 주제를 추가하세요.',
    '커뮤니티를 열람하고 기여할 수 있는 사람을 결정합니다. 검색 결과에는 공개 커뮤니티만 표시됩니다.',
    '이름과 설명을 통해 사람들에게 커뮤니티가 어떤 곳인지 소개해 보세요.',
    '시각적 플레어를 추가하면 새로운 멤버의 눈길을 사로잡는 건 물론 커뮤니티만의 문화를 정립할 수도 있습니다! 언제든지 업데이트할 수 있습니다.',
  ]);

  return (
    <BaseModal
      modalkey={'createSubModal'}
      width="768px"
      headerInfo={headerInfos[curInputBoxNum]}
      headerSubInfo={headerSubInfos[curInputBoxNum]}
    >
      <CreateSub
        curInputBoxNum={curInputBoxNum}
        setCurInputBoxNum={setCurInputBoxNum}
      />
    </BaseModal>
  );
};

export default CreateSubModal;
