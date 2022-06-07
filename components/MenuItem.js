import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from '@/styles/MenuItem.module.css'
import MenuDropdown from './MenuDropdown'

export default function MenuItems({item}) {
  //states to control dropdownMenu visibility
  const [dropdownState, setDropdownState] = useState(false)
  const [isMobile, setIsMobile] = useState(isMobileNav());

  //onClick & onMouseEnter/Leave that trigger submenu visibility by changing dropdownState
  const toggleSubmenu = () => setDropdownState(!dropdownState)
  const openSubmenu = () => setDropdownState(true)
  const closeSubmenu = () => setDropdownState(false)

  function isMobileNav() {
    const width = (typeof window !== 'undefined') ? window.innerWidth : null
    if (width < 1020) {
      return true
    } else {
      return false
    }
  }
  useEffect(()=> {
    if(typeof window !== 'undefined') {
      function handleResize() {
        setIsMobile(isMobileNav())
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [isMobile])

  return (
    <li className={styles.listItem}>
      { item.submenu ? (
        <>
          <button className={styles.hasSubmenu} type='button' aria-haspopup={dropdownState ? 'menu' : 'false'} onClick={toggleSubmenu} onMouseEnter={isMobile ? () => false : openSubmenu}>
            {item.title}
          </button>
          <MenuDropdown submenu={item.submenu} dropdownState={dropdownState} onMouseLeave={isMobile ? () => false : closeSubmenu}/>
        </>
        ) : (
          <Link href={item.slug}>
            <a className={styles.noSubmenu}>{item.title}</a>
          </Link>
        )
      }
    </li>
  )
}