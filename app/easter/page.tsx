import { Metadata } from 'next'
import EasterLanding from '@/components/pages/EasterLanding'

export const metadata: Metadata = {
  title: 'Easter at Grace - Grace Church The Woodlands',
  description:
    'Celebrate Easter at Grace Woodlands with a welcoming Easter weekend experience, Good Friday gathering, Sunday worship, and space for the whole family.',
  keywords: [
    'Easter at Grace',
    'Easter church The Woodlands',
    'Good Friday service The Woodlands',
    'Easter Sunday church near me',
    'Grace Woodlands Easter',
    'The Woodlands Easter services',
    'family Easter service The Woodlands',
    'Grace Church Easter',
  ],
  authors: [{ name: 'Grace Church' }],
  creator: 'Grace Church',
  publisher: 'Grace Church',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://gracewoodlands.com/easter',
  },
  openGraph: {
    title: 'Easter at Grace - Grace Church The Woodlands',
    description:
      'Join Grace Woodlands for Easter weekend with meaningful worship, a welcoming atmosphere, and gatherings designed for the whole family.',
    url: 'https://gracewoodlands.com/easter',
    siteName: 'Grace Church',
    images: [
      {
        url: 'https://gracewoodlands.com/wp-content/uploads/2021/03/Grace-Building-980x553.jpg',
        width: 980,
        height: 553,
        alt: 'Grace Church building - Spring, Texas',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@gracewoodlands',
    creator: '@gracewoodlands',
    title: 'Easter at Grace - Grace Church The Woodlands',
    description:
      'Celebrate Easter weekend at Grace Woodlands with a welcoming church experience for you and your family.',
    images: ['https://gracewoodlands.com/wp-content/uploads/2021/03/Grace-Building-980x553.jpg'],
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

export default function EasterPage() {
  return <EasterLanding />
}