import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import SchemaComponent from '@/components/ui/schema-component';
import { organizationSchema, websiteSchema, servicesSchema, localBusinessSchema } from '@/lib/schema';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Uplab - Digital Agency That Delivers",
  description: "Transform your digital presence with Uplab. We offer exceptional web development, mobile apps, SEO optimization, and social media advertising services.",
  keywords: ["digital agency", "web development", "mobile apps", "SEO", "social media advertising", "uplab"],
  authors: [{ name: "Uplab Team" }],
  creator: "Uplab",
  publisher: "Uplab",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },
  manifest: '/site.webmanifest',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://uplab.dev',
    title: 'Uplab - Digital Agency That Delivers',
    description: 'Transform your digital presence with exceptional web development, mobile apps, and digital marketing services.',
    siteName: 'Uplab',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uplab - Digital Agency That Delivers',
    description: 'Transform your digital presence with exceptional web development, mobile apps, and digital marketing services.',
    creator: '@uplab_agency',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Combine all schemas for the main site
  const combinedSchema = [
    organizationSchema,
    websiteSchema,
    localBusinessSchema,
    ...servicesSchema
  ];

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <SchemaComponent schema={combinedSchema} id="main-schema" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
