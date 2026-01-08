# CivicTrust Deployment Guide

Complete guide to deploy CivicTrust on Casper Testnet for the hackathon.

## Prerequisites

### 1. Install Rust
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-unknown-unknown
```

### 2. Install Casper CLI
```bash
cargo install casper-client
```

### 3. Install Odra
```bash
cargo install odra-casper-livenet-env
```

### 4. Generate Keys
```bash
mkdir keys
cd keys
casper-client keygen .
cd ..
```

### 5. Get Testnet CSPR
Visit: https://testnet.cspr.live/tools/faucet
Enter your public key from `keys/public_key_hex`

## Smart Contract Deployment

### Step 1: Build Contracts
```bash
cd contracts
cargo odra build
cargo odra test
```

### Step 2: Deploy Escrow Contract
```bash
casper-client put-deploy \
  --node-address http://65.21.235.219:7777 \
  --chain-name casper-test \
  --secret-key ../keys/secret_key.pem \
  --payment-amount 150000000000 \
  --session-path target/wasm32-unknown-unknown/release/civictrust_escrow.wasm \
  --session-arg "min_votes:u32='3'"
```

Save the deploy hash from output.

### Step 3: Check Deploy Status
```bash
casper-client get-deploy \
  --node-address http://65.21.235.219:7777 \
  <DEPLOY_HASH>
```

Wait for execution success.

### Step 4: Get Contract Hash
```bash
casper-client query-global-state \
  --node-address http://65.21.235.219:7777 \
  --state-root-hash <STATE_ROOT_HASH> \
  --key <YOUR_ACCOUNT_HASH>
```

Look for the contract hash in named keys.

### Step 5: Deploy Reputation Contract
```bash
casper-client put-deploy \
  --node-address http://65.21.235.219:7777 \
  --chain-name casper-test \
  --secret-key ../keys/secret_key.pem \
  --payment-amount 100000000000 \
  --session-path target/wasm32-unknown-unknown/release/civictrust_reputation.wasm
```

## Frontend Deployment

### Step 1: Configure Environment
```bash
cd frontend
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_CASPER_NETWORK=casper-test
NEXT_PUBLIC_ESCROW_CONTRACT_HASH=hash-abc123...
NEXT_PUBLIC_REPUTATION_CONTRACT_HASH=hash-def456...
NEXT_PUBLIC_RPC_URL=http://65.21.235.219:7777
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Test Locally
```bash
npm run dev
```

Visit http://localhost:3000

### Step 4: Deploy to Vercel
```bash
npm install -g vercel
vercel login
vercel
```

Follow prompts and add environment variables in Vercel dashboard.

## Testing the Deployment

### 1. Create Test Project
```bash
casper-client put-deploy \
  --node-address http://65.21.235.219:7777 \
  --chain-name casper-test \
  --secret-key keys/secret_key.pem \
  --payment-amount 5000000000 \
  --session-hash <ESCROW_CONTRACT_HASH> \
  --session-entry-point "create_project" \
  --session-arg "name:string='Test School Project'" \
  --session-arg "beneficiary:key='account-hash-...'" \
  --session-arg "milestone_descriptions:vec_string='[\"Foundation\",\"Building\"]'" \
  --session-arg "milestone_percentages:vec_u8='[50,50]'" \
  --amount 10000000000000
```

### 2. Submit Proof
```bash
casper-client put-deploy \
  --node-address http://65.21.235.219:7777 \
  --chain-name casper-test \
  --secret-key keys/secret_key.pem \
  --payment-amount 2500000000 \
  --session-hash <ESCROW_CONTRACT_HASH> \
  --session-entry-point "submit_proof" \
  --session-arg "project_id:u64='1'" \
  --session-arg "proof_hash:string='QmTestHash123'"
```

### 3. Vote on Milestone
```bash
casper-client put-deploy \
  --node-address http://65.21.235.219:7777 \
  --chain-name casper-test \
  --secret-key keys/secret_key.pem \
  --payment-amount 2500000000 \
  --session-hash <ESCROW_CONTRACT_HASH> \
  --session-entry-point "vote" \
  --session-arg "project_id:u64='1'" \
  --session-arg "milestone_idx:u32='0'" \
  --session-arg "choice:string='Yes'"
```

### 4. Finalize Milestone
```bash
casper-client put-deploy \
  --node-address http://65.21.235.219:7777 \
  --chain-name casper-test \
  --secret-key keys/secret_key.pem \
  --payment-amount 2500000000 \
  --session-hash <ESCROW_CONTRACT_HASH> \
  --session-entry-point "finalize_milestone" \
  --session-arg "project_id:u64='1'"
```

## Verification

### Check on Explorer
Visit: https://testnet.cspr.live/deploy/<DEPLOY_HASH>

### Verify Contract State
```bash
casper-client query-global-state \
  --node-address http://65.21.235.219:7777 \
  --state-root-hash <STATE_ROOT_HASH> \
  --key <CONTRACT_HASH>
```

## Troubleshooting

### Deploy Failed
- Check account balance: Need sufficient CSPR for gas
- Verify payment amount: Increase if out of gas
- Check node availability: Try different RPC endpoint

### Contract Not Found
- Wait for deploy to finalize (30-60 seconds)
- Verify deploy hash is correct
- Check state root hash is latest

### Frontend Connection Issues
- Verify CSPR.click extension installed
- Check network is set to Testnet
- Confirm contract hashes in .env.local

## Post-Deployment Checklist

- [ ] Escrow contract deployed and verified
- [ ] Reputation contract deployed and verified
- [ ] Frontend deployed to Vercel
- [ ] Test project created successfully
- [ ] Proof submission working
- [ ] Voting mechanism functional
- [ ] Fund release confirmed
- [ ] Explorer links documented
- [ ] Demo video recorded
- [ ] GitHub repository updated

## Important Links

- Testnet Explorer: https://testnet.cspr.live
- Testnet Faucet: https://testnet.cspr.live/tools/faucet
- CSPR.click: https://cspr.click
- Casper Docs: https://docs.casper.network

## Support

For deployment issues:
- Casper Discord: https://discord.gg/casperblockchain
- Odra Docs: https://odra.dev/docs
- GitHub Issues: https://github.com/[your-repo]/issues
