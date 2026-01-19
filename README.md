# NeuralBets

A modern, paper trading sports betting platform that allows users to simulate bets, practice betting strategies, and participate in the excitement of sports betting without risking real money. NeuralBets provides a risk-free environment where users can experience live odds, create parlay bets, and track their simulated betting performance using real-time game data and dynamic odds calculations.

## 🎯 Project Overview

NeuralBets was built to solve a pretty common problem: you're hanging out with friends, everyone's talking about their bets and placing wagers, but you don't want to risk real money. It can feel pretty awkward being the only one sitting out. So I created this platform so you can:

- **Join in on the betting conversations** with your friends without actually putting money on the line
- **Practice your betting strategies** and see what works (or what doesn't) in a safe environment
- **Learn the ropes** of how sports betting actually works using real odds and game data
- **Get in on the fun** of betting without the stress of potentially losing real cash

## 🚀 What the Platform Offers

### Core Features

#### 1. **Live Odds Display**
- Real-time sports betting odds for multiple leagues (NFL, NHL, and more)
- Live game indicators showing active matches
- Support for multiple bookmakers
- Decimal odds with automatic conversion to American format (+/-)
- Game start times and sport categorization
- All odds are real-world data for authentic simulation experience

#### 2. **Interactive Parlay Builder**
- Select multiple bets from different games to create a parlay
- Real-time calculation of combined odds and potential payouts
- Visual bet slip with easy bet removal
- Dynamic bet amount input with validation (simulated funds)
- Instant profit calculations based on selected bets
- Practice complex betting strategies without financial risk

## 🛠️ Tech Stack

### Core Frontend
* **React 19 & TypeScript** – Foundation for UI and type safety.
* **React Router 7** – Client-side navigation.
* **Tailwind CSS** – Styling and responsive design.
* **Lucide React** – Consistent iconography.

### Development & Build
* **Node.js 20** – Modern runtime environment.
* **Create React App** – Build tooling and scripts.

## 📁 Project Structure

```
NeuralBets-frontend/
└── neuralbets/
    ├── src/
    │   ├── api/              # API integration layer
    │   │   └── liveOddsApi.ts
    │   ├── components/       # Reusable React components
    │   │   ├── BetCreator.tsx
    │   │   ├── Footer.tsx
    │   │   ├── Header.tsx
    │   │   ├── LiveIndicator.tsx
    │   │   ├── LiveOdds.tsx
    │   │   ├── ParlayPayout.tsx
    │   │   ├── PlaceBet.tsx
    │   │   └── WelcomeBanner.tsx
    │   ├── features/         # Feature-based modules
    │   │   ├── auth/
    │   │   └── home/
    │   ├── pages/            # Page components
    │   │   └── homepage.tsx
    │   ├── types/            # TypeScript type definitions
    │   │   └── Livegame.tsx
    │   ├── utils/            # Utility functions
    │   │   └── oddsUtils.ts
    │   ├── App.tsx           # Main application component
    │   └── index.tsx         # Application entry point
    ├── public/               # Static assets
    ├── Dockerfile           # Container configuration
    ├── nginx.conf           # Nginx server configuration
    ├── tailwind.config.js   # Tailwind CSS configuration
    └── package.json         # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or yarn package manager
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd NeuralBets-frontend/neuralbets
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

### Running Tests

```bash
npm test
```

### Docker Deployment

Build and run the Docker container:

```bash
cd neuralbets
docker build -t neuralbets-frontend .
docker run -p 80:80 neuralbets-frontend
```

## 🔧 Configuration

### Environment Variables
- Backend API proxy is configured in `package.json` (default: `http://localhost:8082`)
- Update the proxy URL to match your backend server configuration

### Tailwind Configuration
Custom colors and theme extensions are defined in `tailwind.config.js`:
- `mainblue`: Primary background color (#07050D)
- Custom gradient utilities for UI elements

## 🎯 Future Enhancements

- User authentication and account management
- Real-time WebSocket integration for live odds updates
- Additional sports and betting markets
- Comprehensive bet history and performance tracking
- Simulated portfolio management and balance tracking
- Strategy analytics and performance metrics
- Social features to compare strategies with friends
- Mobile app development
- Advanced analytics and betting insights
- Leaderboards and achievements for simulated betting success


## 👤 Author

Developed as a portfolio project demonstrating modern web development practices, real-time data handling, and complex state management in React applications. NeuralBets provides a safe, educational platform for users to engage with sports betting culture without financial risk.

---

*Built with ❤️ using React, TypeScript, and Tailwind CSS*

