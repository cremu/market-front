import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import styles from '@/styles/Header.module.css'
import { menuItems } from '@/config/navigation'
import MenuItem from '@/components/MenuItem'
import SearchForm from '@/components/SearchForm'
import IconMenuOpen from '../public/IconMenuOpen.svg'
import IconMenuClose from '../public/IconMenuClose.svg'

export default function Header() {

  const [mobileMenuState, setMobileMenuState] = useState(false)
  const toggleMobileMenu = () => setMobileMenuState(!mobileMenuState)

  return (
    <header className={styles.header}>
      <div className={styles.leftWrapper}>
        <Link href='/' passHref>
          <a>
            <Image src='/market-box.png' alt='Market branding logo' width={36.57} height={40} />
          </a>
        </Link>
        <button className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
          {mobileMenuState ? 
            (<IconMenuClose />) :
            (<IconMenuOpen />)
          }
        </button>
      </div>

      <div className={`${styles.menuWrapper} ${mobileMenuState ? styles.show : ''}`}>
        <nav className={styles.navMenu}>
          <ul className={styles.navList}>
            {menuItems.map((item, index) => (
              <MenuItem key={index} item={item}/>
            ))}
          </ul>
          <SearchForm />
        </nav>
      </div>
      
      <div className={`${styles.profileWrapper} ${mobileMenuState ? styles.show : ''}`}>
        <Link href='/'>
          <a className={`primaryButton ${styles.largeButton}`}>Log in</a>
        </Link>
        <Link href='/products/sell'>
          <a className={`primaryAccentButton ${styles.largeButton}`}>Add Product</a>
        </Link>
      </div>       
    </header>
  )
}