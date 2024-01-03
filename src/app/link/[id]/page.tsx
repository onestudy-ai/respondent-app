import Head from "next/head";

import { Study, StudyStatus } from "@/core/study";
import LandingPage from "../../template/Landing";

type PageProps = {
  params: { id: string }
}

export default async function LinkInterview(props: PageProps) {
  const data = await getStudyData(props.params.id);

  return (
    <>
      <Head>
        <title>
          {data?.metaData?.shareTitle || "We need your feedback!"}
        </title>
        <meta property="og:title" content={data?.metaData?.shareTitle || "We need your feedback!"} />
        <meta
          property="og:image"
          content={`/api/og?title=${encodeURIComponent(data?.metaData?.shareTitle || "We need your feedback!")}`}
        />
      </Head>

      <LandingPage 
        title={data?.metaData?.shareTitle}
        description={data?.metaData?.shareDescription}
        headerBgColor={data?.metaData?.primaryColor}
        logoUrl={data?.metaData?.imageUrl}
        isActive={data?.status === StudyStatus.ACTIVE}
        userMetaData={data?.userMetaData}
      />
    </>
  )
}

const getStudyData = async (id: string) => {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/study/${id}`;
  const res = await fetch(url, {
    cache: 'no-cache',
  });

  // TODO: make this nice
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()
  return data.data as Study;
}
