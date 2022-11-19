import logger from "@/lib/logger";
import {client} from "@/lib/redis";

import {artistID} from "@/constant/env";
import {ResumeType} from "@/repository/types";

export const getResume = async (id: string): Promise<ResumeType | null> => {
  await client.connect()

  try {
    const data = await client.get(`${artistID}:resume:${id}`)
    if (data) {
      const resume: ResumeType = JSON.parse(data)
      return resume
    }
  } catch (e) {
    logger(e)
  } finally {
    await client.disconnect()
  }
  return null
}
