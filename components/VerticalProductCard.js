import Link from 'next/link'
import Image from 'next/image'
import { formatDate, formatPrice } from '@/lib/helpers'
import styles from '@/styles/VerticalProductCard.module.css'

export default function VerticalProductCard({ product }) {

  //Get last image of the array of images a Product has
  let lastImgIndex = 0
  if(product.attributes.media.data !== null) {
    lastImgIndex = product.attributes.media.data.length -1
  }

  return (
    <Link href={`/products/${product.attributes.slug}`} passHref>
      <a className={styles.productWrapper}>
        <div className={styles.imgContainer}>
          <Image
            className={styles.image} 
            src={product.attributes.media.data ? product.attributes.media.data[lastImgIndex].attributes.formats.small.url : '/product-placeholder.avif'}
            priority={true}
            alt='product image'
            layout='fill'
            objectFit='cover'      
          />
        </div>
        <div className={styles.info}>
          <div className={styles.first}>
            <p className={styles.date}>{formatDate(product.attributes.publishedAt)}</p>
            <p className={styles.location}>{`${product.attributes.zipCode}, ${product.attributes.location}`}</p>
          </div>
          <h3 className={styles.name}>{product.attributes.name}</h3>
          <div className={styles.third}>
            <h4 className={styles.price}>{formatPrice(product.attributes.price)}</h4>
          </div>
        </div>
      </a>
    </Link>
  )
}