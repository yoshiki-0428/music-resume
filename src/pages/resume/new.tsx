import dynamic from "next/dynamic";
import * as React from "react";

import Layout from "@/components/layout/Layout";
import Seo from "@/components/Seo";
import Skeleton from "@/components/Skeleton";
const SurveyResume = dynamic(() => import('@/components/resume/survey/SurveyResume'),
  { ssr: false,
    loading: () => <Skeleton className='h-screen w-screen' />
  });

export default function ResumeNew() {
  return (
    <Layout >
      <Seo templateTitle='Survey' />
      <SurveyResume />
    </Layout>
  )
}
