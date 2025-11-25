import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import FormatIcon from '../../svgs/FormatIcon';
import Bold from '../../svgs/RichTextEditor/Bold';
import CodeBlock from '../../svgs/RichTextEditor/CodeBlock';
import CodeInLine from '../../svgs/RichTextEditor/CodeInLine';
import Italic from '../../svgs/RichTextEditor/Italic';
import LinkIcon from '../../svgs/RichTextEditor/LinkIcon';
import ListBulleted from '../../svgs/RichTextEditor/ListBullted';
import ListNumbered from '../../svgs/RichTextEditor/ListNumbered';
import Quote from '../../svgs/RichTextEditor/Quote';
import StrikeThrough from '../../svgs/RichTextEditor/StrikeThrough';
import SuperScript from '../../svgs/RichTextEditor/SuperScript';
import Table from '../../svgs/RichTextEditor/Table';
import TextSize from '../../svgs/RichTextEditor/TextSize';
import IconBox from '../IconBox';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const htmlToMarkdown = (html: string): string => {
  // 임시 div 생성하여 innerHTML 파싱
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  const processNode = (node: Node): string => {
    // 텍스트 노드
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || '';
    }

    // 요소 노드
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      const children = Array.from(element.childNodes).map(processNode).join('');

      switch (element.tagName.toLowerCase()) {
        case 'strong':
        case 'b':
          return `**${children}**`;
        case 'em':
        case 'i':
          return `*${children}*`;
        case 'del':
        case 's':
          return `~~${children}~~`;
        case 'code':
          return element.parentElement?.tagName === 'PRE'
            ? children
            : `\`${children}\``;
        case 'pre':
          return `\`\`\`\n${children}\n\`\`\``;
        case 'h1':
          return `# ${children}\n`;
        case 'h2':
          return `## ${children}\n`;
        case 'h3':
          return `### ${children}\n`;
        case 'blockquote':
          return `> ${children}\n`;
        case 'ul':
          return children + '\n';
        case 'ol':
          return children + '\n';
        case 'li':
          return `- ${children}\n`;
        case 'a': {
          const href = element.getAttribute('href') || '';
          return `[${children}](${href})`;
        }
        case 'br':
          return '\n';
        case 'div':
        case 'p':
          return children + '\n';
        default:
          return children;
      }
    }

    return '';
  };

  return processNode(tempDiv).trim();
};

/**
 * ✅ Markdown → HTML 변환 (개선된 버전)
 */
const markdownToHtml = (markdown: string): string => {
  let html = markdown
    // XSS 방지
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // 블록 요소 (순서 중요!)
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^&gt; (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
    // 인라인 요소 (순서 중요!)
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>') // 굵은 기울임
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/~~(.*?)~~/g, '<del>$1</del>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    // 줄바꿈
    .replace(/\n/g, '<br>');

  // <li> 태그를 <ul>로 감싸기
  html = html.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');

  return html;
};

const RichTextEditor = ({
  content,
  onChange,
  placeholder,
}: RichTextEditorProps) => {
  const editableRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isToolbarVisible, setIsToolbarVisible] = useState(true);
  const [isMarkdownMode, setIsMarkdownMode] = useState(true);

  const wrapSelection = (
    tagName: string,
    attributes: Record<string, string> = {}
  ) => {
    if (!editableRef.current) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    if (range.collapsed) return;

    let parentElement = range.commonAncestorContainer as HTMLElement;

    if (parentElement.nodeType === Node.TEXT_NODE) {
      parentElement = parentElement.parentElement!;
    }

    let currentElement: HTMLElement | null = parentElement;
    while (currentElement && currentElement !== editableRef.current) {
      if (currentElement.tagName?.toLowerCase() === tagName.toLowerCase()) {
        // 태그 제거 (unwrap)
        const parent = currentElement.parentNode!;
        while (currentElement.firstChild) {
          parent.insertBefore(currentElement.firstChild, currentElement);
        }
        parent.removeChild(currentElement);

        updateContent();
        return;
      }
      currentElement = currentElement.parentElement;
    }

    const wrapper = document.createElement(tagName);
    Object.entries(attributes).forEach(([key, value]) => {
      wrapper.setAttribute(key, value);
    });

    try {
      range.surroundContents(wrapper);
    } catch {
      wrapper.appendChild(range.extractContents());
      range.insertNode(wrapper);
    }

    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(wrapper);
    selection.addRange(newRange);

    updateContent();
  };

  const updateContent = () => {
    if (editableRef.current) {
      const html = editableRef.current.innerHTML;
      const markdown = htmlToMarkdown(html);
      onChange(markdown);
    }
  };

  const handleEditableInput = () => {
    updateContent();
  };

  const toggleIsVisibleToolbar = () => {
    setIsToolbarVisible((prev) => !prev);
  };

  useEffect(() => {
    if (!isMarkdownMode && editableRef.current) {
      const html = markdownToHtml(content);
      if (editableRef.current.innerHTML !== html) {
        editableRef.current.innerHTML = html;
      }
    }
  }, [isMarkdownMode, content]);

  return (
    <StyledRichTextEditor>
      <ToggleIsVisibleToolbar
        onClick={toggleIsVisibleToolbar}
        $isView={isToolbarVisible}
      >
        <IconBox icon={<FormatIcon />} width={32} height={32} percentage={50} />
      </ToggleIsVisibleToolbar>
      <EditorToolbar $isView={isToolbarVisible}>
        <ToolbarLeft>
          {isMarkdownMode ? (
            <MarkdownInfo>Markdown Editor</MarkdownInfo>
          ) : (
            <Buttons>
              <ToolButton onClick={() => wrapSelection('strong')} title="굵게">
                <IconBox
                  icon={<Bold />}
                  width={16}
                  height={16}
                  percentage={100}
                />
              </ToolButton>
              <ToolButton onClick={() => wrapSelection('em')} title="기울기">
                <IconBox
                  icon={<Italic />}
                  width={16}
                  height={16}
                  percentage={100}
                />
              </ToolButton>
              <ToolButton onClick={() => wrapSelection('del')} title="취소선">
                <IconBox
                  icon={<StrikeThrough />}
                  width={16}
                  height={16}
                  percentage={100}
                />
              </ToolButton>
              <ToolButton onClick={() => wrapSelection('sup')} title="위 첨자">
                <IconBox
                  icon={<SuperScript />}
                  width={16}
                  height={16}
                  percentage={100}
                />
              </ToolButton>
              <ToolButton
                onClick={() => {
                  const selection = window.getSelection();
                  if (!selection || selection.rangeCount === 0) return;

                  const range = selection.getRangeAt(0);
                  const h1 = document.createElement('h1');
                  h1.textContent = range.toString() || '제목';

                  range.deleteContents();
                  range.insertNode(h1);

                  updateContent();
                }}
                title="제목"
              >
                <IconBox
                  icon={<TextSize />}
                  width={16}
                  height={16}
                  percentage={100}
                />
              </ToolButton>
              <ToolbarDivider />
              <ToolButton
                onClick={() => {
                  const url = prompt('URL을 입력하세요:');
                  if (url) wrapSelection('a', { href: url, target: '_blank' });
                }}
                title="링크"
              >
                <IconBox
                  icon={<LinkIcon />}
                  width={16}
                  height={16}
                  percentage={100}
                />
              </ToolButton>
              <ToolButton
                onClick={() => {
                  const selection = window.getSelection();
                  if (!selection || selection.rangeCount === 0) return;

                  const range = selection.getRangeAt(0);
                  const ul = document.createElement('ul');
                  const li = document.createElement('li');
                  li.textContent = range.toString() || '목록 항목';
                  ul.appendChild(li);

                  range.deleteContents();
                  range.insertNode(ul);

                  updateContent();
                }}
                title="순서 없는 목록"
              >
                <IconBox
                  icon={<ListBulleted />}
                  width={16}
                  height={16}
                  percentage={100}
                />
              </ToolButton>
              <ToolButton
                onClick={() => {
                  const selection = window.getSelection();
                  if (!selection || selection.rangeCount === 0) return;

                  const range = selection.getRangeAt(0);
                  const ol = document.createElement('ol');
                  const li = document.createElement('li');
                  li.textContent = range.toString() || '목록 항목';
                  ol.appendChild(li);

                  range.deleteContents();
                  range.insertNode(ol);

                  updateContent();
                }}
                title="순서 있는 목록"
              >
                <IconBox
                  icon={<ListNumbered />}
                  width={16}
                  height={16}
                  percentage={100}
                />
              </ToolButton>
              <ToolButton
                onClick={() => {
                  const selection = window.getSelection();
                  if (!selection || selection.rangeCount === 0) return;

                  const range = selection.getRangeAt(0);
                  const blockquote = document.createElement('blockquote');
                  blockquote.textContent = range.toString() || '인용';

                  range.deleteContents();
                  range.insertNode(blockquote);

                  updateContent();
                }}
                title="인용"
              >
                <IconBox
                  icon={<Quote />}
                  width={16}
                  height={16}
                  percentage={100}
                />
              </ToolButton>
              <ToolButton onClick={() => wrapSelection('code')} title="코드">
                <IconBox
                  icon={<CodeInLine />}
                  width={16}
                  height={16}
                  percentage={100}
                />
              </ToolButton>
              <ToolButton
                onClick={() => {
                  const code = prompt('코드를 입력하세요:');
                  if (!code) return;

                  const selection = window.getSelection();
                  if (!selection || selection.rangeCount === 0) return;

                  const range = selection.getRangeAt(0);
                  const pre = document.createElement('pre');
                  const codeEl = document.createElement('code');
                  codeEl.textContent = code;
                  pre.appendChild(codeEl);

                  range.deleteContents();
                  range.insertNode(pre);

                  updateContent();
                }}
                title="코드 블록"
              >
                <IconBox
                  icon={<CodeBlock />}
                  width={16}
                  height={16}
                  percentage={100}
                />
              </ToolButton>
              <ToolButton
                onClick={() => {
                  const selection = window.getSelection();
                  if (!selection || selection.rangeCount === 0) return;

                  const range = selection.getRangeAt(0);
                  const table = document.createElement('table');
                  table.setAttribute('border', '1');
                  table.innerHTML = `
                    <tr><td>Header 1</td><td>Header 2</td></tr>
                    <tr><td>Cell 1</td><td>Cell 2</td></tr>
                  `;

                  range.deleteContents();
                  range.insertNode(table);

                  updateContent();
                }}
                title="표"
              >
                <IconBox
                  icon={<Table />}
                  width={16}
                  height={16}
                  percentage={100}
                />
              </ToolButton>
            </Buttons>
          )}
        </ToolbarLeft>

        <ToolbarRight>
          <ModeToggle
            $active={isMarkdownMode}
            onClick={() => setIsMarkdownMode(!isMarkdownMode)}
          >
            {isMarkdownMode
              ? '서식 있는 텍스트 편집기로 전환'
              : 'Markdown으로 전환'}
          </ModeToggle>
        </ToolbarRight>
      </EditorToolbar>

      <EditorBody>
        {!isMarkdownMode ? (
          <EditableArea
            ref={editableRef}
            contentEditable
            onInput={handleEditableInput}
            suppressContentEditableWarning
            data-placeholder={placeholder}
          />
        ) : (
          <TextArea
            ref={textareaRef}
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
  position: relative;

  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: var(--radius-xl);
  overflow: hidden;
`;

const ToggleIsVisibleToolbar = styled.button<{ $isView: boolean }>`
  position: absolute;
  bottom: var(--spacer-sm);
  left: var(--spacer-sm);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  width: var(--rem-32);
  height: var(--rem-32);

  background: ${({ theme, $isView }) =>
    $isView
      ? theme.components.button.background.activated
      : theme.components.button.background.default};

  z-index: 10;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary.backgroundHover};
  }
`;

const EditorToolbar = styled.span<{ $isView: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacer-xs) 0;
  padding-right: var(--spacer-md);
  background: ${({ theme }) => theme.colors.neutral.background};

  flex-wrap: nowrap;
  overflow: hidden;

  display: ${({ $isView }) => ($isView ? 'flex' : 'none')};
`;

const ToolbarLeft = styled.span`
  display: flex;
  align-items: center;
  min-width: 0;
  flex: 1;
`;

const Buttons = styled.span`
  display: flex;
  align-items: center;

  gap: var(--spacer-2xs);

  padding-left: var(--spacer-sm);

  flex-wrap: nowrap;
`;
const MarkdownInfo = styled.span`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  padding-left: var(--spacer-md);

  font: var(--font-12);
  line-height: 1;
  color: ${({ theme }) => theme.colors.secondary.weak};
`;

const ToolButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: var(--rem-24);
  height: var(--rem-24);

  border-radius: var(--radius-sm);
  background: transparent;

  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.neutral.content};
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral.backgroundHover};
  }
`;
const ToolbarDivider = styled.div`
  width: 1px;
  height: var(--rem-16);
  background: ${({ theme }) => theme.colors.neutral.border};
  flex-shrink: 0;
`;

const ToolbarRight = styled.div`
  flex-shrink: 0;
  margin-left: var(--spacer-sm);
`;

const ModeToggle = styled.button<{ $active: boolean }>`
  padding: var(--spacer-2xs) var(--spacer-xs);
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: var(--radius-sm);
  background: ${({ $active, theme }) =>
    $active ? theme.colors.secondary.background : 'transparent'};

  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.neutral.content};
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.neutral.borderMedium};
  }
`;

const EditorBody = styled.div`
  position: relative;
  height: var(--rem-128);
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: var(--spacer-sm) var(--spacer-md);

  border: none;
  resize: vertical;
  background: transparent;

  font: var(--font-14);
  line-height: 1.3;

  color: ${({ theme }) => theme.colors.neutral.contentStrong};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral.contentWeak};
  }
`;

const EditableArea = styled.div`
  width: 100%;
  height: 100%;
  padding: var(--spacer-sm) var(--spacer-md);
  overflow-y: auto;

  border: none;
  background: transparent;

  font: var(--font-14);
  line-height: 1.3;

  color: ${({ theme }) => theme.colors.neutral.contentStrong};

  &:focus {
    outline: none;
  }

  &:empty:before {
    content: attr(data-placeholder);
    color: ${({ theme }) => theme.colors.neutral.contentWeak};
  }

  /* ✅ 서식 스타일 */
  strong {
    font-weight: bold;
  }
  em {
    font-style: italic;
  }
  del {
    text-decoration: line-through;
  }
  sup {
    vertical-align: super;
    font-size: 0.75em;
  }
  code {
    background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    padding: 0.2em 0.4em;
    border-radius: var(--radius-sm);
    font-family: 'Courier New', monospace;
  }
  pre {
    background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    padding: 1em;
    border-radius: var(--radius-md);
    overflow-x: auto;
    margin: 0.5em 0;
    code {
      background: transparent;
      padding: 0;
    }
  }
  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.neutral.border};
    padding-left: 1em;
    margin: 0.5em 0;
    color: ${({ theme }) => theme.colors.neutral.content};
  }
  h1,
  h2,
  h3 {
    font-weight: 600;
    margin: 0.5em 0;
  }
  h1 {
    font-size: 2em;
  }
  h2 {
    font-size: 1.5em;
  }
  h3 {
    font-size: 1.25em;
  }
  a {
    color: ${({ theme }) => theme.colors.a.default};
    text-decoration: underline;
  }
  ul,
  ol {
    padding-left: 2em;
    margin: 0.5em 0;
  }
  li {
    margin: 0.25em 0;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 0.5em 0;
    td {
      border: 1px solid ${({ theme }) => theme.colors.neutral.border};
      padding: 0.5em;
    }
  }
`;

export default RichTextEditor;
