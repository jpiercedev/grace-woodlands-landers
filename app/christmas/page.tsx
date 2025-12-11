import { Metadata } from 'next'
import ChristmasLanding from '@/components/pages/ChristmasLanding'

export const metadata: Metadata = {
  title: 'Christmas at Grace - Grace Church The Woodlands',
  description: 'Celebrate Christmas at Grace Church with Christmas Eve Services, Family Christmas Car Show, Family Christmas Service, and Polar Express Movie Experience. Join us for a season of joy and celebration!',
  keywords: [
    'Christmas at Grace',
    'Christmas Eve services The Woodlands',
    'Christmas church The Woodlands',
    'Christmas car show',
    'Polar Express movie',
    'Family Christmas events',
    'Grace Church Christmas',
    'Christmas services 2025',
    'The Woodlands Christmas events',
    'church Christmas celebration'
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
    canonical: 'https://christmas.gracewoodlands.com',
  },
  openGraph: {
    title: 'Christmas at Grace - Grace Church The Woodlands',
    description: 'Celebrate Christmas at Grace Church with special services and family events throughout December.',
    url: 'https://christmas.gracewoodlands.com',
    siteName: 'Grace Church',
    images: [
      {
        url: 'https://gracewoodlands.com/wp-content/uploads/2024/12/LOGO_Christmas24.png',
        width: 1200,
        height: 677,
        alt: 'Christmas at Grace Church - The Woodlands, Texas',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@gracewoodlands',
    creator: '@gracewoodlands',
    title: 'Christmas at Grace - Grace Church The Woodlands',
    description: 'Celebrate Christmas at Grace Church with special services and family events throughout December.',
    images: ['https://gracewoodlands.com/wp-content/uploads/2024/12/LOGO_Christmas24.png'],
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

export default function ChristmasPage() {
  return <ChristmasLanding />
}

