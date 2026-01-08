# CivicTrust Smart Contracts

Rust-based smart contracts for the CivicTrust platform, built with Odra framework for Casper Network.

## Contracts

### 1. CivicTrustEscrow
Main escrow contract handling:
- Project creation and funding
- Milestone-based fund locking
- Community voting on milestone completion
- Automatic fund release upon approval

### 2. ReputationNFT
Soulbound NFT system for:
- NGO completion badges
- Verifier honesty rewards
- Donor support recognition

## Build & Test

```bash
# Install dependencies
cargo install odra-casper-livenet-env

# Build contracts
cargo odra build

# Run tests
cargo odra test

# Generate WASM
cargo build --release --target wasm32-unknown-unknown
```

## Deploy to Testnet

### Prerequisites
1. Get testnet CSPR from faucet: https://testnet.cspr.live/tools/faucet
2. Create account keys:
```bash
casper-client keygen keys/
```

### Deploy Escrow Contract
```bash
casper-client put-deploy \
  --node-address http://65.21.235.219:7777 \
  --chain-name casper-test \
  --secret-key keys/secret_key.pem \
  --payment-amount 100000000000 \
  --session-path target/wasm32-unknown-unknown/release/civictrust_escrow.wasm \
  --session-arg "min_votes:u32='3'"
```

### Deploy Reputation Contract
```bash
casper-client put-deploy \
  --node-address http://65.21.235.219:7777 \
  --chain-name casper-test \
  --secret-key keys/secret_key.pem \
  --payment-amount 100000000000 \
  --session-path target/wasm32-unknown-unknown/release/civictrust_reputation.wasm
```

## Contract Interaction

### Create Project
```bash
casper-client put-deploy \
  --node-address http://65.21.235.219:7777 \
  --chain-name casper-test \
  --secret-key keys/secret_key.pem \
  --payment-amount 5000000000 \
  --session-hash <CONTRACT_HASH> \
  --session-entry-point "create_project" \
  --session-arg "name:string='School Building Project'" \
  --session-arg "beneficiary:key='account-hash-...'" \
  --session-arg "milestone_descriptions:vec_string='[\"Foundation Complete\",\"Building Complete\"]'" \
  --session-arg "milestone_percentages:vec_u8='[50,50]'" \
  --amount 10000000000000
```

### Submit Proof
```bash
casper-client put-deploy \
  --node-address http://65.21.235.219:7777 \
  --chain-name casper-test \
  --secret-key keys/secret_key.pem \
  --payment-amount 2500000000 \
  --session-hash <CONTRACT_HASH> \
  --session-entry-point "submit_proof" \
  --session-arg "project_id:u64='1'" \
  --session-arg "proof_hash:string='QmX...ipfs-hash'"
```

### Vote on Milestone
```bash
casper-client put-deploy \
  --node-address http://65.21.235.219:7777 \
  --chain-name casper-test \
  --secret-key keys/secret_key.pem \
  --payment-amount 2500000000 \
  --session-hash <CONTRACT_HASH> \
  --session-entry-point "vote" \
  --session-arg "project_id:u64='1'" \
  --session-arg "milestone_idx:u32='0'" \
  --session-arg "choice:string='Yes'"
```

### Finalize Milestone
```bash
casper-client put-deploy \
  --node-address http://65.21.235.219:7777 \
  --chain-name casper-test \
  --secret-key keys/secret_key.pem \
  --payment-amount 2500000000 \
  --session-hash <CONTRACT_HASH> \
  --session-entry-point "finalize_milestone" \
  --session-arg "project_id:u64='1'"
```

## Testing

```bash
# Run unit tests
cargo test

# Run integration tests
cargo odra test
```

## Contract Architecture

```
CivicTrustEscrow
├── Projects (Mapping<u64, Project>)
├── Milestones (Mapping<(u64, u32), Milestone>)
├── Votes (Mapping<(u64, u32, Address), bool>)
└── Methods
    ├── create_project() [payable]
    ├── submit_proof()
    ├── vote()
    ├── finalize_milestone()
    └── get_project() [view]

ReputationNFT
├── Tokens (Mapping<u64, Address>)
├── Metadata (Mapping<u64, ReputationMetadata>)
├── Scores (Mapping<Address, u32>)
└── Methods
    ├── mint_reputation()
    ├── get_reputation_score() [view]
    └── get_tokens() [view]
```

## Events

- `ProjectCreated` - Emitted when new project is funded
- `ProofSubmitted` - Emitted when NGO submits milestone proof
- `VoteCast` - Emitted when community member votes
- `MilestoneCompleted` - Emitted when funds are released
- `ReputationMinted` - Emitted when NFT is awarded

## Security Considerations

- Only beneficiary can submit proof
- One vote per address per milestone
- Funds locked until voting threshold met
- Voting deadline enforced (7 days)
- Reputation NFTs are non-transferable (soulbound)

## Gas Optimization

- Minimal storage operations
- Efficient mapping structures
- Optimized WASM compilation flags
- Event-driven architecture

## License

MIT
