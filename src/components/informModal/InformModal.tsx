import { memo } from "react"
import { InformModalProps } from "../../@types/project"

const InformModal = memo(function InformModal({title, message, closeOverlay}: InformModalProps) {

    return (
        <div className="modal modal--inform">
            <div className="modal__text">
                <div className="modal__title">{title}</div>
                <p>{message}</p>
            </div>
            <button className="btn btn--green" onClick={() => closeOverlay()}>Okay</button>
        </div>
    )
})

export default InformModal