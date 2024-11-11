import Portal from "../../Portal";
import * as S from "./Modal.style";

export type ModalTypes = "center" | "top" | "bottom" | "custom";
type Props = {
  onClickBackDrop?: () => void;
  children: React.ReactNode;
  type?: ModalTypes;
  isAnimation?: boolean;
  backDropAnimation?: boolean;
};

const Modal = ({
  children,
  onClickBackDrop,
  type = "center",
  isAnimation = true,
  backDropAnimation = true,
}: Props) => {
  const handleBackdropClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      onClickBackDrop && onClickBackDrop();
    }
  };

  return (
    <Portal>
      <S.BackDrop
        onClick={handleBackdropClick}
        $isAnimation={backDropAnimation}
      >
        {isAnimation ? (
          <S.ModalView type={type}>{children}</S.ModalView>
        ) : (
          <>
            {type === "center" && (
              <S.CenterModalBody>{children}</S.CenterModalBody>
            )}
            {type === "top" && <S.TopModalBody>{children}</S.TopModalBody>}
            {type === "bottom" && (
              <S.BottomModalBody>{children}</S.BottomModalBody>
            )}
            {type === "custom" && <>{children}</>}
          </>
        )}
      </S.BackDrop>
    </Portal>
  );
};

export default Modal;
