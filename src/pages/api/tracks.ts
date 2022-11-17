// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import bump from './bbb.json'

export default function tracks(req: NextApiRequest, res: NextApiResponse) {
  const json = bump.filter((record) => {
    return record.artists[0].name === 'BUMP OF CHICKEN'
  })

  const hash: { [key: string]: any } = {}
  json.forEach(record => {
    if (hash[record.name]) {
      if (hash[record.name].album.album_type === 'single' && record.album.album_type === 'album') {
        hash[record.name] = record
      }
    } else {
      hash[record.name] = record
    }
  })

  res.status(200).json(Object.keys(hash).map(k => hash[k]));
}
