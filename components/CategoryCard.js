import Link from 'next/link'
import styles from '@/styles/CategoryCard.module.css'

export default function CategoryCard({ category }) {

  return (
      <Link href={`/categories/${category.attributes.slug}`} passHref>
        <a className={styles.cardWrapper}>
          {category.attributes.name}
        </a>
      </Link>
  )
}