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
  joining?: string[]
  comment?: string
}
