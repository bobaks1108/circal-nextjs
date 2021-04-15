import Layout from '../../components/layout'
import { getAllEventIds, getEventData } from '../../lib/events'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export default function Event({ eventData }) {
  return (
    <Layout>
      <Head>
        <title>{eventData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{eventData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={eventData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: eventData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllEventIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const eventData = await getEventData(params.id)
  return {
    props: {
      eventData
    }
  }
}
