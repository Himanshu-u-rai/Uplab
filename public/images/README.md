# Images Folder Structure

This folder contains all images used throughout the Uplab website. The images are organized by section for easy management and maintenance.

## 📁 Folder Structure

```
public/images/
├── hero/              # Hero section images and backgrounds
├── portfolio/         # Project screenshots and portfolio images
├── team/             # Team member photos and about section images
├── testimonials/     # Client photos and testimonial images
├── services/         # Service-related images and icons
├── blog/             # Blog post images and featured images
└── README.md         # This file
```

## 🖼️ Image Guidelines

### **Recommended Image Formats:**
- **WebP**: Best compression and quality (preferred)
- **JPEG**: For photos and complex images
- **PNG**: For images with transparency
- **SVG**: For logos and simple graphics

### **Recommended Image Sizes:**

#### **Hero Section (`/hero/`)**
- Hero backgrounds: 1920x1080px or larger
- Hero graphics: 800x600px
- Mobile hero images: 768x432px

#### **Portfolio (`/portfolio/`)**
- Project thumbnails: 600x400px
- Project detail images: 1200x800px
- Project mockups: 800x600px

#### **Team (`/team/`)**
- Team member photos: 400x400px (square)
- About section images: 600x400px

#### **Testimonials (`/testimonials/`)**
- Client photos: 200x200px (square, will be displayed as circles)
- Company logos: 150x50px (transparent background)

#### **Services (`/services/`)**
- Service icons: 64x64px (SVG preferred)
- Service illustrations: 400x300px

#### **Blog (`/blog/`)**
- Featured images: 800x450px
- In-content images: 600x400px

## 🔧 How to Use Images in Code

### **For Regular Images:**
```tsx
// In React components
<img 
  src="/images/portfolio/project-name.jpg" 
  alt="Project Description"
  className="w-full h-auto"
/>
```

### **For Next.js Optimized Images:**
```tsx
import Image from 'next/image'

<Image
  src="/images/team/member-name.jpg"
  alt="Team Member Name"
  width={400}
  height={400}
  className="rounded-full"
/>
```

### **For Background Images (Tailwind CSS):**
```tsx
<div 
  className="bg-cover bg-center h-96"
  style={{backgroundImage: "url('/images/hero/hero-bg.jpg')"}}
>
  Content here
</div>
```

## 📝 Naming Conventions

### **Use descriptive, kebab-case names:**
- ✅ `project-fintech-dashboard.jpg`
- ✅ `team-member-john-doe.jpg`
- ✅ `hero-background-main.jpg`
- ❌ `IMG_001.jpg`
- ❌ `image1.png`

### **Include size indicators when necessary:**
- `logo-uplab-large.svg` (for header)
- `logo-uplab-small.svg` (for footer)
- `project-thumbnail-600x400.jpg`

## 🎯 Current Usage Examples

### **Portfolio Section:**
The portfolio section in `interactive-portfolio-section.tsx` can use images like:
```tsx
// Replace placeholder with actual image
imageSrc: "/images/portfolio/fintech-dashboard.jpg"
```

### **Team Section:**
The about section in `enhanced-about-section.tsx` can use team photos:
```tsx
// Add team member photos
image: "/images/team/founder-photo.jpg"
```

### **Testimonials:**
The testimonials section can use client photos:
```tsx
// Add client photos
image: "/images/testimonials/client-name.jpg"
```

## 🚀 Optimization Tips

1. **Compress Images**: Use tools like TinyPNG or ImageOptim before uploading
2. **Use WebP**: Convert images to WebP format for better compression
3. **Responsive Images**: Provide multiple sizes for different screen sizes
4. **Lazy Loading**: Images will be lazy-loaded automatically with Next.js Image component
5. **Alt Text**: Always include descriptive alt text for accessibility

## 📱 Mobile Considerations

- Provide smaller versions for mobile devices
- Test images on different screen sizes
- Consider touch-friendly image galleries
- Optimize loading times for mobile networks

## 🔄 Adding New Images

1. Choose the appropriate folder based on image purpose
2. Follow the naming conventions
3. Optimize the image size and format
4. Update the relevant React component to use the new image
5. Test the image displays correctly on all screen sizes

---

**Need help?** Check the component files to see how images are currently implemented and follow the same patterns for consistency.
