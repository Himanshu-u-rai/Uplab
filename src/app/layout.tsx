import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

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
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
