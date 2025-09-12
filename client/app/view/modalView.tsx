import { createPortal } from "react-dom";
import styled from "styled-components";

type ModalViewProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const ModalView = ({ onClose, children }: ModalViewProps) => {
  return (
    <>
      {createPortal(
        <StyledModal>
          <button onClick={() => onClose()}>X 버튼</button>
          {children}
        </StyledModal>,
        document.body
      )}
    </>
  );
};
const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ModalView;
