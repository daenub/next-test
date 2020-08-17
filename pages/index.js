import Head from 'next/head'
import Link from "next/link"

import Layout from '../components/layout'
import {getSortedPostsData} from "../lib/posts"

export default function Home({allPostsData}) {
  return (
    <Layout>
      <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="title">
            Create Next App
          </h1>

          <p className="description">
            Get started by editing <code>pages/index.js</code>
          </p>

          <ul>
            {allPostsData.map(({id, date, title}) => {
              return (
                <li key={id}>
                  <Link href="/posts/[id]" as={`/posts/${id}`}><a>{id} - {date} - {title}</a></Link>
                </li>
              )
            })}
          </ul>
        </main>

        <footer>
          <a href="https://feinheit.ch">Feinheit</a>
        </footer>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const allPostsData = getSortedPostsData()

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: {
      allPostsData
    }
  }
}
