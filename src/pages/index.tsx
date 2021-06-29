import { GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'
import SubscribeButton from '../components/SubscribeButton'
import { stripe } from '../services/stripe'
//index

const formatPrice = (number) => new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
}).format(number)

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>My page</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>🐱‍🏍 Hey, welcome</span>
          <h1>News about <br /> the <span>React</span> world.</h1>
          <p>
            Get acess to all the publications <br />
            <span>for {formatPrice(product.amount)} / month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1IXvFhCa2ASYKVvYERYlDYOc", {
    expand: ["product"]
  })

  const product = {
    priceId: price.id,
    amount: price.unit_amount / 100
  }

  return ({
    props: {
      product
    },
    revalidate: 3600 * 24 // 24 hours
  })
}