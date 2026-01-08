# CivicTrust Design System

## Custom Logo & Icons

### Logo
The CivicTrust logo represents:
- **Shield**: Protection and security
- **Checkmark**: Verification and approval
- **Geometric center**: Blockchain/network connectivity
- **Gradient**: Modern, tech-forward aesthetic (Cyan to Blue)

### Logo Files
- `/frontend/public/logo.svg` - Full logo (40x40)
- `/frontend/public/favicon.svg` - Browser favicon (32x32)
- `/frontend/src/components/Logo.tsx` - React component

### Usage
```tsx
import Logo, { LogoIcon } from '@/components/Logo'

// Full logo
<Logo className="w-10 h-10" />

// Icon only (monochrome)
<LogoIcon className="w-6 h-6 text-cyan-500" />
```

## Icon Set

All icons are custom-designed with sharp edges and consistent stroke width.

### Available Icons
- `CheckIcon` - Verification, completion
- `UserIcon` - Beneficiary, account
- `ArrowRightIcon` - Navigation, next
- `WalletIcon` - Wallet connection
- `DocumentIcon` - Proof submission
- `VoteIcon` - Community voting
- `MoneyIcon` - Funding, CSPR
- `ChainIcon` - Blockchain, connection
- `SpinnerIcon` - Loading state

### Usage
```tsx
import { CheckIcon, UserIcon, MoneyIcon } from '@/components/Icons'

<CheckIcon className="w-6 h-6 text-emerald-500" />
<UserIcon className="w-4 h-4 text-gray-400" />
<MoneyIcon className="w-8 h-8 text-cyan-500" />
```

## Color Palette

### Primary Colors
- **Cyan**: `#0EA5E9` - Primary brand color
- **Blue**: `#06B6D4` - Secondary brand color
- **Black**: `#000000` - Background
- **White**: `#FFFFFF` - Text

### Status Colors
- **Success/Active**: `#10B981` (Emerald)
- **Warning**: `#F59E0B` (Amber)
- **Error**: `#EF4444` (Red)

### Gradients
```css
/* Primary gradient */
background: linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%);

/* Text gradient */
.text-gradient {
  background: linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## Typography

### Font Family
- **Primary**: Space Grotesk (Modern, geometric)
- **Mono**: JetBrains Mono (Technical data)

### Font Sizes
- **Hero**: 4rem (64px)
- **H1**: 3rem (48px)
- **H2**: 2rem (32px)
- **H3**: 1.5rem (24px)
- **Body**: 1rem (16px)
- **Small**: 0.875rem (14px)
- **Tiny**: 0.75rem (12px)

## Spacing

Using Tailwind's spacing scale:
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)

## Components

### Buttons
```tsx
// Primary button
<button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
  Connect Wallet
</button>

// Secondary button
<button className="px-6 py-2 bg-white/5 border border-white/10 text-white">
  View Projects
</button>
```

### Cards
```tsx
<div className="bg-white/5 border border-white/10 p-6 hover:border-cyan-500/50 transition-colors">
  {/* Content */}
</div>
```

### Badges
```tsx
<div className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase">
  ACTIVE
</div>
```

### Progress Bar
```tsx
<div className="progress-bar">
  <div className="progress-fill" style={{ width: '50%' }}></div>
</div>
```

## Layout

### Container
```tsx
<div className="max-w-7xl mx-auto px-6">
  {/* Content */}
</div>
```

### Grid
```tsx
<div className="grid md:grid-cols-2 gap-6">
  {/* Items */}
</div>
```

## Animations

### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.4s ease-out;
}
```

### Slide Up
```css
@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-slideUp {
  animation: slideUp 0.5s ease-out;
}
```

### Hover Effects
```css
.card-hover {
  transition: all 0.2s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
}
```

## Best Practices

### Do's ✅
- Use sharp edges (no border-radius except for circles)
- Maintain consistent spacing
- Use custom icons from the icon set
- Apply gradients to primary actions
- Use monospace fonts for technical data
- Keep animations subtle and fast

### Don'ts ❌
- Don't use rounded corners on cards/buttons
- Don't use emojis or generic SVG icons
- Don't use bright, saturated colors
- Don't use heavy animations
- Don't mix font families

## Accessibility

- All icons have proper `className` props for sizing
- Color contrast meets WCAG AA standards
- Interactive elements have hover states
- Loading states use `SpinnerIcon`
- Text remains readable at all sizes

## File Structure

```
frontend/
├── public/
│   ├── logo.svg          # Full logo
│   └── favicon.svg       # Browser icon
├── src/
│   └── components/
│       ├── Logo.tsx      # Logo components
│       └── Icons.tsx     # Icon set
```

---

**Design Philosophy**: Clean, sharp, professional. No fluff, no rounded corners, no AI-generated look. Pure modern fintech aesthetic.
