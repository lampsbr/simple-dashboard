import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import styles from '../../styles/Home.module.css'
import Image from 'next/image'
import { getItemsPerCategory } from '../api/comparisons/[category]'

export const getServerSideProps = async (context: any) => {
  const category = context.params.category
  const jsonData = await getItemsPerCategory(category)
  console.log('running getServerSideProps', category, jsonData)
  if(!jsonData){
    return {
      notFound: true,
    }
  } else {
    return {
      props: jsonData
    }
  }
}

const CompareCategory: NextPage = (cat: any) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <h1 className={styles.title}>
        <p>{cat.category} was selected for comparison</p>
      </h1>
      <p className={styles.description}></p>
      <div className={styles.grid}>
        <ul>
          {cat.items.map((i:any) => (
          <li key={i.model}>
            {i.manufacturer} - {i.model} - {i.size}
          </li>))}
        </ul>
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
export default CompareCategory;