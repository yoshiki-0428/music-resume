import SpotifyWebApi from "spotify-web-api-node";

const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN || ''
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || ''
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || ''

export const getTracksBySpotify = async (artistId: string) => {
  const client = await spotifyClient()

  // FIXME: 一旦100アルバムまで対応
  const { body } = await client.getArtistAlbums(artistId, { limit: 50 })
  const albums = body.items
  if (body.next) {
    const { body } = await client.getArtistAlbums(artistId, { limit: 50, offset: 50 })
    albums.push(...body.items)
  }

  const tracks: SpotifyApi.TrackObjectSimplified[] = []
  for await (const album of albums) {
    const { body } = await client.getAlbumTracks(album.id)
    tracks.push(...body.items)
  }

  const hash: { [key: string]: SpotifyApi.TrackObjectSimplified } = {}
  tracks.forEach(track => {
    hash[track.name] = track
  })
  const newTracks = Object.keys(hash).map(k => hash[k])
  return newTracks
}

let spotifyApi: SpotifyWebApi | null
export const spotifyClient = async () => {
  if (!spotifyApi) {
    spotifyApi = new SpotifyWebApi({
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      redirectUri: 'http://localhost:3000'
    })
  }

  spotifyApi.setRefreshToken(SPOTIFY_REFRESH_TOKEN)
  const { body: { access_token } } = await spotifyApi.refreshAccessToken()
  spotifyApi.setAccessToken(access_token)
  return spotifyApi
}
