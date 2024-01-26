import type { Metadata, ResolvingMetadata } from "next"
import { Suspense } from "react";

import LandingPage from "@/app/template/Landing";
import { Study, StudyStatus } from "@/core/study";
import { getStudyById } from "@/data/study";

type PageProps = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const data = await getStudyById(params.id);

  return {
    metadataBase: new URL('https://interview.onestudy.ai/'),
    title: data?.metaData?.shareTitle || "We need your feedback!",
    description: data?.metaData?.shareDescription || "",
    openGraph: {
      title: data?.metaData?.shareTitle || "We need your feedback!",
      description: data?.metaData?.shareDescription || "",
    },
    twitter: {
      card: 'summary_large_image',
      title: data?.metaData?.shareTitle || "We need your feedback!",
      description: data?.metaData?.shareDescription || "",
    },
  }
}

export default async function LinkInterview(props: PageProps) {
  let data: Study | undefined | null;
  try {
    data = await getStudyById(props.params.id) as Study || {};
  } catch (error) {
    data = null;
  }

  return (
    <Suspense fallback={null}>
      <LandingPage 
        studyId={props.params.id}
        title={data?.metaData?.shareTitle}
        description={data?.metaData?.shareDescription}
        headerBgColor={data?.metaData?.primaryColor}
        logoUrl={data?.metaData?.imageUrl}
        isActive={data?.status === StudyStatus.ACTIVE}
        userMetaData={data?.userMetaData}
      />
    </Suspense>
  )
}
