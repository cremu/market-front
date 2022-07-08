import styles from '@/styles/Modal.module.css'
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

export default function Modal({ show, title, onClose, children }) {
    const [isBrowser, setIsBrowser] = useState(false);
    useEffect(() => {
      setIsBrowser(true);
    }, []);

  const handleClose = (e) => {
    e.preventDefault()
    onClose()
  }

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button className={styles.modalButton} onClick={handleClose}>
            X
          </button>
        </div>
          {title  && <div>{title}</div>}
          <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null

  if(isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'))
  } else {
    return null
  }
}