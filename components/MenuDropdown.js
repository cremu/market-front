import Link from 'next/link'
import styles from '@/styles/MenuDropdown.module.css'

export default function MenuDropdown({submenu, dropdownState, onMouseLeave}) {
  
  return (
    <ul className={`${styles.dropdownMenu} ${dropdownState ? styles.show : styles.hidde}`} onMouseLeave={onMouseLeave}>
      {submenu.map((item, index) => (
        <li className={`${styles.dropdownItem} ${item.lastItem ? `${styles.lastItem}` : ''}`} key={index}>
          <Link href={item.slug}>
            <a className={styles.itemLink}>{item.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}