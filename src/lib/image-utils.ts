/**
 * Image utility functions for the Uplab website
 * Provides consistent image handling and optimization
 */

/**
 * Get the full path for an image in the public/images directory
 * @param category - The image category (hero, portfolio, team, etc.)
 * @param filename - The image filename
 * @returns Full path to the image
 */
export function getImagePath(category: string, filename: string): string {
  return `/images/${category}/${filename}`
}

/**
 * Image categories available in the public/images directory
 */
export const ImageCategories = {
  HERO: 'hero',
  PORTFOLIO: 'portfolio',
  TEAM: 'team',
  TESTIMONIALS: 'testimonials',
  SERVICES: 'services',
} as const

/**
 * Common image sizes used throughout the website
 */
export const ImageSizes = {
  // Hero section
  HERO_BACKGROUND: { width: 1920, height: 1080 },
  HERO_GRAPHIC: { width: 800, height: 600 },

  // Portfolio
  PROJECT_THUMBNAIL: { width: 600, height: 400 },
  PROJECT_DETAIL: { width: 1200, height: 800 },

  // Team
  TEAM_MEMBER: { width: 400, height: 400 },

  // Testimonials
  CLIENT_PHOTO: { width: 200, height: 200 },
  COMPANY_LOGO: { width: 150, height: 50 },

  // Services
  SERVICE_ICON: { width: 64, height: 64 },
  SERVICE_ILLUSTRATION: { width: 400, height: 300 },
} as const

/**
 * Helper function to create optimized image props for Next.js Image component
 * @param category - Image category
 * @param filename - Image filename
 * @param alt - Alt text for accessibility
 * @param size - Predefined size from ImageSizes
 * @returns Object with src, alt, width, and height properties
 */
export function createImageProps(
  category: keyof typeof ImageCategories,
  filename: string,
  alt: string,
  size: keyof typeof ImageSizes
) {
  const categoryPath = ImageCategories[category]
  const dimensions = ImageSizes[size]

  return {
    src: getImagePath(categoryPath, filename),
    alt,
    width: dimensions.width,
    height: dimensions.height,
  }
}

/**
 * Generate placeholder image URL for development/testing
 * @param width - Image width
 * @param height - Image height
 * @param text - Optional text to display on placeholder
 * @returns Placeholder image URL
 */
export function getPlaceholderImage(
  width: number,
  height: number,
  text?: string
): string {
  const displayText = text ? encodeURIComponent(text) : `${width}x${height}`
  return `https://via.placeholder.com/${width}x${height}/6366f1/ffffff?text=${displayText}`
}

/**
 * Check if an image file exists (client-side)
 * @param imagePath - Path to the image
 * @returns Promise that resolves to boolean
 */
export async function imageExists(imagePath: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = imagePath
  })
}

/**
 * Common image configurations for different sections
 */
export const ImageConfigs = {
  heroBackground: (filename: string) => ({
    src: getImagePath(ImageCategories.HERO, filename),
    className: "absolute inset-0 w-full h-full object-cover",
    priority: true,
  }),

  portfolioThumbnail: (filename: string, alt: string) => ({
    ...createImageProps('PORTFOLIO', filename, alt, 'PROJECT_THUMBNAIL'),
    className: "w-full h-64 object-cover rounded-lg",
  }),

  teamMember: (filename: string, alt: string) => ({
    ...createImageProps('TEAM', filename, alt, 'TEAM_MEMBER'),
    className: "w-full h-full object-cover rounded-full",
  }),

  clientPhoto: (filename: string, alt: string) => ({
    ...createImageProps('TESTIMONIALS', filename, alt, 'CLIENT_PHOTO'),
    className: "w-16 h-16 rounded-full object-cover",
  }),

  serviceIcon: (filename: string, alt: string) => ({
    ...createImageProps('SERVICES', filename, alt, 'SERVICE_ICON'),
    className: "w-16 h-16",
  }),
}

export default {
  getImagePath,
  ImageCategories,
  ImageSizes,
  createImageProps,
  getPlaceholderImage,
  imageExists,
  ImageConfigs,
}
