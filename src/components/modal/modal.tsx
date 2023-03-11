import { FC, ReactNode } from "react";

import './modal.scss';

interface ModalProps {
    children: ReactNode
    active: boolean
    onClose: () => void
}

const Modal: FC<ModalProps> = ({ children, active, onClose }) => {
    return (
        <div 
        className={active ? 'modal active' : 'modal'} 
        onClick={onClose}>
            <div className="modal__content" onClick={(e) => {e.stopPropagation()}}>
                {children}
            </div>
        </div>)
}

export default Modal;