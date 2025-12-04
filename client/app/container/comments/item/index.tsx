import { useRouter } from 'next/navigation';
import { useState } from 'react';

import formatTimeAgo from '@/app/utils/formatTimeAgo';

import { useCommentStore } from '@/app/store/commentStore';

import DOMPurify from 'dompurify';
import { styled } from 'styled-components';

import { useAuth } from '@/app/context/authContext';
import { Comment } from '@/app/types';

import CommentActions from '../../../components/comments/actions';
import IconBox from '../../../components/common/IconBox';
import ErrorMessage from '../../../components/common/errorMessage';
import RichTextEditor from '../../../components/common/input/richTextEditor';
import MinusCircleIcon from '../../../components/svgs/MinusCircleIcon';
import PlusCircleIcon from '../../../components/svgs/PlusCircleIcon';

interface CommentItemProps extends Comment {
  depth?: number;
}

const CommentItemContainer = ({ depth = 0, ...comment }: CommentItemProps) => {
  const { user } = useAuth();
  const { submitComment } = useCommentStore();
  const router = useRouter();

  const [isSummary, setIsSummary] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const [hoveredChildIndex, setHoveredChildIndex] = useState<number | null>(
    null
  );

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
      setError('');

      await submitComment(comment.id, content, 'comment');

      cancelHandler();
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Reply submit failed:', error);
      setError(error.message);
    }
  };

  const toggleSummary = () => {
    setIsSummary((prev) => !prev);
  };

  const hasChildComments =
    comment.childComments && comment.childComments.length > 0;

  return (
    <CommentItem key={comment.identifier}>
      <Summary>
        <AvatarWrapper>
          {isSummary ? (
            <IconBox iconUrl={comment.userProfileUrl} width={32} height={32} />
          ) : (
            <PlusCircleIconWrapper onClick={toggleSummary}>
              <IconBox
                icon={<PlusCircleIcon />}
                width={16}
                height={16}
                percentage={100}
              />
            </PlusCircleIconWrapper>
          )}
        </AvatarWrapper>

        <div>
          <span>{comment.username}</span>
          <span>•</span>
          <span>{formatTimeAgo(comment.createdAt)}</span>
        </div>
      </Summary>

      {isSummary && (
        <ItemGridWrapper>
          <Contents>
            <Spacer />
            <Content
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(comment.body),
              }}
            />
          </Contents>
          <Contents>
            {!hasChildComments ? (
              <Spacer />
            ) : (
              <CloseIconWrapper onClick={toggleSummary}>
                <IconBox
                  icon={<MinusCircleIcon />}
                  width={16}
                  height={16}
                  percentage={100}
                />
              </CloseIconWrapper>
            )}
            <CommentActions
              comment={comment}
              setIsEditorOpen={openInputEditor}
            />
          </Contents>

          {isEditorOpen && (
            <Contents>
              <Spacer />
              <InputEditorWrapper>
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
              </InputEditorWrapper>
            </Contents>
          )}
        </ItemGridWrapper>
      )}

      {isSummary &&
        hasChildComments &&
        comment.childComments.map((childComment, idx) => (
          <div key={childComment.identifier + idx}>
            {hasChildComments && (
              <ThreadLineWrapper
                className="threadLineWrapper"
                onClick={toggleSummary}
                onMouseEnter={() => setHoveredChildIndex(idx)}
                onMouseLeave={() => setHoveredChildIndex(null)}
              >
                <ThreadLine $isHovered={hoveredChildIndex === idx} />
              </ThreadLineWrapper>
            )}
            <ItemGridWrapper key={childComment.identifier}>
              <Contents>
                <BranchLineWrapper
                  onClick={toggleSummary}
                  className="branchLineWrapper"
                  onMouseEnter={() => setHoveredChildIndex(idx)}
                  onMouseLeave={() => setHoveredChildIndex(null)}
                >
                  <BranchLine $isHovered={hoveredChildIndex === idx} />
                </BranchLineWrapper>
                <CommentItemContainer
                  key={childComment.identifier}
                  {...childComment}
                  depth={depth + 1}
                />
              </Contents>
            </ItemGridWrapper>
          </div>
        ))}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </CommentItem>
  );
};

const CommentItem = styled.div`
  position: relative;
`;

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
  height: var(--rem-40);

  z-index: 1;
`;

const ItemGridWrapper = styled.div`
  position: relative;

  display: grid;

  grid-template-columns: 24px 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 32px 1fr;
  }

  padding: var(--spacer-4xs) 0;
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

  z-index: 0;

  cursor: pointer;
`;

const ThreadLine = styled.div<{ $isHovered: boolean }>`
  width: var(--rem-1);
  height: 100%;

  background: ${({ theme, $isHovered }) =>
    $isHovered ? theme.colors.tone[2] : theme.colors.tone[4]};
  cursor: pointer;
`;

const BranchLineWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  background: ${({ theme }) => theme.colors.neutral.background};

  top: 0px;
  bottom: 0px;
  inset-inline-start: 0px;

  width: var(--rem-24);

  @media (min-width: 768px) {
    width: var(--rem-32);
  }

  z-index: 0;

  cursor: pointer;
`;

const BranchLine = styled.div<{ $isHovered: boolean }>`
  border-style: solid;
  border-inline-start-width: 1px;
  border-bottom-width: 1px;
  border-end-start-radius: 12px;

  border-color: ${({ theme, $isHovered }) =>
    $isHovered ? theme.colors.tone[2] : theme.colors.tone[4]};

  width: calc(50% + 0.5px);
  height: 1rem;
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
const Spacer = styled.div``;

const InputEditorWrapper = styled.div`
  padding-bottom: 1rem;
  padding-top: 1rem;
`;

const Content = styled.div`
  margin: 0 var(--spacer-2xs);

  @media (min-width: 768px) {
    margin: 0 var(--spacer-xs);
  }

  padding-bottom: var(--spacer-2xs);
`;

const PlusCircleIconWrapper = styled.button`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-start;

  padding: var(--spacer-4xs) 0;
  background: ${({ theme }) => theme.colors.neutral.background};

  &:active {
    background: ${({ theme }) => theme.colors.secondary.backgroundSelected};
  }
`;

const CloseIconWrapper = styled.button`
  position: relative;

  display: flex;
  justify-content: center;
  align-self: flex-start;

  background: ${({ theme }) => theme.colors.neutral.background};

  margin-top: var(--rem-4);
  padding: var(--spacer-4xs) 0;

  cursor: pointer;

  &:active {
    background: ${({ theme }) => theme.colors.secondary.backgroundSelected};
  }

  z-index: 1;
`;

export default CommentItemContainer;
