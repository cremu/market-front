import qs from 'qs'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import VerticalProductCard from '@/components/VerticalProductCard'
import { API_URL } from '@/config/index'
import styles from '@/styles/SearchPage.module.css'

export default function SearchPage({ matchedProducts }) {
  console.log(matchedProducts)
  const router = useRouter()
  return (
    <Layout title='Search Products'>
      <h1>Search results for: {`'${router.query.term}'`}</h1>
      <section className='productsContainer'>
        {matchedProducts.data.length === 0 && <h3>No products matched</h3>}
        {matchedProducts.data.map(product => (
          <VerticalProductCard key={product.id} product={product}/>
        ))}
      </section>
    </Layout>
  )
}

export async function getServerSideProps({ query: { term }}) {
  const query = qs.stringify({
    filters: {
      $or: [
        { name: {$contains: term} },
        { description: {$contains: term} }
      ]
    },
    populate: ['media']
  })

  const res = await fetch(`${API_URL}/api/products?${query}`)
  const matchedProducts = await res.json()

  return {
    props: { matchedProducts }
  }
}