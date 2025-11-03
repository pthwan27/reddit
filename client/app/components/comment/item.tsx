import { styled } from 'styled-components';

import { Comment } from '@/app/types';

import PlusCircleIcon from '../svgs/PlusCircleIcon';

const CommentItem = ({ comment }: { comment: Comment }) => {
  return (
    <PostItemContainer>
      <SummaryContainer>
        <ButtonBox>
          <button>
            <PlusCircleIcon />
          </button>
        </ButtonBox>
        <SummaryInfo>
          <span>{comment.username}</span>
          <span>•</span>
          <span></span>
        </SummaryInfo>
      </SummaryContainer>
      <DetailContainer></DetailContainer>
    </PostItemContainer>
  );
};

const PostItemContainer = styled.div`
  position: relative;
`;

const SummaryContainer = styled.summary`
  grid-template-columns: 24px minmax(0px, 1fr);
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;

  button {
    font: var(--font-12-16-semibold);
  }
`;
const SummaryInfo = styled.div`
  display: flex;

  margin-left: var(--spacer-xs);

  color: ${({ theme }) => theme.colors.naturalText};
  font: var(--font-12-16-semibold);

  span:nth-child(1) {
  }
  span:nth-child(2) {
    display: inline-block;

    margin: 0 var(--spacer-2xs);
  }
  span:nth-child(3) {
    font: var(--font-12-16-regular);

    color: ${({ theme }) => theme.colors.neutralContentWeak};
  }
`;

const DetailContainer = styled.div`
  grid-template-columns: 24px minmax(0px, 1fr);
`;
export default CommentItem;
