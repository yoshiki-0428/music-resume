import * as React from 'react';

export default function SampleResume() {
  return (
    <div id='resume' className='flex justify-center' style={{ width: '400px' }}>
      <div className='mt-10 w-80 md:w-96'>
        {/* header */}
        <div className='flex justify-between'>
          <h1 className='text-lg md:text-xl'>BUMP 履歴書</h1>
          <div className='mt-auto text-sm'>作成日: 2022/11/17</div>
        </div>
        {/* content */}
        <div className='my-2 border border-black'>
          <div>
            <div className='flex justify-between'>
              <fieldset className='flex h-16 w-4/5 border border-b-2 border-black'>
                <label className='ml-1 mt-1 w-1/5 text-left text-base'>
                  名前
                </label>
                <div className='mt-auto mb-auto w-4/5 text-xl'>yoshiki</div>
              </fieldset>
              <fieldset className='flex h-16 w-1/5 justify-between border border-b-2 border-black'>
                {/*<div className='w-4/5 text-xl text-red-500 font-bold my-auto'>♀</div>*/}
                <div className='m-auto w-4/5 text-xl font-bold text-blue-500'>
                  ♂
                </div>
                {/*<div className='w-4/5 text-xl my-auto'>?</div>*/}
              </fieldset>
            </div>
            <fieldset className='flex h-16 border border-b-2 border-black'>
              <label
                className='ml-1 mt-1 w-1/5 text-left text-base'
                htmlFor='name'
              >
                ユーザ名
              </label>
              <div className='mt-auto mb-auto w-4/5 text-xl'>yoshiki-0428</div>
            </fieldset>
            <fieldset className='flex border border-b-2 border-black'>
              <label
                className='ml-1 mt-1 w-1/5 text-left text-base'
                htmlFor='name'
              >
                好きな曲
              </label>
              <div className='w-4/5 p-2 text-sm'>
                <ul className='flex list-none flex-wrap	space-x-2'>
                  <li>宝石になった日</li>
                  <li>Ray</li>
                  <li>新世界</li>
                  <li>ラフメイカー</li>
                  <li>K</li>
                  <li>サザンクロス</li>
                </ul>
              </div>
            </fieldset>
            <fieldset className='flex border border-b-2 border-black'>
              <label
                className='ml-1 mt-1 w-1/5 text-left text-base'
                htmlFor='name'
              >
                きっかけ
              </label>
              <div className='w-4/5 p-2 text-sm'>
                中学生の時にアビスのゲームを始めてカルマを聞いたときに衝撃的だった
              </div>
            </fieldset>
            <fieldset className='flex border border-b-2 border-black'>
              <label
                className='ml-1 mt-1 w-1/5 text-left text-base'
                htmlFor='name'
              >
                参戦歴
              </label>
              <div className='w-4/5 p-2 text-sm'>
                <ul className='list-outside text-left'>
                  <li>2022 Silver Jubilee 札幌</li>
                  <li>2019 aurora ark メットライフドーム</li>
                  <li>2014 WILLPOLIS 朱鷺メッセ</li>
                  <li>2012 GOLD GLIDER TOUR 朱鷺メッセ</li>
                </ul>
              </div>
            </fieldset>
            <fieldset className='flex h-16 border border-b-2 border-black'>
              <label
                className='ml-1 mt-1 w-1/5 text-left text-base'
                htmlFor='name'
              >
                皆に一言
              </label>
              <div className='mt-auto mb-auto w-4/5 text-xl'>
                よろしくな！！
              </div>
            </fieldset>
          </div>
        </div>
        {/* footer */}
        <div className='mb-2 flex justify-between'>
          <div></div>
          <div className='mt-auto text-xs'>created by music-resume.com</div>
        </div>
      </div>
    </div>
  );
}
