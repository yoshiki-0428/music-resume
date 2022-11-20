import JOINING from "@/pages/api/joining.json";
import {JoinType} from "@/repository/types";

export const getJoining = (artistId: string) => {
  const joining: { [key: string]: JoinType[] } = JOINING

  const joinList: JoinType[] = joining[artistId]
  return joinList
}
