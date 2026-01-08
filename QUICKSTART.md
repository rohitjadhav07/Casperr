# CivicTrust Quick Start Guide

Get CivicTrust running in 15 minutes.

---

## Prerequisites

- Rust installed
- Node.js 18+ installed
- Git installed
- Casper CLI installed
- CSPR.click wallet extension

---

## Step 1: Clone Repository

```bash
git clone https://github.com/[your-username]/civictrust.git
cd civictrust
```

---

## Step 2: Smart Contracts

### Install Odra
```bash
cargo install odra-casper-livenet-env
```

### Build Contracts
```bash
cd contracts
cargo odra build
```

### Run Tests
```bash
cargo odra test
```

### Generate Keys
```bash
mkdir ../keys
cd ../keys
casper-client keygen .
cd ..
```

### Get Testnet CSPR
1. Visit https://testnet.cspr.live/tools/faucet
2. Paste your public key from `keys/public_key_hex`
3. Request tokens

### Deploy to Testnet
```bash
cd contracts

# Deploy Escrow Contract
casper-client put-deploy \
  --node-address http://65.21.235.219:7777 \
  --chain-name casper-test \
  --secret-key ../keys/secret_key.pem \
  --payment-amount 150000000000 \
  --session-path target/wasm32-unknown-unknown/release/civictrust_escrow.wasm \
  --session-arg "min_votes:u32='3'"

# Save the deploy hash
# Wait 60 seconds for confirmation

# Check deploy status
casper-client get-deploy \
  --node-address http://65.21.235.219:7777 \
  [DEPLOY_HASH]

# Get contract hash from output
```

---

## Step 3: Frontend

### Install Dependencies
```bash
cd ../frontend
npm install
```

### Configure Environment
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_CASPER_NETWORK=casper-test
NEXT_PUBLIC_ESCROW_CONTRACT_HASH=[YOUR_CONTRACT_HASH]
NEXT_PUBLIC_RPC_URL=http://65.21.235.219:7777
NEXT_PUBLIC_EXPLORER_URL=https://testnet.cspr.live
```

### Run Development Server
```bash
npm run dev
```

Open http://localhost:3000

---

## Step 4: Test the Flow

### 1. Connect Wallet
- Click "Connect Wallet"
- Approve in CSPR.click extension
- Ensure you're on Casper Testnet

### 2. Create Project
- Click "Create Project"
- Fill in details:
  - Name: "Test School Project"
  - Beneficiary: [another test address]
  - Amount: 1000 CSPR
  - Milestone 1: "Foundation" - 50%
  - Milestone 2: "Building" - 50%
- Click "Create & Fund Project"
- Approve transaction in wallet
- Wait for confirmation

### 3. Submit Proof
- Switch to beneficiary account
- Navigate to project
- Enter IPFS hash: `QmTestHash123`
- Click "Submit Proof"
- Approve transaction

### 4. Vote
- Switch to voter accounts (need 3)
- Navigate to project
- Click "Vote Yes"
- Approve transaction
- Repeat with 2 more accounts

### 5. Finalize
- Click "Finalize Milestone"
- Approve transaction
- Funds released automatically!

---

## Troubleshooting

### Contract Deployment Fails
```bash
# Check balance
casper-client get-balance \
  --node-address http://65.21.235.219:7777 \
  --state-root-hash [LATEST_STATE_ROOT_HASH] \
  --purse-uref [YOUR_PURSE_UREF]

# If low, get more from faucet
```

### Frontend Won't Connect
- Ensure CSPR.click extension installed
- Check network is set to Testnet
- Verify contract hash in .env.local
- Clear browser cache

### Transaction Fails
- Check gas amount sufficient
- Verify account has CSPR
- Ensure correct network
- Check contract hash correct

---

## Verify Deployment

### Check Contract on Explorer
```
https://testnet.cspr.live/contract/[YOUR_CONTRACT_HASH]
```

### Check Transactions
```
https://testnet.cspr.live/deploy/[DEPLOY_HASH]
```

---

## Next Steps

1. **Read Documentation**
   - `ARCHITECTURE.md` for technical details
   - `DEPLOYMENT.md` for production deployment
   - `DEMO_SCRIPT.md` for demo preparation

2. **Customize**
   - Modify frontend styling
   - Add features
   - Improve UX

3. **Deploy to Production**
   - Follow `DEPLOYMENT.md`
   - Deploy frontend to Vercel
   - Set up monitoring

4. **Contribute**
   - Report issues
   - Submit PRs
   - Improve documentation

---

## Common Commands

### Contracts
```bash
# Build
cargo odra build

# Test
cargo odra test

# Deploy
casper-client put-deploy [options]

# Check deploy
casper-client get-deploy --node-address [NODE] [HASH]
```

### Frontend
```bash
# Install
npm install

# Dev server
npm run dev

# Build
npm run build

# Production
npm start

# Lint
npm run lint
```

---

## Resources

- **Casper Docs**: https://docs.casper.network
- **Odra Docs**: https://odra.dev/docs
- **CSPR.click**: https://docs.cspr.click
- **Testnet Explorer**: https://testnet.cspr.live
- **Testnet Faucet**: https://testnet.cspr.live/tools/faucet

---

## Support

- **GitHub Issues**: [Repository URL]/issues
- **Discord**: [Your Discord]
- **Email**: [Your Email]

---

## Success Checklist

- [ ] Contracts built successfully
- [ ] Tests passing
- [ ] Deployed to testnet
- [ ] Contract hash obtained
- [ ] Frontend running locally
- [ ] Wallet connected
- [ ] Test project created
- [ ] Proof submitted
- [ ] Voting completed
- [ ] Funds released
- [ ] Verified on explorer

---

**Congratulations! You're now running CivicTrust locally.**

Next: Record a demo video and prepare your pitch!
