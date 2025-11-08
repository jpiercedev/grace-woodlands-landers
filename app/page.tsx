import { Metadata } from 'next'
import Home from '@/components/pages/Home'

export const metadata: Metadata = {
  title: 'Grace Woodlands - Church in The Woodlands, Texas | Sunday Services 9am & 11am',
  description: 'Join Grace Woodlands every Sunday at 9am and 11am in The Woodlands, TX. A vibrant, multigenerational church where you can worship God, grow in faith, and serve the community. Located at 24400 Interstate 45 N.',
  keywords: [
    'Grace Woodlands',
    'church The Woodlands TX',
    'The Woodlands church',
    'church near me The Woodlands',
    'Christian church The Woodlands',
    'Steve Riggle',
    'Becky Riggle',
    'Grace Church Texas',
    'multigenerational church',
    'family church The Woodlands',
    'worship service The Woodlands',
    'Sunday service The Woodlands',
    'Bible teaching church',
    'prayer church The Woodlands',
    'Grace International',
    'church 77386',
    'church Interstate 45',
    'Montgomery County church',
    'church near Spring TX',
    'church near Conroe TX',
    'nondenominational church The Woodlands',
    'contemporary worship The Woodlands',
    'kids ministry The Woodlands',
    'youth ministry The Woodlands',
    'small groups The Woodlands'
  ],
  authors: [{ name: 'Grace Woodlands' }],
  creator: 'Grace Woodlands',
  publisher: 'Grace Woodlands',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://gracewoodlands.com',
  },
  openGraph: {
    title: 'Grace Woodlands - Church in The Woodlands, Texas | Sunday Services 9am & 11am',
    description: 'Join Grace Woodlands every Sunday at 9am and 11am in The Woodlands, TX. A vibrant, multigenerational church where you can worship God, grow in faith, and serve the community.',
    url: 'https://gracewoodlands.com',
    siteName: 'Grace Woodlands',
    images: [
      {
        url: 'https://gracewoodlands.com/wp-content/uploads/2021/03/Grace-Building.jpg',
        width: 1200,
        height: 677,
        alt: 'Grace Woodlands church building in The Woodlands, Texas - 24400 Interstate 45 N',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@gracewoodlands',
    creator: '@gracewoodlands',
    title: 'Grace Woodlands - Church in The Woodlands, Texas',
    description: 'Join us every Sunday at 9am and 11am in The Woodlands, TX. A vibrant, multigenerational church with ministries for everyone.',
    images: ['https://gracewoodlands.com/wp-content/uploads/2021/03/Grace-Building.jpg'],
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
