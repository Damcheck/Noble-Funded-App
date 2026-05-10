# 🏆 Noble Funded — Premium Mobile App

> **Nigeria's #1 Prop Trading Firm** — Production-grade React Native mobile application featuring luxury glassmorphism, 3D metallic UI components, and a butter-smooth 60fps experience.

---

## 📱 App Preview

| Onboarding | Sign In | Dashboard | Accounts |
|---|---|---|---|
| Full-screen hero images | Double-layer glass card | Portfolio overview | Trading progress |

---

## ✨ Features Overview

### 🎨 Premium Visual Design
- **Liquid Glassmorphism** — Layered `expo-blur` + `expo-linear-gradient` overlays create realistic refractive glass panels that glow and shimmer.
- **3D Metallic UI** — All interactive elements feature top-down highlight gradients and multi-layered drop shadows, simulating physical depth and premium metallic textures.
- **Neon Cyan Accent** — Signature `#00f0ff` to `#00d4d4` gradient used on all primary action buttons with a large glowing halo effect.
- **Deep Teal Palette** — `#050f0d`, `#0b1c1a`, `#0e2a28` backgrounds with teal borders (`rgba(26,92,99,0.8)`) that feel futuristic yet premium.
- **Double-Layer Cards** — Authentication screens feature a visible gap between an outer wrapper border and an inner card border, exactly matching the Noble Funded web dashboard design.

### 🚀 Onboarding Flow
- **4 Full-Screen Hero Screens** — Custom-designed background images (`page1.png` → `page4.png`) that fill every pixel of the screen.
- **Reanimated Pagination Icons** — `react-native-reanimated` physics-based spring animations drive icon scaling and fade transitions at 60fps. Icons: Shield, Activity, Wallet, Diamond.
- **Gesture-based Navigation** — Users can swipe between slides or tap paginator icons directly. The FlatList handles native scroll physics.
- **Smart CTA Buttons** — "Next Step" button transforms to "Start Trading" on the final slide, routing users directly to sign in.

### 🔐 Authentication
- **Sign In Screen** — Pixel-perfect replica of the Noble Funded web dashboard login. Features the brand logo, a "Sign in with Google" button, custom email/password inputs, "Forgot password?" link, and a glowing neon cyan sign-in button.
- **Sign Up Screen** — Full registration form with Full Name, Country, Email, and Password fields. Includes a Terms of Service checkbox with custom styling.
- **Forgot Password Screen** — Clean email recovery flow.
- **Consistent Brand Identity** — Both screens use the same double-layer card, deep teal background, and sparkle (✦) icon in the corner.

### 📊 Trader Dashboard (Post-Login)
- **Overview Tab (`PieChart` icon)**
  - Dynamic time-based greeting: "Good morning / afternoon / evening, Olatunbosun"
  - Master portfolio glass card showing total balance across all accounts
  - At-a-glance stats: Total Accounts, Total Paid Out, Active Profit %
  - Quick Actions grid: Accounts, Payouts, Rankings, Buy Plan
  - Active Accounts preview list with progress bars
  - Pending Payouts section

- **Accounts Tab (`Wallet` icon)**
  - Full list of all trading accounts (funded, challenge phase 1/2, failed)
  - Account number, platform, leverage, currency badge, status badge
  - Balance display with profit target progress bar
  - Color-coded danger state for failed accounts

- **Rankings Tab (`Trophy` icon)**
  - Live leaderboard with rank numbers
  - Trader names, countries, account sizes, profit percentages
  - Special gold/blue badges for Top Traders and Rising Stars

- **Affiliate Tab (`Users` icon)**
  - Referral code display and sharing
  - Total referrals, pending referrals, total earnings cards
  - Individual referral list with commission breakdown per referral

- **Profile Tab (`User` icon)**
  - User avatar with name and email
  - KYC verification status badge
  - Account settings navigation: KYC, Security, Notifications, Support, FAQ, Terms
  - Professional logout button

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Expo** | ~52.x | Build & runtime |
| **React Native** | 0.76.x | Core framework |
| **Expo Router** | ~4.x | File-based navigation |
| **React Native Reanimated** | ~3.x | 60fps spring animations |
| **expo-blur** | ~14.x | Glassmorphism blur effects |
| **expo-linear-gradient** | ~14.x | Gradient backgrounds & buttons |
| **lucide-react-native** | ^0.475 | Professional SVG icons |
| **zustand** | ^5.x | Global state management |
| **TypeScript** | ~5.3 | Type safety throughout |

---

## 📂 Project Structure

```
noble-funded-app/
│
├── app/                          # All screens (Expo Router)
│   ├── (auth)/                   # Auth group (no tab bar)
│   │   ├── _layout.tsx           # Auth stack layout
│   │   ├── login.tsx             # 🔐 Sign In screen
│   │   ├── signup.tsx            # 🔐 Sign Up screen
│   │   └── forgot-password.tsx   # 🔐 Password reset
│   │
│   ├── (tabs)/                   # Main app tab group
│   │   ├── _layout.tsx           # Tab bar layout & icons
│   │   ├── index.tsx             # 📊 Overview/Dashboard
│   │   ├── accounts.tsx          # 💼 Trading Accounts
│   │   ├── leaderboard.tsx       # 🏆 Rankings
│   │   ├── affiliate.tsx         # 👥 Affiliate Program
│   │   └── profile.tsx           # 👤 User Profile
│   │
│   ├── onboarding.tsx            # 🎬 Animated onboarding
│   ├── account-detail.tsx        # Account deep-dive
│   ├── checkout.tsx              # Buy a challenge plan
│   ├── payouts.tsx               # Payout history
│   ├── statistics.tsx            # Trading statistics
│   ├── kyc.tsx                   # KYC verification
│   ├── security.tsx              # Security settings
│   ├── notifications.tsx         # Notification centre
│   ├── support.tsx               # Customer support
│   ├── certificates.tsx          # Trading certificates
│   ├── faq.tsx                   # FAQ page
│   ├── rules.tsx                 # Trading rules
│   └── terms.tsx                 # Terms of service
│
├── components/
│   └── ui/                       # Design system components
│       ├── GlassCard.tsx         # 🪟 Reusable glass panel
│       ├── Button.tsx            # 🎛 Premium metallic button
│       ├── InputField.tsx        # ✏️ Styled form input
│       ├── Badge.tsx             # 🏷 Status badges
│       └── ProgressBar.tsx       # 📈 Animated progress bar
│
├── constants/
│   ├── theme.ts                  # Colors, Typography, Radius, Spacing
│   └── data.ts                   # Mock data & TypeScript interfaces
│
├── store/
│   └── appStore.ts               # Zustand global store
│
└── assets/
    └── images/
        ├── logo.png              # Noble Funded brand logo
        ├── page1.png             # Onboarding slide 1
        ├── page2.png             # Onboarding slide 2
        ├── page3.png             # Onboarding slide 3
        └── page4.png             # Onboarding slide 4
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher — [nodejs.org](https://nodejs.org)
- **npm** v9+ (comes with Node.js)
- **Expo Go** app on your physical phone — [iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Installation & Running

```bash
# 1. Clone the repo
git clone https://github.com/Damcheck/Noble-Funded-App.git

# 2. Move into the directory
cd Noble-Funded-App

# 3. Install all dependencies
npm install

# 4. Start development server (ALWAYS use -c to clear cache)
npx expo start -c
```

### Testing on Your Phone

1. Open **Expo Go** on your phone
2. Scan the **QR code** shown in the terminal
3. The app will load directly on your device

> ⚠️ **Important**: Always run `npx expo start -c` (not just `npx expo start`) after making changes to image assets, to ensure the Metro bundler picks up the new files correctly.

---

## 🎨 Design System

### Color Palette

```ts
Colors = {
  primary:       '#5eead4',   // Teal accent (active states)
  primaryDark:   '#0d9488',   // Deeper teal (gradients)
  neonCyan:      '#00f0ff',   // Button glow
  darkBg:        '#060f0e',   // App background
  cardBg:        '#0a1a18',   // Card backgrounds
  textPrimary:   '#f0fafb',   // Main text
  textSecondary: '#94a3ac',   // Subtitle text
  textMuted:     '#4a6b6f',   // Muted labels
  profit:        '#34d399',   // Profit green
  loss:          '#f87171',   // Loss red
}
```

### Typography Scale

```ts
Typography = {
  xs:       10,  // Tiny labels
  sm:       12,  // Captions
  base:     14,  // Body text
  lg:       16,  // Emphasized body
  xl:       18,  // Card titles
  '2xl':    22,  // Section headings
  '3xl':    28,  // Hero numbers
  '4xl':    34,  // Large display
}
```

---

## 🔧 Roadmap & Next Steps

### Backend Integration
- [ ] Replace `mockUser` in `constants/data.ts` with live Supabase auth
- [ ] Connect trading accounts data to MetaTrader 5 API
- [ ] Wire up payout requests to a real payment processing endpoint (Paystack / Flutterwave)
- [ ] Implement real referral tracking in the Affiliate module

### Authentication
- [ ] Connect "Sign in with Google" OAuth button to Expo Auth Session
- [ ] Implement real email/password auth via Supabase
- [ ] Add biometric login (Face ID / Fingerprint) using `expo-local-authentication`

### App Store Deployment
- [ ] Set up **Expo Application Services (EAS)** for automated builds
- [ ] Configure `eas.json` for staging and production environments
- [ ] Submit to **Apple App Store** via TestFlight
- [ ] Submit to **Google Play Console** via internal testing track

### Feature Additions
- [ ] Push notifications for payout approvals and account status changes
- [ ] In-app trading statistics charts using `react-native-gifted-charts`
- [ ] Dark/Light theme toggle
- [ ] Multi-language support (English + Yoruba + Igbo + Hausa)

---

## 👤 Author

**Olatunbosun Damola**
- GitHub: [@Damcheck](https://github.com/Damcheck)
- Platform: [Noble Funded](https://noblefunded.com)

---

## 📄 License

This project is proprietary and confidential. All rights reserved by **Noble Funded**. Unauthorized copying, distribution, or use of this code is strictly prohibited.

---

<div align="center">
  <strong>Built with ❤️ for Nigerian prop traders</strong><br/>
  <em>Noble Funded — Fund Your Ambition</em>
</div>
