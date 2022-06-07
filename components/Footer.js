
import styles from '@/styles/Footer.module.css'

export default function Footer() {

  return (
    <>
        <footer className={styles.footer}>
          <p className={styles.signature}>&copy; 2022 Flea Market</p>
          <div className={styles.social}>
            <a className={`${styles.socialLink} ${styles.facebook}`} href='https://google.com' target='_blank' rel='noopener noreferrer'>FACEBOOK</a>
            <a className={`${styles.socialLink} ${styles.email}`} href="mailto:contact@fleamarket.is" rel='noopener noreferrer'>EMAIL</a>
          </div>
        </footer>
    </>
  )
}