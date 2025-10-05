# Acentrium Dashboard - Embedding Guide

This dashboard is designed to be embedded into existing websites. The header has been removed to make it embeddable.

## Embedding Options

### Option 1: iframe Embedding (Recommended)

```html
<iframe 
  src="http://localhost:5173" 
  width="100%" 
  height="800px" 
  frameborder="0"
  title="Acentrium Africa Dashboard">
</iframe>
```

### Option 2: Direct Component Embedding

If you're using React in your existing website, you can import and use the `EmbeddableDashboard` component:

```tsx
import EmbeddableDashboard from './path/to/EmbeddableDashboard';

function YourWebsite() {
  return (
    <div>
      <h1>Your Website Header</h1>
      <EmbeddableDashboard 
        initialPath="/"
        className="your-custom-class"
      />
    </div>
  );
}
```

### Option 3: Build for Production

1. Build the dashboard:
```bash
npm run build
```

2. Serve the built files from your server
3. Embed using iframe pointing to your server URL

## Features Available

- **Dashboard**: Main impact metrics and charts
- **Calendar**: Acentrium Africa events and activities
- **Research**: Research & Innovation Pipeline
- **Programs**: Program Completion Analysis
- **Initiatives**: Recent Initiatives

## Responsive Design

The dashboard is fully responsive and will adapt to different screen sizes when embedded.

## Navigation

- Sidebar navigation for different sections
- Interactive Africa map with regional filtering
- All original functionality preserved

## Customization

You can customize the appearance by:
- Modifying CSS classes in the embeddable component
- Adjusting the sidebar width and layout
- Adding your own CSS overrides

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Touch-friendly interface
