import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import {getAllPostIds, getPostData} from "../../lib/posts"

export default function Post({postData}) {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Layout>
        <h1>{postData.title}</h1>
        <time>{postData.date}</time>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        <p><Link href="/"><a>← Back to home</a></Link></p>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({params}) {
  const postData = await getPostData(params.id)

  return {
    props: {
      postData
    }
  }
  // Fetch necessary data for the blog post using params.id
}
