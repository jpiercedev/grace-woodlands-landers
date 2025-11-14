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
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}

