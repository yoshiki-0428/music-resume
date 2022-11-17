import dynamic from "next/dynamic";
const SurveyResume = dynamic(() => import('@/components/resume/survey/SurveyResume'), { ssr: false });

export default function ResumeNew() {
  return (
    <SurveyResume />
  )
}
