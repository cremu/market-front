import styles from '@/styles/AllCategories.module.css';
import Layout from '@/components/Layout';
import CategoryCard from '@/components/CategoryCard'
import { API_URL } from '@/config/index'

export default function AllCategories({ categories }) {

    return (
        <Layout title="Flea Market | All Categories">
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
