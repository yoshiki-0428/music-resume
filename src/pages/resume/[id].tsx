import axios from "axios";
import {useRouter} from "next/router";
import * as React from "react";
import {useEffect, useState} from "react";
import {TwitterIcon, TwitterShareButton} from "react-share";

import Layout from "@/components/layout/Layout";
import DownloadButton from "@/components/resume/DownloadButton";
import Resume from "@/components/resume/Resume";
import Seo from "@/components/Seo";
import Skeleton from "@/components/Skeleton";

import {ResumeType} from "@/repository/types";

export default function ResumeId() {
  const router = useRouter()
  const { id } = router.query
  const [resume, setResume] = useState<ResumeType | null>(null);

  useEffect(() => {
    if (id && resume === null) {
      axios.get(`/api/resume/${id}`).then(response => {
        const resume: ResumeType = response.data
        setResume(resume)
      })
    }
  }, [id])

  return (
    <Layout>
      <Seo templateTitle='Survey' />
      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center text-center'>
            <div className='m-2 md:m-4'>
              {resume === null && <Skeleton style={{ width: '400px' }} className='h-96 rounded' />}
              {resume && <Resume values={resume} />}
            </div>
            <DownloadButton selector='#resume' />

            <div className='flex mt-10 mx-auto'>
              <div>{resume && (
                <TwitterShareButton url={location.href}
                                    title={`BUMP履歴書を作成しました！${resume.comment}`}
                                    hashtags={['BUMP履歴書', 'BUMP', 'BUMPerと繋がりたい']}>
                  <div className='flex items-center justify-between space-x-2'>
                    <TwitterIcon size={32} round={true} /><div>履歴書をシェアする！</div>
                  </div>
                </TwitterShareButton>)
              }
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )

}
