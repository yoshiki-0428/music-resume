// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { client } from '@/lib/redis';

import {artistID} from "@/constant/env";

import bump from './bbb.json'

export default async function tracks(req: NextApiRequest, res: NextApiResponse) {
  await client.connect()
  const tracks = await getTracksByRedis(artistID)
  if (tracks.length !== 0) {
    res.status(200).json(tracks);
  } else {
    const values = getSpotifyByTracks(artistID)
    await client.lPush(`${artistID}:tracks`, values)
    await client.expire(`${artistID}:tracks`, 60 * 24 * 30)
    await client.ttl(`${artistID}:tracks`)

    res.status(200).json(await getTracksByRedis(artistID))
  }

  await client.disconnect()
  res.end()
}

const getTracksByRedis = async (artistID: string) => {
  const tracks = await client.lRange(`${artistID}:tracks`, 0, 500)
  return tracks.map(t => JSON.parse(t))
}

// TODO: Spotify API
const getSpotifyByTracks = (artistID: string) => {
  const json = bump.filter((record) => {
    return record.artists[0].id === artistID
  })
  const hash: { [key: string]: { album: { album_type: string }, name: string, popularity: number } } = {}
  json.forEach(record => {
    if (hash[record.name]) {
      if (hash[record.name].album.album_type === 'single' && record.album.album_type === 'album') {
        hash[record.name] = record
      }
    } else {
      hash[record.name] = record
    }
  })

  const values = Object.keys(hash).map(k => hash[k]).sort((a, b) => a.popularity - b.popularity).map(v => JSON.stringify(v))
  return values
}
