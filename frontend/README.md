# CivicTrust Frontend

Next.js-based frontend for the CivicTrust platform with CSPR.click wallet integration.

## Features

- Create and fund projects
- Submit milestone proofs
- Community voting interface
- Real-time project tracking
- CSPR.click wallet integration
- Responsive design with Tailwind CSS

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_CASPER_NETWORK=casper-test
NEXT_PUBLIC_CONTRACT_HASH=hash-...
NEXT_PUBLIC_RPC_URL=http://65.21.235.219:7777
```

## Wallet Integration

The app uses CSPR.click for wallet connectivity:

1. Install [CSPR.click browser extension](https://cspr.click)
2. Create or import a wallet
3. Switch to Casper Testnet
4. Get testnet CSPR from [faucet](https://testnet.cspr.live/tools/faucet)
5. Connect wallet in the app

## User Flows

### Donor Flow
1. Connect wallet
2. Click "Create Project"
3. Fill in project details and milestones
4. Send CSPR to fund the project
5. Funds locked in escrow

### NGO/Beneficiary Flow
1. Complete milestone work
2. Upload proof to IPFS
3. Submit proof hash on-chain
4. Wait for community voting
5. Receive funds after approval

### Community Verifier Flow
1. Browse active projects
2. Review submitted proofs
3. Vote Yes/No on milestone completion
4. Earn reputation NFTs for honest voting

## Components

- `Header.tsx` - Navigation and wallet connection
- `CreateProject.tsx` - Project creation form
- `ProjectList.tsx` - Display all projects
- `ProjectDetail.tsx` - Milestone management and voting

## Styling

Built with Tailwind CSS using Casper brand colors:
- Red: `#FF0011`
- Dark: `#1A1A1A`
- Gray: `#2D2D2D`

## Contract Integration

The frontend interacts with deployed Casper smart contracts:

```typescript
// Example contract call
const deploy = await casperClient.makeDeploy(
  deployParams,
  contractHash,
  'create_project',
  runtimeArgs
)
```

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t civictrust-frontend .
docker run -p 3000:3000 civictrust-frontend
```

## Testing

```bash
npm run lint
npm run type-check
```

## License

MIT
