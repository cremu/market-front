import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/ProductPage.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ProductPage({ product }) {

    const router = useRouter()
    const deleteEvent = async (e) => {
        if(confirm(`Are you sure you want to remove this product?`)) {
            const res = await fetch(`${API_URL}/api/products/${product.id}`, { method: 'DELETE' })
            const deletedProduct = await res.json()
            
            if(!res.ok) {
                console.log(`${deletedProduct}`)
            } else {
                router.push('/categories')
            }
        }
    }

    return (
        <Layout title={`Flea Market | ${product.attributes.name}`}>

            <div className={styles.productControls}>
                <Link href={`/products/edit/${product.id}`}>
                    <a className={`primaryAccentButton ${styles.largeButton}`}>Edit</a>
                </Link>
                <button className={styles.deleteButton} onClick={deleteEvent}>
                    Delete
                </button>
            </div>
            
            <h1>{product.attributes.name}</h1>
            <section></section>
        </Layout>
    );
}

export async function getStaticPaths() {
    const res = await fetch(`${API_URL}/api/products`);
    const products = await res.json();

    const paths = products.data.map((product) => ({
        params: { slug: product.attributes.slug },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { slug } }) {
    const res = await fetch(`${API_URL}/api/products?filters[slug]=${slug}&populate=%2A`);
    const product = await res.json();

    return {
        props: { product: product.data[0] },
        revalidate: 1,
    };
}