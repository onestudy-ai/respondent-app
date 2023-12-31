import Head from "next/head";

import { Study } from "@/core/study";
import LandingPage from "./template/Landing";

type StudyLinkProps = {
  study?: Partial<Study>;
}

export default function LinkInterview(props: StudyLinkProps) {
  return (
    <>
      <Head>
        <title>
          {props.study?.meta?.shareTitle || "We need your feedback!"}
        </title>
        <meta property="og:title" content={props.study?.meta?.shareTitle || "We need your feedback!"} />
        <meta
          property="og:image"
          content={`/api/og?title=${encodeURIComponent(props.study?.meta?.shareTitle || "We need your feedback!")}`}
        />
      </Head>

      <LandingPage />
    </>
  )
}