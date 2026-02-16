# CinematicHeader Component

A reusable cinematic page header component with video background and smooth scroll transformations.

## Features

- **Hero Section**: Full-width video background with autoplay, loop, and muted playback
- **Scroll Behavior**: Smooth transformation from hero to compact header
- **Floating Elements**: Animated galactic elements (planet, nebula, star)
- **Performance Optimized**: Lazy loading, fallback images, mobile optimization
- **Responsive Design**: Mobile-first approach with adaptive layouts

## Usage

```tsx
import { CinematicHeader } from '@/components/CinematicHeader';

function MyPage() {
  return (
    <CinematicHeader
      title="Page Title"
      tagline="Optional tagline or description"
      videoSrc="/videos/hero-video.mp4"
      fallbackImage="/images/fallback.jpg"
      floatingElement="planet"
    >
      {/* Optional CTA buttons or content */}
      <button>Get Started</button>
    </CinematicHeader>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **Required** | Main title displayed in the header |
| `tagline` | `string` | `undefined` | Optional subtitle or tagline |
| `videoSrc` | `string` | `undefined` | Path to video file for background |
| `fallbackImage` | `string` | `undefined` | Fallback image when video fails to load |
| `floatingElement` | `'planet' \| 'nebula' \| 'star'` | `'planet'` | Type of floating galactic element |
| `className` | `string` | `''` | Additional CSS classes |
| `children` | `ReactNode` | `undefined` | Optional content (buttons, CTAs, etc.) |

## Examples

### Basic Usage
```tsx
<CinematicHeader
  title="Welcome"
  tagline="Experience the future"
  fallbackImage="/hero-bg.jpg"
/>
```

### With Video and Custom Element
```tsx
<CinematicHeader
  title="Galactic Explorer"
  tagline="Journey through the cosmos"
  videoSrc="/videos/space.mp4"
  fallbackImage="/space-fallback.jpg"
  floatingElement="nebula"
>
  <div className="flex gap-4">
    <button className="btn-primary">Start Journey</button>
    <button className="btn-secondary">Learn More</button>
  </div>
</CinematicHeader>
```

### Minimal Header
```tsx
<CinematicHeader
  title="Simple Page"
  floatingElement="star"
/>
```

## Performance Features

- **Lazy Loading**: Video loads only when needed
- **Fallback Support**: Automatic fallback to image if video fails
- **Mobile Optimization**: Reduced animations on mobile devices
- **GPU Acceleration**: Hardware-accelerated animations
- **Intersection Observer**: Efficient scroll detection

## Animation Details

The header smoothly transforms based on scroll position:

1. **Hero State** (0px scroll): Full-height header with video background
2. **Transition State** (0-300px scroll): Gradual size reduction and fade
3. **Compact State** (300px+ scroll): Fixed navigation bar with title

## Integration Notes

- Component automatically handles scroll behavior
- No additional routing modifications required
- Works with existing layout systems
- Maintains responsive design principles
- Compatible with all modern browsers

## Dependencies

- React 18+
- Framer Motion
- React Icons
- Tailwind CSS
- TypeScript
