import type { Metadata } from "next";
import "./globals.css";
import FaviconRefresh from "@/components/FaviconRefresh";

export const metadata: Metadata = {
  metadataBase: new URL('https://gracewoodlands.com'),
  title: {
    default: "Grace Church - Church in The Woodlands, Texas",
    template: "%s | Grace Church"
  },
  description: "Join Grace Church every Sunday at 9am and 11am in The Woodlands, TX. A vibrant, multigenerational church where you can worship God, grow in faith, and serve the community.",
  keywords: [
    'Grace Church',
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
    'Montgomery County church'
  ],
  authors: [{ name: 'Grace Church' }],
  creator: 'Grace Church',
  publisher: 'Grace Church',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gracewoodlands.com',
    siteName: 'Grace Church',
    title: 'Grace Church - Church in The Woodlands, Texas',
    description: 'Join Grace Church every Sunday at 9am and 11am. Experience a fresh outpouring of the presence of God in The Woodlands, TX.',
    images: [
      {
        url: 'https://gracewoodlands.com/wp-content/uploads/2021/03/Grace-Building.jpg',
        width: 1200,
        height: 677,
        alt: 'Grace Church building in The Woodlands, Texas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@gracewoodlands',
    creator: '@gracewoodlands',
    title: 'Grace Church - Church in The Woodlands, Texas',
    description: 'Join us every Sunday at 9am and 11am in The Woodlands, TX.',
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
  alternates: {
    canonical: 'https://gracewoodlands.com',
  },
  verification: {
    google: 'verification_token_here', // Add actual Google Search Console verification token
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/waj3arc.css" />
        {/* Google Fonts - Montserrat for Christmas pages */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-D3ZFC7Q5FC"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-D3ZFC7Q5FC');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Church",
              "name": "Grace Church",
              "alternateName": "Grace Church Woodlands",
              "description": "A vibrant, multigenerational church in The Woodlands, Texas where people from all walks of life come together to worship God, grow in faith, and serve the community.",
              "url": "https://gracewoodlands.com",
              "logo": "https://gracewoodlands.com/wp-content/uploads/2021/09/Grace-logo-for-web-white.png",
              "image": "https://gracewoodlands.com/wp-content/uploads/2021/03/Grace-Building.jpg",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "24400 Interstate 45 N",
                "addressLocality": "The Woodlands",
                "addressRegion": "TX",
                "postalCode": "77386",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "30.1735",
                "longitude": "-95.4612"
              },
              "telephone": "(832) 381-2306",
              "email": "info@gracewoodlands.com",
              "openingHours": ["Su 09:00-12:00", "Mo-Fr 09:00-17:00"],
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Sunday",
                  "opens": "09:00",
                  "closes": "12:00",
                  "description": "Sunday worship services at 9am and 11am"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "17:00",
                  "description": "Office hours"
                }
              ],
              "sameAs": [
                "https://www.facebook.com/gracewoodlands",
                "https://www.instagram.com/gracewoodlands/",
                "https://www.youtube.com/gracewoodlands",
                "https://twitter.com/gracewoodlands"
              ],
              "founder": {
                "@type": "Person",
                "name": "Steve Riggle",
                "jobTitle": "Founding Pastor"
              },
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "30.1735",
                  "longitude": "-95.4612"
                },
                "geoRadius": "50000"
              },
              "hasMap": "https://www.google.com/maps/dir/?api=1&destination=24400+Interstate+45+N+The+Woodlands+TX+77386"
            })
          }}
        />
      </head>
      <body>
        <FaviconRefresh />
        <div className="page">
          {children}
        </div>
      </body>
    </html>
  );
}
