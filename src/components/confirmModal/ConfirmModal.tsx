import { memo } from "react"
import { ConfirmModalProps } from "../../@types/project"

const ConfirmModal = memo(function ConfirmModal({title, message, closeOverlay, handleConfirm}: ConfirmModalProps) {

    return (
        <div className="modal modal--confirm">
            <div className="modal__text">
                <div className="modal__title">{title}</div>
                <p>{message}</p>
            </div>
            <div className="modal__buttons">
                <button className="btn btn--green" onClick={() => handleConfirm()}>Yes</button>
                <button className="btn btn--red" onClick={() => closeOverlay()}>Cancel</button>
            </div>
        </div>
    )
})

export default ConfirmModal