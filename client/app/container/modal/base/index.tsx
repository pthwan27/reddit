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

const BaseModal = ({
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
            <StyledModalContainer data-modal>
              <StyledModalBackground onClick={() => close(modalkey)} />
              <StyledModal $width={width}>
                <StyledModalContentHeader>
                  {headerInfo ? (
                    <StyledHeaderInfo>
                      <h2>{headerInfo}</h2>
                      {headerSubInfo && <span>{headerSubInfo}</span>}
                    </StyledHeaderInfo>
                  ) : (
                    <div></div>
                  )}
                  <StyledModalCloseButton onClick={() => close(modalkey)}>
                    <CloseIcon />
                  </StyledModalCloseButton>
                </StyledModalContentHeader>
                <StyledModalContentMain>{children}</StyledModalContentMain>
              </StyledModal>
            </StyledModalContainer>,
            document.body
          )}
        </>
      )}
    </>
  );
};

const StyledModalContainer = styled.div`
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

const StyledModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.overlay || 'rgba(0,0,0,0.3)'};
  backdrop-filter: blur(0.25rem);
  opacity: 0.25;
  z-index: 1;
`;

const StyledModal = styled.div<{ $width?: string }>`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  border-radius: var(--radius-lg);

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

const StyledModalContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: var(--spacer-lg) var(--spacer-lg) var(--spacer-xs);

  width: 100%;
`;
const StyledHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacer-xs);
`;

const StyledModalCloseButton = styled.button`
  background: ${({ theme }) => theme.colors.grayBackground};
  padding: var(--spacer-xs);

  &:hover {
    background: ${({ theme }) => theme.colors.grayHover};
  }
`;

const StyledModalContentMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: var(--spacer-xs) 0 var(--spacer-2xl) 0;
`;

export default BaseModal;
