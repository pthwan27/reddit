import { useCallback, useRef, useState } from 'react';

import Blockquote from '@tiptap/extension-blockquote';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import { BulletList, OrderedList } from '@tiptap/extension-list';
import Superscript from '@tiptap/extension-superscript';
import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import styled from 'styled-components';

import { CustomError } from '@/app/types';

import FormatIcon from '../../svgs/FormatIcon';
import Bold from '../../svgs/RichTextEditor/Bold';
import CodeBlock from '../../svgs/RichTextEditor/CodeBlock';
import Italic from '../../svgs/RichTextEditor/Italic';
import LinkIcon from '../../svgs/RichTextEditor/LinkIcon';
import ListBulleted from '../../svgs/RichTextEditor/ListBullted';
import ListNumbered from '../../svgs/RichTextEditor/ListNumbered';
import Quote from '../../svgs/RichTextEditor/Quote';
import StrikeThrough from '../../svgs/RichTextEditor/StrikeThrough';
import SuperScript from '../../svgs/RichTextEditor/SuperScript';
import TextSize from '../../svgs/RichTextEditor/TextSize';
import IconBox from '../IconBox';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder: string;
  isToolbarVisibleDefault?: boolean;
  editorHeightPercentage?: number;
  isInSubmitMode?: boolean;
  submitHandler?: () => void;
  cancelHandler?: () => void;
}

const RichTextEditor = ({
  content,
  onChange,
  placeholder,
  isToolbarVisibleDefault = true,
  editorHeightPercentage = 100,
  isInSubmitMode = false,
  submitHandler = () => {},
  cancelHandler = () => {},
}: RichTextEditorProps) => {
  const editableRef = useRef<HTMLDivElement>(null);

  const [isEmpty, setIsEmpty] = useState(true);
  const [isToolbarVisible, setIsToolbarVisible] = useState(
    isToolbarVisibleDefault
  );

  const toggleIsVisibleToolbar = () => {
    setIsToolbarVisible((prev) => !prev);
  };
  const editor = useEditor({
    extensions: [
      StarterKit,
      Superscript,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            const disallowedProtocols = ['ftp', 'file', 'mailto'];
            const protocol = parsedUrl.protocol.replace(':', '');

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === 'string' ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            const disallowedDomains = [
              'example-phishing.com',
              'malicious-site.net',
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`https://${url}`);

            const disallowedDomains = [
              'example-no-autolink.com',
              'another-no-autolink.com',
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
      BulletList,
      OrderedList,
      Blockquote,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());

      setIsEmpty(editor.getHTML() === '<p></p>');
    },
    immediatelyRender: false,
  });

  const editorState = useEditorState({
    editor,

    selector: ({ editor }) => {
      if (!editor) return null;

      return {
        isEditable: editor.isEditable,
        isBold: editor.isActive('bold'),
        isItalic: editor.isActive('italic'),
        isStrike: editor.isActive('strike'),
        isHeading: editor.isActive('heading'),
        isSuperscript: editor.isActive('superscript'),
        isLink: editor.isActive('link'),
        isBulletList: editor.isActive('bulletList'),
        isOrderedList: editor.isActive('orderedList'),
        isBlockQuote: editor.isActive('blockquote'),
        isCodeBlock: editor.isActive('codeBlock'),

        currentSelection: editor.state.selection,
        currentContent: editor.getJSON(),
      };
    },
  });

  const setLink = useCallback(() => {
    const prevUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', prevUrl);

    if (url === null) return;

    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    try {
      editor
        ?.chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    } catch (e: unknown) {
      const error = e as CustomError;
      alert(error.message);
    }
  }, [editor]);

  return (
    <StyledRichTextEditor>
      <EditorToolbar $isView={isToolbarVisible}>
        <ToolbarLeft>
          <Buttons>
            <ToolButton
              onClick={() => editor?.chain().focus().toggleBold().run()}
              $isSelected={editorState?.isBold}
              title="굵게"
            >
              <IconBox
                icon={<Bold />}
                width={16}
                height={16}
                percentage={100}
              />
            </ToolButton>
            <ToolButton
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              title="기울기"
              $isSelected={editorState?.isItalic}
            >
              <IconBox
                icon={<Italic />}
                width={16}
                height={16}
                percentage={100}
              />
            </ToolButton>
            <ToolButton
              onClick={() => editor?.chain().focus().toggleStrike().run()}
              title="취소선"
              $isSelected={editorState?.isStrike}
            >
              <IconBox
                icon={<StrikeThrough />}
                width={16}
                height={16}
                percentage={100}
              />
            </ToolButton>
            <ToolButton
              onClick={() => editor?.chain().focus().toggleSuperscript().run()}
              title="위 첨자"
              $isSelected={editorState?.isSuperscript}
            >
              <IconBox
                icon={<SuperScript />}
                width={16}
                height={16}
                percentage={100}
              />
            </ToolButton>
            <ToolButton
              onClick={() => {
                editor?.chain().focus().toggleHeading({ level: 3 }).run();
              }}
              title="제목"
              $isSelected={editor?.isActive('heading', { level: 3 })}
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
              onClick={
                !editorState?.isLink
                  ? setLink
                  : () => editor?.chain().focus().unsetLink().run()
              }
              $isSelected={editorState?.isLink}
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
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              title="순서 없는 목록"
              $isSelected={editorState?.isBulletList}
            >
              <IconBox
                icon={<ListBulleted />}
                width={16}
                height={16}
                percentage={100}
              />
            </ToolButton>
            <ToolButton
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              title="순서 있는 목록"
              $isSelected={editorState?.isOrderedList}
            >
              <IconBox
                icon={<ListNumbered />}
                width={16}
                height={16}
                percentage={100}
              />
            </ToolButton>
            <ToolButton
              onClick={() => editor?.chain().focus().toggleBlockquote().run()}
              title="인용"
              $isSelected={editorState?.isBlockQuote}
            >
              <IconBox
                icon={<Quote />}
                width={16}
                height={16}
                percentage={100}
              />
            </ToolButton>

            <ToolButton
              onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
              title="코드 블록"
              $isSelected={editorState?.isCodeBlock}
            >
              <IconBox
                icon={<CodeBlock />}
                width={16}
                height={16}
                percentage={100}
              />
            </ToolButton>
          </Buttons>
        </ToolbarLeft>
      </EditorToolbar>

      <EditorBody
        id="editor-body"
        $editorHeightPercentage={editorHeightPercentage}
      >
        <StyledEditor ref={editableRef} editor={editor} />
        <PlaceHolderText>{isEmpty && placeholder}</PlaceHolderText>
      </EditorBody>

      <ExtraButtons>
        <ToggleIsVisibleToolbar
          onClick={toggleIsVisibleToolbar}
          $isView={isToolbarVisible}
        >
          <IconBox
            icon={<FormatIcon />}
            width={32}
            height={32}
            percentage={50}
          />
        </ToggleIsVisibleToolbar>

        {isInSubmitMode && (
          <SubmitButtons>
            <button
              onClick={() => {
                setIsToolbarVisible(false);
                cancelHandler();
              }}
            >
              취소
            </button>
            <button onClick={submitHandler}>댓글</button>
          </SubmitButtons>
        )}
      </ExtraButtons>
    </StyledRichTextEditor>
  );
};

const StyledRichTextEditor = styled.div`
  position: relative;

  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: var(--radius-xl);
  overflow: hidden;

  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.neutral.borderMedium};
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

const ToolButton = styled.button<{ $isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: var(--rem-24);
  height: var(--rem-24);

  border-radius: var(--radius-sm);
  background: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.neutral.backgroundSelected : 'transparent'};

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

const EditorBody = styled.div<{ $editorHeightPercentage: number }>`
  position: relative;
  height: ${({ $editorHeightPercentage }) =>
    `calc(${$editorHeightPercentage} * var(--rem-128) / 100)`};

  padding: var(--spacer-sm) var(--spacer-md);
`;

const StyledEditor = styled(EditorContent)`
  width: 100%;
  height: 100%;

  overflow-y: auto;

  color: ${({ theme }) => theme.colors.neutral.contentStrong};

  > div {
    width: 100%;
    height: 100%;

    &:focus-visible {
      outline: none;
      border: none;
    }
  }
`;

const PlaceHolderText = styled.span`
  position: absolute;
  top: calc(var(--spacer-md) + 4px);
  pointer-events: none;

  color: ${({ theme }) => theme.colors.neutral.contentWeak};
`;

const ExtraButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 var(--spacer-sm) var(--spacer-xs) var(--spacer-sm);
`;

const ToggleIsVisibleToolbar = styled.button<{ $isView: boolean }>`
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

const SubmitButtons = styled.div`
  display: flex;
  gap: var(--spacer-xs);

  > button {
    display: flex;
    align-items: center;
    justify-content: center;

    height: var(--rem-32);
    padding: 0 var(--spacer-sm);
    font: var(--font-12-16-semibold);
    line-height: 1.5;
  }

  > button:first-child {
    background: ${({ theme }) => theme.colors.secondary.background};

    &:hover {
      background: ${({ theme }) => theme.colors.secondary.backgroundHover};
    }
  }

  > button:last-child {
    background: ${({ theme }) => theme.colors.primary.background};
    color: ${({ theme }) => theme.colors.primary.onBackground};

    &:hover {
      background: ${({ theme }) => theme.colors.primary.backgroundHover};
    }
  }
`;

export default RichTextEditor;
