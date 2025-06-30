import './globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/css/v4-shims.min.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import Script from 'next/script'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { getLocale } from 'next-intl/server'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://adoptium.net'),
  title: {
    default: 'Home | Adoptium',
    template: '%s | Adoptium'
  },
  description: 'Eclipse Adoptium provides prebuilt OpenJDK binaries from a fully open source set of build scripts and infrastructure.',
  authors: [{ name: 'Eclipse Adoptium' }],
  keywords: ['adoptium', 'openjdk', 'java', 'jdk', 'eclipse', 'temurin'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://adoptium.net',
    siteName: 'Adoptium',
    title: 'Adoptium',
    description: 'Eclipse Adoptium provides prebuilt OpenJDK binaries from a fully open source set of build scripts and infrastructure.',
    images: [
      {
        url: '/images/adoptium-icon.png',
        width: 1200,
        height: 630,
        alt: 'Adoptium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Adoptium',
    creator: '@Adoptium',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/images/favicon-32x32.png',
    apple: '/images/adoptium-icon.png',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get locale dynamically - this will work for both the root path (/)
  // and localized paths (/[locale])
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml"></link>
        <link rel="alternate" type="application/rss+xml" title="Adoptium Blog" href="/rss.xml"></link>
        <GoogleTagManager gtmId="GTM-5WLCZXC" />
        <GoogleAnalytics gaId="G-9HHPS5RX9D" />
        {/* Eclipse Foundation Cookie Consent Banner */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5WLCZXC');
          `}
        </Script>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link
          rel="stylesheet"
          type="text/css"
          href="//www.eclipse.org/eclipse.org-common/themes/solstice/public/stylesheets/vendor/cookieconsent/cookieconsent.min.css"
        />
        <Script
          src="//www.eclipse.org/eclipse.org-common/themes/solstice/public/javascript/vendor/cookieconsent/default.min.js"
          strategy="afterInteractive"
        />
        {/* End of Eclipse Foundation Cookie Consent Banner */}
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) - used for people who have JavaScript disabled */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5WLCZXC"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}
