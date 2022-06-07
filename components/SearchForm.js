import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/SearchForm.module.css'

export default function SearchFrom() {
  const [term, setTerm] = useState('')
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/products/search?term=${term}`)
    setTerm('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input className={styles.input} type="text" value={term} onChange={(e) => setTerm(e.target.value)} placeholder='Search products' title='Search products'/>
    </form>
  )
}