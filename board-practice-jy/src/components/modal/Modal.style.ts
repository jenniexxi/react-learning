import styled, { css, keyframes } from "styled-components";
import { ModalTypes } from "./Modal";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    transform: translate(-50%, -100%);
  }
  to {
    transform: translate(-50%, 0);
  }
`;

const slideUp = keyframes`
  from {
    transform: translate(-50%, 100%);
  }
  to {
    transform: translate(-50%, 0);
  }
`;

export const BackDrop = styled.div<{ $isAnimation: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  ${({ $isAnimation }) =>
    $isAnimation &&
    css`
      animation: ${fadeIn} 0.3s ease-out;
    `}
`;

export const ModalView = styled.div<{ type: ModalTypes }>`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);

  ${({ type }) => {
    switch (type) {
      case "center":
        return css`
          top: 50%;
          transform: translate(-50%, -50%);
          animation: ${fadeIn} 0.3s ease-out;
        `;
      case "top":
        return css`
          top: 0;
          animation: ${slideDown} 0.3s ease-out;
        `;
      case "bottom":
        return css`
          bottom: 0;
          animation: ${slideUp} 0.3s ease-out;
        `;
      default:
        return "";
    }
  }}
`;

export const CenterModalBody = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const TopModalBody = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

export const BottomModalBody = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;
