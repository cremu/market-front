import Link from 'next/link'
import styles from '@/styles/Category.module.css';
import Layout from '@/components/Layout';
import VerticalProductCard from '@/components/VerticalProductCard';
import { API_URL } from '@/config/index'

export default function CategoryPage({ category }) {

    return (
        <Layout title={`Flea Market | Category`}>
            <h1>{category.attributes.name}</h1>
            <section className='productsContainer'>
              {category.attributes.products.data.map(product => (
                <VerticalProductCard key={product.id} product={product}/>
              ))}
            </section>
        </Layout>
    );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/categories`)
  const categories = await res.json()

  const paths = categories.data.map((category) => ({
    params: { slug: category.attributes.slug},
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
    const res = await fetch(`${API_URL}/api/categories?filters[slug]=${slug}&populate[products][populate][1]=media`)
    const category = await res.json()

    return {
        props: { category: category.data[0] },
        revalidate: 1
    }
}