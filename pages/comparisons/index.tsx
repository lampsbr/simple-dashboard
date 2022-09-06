import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { getAvailableCategories } from '../api/comparisons/[category]'

export const getServerSideProps = async (ctx: any) => {
  const categories = await getAvailableCategories()

  if (!categories) {
    return {
      notFound: true,
    }
  } else {
    return {
      props: { categories }
    }
  }
}

const Comparisons: NextPage = (catList: any) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Comparisons
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          {catList.categories.map((ca: string) => <Link key={ca} href={`/comparisons/${ca}`} passHref>
            <a className={styles.card}>
              <h2>{ca}</h2>
              <p>Lorem ipsum dolor sit amet.</p>
            </a>
          </Link>)}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Comparisons
