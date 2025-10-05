# Acentrium Africa Dashboard

A modern, responsive dashboard showcasing Acentrium Africa's impact across the continent through AI education, research, and community initiatives.

## Features

- **Interactive Dashboard**: Real-time impact metrics and visualizations
- **Regional Filtering**: Interactive Africa map with clickable regions
- **Event Calendar**: Comprehensive calendar for Acentrium Africa events
- **Research Pipeline**: Track ongoing research projects and initiatives
- **Program Analytics**: Monitor program completion rates and success metrics
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: User-friendly theme switching
- **Embeddable**: Ready for integration into existing websites

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4.0
- **Charts**: ApexCharts
- **Calendar**: FullCalendar
- **Build Tool**: Vite
- **Routing**: React Router v7

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Acentrium-Dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── impact/         # Dashboard-specific components
│   ├── common/         # Shared components
│   └── ui/             # Base UI components
├── pages/              # Page components
├── layout/             # Layout components
├── context/            # React contexts
├── hooks/              # Custom hooks
├── icons/              # SVG icons
└── styles/             # CSS files
```

## Embedding

This dashboard is designed to be embedded into existing websites. See [EMBEDDING.md](./EMBEDDING.md) for detailed integration instructions.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Clean build artifacts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the Acentrium Africa team.

---

Built with ❤️ for Acentrium Africa