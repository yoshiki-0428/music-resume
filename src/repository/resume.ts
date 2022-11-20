import {client} from "@/lib/redis";

import {artistID} from "@/constant/env";
import {getJoining} from "@/repository/joining";
import {getTracks} from "@/repository/track";
import {ResumeType} from "@/repository/types";

export const getResume = async (id: string): Promise<ResumeType | null> => {
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
    const joining = getJoining(artistID)
    resume.joiningRecord = []
    resume.joining?.forEach(join => {
      const _join = joining.find(j => j.id === join)
      if (_join) resume.joiningRecord?.push(_join)
    })

    return resume
  }
  return null
}
