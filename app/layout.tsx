import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://gracewoodlands.com'),
  title: "Grace Woodlands",
  description: "A church in The Woodlands, Texas",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Church",
              "name": "Grace Woodlands",
              "description": "A church in The Woodlands, Texas",
              "url": "https://gracewoodlands.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "24400 Interstate 45 N",
                "addressLocality": "The Woodlands",
                "addressRegion": "TX",
                "postalCode": "77386",
                "addressCountry": "US"
              },
              "telephone": "(832) 381-2306",
              "openingHours": ["Su 09:00-12:00"]
            })
          }}
        />
      </head>
      <body>
        <div className="page">
          {children}
        </div>
      </body>
    </html>
  );
}
