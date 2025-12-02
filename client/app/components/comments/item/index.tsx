import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { clientAxiosInstance } from '@/app/utils/axios';
import formatTimeAgo from '@/app/utils/formatTimeAgo';

import DOMPurify from 'dompurify';
import { styled } from 'styled-components';

import { useAuth } from '@/app/context/authContext';
import { Comment } from '@/app/types';

import IconBox from '../../common/IconBox';
import ErrorMessage from '../../common/errorMessage';
import RichTextEditor from '../../common/input/richTextEditor';
import MinusCircleIcon from '../../svgs/MinusCircleIcon';
import PlusCircleIcon from '../../svgs/PlusCircleIcon';
import CommentActions from '../actions';

const CommentItem = ({ ...comment }: Comment) => {
  const { user } = useAuth();
  const router = useRouter();

  const [isSummary, setIsSummary] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const openInputEditor = () => {
    setIsEditorOpen(true);
  };

  const cancelHandler = () => {
    setContent('');
    setIsEditorOpen(false);
  };

  const commentSubmitHandler = async () => {
    if (!user) return router.push('/login');

    try {
      const formData = new FormData();

      formData.append('comment', content);
      formData.append('commentId', comment.id.toString());

      await clientAxiosInstance.post(`/api/comments/submit`, formData);
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Create Sub failed:', error);
      setError(error.message);
    }
  };

  const toggleSummary = () => {
    setIsSummary((prev) => !prev);
  };

  const isChildComment = Boolean(comment.childComments);
  return (
    <StyledCommentItem key={comment.identifier}>
      <Summary>
        {isSummary ? (
          <AvatarWrapper>
            <IconBox iconUrl={comment.userProfileUrl} width={32} height={32} />
          </AvatarWrapper>
        ) : (
          <button onClick={toggleSummary}>
            <IconBox
              icon={<PlusCircleIcon />}
              width={32}
              height={32}
              percentage={50}
            ></IconBox>
          </button>
        )}

        <div>
          <span>{comment.username}</span>
          <span>•</span>
          <span>{formatTimeAgo(comment.createdAt)}</span>
        </div>
      </Summary>
      <ItemGridWrapper>
        {!isChildComment && (
          <ThreadLineWrapper>
            <ThreadLine />
          </ThreadLineWrapper>
        )}
        <Contents>
          <div></div>
          <ContentBox
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(comment.body),
            }}
          />
        </Contents>
        <Contents>
          <ContentIconWrapper>
            {!isChildComment && (
              <IconBox
                icon={<MinusCircleIcon />}
                width={16}
                height={16}
                percentage={100}
              />
            )}
          </ContentIconWrapper>
          <CommentActions comment={comment} setIsEditorOpen={openInputEditor} />
        </Contents>

        {isEditorOpen && (
          <Contents>
            <div />
            <InputBox>
              <RichTextEditor
                content={content}
                onChange={setContent}
                placeholder=""
                isToolbarVisibleDefault={false}
                editorHeightPercentage={40}
                isInSubmitMode={true}
                submitHandler={commentSubmitHandler}
                cancelHandler={cancelHandler}
              />
            </InputBox>
          </Contents>
        )}
      </ItemGridWrapper>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </StyledCommentItem>
  );
};

const StyledCommentItem = styled.div``;

const Summary = styled.summary`
  display: grid;

  grid-template-columns: 24px minmax(0px, 1fr);

  @media (min-width: 768px) {
    grid-template-columns: 32px 1fr;
  }

  > button {
    padding: 0;
  }

  > div:nth-child(2) {
    display: flex;
    margin-inline-end: 0;
    flex-direction: row;
    align-items: center;
    max-width: 100%;

    gap: var(--spacer-2xs);

    font-size: 0.875rem;

    margin-inline-start: var(--spacer-xs);
    padding: var(--spacer-2xs) 0;
    padding-inline-end: 0.5rem;

    color: ${({ theme }) => theme.colors.neutral.contentWeak};

    > span {
      font: var(--font-12-16-regular);
      padding-bottom: var(--spacer-xs);
    }

    > span:nth-child(1) {
      color: ${({ theme }) => theme.colors.neutral.contentStrong};
      font: var(--font-12-16-bold);
    }
  }
`;
const AvatarWrapper = styled.div`
  width: var(--rem-24);
  height: var(--rem-40);
`;

const ItemGridWrapper = styled.div`
  position: relative;

  display: grid;

  grid-template-columns: 24px 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 32px 1fr;
  }
`;

const ThreadLineWrapper = styled.div`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  top: 0px;
  bottom: 0px;
  inset-inline-start: 0px;
  margin-bottom: var(--spacer-sm);

  width: var(--rem-24);

  @media (min-width: 768px) {
    width: var(--rem-32);
  }

  cursor: pointer;
`;
const ThreadLine = styled.div`
  width: var(--rem-1);
  height: 100%;

  background: ${({ theme }) => theme.colors.tone[4]};
`;

const Contents = styled.div`
  display: contents;

  padding-left: 1.75rem;

  line-height: 1.0625rem;

  > div:first-child {
  }

  > div:last-child {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0px;
  }
`;
const InputBox = styled.div`
  padding-bottom: 1rem;
  padding-top: 1rem;
`;

const ContentBox = styled.div`
  margin: 0 var(--spacer-2xs);
  @media (min-width: 768px) {
    margin: 0 var(--spacer-xs);
  }
  padding-bottom: var(--spacer-2xs);
`;

const ContentIconWrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-self: flex-start;

  background: ${({ theme }) => theme.colors.neutral.background};

  margin-top: var(--rem-6);
  padding: var(--spacer-4xs) 0;
`;
export default CommentItem;
