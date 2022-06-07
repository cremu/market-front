import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';

export default function ProductPage({ product }) {
    return (
        <Layout title={`Flea Market | ${product.attributes.name}`}>
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