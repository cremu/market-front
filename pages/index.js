import Link from 'next/link'
import styles from '@/styles/Home.module.css';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index'
import CategoryCard from '@/components/CategoryCard';

export default function Home({ categories }) {

    return (
        <Layout title="Flea Market | Home">
            <section className='categoriesContainer'>
                {categories.data.map(category => (
                    <CategoryCard key={category.id} category={category}/>
                ))}
            </section>
        </Layout>
    );
}

export async function getStaticProps() {
    const res = await fetch(`${API_URL}/api/categories`)
    const categories = await res.json()

    return {
        props: { categories },
        revalidate: 1
    }
}

