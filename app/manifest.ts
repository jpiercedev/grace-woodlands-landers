import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Grace Woodlands - Church in The Woodlands, Texas',
    short_name: 'Grace Woodlands',
    description: 'Join Grace Woodlands every Sunday at 9am and 11am in The Woodlands, TX. A vibrant, multigenerational church.',
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

