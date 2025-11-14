import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Grace Church - Church in The Woodlands, Texas',
    short_name: 'Grace Church',
    description: 'Join Grace Church every Sunday at 9am and 11am in The Woodlands, TX. A vibrant, multigenerational church.',
    start_url: '/',
    display: 'standalone',
    background_color: '#efe9e0',
    theme_color: '#AE8F63',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}

