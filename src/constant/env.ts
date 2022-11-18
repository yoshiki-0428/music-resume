export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false;

export const REDIS_URL = process.env.REDIS_URL || ''

// TODO: SpotifyAPIから取る
export const artistID = '0hSFeqPehe7FtCNWuQ6Bsy'
