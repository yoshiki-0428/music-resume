export type ResumeType = {
  id?: string
  artist: string
  createdAt: Date
  name: string
  username: string
  gender: number
  songs: string[]
  tracks: SpotifyApi.TrackObjectSimplified[]
  trigger?: string
  joining?: number[]
  joiningRecord?: JoinType[]
  comment?: string
}

export type JoinType = { id: number; text: string; url: string }
