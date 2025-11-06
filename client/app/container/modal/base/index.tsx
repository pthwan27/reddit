import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import styled from 'styled-components';

import CloseIcon from '../../../components/svgs/CloseIcon';
import { useAuth } from '../../../context/authContext';
import { useModalState } from '../../../context/modalContext';

type BaseModalProps = {
  children: React.ReactNode;
  modalkey: 'authModal' | 'createSubModal';
  headerInfo?: string;
  headerSubInfo?: string;
  width?: string;
};

const BaseModalContainer = ({
  children,
  modalkey,
  headerInfo,
  headerSubInfo,
  width,
}: BaseModalProps) => {
  const { modals, close } = useModalState();
  const { user } = useAuth();

  useEffect(() => {
    if (modalkey === 'authModal' && user) {
      close(modalkey);
    }
  }, [user, close, modalkey]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      if (!target.closest('[data-modal]')) {
        close(modalkey);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close(modalkey);
      }
    };

    if (modals[modalkey]) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [modals[modalkey], close]);

  return (
    <>
      {modals[modalkey] && (
        <>
          {createPortal(
            <BaseModal data-modal>
              <ModalBackground onClick={() => close(modalkey)} />
              <Modal $width={width}>
                <ModalContentHeader>
                  {headerInfo ? (
                    <HeaderInfo>
                      <h2>{headerInfo}</h2>
                      {headerSubInfo && <span>{headerSubInfo}</span>}
                    </HeaderInfo>
                  ) : (
                    <div></div>
                  )}
                  <ModalCloseButton onClick={() => close(modalkey)}>
                    <CloseIcon />
                  </ModalCloseButton>
                </ModalContentHeader>
                <ModalContentMain>{children}</ModalContentMain>
              </Modal>
            </BaseModal>,
            document.body
          )}
        </>
      )}
    </>
  );
};

const BaseModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(0.25rem);
  opacity: 0.5;
  z-index: 1;
`;

const Modal = styled.div<{ $width?: string }>`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.neutral.background};
  border-radius: var(--radius-xl);

  width: 100%;
  max-width: ${({ $width }) => $width};

  min-width: 320px;
  min-height: 400px;

  box-shadow: var(--box-shadow);

  @media (max-width: 528px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 0;
    padding: var(--spacer-md);

    width: 100vw;
    min-height: 100vh;
  }
`;

const ModalContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: var(--spacer-lg) var(--spacer-lg) var(--spacer-xs);

  width: 100%;
`;
const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacer-xs);
`;

const ModalCloseButton = styled.button`
  display: flex;

  border: none;
  background: ${({ theme }) =>
    theme.components.button.secondary.background.default};
  padding: var(--spacer-xs);

  &:hover {
    border: none;
    background: ${({ theme }) =>
      theme.components.button.secondary.background.hover};
  }
`;

const ModalContentMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: var(--spacer-xs) 0 var(--spacer-2xl) 0;
`;

export default BaseModalContainer;
