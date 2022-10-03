export interface ModalProps {
    children: JSX.Element;
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
}