import styled from 'styled-components';

import RichTextEditor from '../../common/input/richTextEditor';

interface CommentInputProps {
  isEditorOpen: boolean;
  openInputEditor: () => void;
  content: string;
  setContent: (content: string) => void;
  commentSubmitHandler: () => Promise<void>;
  cancelHandler: () => void;
}

const CommentInput = ({
  isEditorOpen,
  openInputEditor,
  content,
  setContent,
  commentSubmitHandler,
  cancelHandler,
}: CommentInputProps) => {
  return (
    <StyledInput>
      {!isEditorOpen ? (
        <button onClick={openInputEditor}>답글을 달아보세요</button>
      ) : (
        <RichTextEditor
          content={content}
          onChange={setContent}
          placeholder=""
          isToolbarVisibleDefault={false}
          editorHeightPercentage={50}
          isInSubmitMode={true}
          submitHandler={commentSubmitHandler}
          cancelHandler={cancelHandler}
        />
      )}
    </StyledInput>
  );
};

const StyledInput = styled.div`
  padding: 0 var(--spacer-md);

  @media (min-width: 768px) {
    padding: 0;
  }

  > button {
    display: flex;

    width: 100%;

    padding: var(--spacer-xs) var(--spacer-md);
    cursor: text;

    font: var(--font-16-20-regular);
    line-height: 1.5;

    color: ${({ theme }) => theme.colors.neutral.contentWeak};

    border: 1px solid ${({ theme }) => theme.colors.neutral.border};

    &:focus-within {
      border: 1px solid ${({ theme }) => theme.colors.neutral.borderMedium};
    }
  }
`;

export default CommentInput;
