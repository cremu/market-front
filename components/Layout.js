import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import styles from '@/styles/Layout.module.css'

export default function Layout( { title, description, keywords, children } ) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description}/>
                <meta name="keywords" content={keywords} />
            </Head>

            <Header />
            <main className={styles.main}>
                {children}
            </main>
            <Footer />
        </>
    );
}

Layout.defaultProps = {
    title: 'Flea Market',
    description: 'Icelandic Flea Market for everyone! Buy \& Sell!',
    keywords: 'ecommerce, buy, sell, market, second-hand, thrift'
}
