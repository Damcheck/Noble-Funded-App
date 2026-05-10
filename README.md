# Noble Funded App

A premium, production-ready React Native mobile application built for **Noble Funded**, Nigeria's #1 Prop Trading Firm. This application features a luxury "AI-theme" aesthetic with deep teal glassmorphism, 3D metallic UI components, and butter-smooth 60fps animations.

## 🌟 Key Features

### 1. Premium Visual Identity
- **Liquid Glassmorphism**: Utilizes highly customized `expo-blur` components mixed with complex `expo-linear-gradient` overlays to create realistic, refractive glass cards.
- **3D Metallic Aesthetics**: Interactive buttons and panels feature top-down highlight gradients and complex drop shadows to simulate physical depth and metallic textures.
- **Brand Consistency**: Deep teal and emerald color palettes (`#050f0d`, `#0e2a28`, `#00f0ff`) paired with custom typography to perfectly match the Noble Funded web dashboard.

### 2. Fluid Onboarding Experience
- Full-screen, edge-to-edge custom onboarding imagery.
- Custom `lucide-react-native` pagination icons with **React Native Reanimated** physics-based spring scaling and cross-fade transitions.
- Unobstructed view (no dark overlays at the bottom), allowing the custom design assets to shine natively.

### 3. Web-Parity Authentication
- Pixel-perfect replication of the Noble Funded web dashboard login and sign-up screens.
- **Double-Layered Cards**: Intricate `padding` and border management to create a distinct "card-within-a-card" neon aesthetic.
- Prominent glowing neon cyan (`#00f0ff`) action buttons.

### 4. Comprehensive Dashboard
- **Overview Tab**: Greets the user dynamically, displays a master portfolio glass card with total balance, and features Quick Action shortcuts.
- **Trading Accounts**: Detailed breakdown of funded accounts and challenges, including progress bars for profit targets and status badges.
- **Payouts**: Dedicated glass-styled payout history panels showing reference IDs, methods, and status.
- **Global Tab Navigation**: Professional bottom tab bar equipped with specific SVG `lucide-react` icons (PieChart, Wallet, Trophy, Users, User) instead of generic system defaults.

## 🛠 Tech Stack

- **Framework**: [Expo](https://expo.dev/) / React Native
- **Navigation**: Expo Router (File-based routing)
- **Styling**: Vanilla React Native StyleSheet with custom theme constants
- **Animations**: `react-native-reanimated`
- **Visual Effects**: `expo-blur`, `expo-linear-gradient`
- **State Management**: `zustand` (with mock data integration ready for API hookup)
- **Icons**: `lucide-react-native`

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Expo Go app on your physical iOS or Android device

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Damcheck/Noble-Funded-App.git
   ```
2. Navigate into the directory:
   ```bash
   cd Noble-Funded-App
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server (clearing the cache is recommended to load all custom assets properly):
   ```bash
   npx expo start -c
   ```

## 📂 Project Structure

- `/app` - Contains all screens and routing logic (Expo Router).
  - `/(auth)` - Login, Signup, and Forgot Password flows.
  - `/(tabs)` - The main authenticated dashboard experience.
  - `onboarding.tsx` - The fluid animated intro sequence.
- `/components/ui` - Reusable premium design system components (`GlassCard`, `InputField`, `Button`, `Badge`, `ProgressBar`).
- `/constants` - Theme tokens (Colors, Typography, Layout spacing) and application-wide mock data.
- `/store` - Zustand global state management setup.
- `/assets/images` - Custom local imagery, including full-screen backgrounds and the Noble Funded brand logo.

## 🔧 Future Integrations (Next Steps)
- Connect Zustand `appStore` directly to the Supabase backend.
- Replace `mockData` with live trading metric fetch requests.
- Hook up the `Sign in with Google` OAuth provider.
- Setup Expo Application Services (EAS) for automated TestFlight and Play Console builds.
