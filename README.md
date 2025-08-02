# Uplab - Digital Agency Website

A modern, fully responsive website for Uplab digital agency built with Next.js 14, TypeScript, and Tailwind CSS. The site features smooth animations, glassmorphism design elements, and modern UI/UX patterns.

## 🚀 Features

- **Modern Design**: Clean, professional design with glassmorphism effects and smooth gradients
- **Fully Responsive**: Optimized for all devices and screen sizes
- **Smooth Animations**: Powered by Framer Motion for engaging user interactions
- **Performance Optimized**: Built with Next.js 14 for optimal loading speeds
- **SEO Ready**: Comprehensive meta tags and structured data
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Headless UI, Radix UI
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/uplab.git
cd uplab
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Design System

The website uses a comprehensive design system with:

- **Typography**: Inter and Poppins font families
- **Colors**: Custom color palette with primary, secondary, and accent colors
- **Spacing**: Consistent spacing scale using Tailwind CSS
- **Components**: Reusable UI components with variant patterns
- **Animations**: Smooth micro-interactions and page transitions

## 📱 Sections

- **Hero Section**: Bold introduction with animated CTAs
- **Services**: Interactive cards showcasing digital services
- **Portfolio**: Project showcase with filtering and hover effects
- **About**: Company timeline and values
- **Testimonials**: Client testimonials with carousel
- **Contact**: Modern contact form with multiple contact methods

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Import the project
3. Deploy with default settings

### Other Platforms

For deployment on other platforms, build the project:

```bash
npm run build
npm start
```

## 🔧 Customization

### Colors
Update the color scheme in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Your primary colors
  },
  secondary: {
    // Your secondary colors
  }
}
```

### Content
Update content in the respective component files in `src/components/sections/`

### Animations
Modify animations in component files using Framer Motion

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please contact:
- Email: hello@uplab.agency
- Website: [https://uplab.agency](https://uplab.agency)

---

Built with ❤️ by the Uplab team
