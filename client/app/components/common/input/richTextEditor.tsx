import { useState } from 'react';

import styled from 'styled-components';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}
const RichTextEditor = ({
  content,
  onChange,
  placeholder,
}: RichTextEditorProps) => {
  const [isPreview, setIsPreview] = useState(false);

  const insertMarkdown = (before: string, after: string = '') => {
    const newContent = content + before + after;
    onChange(newContent);
  };

  return (
    <StyledRichTextEditor>
      <EditorToolbar>
        <ToolbarLeft>
          <ToolButton onClick={() => insertMarkdown('**', '**')} title="굵게">
            <strong>B</strong>
          </ToolButton>
          <ToolButton onClick={() => insertMarkdown('*', '*')} title="기울기">
            <em>I</em>
          </ToolButton>
          <ToolButton onClick={() => insertMarkdown('~~', '~~')} title="취소선">
            S̶
          </ToolButton>
          <ToolButton
            onClick={() => insertMarkdown('`', '`')}
            title="인라인 코드"
          >
            X*
          </ToolButton>
          <ToolButton onClick={() => insertMarkdown('# ', '')} title="헤딩">
            TT
          </ToolButton>
          <ToolButton onClick={() => insertMarkdown('[](', ')')} title="링크">
            🔗
          </ToolButton>
          <ToolButton
            onClick={() => insertMarkdown('- ', '')}
            title="순서 없는 목록"
          >
            • • •
          </ToolButton>
          <ToolButton
            onClick={() => insertMarkdown('1. ', '')}
            title="순서 있는 목록"
          >
            1. 2. 3.
          </ToolButton>
          <ToolButton onClick={() => insertMarkdown('> ', '')} title="인용">
            ❝❞
          </ToolButton>
          <ToolButton
            onClick={() => insertMarkdown('```\n', '\n```')}
            title="코드 블록"
          >
            ❮❯
          </ToolButton>
          <ToolButton onClick={() => insertMarkdown('😊', '')} title="이모지">
            😊
          </ToolButton>
          <ToolButton
            onClick={() => insertMarkdown('![](', ')')}
            title="이미지"
          >
            📷
          </ToolButton>
        </ToolbarLeft>

        <ToolbarRight>
          <PreviewToggle
            $active={isPreview}
            onClick={() => setIsPreview(!isPreview)}
          >
            Markdown으로 전환
          </PreviewToggle>
        </ToolbarRight>
      </EditorToolbar>

      <EditorBody>
        {isPreview ? (
          <PreviewArea>
            <div
              dangerouslySetInnerHTML={{ __html: content || placeholder || '' }}
            />
          </PreviewArea>
        ) : (
          <TextArea
            id="editor-text-area"
            name="textarea"
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
        )}
      </EditorBody>
    </StyledRichTextEditor>
  );
};

const StyledRichTextEditor = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: var(--radius-xl);
  overflow: hidden;
`;

const EditorToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacer-xs) var(--spacer-sm);
  background: ${({ theme }) => theme.colors.neutral.background};
`;

const ToolbarLeft = styled.div`
  display: flex;
  gap: var(--spacer-2xs);
  flex-wrap: wrap;
`;

const ToolButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: var(--rem-24);
  height: var(--rem-24);

  border: none;
  border-radius: var(--radius-sm);
  background: transparent;

  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.neutral.content};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral.backgroundHover};
  }
`;

const ToolbarRight = styled.div``;

const PreviewToggle = styled.button<{ $active: boolean }>`
  padding: var(--spacer-2xs) var(--spacer-xs);
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: var(--radius-sm);
  background: ${({ $active, theme }) =>
    $active ? theme.colors.secondary.background : 'transparent'};

  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.neutral.content};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral.backgroundHover};
  }
`;

const EditorBody = styled.div`
  min-height: var(--rem-128);
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: var(--spacer-sm);

  border: none;
  resize: vertical;
  background: transparent;

  font: var(--font-14);
  color: ${({ theme }) => theme.colors.neutral.contentStrong};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral.contentWeak};
  }
`;

const PreviewArea = styled.div`
  width: 100%;
  height: var(--rem-128);

  border: none;
  padding: var(--spacer-sm);

  font: var(--font-14);
  color: ${({ theme }) => theme.colors.neutral.contentStrong};
`;

export default RichTextEditor;
