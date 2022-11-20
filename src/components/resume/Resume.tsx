import { format } from 'date-fns'
import * as React from 'react';

import UnderlineLink from "@/components/links/UnderlineLink";

import {ResumeType} from "@/repository/types";

type Props = {
  values: ResumeType
}

export default function Resume(props: Props) {
  const { artist = 'BUMP', createdAt, name, username, gender, songs, trigger, joining, comment } = props.values
  let genderElement
  switch (gender) {
    case 0:
      genderElement = <div className='m-auto w-4/5 text-xl font-bold text-red-500'>♀</div>
      break
    case 1:
      genderElement = <div className='m-auto w-4/5 text-xl font-bold text-blue-500'>♂</div>
      break
    case 2:
      genderElement = <div className='w-4/5 text-xl my-auto'>?</div>
      break
    default:
      genderElement = <div className='w-4/5 text-xl my-auto'>-</div>
  }

  return (
    <div id='resume' className='flex justify-center' style={{ width: '400px' }}>
      <div className='w-80 md:w-96'>
        {/* header */}
        <div className='flex justify-between'>
          <h1 className='text-lg md:text-xl'>{artist}履歴書</h1>
          <div className='mt-auto text-sm'>作成日: {format(new Date(createdAt), 'yyyy/MM/dd')}</div>
        </div>
        {/* content */}
        <div className='my-2 border border-black'>
          <div>
            <div className='flex justify-between border border-b-2 border-black'>
              <fieldset className='flex h-16 w-4/5'>
                <label className='ml-1 mt-1 w-1/5 text-left text-base'>
                  名前
                </label>
                <div className='mt-auto mb-auto w-4/5 text-xl'>{name}</div>
              </fieldset>
              <fieldset className='flex h-16 w-1/5 justify-between border border-l-2 border-0 border-black'>
                {genderElement}
              </fieldset>
            </div>
            <fieldset className='flex h-16 border border-b-2 border-t-0 border-black'>
              <label className='ml-1 mt-1 w-1/5 text-left text-base'>
                ユーザ名
              </label>
              <div className='mt-auto mb-auto w-4/5 text-xl'>{username}</div>
            </fieldset>
            <fieldset className='flex border border-b-2 border-t-0 border-black'>
              <label className='ml-1 mt-1 w-1/5 text-left text-base'>
                好きな曲
              </label>
              <div className='w-4/5 p-2 text-sm'>
                <ul className='flex list-none flex-wrap	space-x-2'>
                  {songs.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </fieldset>
            {trigger && (
              <fieldset className='flex border border-b-2 border-t-0 border-black'>
                <label className='ml-1 mt-1 w-1/5 text-left text-base'>
                  きっかけ
                </label>
                <div className='w-4/5 p-2 text-sm'>
                  {trigger}
                </div>
              </fieldset>
            )}
            {joining && (
              <fieldset className='flex border border-b-2 border-t-0 border-black'>
                <label className='ml-1 mt-1 w-1/5 text-left text-base'>
                  参戦歴
                </label>
                <div className='w-4/5 p-2 text-sm'>
                  <ul className='list-outside text-left'>
                    {joining.map((j, i) => <li key={i}>{j}</li>)}
                  </ul>
                </div>
              </fieldset>
            )}
            {comment && (
              <fieldset className='flex h-16 border border-t-0 border-black'>
                <label className='ml-1 mt-1 w-1/5 text-left text-base'>
                  皆に一言
                </label>
                <div className='mt-auto mb-auto w-4/5 text-xl'>
                  {comment}
                </div>
              </fieldset>
            )}
          </div>
        </div>
        {/* footer */}
        <div className='mb-2 flex justify-between'>
          <div></div>
          <div className='mt-auto text-xs'>created by <UnderlineLink href='https://music-resume.vercel.app'>music-resume.vercel.app</UnderlineLink></div>
        </div>
      </div>
    </div>
  );
}
