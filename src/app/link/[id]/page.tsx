import type { Metadata, ResolvingMetadata } from "next"

import { StudyStatus } from "@/core/study";
import LandingPage from "@/app/template/Landing";
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
    title: data?.metaData?.shareTitle || "We need your feedback!",
    description: data?.metaData?.shareDescription || "",
  }
}

export default async function LinkInterview(props: PageProps) {
  let data;
  try {
    data = await getStudyById(props.params.id);
  } catch (error) {
    data = null;
  }

  return (
    <>
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
