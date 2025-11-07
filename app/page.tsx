import { Metadata } from 'next'
import Home from '@/components/pages/Home'

export const metadata: Metadata = {
  title: 'Grace Woodlands - A Church in The Woodlands, Texas',
  description: 'Join Grace Woodlands every Sunday at 9am and 11am. Experience a fresh outpouring of the presence of God with ministries for everyone in The Woodlands, TX.',
  keywords: [
    'Grace Woodlands',
    'church The Woodlands',
    'church The Woodlands TX',
    'Grace Church',
    'Steve Riggle',
    'Becky Riggle',
    'The Woodlands church',
    'multigenerational church',
    'worship',
    'prayer',
    'Grace International'
  ],
  authors: [{ name: 'Grace Woodlands' }],
  creator: 'Grace Woodlands',
  publisher: 'Grace Woodlands',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://gracewoodlands.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Grace Woodlands - A Church in The Woodlands, Texas',
    description: 'Join Grace Woodlands every Sunday at 9am and 11am. Experience a fresh outpouring of the presence of God.',
    url: 'https://gracewoodlands.com',
    siteName: 'Grace Woodlands',
    images: [
      {
        url: '/images/church/grace-building.jpg',
        width: 1200,
        height: 630,
        alt: 'Grace Woodlands church building in The Woodlands, TX',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grace Woodlands - A Church in The Woodlands, Texas',
    description: 'Join Grace Woodlands every Sunday at 9am and 11am.',
    images: ['/images/church/grace-building.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function HomePage() {
  return <Home />
}
