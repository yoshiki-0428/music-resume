import logger from "@/lib/logger";
import {client} from "@/lib/redis";

import {getTracksBySpotify} from "@/repository/spotify";

export const getTracks = async (artistID: string) => {
  await client.connect()
  try {
    const tracks = await getTracksByRedis(artistID)

    if (tracks.length !== 0) {
      return tracks
    }

    const values = await getTracksBySpotify(artistID)
    await client.lPush(`${artistID}:tracks`, values.map(v => JSON.stringify(v)))
    await client.expire(`${artistID}:tracks`, 60 * 24 * 30)
    await client.ttl(`${artistID}:tracks`)
    return await getTracksByRedis(artistID)
  } catch (e) {
    logger(e)
  } finally {
    await client.disconnect()
  }
}

export const delCache = async (artistID: string) => {
  await client.connect()
  await client.del(`${artistID}:tracks`)
  await client.disconnect()
}

const getTracksByRedis = async (artistID: string) => {
  const tracks = await client.lRange(`${artistID}:tracks`, 0, 500)
  return tracks.map(t => JSON.parse(t))
}

// TODO: Spotify API
// const getSpotifyByTracks = (artistID: string) => {
//   const json = bump.filter((record) => {
//     return record.artists[0].id === artistID
//   })
//   const hash: { [key: string]: { album: { album_type: string }, name: string, popularity: number } } = {}
//   json.forEach(record => {
//     if (hash[record.name]) {
//       if (hash[record.name].album.album_type === 'single' && record.album.album_type === 'album') {
//         hash[record.name] = record
//       }
//     } else {
//       hash[record.name] = record
//     }
//   })
//
//   const values = Object.keys(hash).map(k => hash[k]).sort((a, b) => a.popularity - b.popularity).map(v => JSON.stringify(v))
//   return values
// }
