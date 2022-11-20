import logger from "@/lib/logger";
import {client} from "@/lib/redis";

import {artistID} from "@/constant/env";
import {getTracks} from "@/repository/track";
import {ResumeType} from "@/repository/types";

export const getResume = async (id: string): Promise<ResumeType | null> => {

  try {
    await client.connect()
    const data = await client.get(`${artistID}:resume:${id}`)
    await client.disconnect()
    if (data) {
      const resume: ResumeType = JSON.parse(data)
      resume.tracks = []
      const tracks = await getTracks(artistID)
      resume.songs.forEach(song => {
        const track = tracks?.find(track => track.id === song)
        if (track) resume.tracks.push(track)
      })
      resume.joining?.forEach(join => {
        // TODO: getJoining & setJoinningObject
      })

      return resume
    }
  } catch (e) {
    logger(e)
  } finally {
  }
  return null
}
