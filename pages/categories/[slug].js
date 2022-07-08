import Link from 'next/link'
import styles from '@/styles/Category.module.css';
import Paginator from 'headless-pagination';
import Layout from '@/components/Layout';
import VerticalProductCard from '@/components/VerticalProductCard';
import { API_URL, PAGINATION_LENGTH } from '@/config/index'

export default function CategoryPage({ category, products, pagination }) {

  const slug = category.attributes.slug
  //Pagination
  const paginator = new Paginator({
    totalItems: pagination.total,
    initialPage: pagination.page,
    perPage: PAGINATION_LENGTH,
    maxLinks: 7
  })
  const pages = paginator.links()

  return (
      <Layout title={`Flea Market | ${category.attributes.name}`}>
          <h1>{category.attributes.name}</h1>
          <section className='productsContainer'>
            {products.map(product => (
              <VerticalProductCard key={product.id} product={product}/>
            ))}
          </section>
            <ul className={styles.paginationList}>
            {pages.length > 1 && pages.map((page, i) => (
              <li key={i}>
                <Link href={`/categories/${slug}?page=${page.label}`}>
                  <a className={`${page.active ? styles.currentPage : styles.paginationLink}`}>
                    {page.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
      </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/api/categories`)
//   const categories = await res.json()

//   const paths = categories.data.map((category) => ({
//     params: { slug: category.attributes.slug},
//   }))

//   return {
//     paths,
//     fallback: false,
//   }
// }

// export async function getStaticProps({ params: { slug }}) {
//     const res = await fetch(`${API_URL}/api/categories?filters[slug]=${slug}&populate[products][populate][1]=media`)
//     const category = await res.json()

//     return {
//         props: { category: category.data[0] },
//         revalidate: 1,
//     }
// }

export async function getServerSideProps({ params: { slug }, query: { page = 1 }}) {
  //Pagination indexes
  //const initial = +page === 1 ? 1 : (+page - 1) * PAGINATION_LENGTH

  //Query the collection and store it's id in const: collectionId, and it's total products count in const: productsCount
  const categoryRes = await fetch(`${API_URL}/api/categories?filters[slug]=${slug}&populate[products][populate][1]=products`)
  const category = await categoryRes.json()
  const categoryId = category.data[0].id
  //const productsCount = category.data[0].attributes.products.data.length

  //Query all products and returns those in a particular category
  const productsRes = await fetch(`${API_URL}/api/products?filters[category]=${categoryId}&populate[media][populate][1]=media&pagination[page]=${page}&pagination[pageSize]=${PAGINATION_LENGTH}`)
  const products = await productsRes.json()

  return {
      props: { 
        category: category.data[0],
        products: products.data,
        pagination: products.meta.pagination
      }
  }
}