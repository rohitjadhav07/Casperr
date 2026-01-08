# CivicTrust Architecture

Comprehensive technical architecture for the CivicTrust platform.

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend Layer                       │
│  (Next.js + React + CSPR.click + Tailwind CSS)              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ RPC Calls
                     │
┌────────────────────▼────────────────────────────────────────┐
│                    Casper Network (Testnet)                  │
│                                                               │
│  ┌─────────────────────────┐  ┌──────────────────────────┐ │
│  │  CivicTrustEscrow       │  │  ReputationNFT           │ │
│  │  (Rust + Odra)          │  │  (Rust + Odra)           │ │
│  │                         │  │                          │ │
│  │  - Projects             │  │  - Token Minting         │ │
│  │  - Milestones           │  │  - Reputation Scores     │ │
│  │  - Voting               │  │  - Soulbound Logic       │ │
│  │  - Fund Release         │  │                          │ │
│  └─────────────────────────┘  └──────────────────────────┘ │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │         Casper Liquid Staking (Native)                  ││
│  │         - Stake locked funds                            ││
│  │         - Generate yield                                ││
│  └─────────────────────────────────────────────────────────┘│
└───────────────────────────────────────────────────────────────┘
                     │
                     │ Proof Storage
                     │
┌────────────────────▼────────────────────────────────────────┐
│                    IPFS / Arweave                            │
│  - Milestone proof documents                                 │
│  - Images, videos, reports                                   │
│  - Only hashes stored on-chain                               │
└──────────────────────────────────────────────────────────────┘
```

## Smart Contract Architecture

### CivicTrustEscrow Contract

**Purpose**: Core escrow and governance logic

**State Variables**:
```rust
projects: Mapping<u64, Project>
milestones: Mapping<(u64, u32), Milestone>
votes: Mapping<(u64, u32, Address), bool>
project_counter: Var<u64>
min_vote_threshold: Var<u32>
```

**Key Functions**:

1. `create_project()` [payable]
   - Accepts CSPR deposit
   - Creates project with milestones
   - Locks funds in contract
   - Emits ProjectCreated event

2. `submit_proof()`
   - Only callable by beneficiary
   - Stores IPFS hash
   - Opens voting period (7 days)
   - Emits ProofSubmitted event

3. `vote()`
   - One vote per address per milestone
   - Records Yes/No choice
   - Updates vote counts
   - Emits VoteCast event

4. `finalize_milestone()`
   - Checks voting threshold met
   - Verifies majority approval
   - Transfers funds to beneficiary
   - Updates project state
   - Emits MilestoneCompleted event

**Security Features**:
- Reentrancy protection via Odra
- Access control (only beneficiary submits proof)
- One vote per address enforcement
- Voting deadline validation
- Threshold requirements

### ReputationNFT Contract

**Purpose**: Soulbound NFT system for trust building

**State Variables**:
```rust
token_counter: Var<u64>
token_owner: Mapping<u64, Address>
owner_tokens: Mapping<Address, Vec<u64>>
token_metadata: Mapping<u64, ReputationMetadata>
reputation_scores: Mapping<Address, u32>
```

**Key Functions**:

1. `mint_reputation()`
   - Creates non-transferable NFT
   - Awards to NGOs, verifiers, donors
   - Increments reputation score
   - Emits ReputationMinted event

2. `get_reputation_score()`
   - Returns cumulative score
   - Used for weighted voting (future)

**NFT Types**:
- NGOCompletion: Awarded for milestone completion
- VerifierHonesty: Awarded for consistent voting
- DonorSupport: Awarded for funding projects

## Data Models

### Project
```rust
struct Project {
    id: u64,
    name: String,
    beneficiary: Address,
    donor: Address,
    total_funds: U512,
    released_funds: U512,
    current_milestone: u32,
    is_active: bool,
    created_at: u64,
}
```

### Milestone
```rust
struct Milestone {
    description: String,
    fund_percentage: u8,
    proof_hash: Option<String>,
    is_completed: bool,
    vote_count_yes: u32,
    vote_count_no: u32,
    voting_deadline: u64,
}
```

### ReputationMetadata
```rust
struct ReputationMetadata {
    token_id: u64,
    recipient: Address,
    reputation_type: ReputationType,
    project_id: u64,
    issued_at: u64,
}
```

## User Flows

### 1. Donor Creates Project

```
User → Frontend → CSPR.click Wallet → Casper Network
                                           ↓
                                    create_project()
                                           ↓
                                    Lock CSPR in escrow
                                           ↓
                                    Emit ProjectCreated
                                           ↓
                                    Frontend updates
```

### 2. NGO Submits Proof

```
NGO uploads proof → IPFS
                     ↓
                  Get hash
                     ↓
              submit_proof(hash)
                     ↓
              Open voting period
                     ↓
              Emit ProofSubmitted
```

### 3. Community Votes

```
Verifier reviews proof
         ↓
    Casts vote (Yes/No)
         ↓
    vote() on-chain
         ↓
    Update vote counts
         ↓
    Emit VoteCast
```

### 4. Milestone Finalized

```
Voting period ends
         ↓
    Check threshold met
         ↓
    Check majority Yes
         ↓
    Transfer funds to beneficiary
         ↓
    Mark milestone complete
         ↓
    Mint reputation NFT
         ↓
    Emit MilestoneCompleted
```

## Liquid Staking Integration

**Flow**:
1. Funds locked in escrow
2. Contract stakes CSPR using Casper native staking
3. Yield accumulates during milestone period
4. Yield distributed:
   - Option A: Reduce donor cost
   - Option B: Support NGO operations
   - Option C: Platform sustainability

**Benefits**:
- Funds work while locked
- Reduces effective cost of funding
- Qualifies for Liquid Staking Track

## Frontend Architecture

### Component Hierarchy

```
App
├── Header
│   └── WalletConnect
├── CreateProject
│   ├── ProjectForm
│   └── MilestoneBuilder
├── ProjectList
│   └── ProjectCard
└── ProjectDetail
    ├── MilestoneList
    ├── ProofSubmission
    ├── VotingInterface
    └── FinalizationButton
```

### State Management

**Local State** (useState):
- Form inputs
- UI toggles
- Loading states

**Contract State** (via RPC):
- Projects
- Milestones
- Vote counts
- Reputation scores

### Wallet Integration

**CSPR.click SDK**:
```typescript
// Connect
const accounts = await window.csprclick.requestConnection()

// Sign transaction
const signedDeploy = await window.csprclick.sign(deploy)

// Send deploy
const deployHash = await casperClient.putDeploy(signedDeploy)
```

## Event System

### Contract Events

1. **ProjectCreated**
   - project_id
   - donor
   - beneficiary
   - amount

2. **ProofSubmitted**
   - project_id
   - milestone_idx
   - proof_hash

3. **VoteCast**
   - project_id
   - milestone_idx
   - voter

4. **MilestoneCompleted**
   - project_id
   - milestone_idx
   - amount_released

5. **ReputationMinted**
   - token_id
   - recipient
   - project_id

### Frontend Event Handling

```typescript
// Listen for events
casperClient.nodeClient.getDeployInfo(deployHash)
  .then(deploy => {
    const events = parseEvents(deploy)
    updateUI(events)
  })
```

## Security Considerations

### Smart Contract Security

1. **Access Control**
   - Only beneficiary can submit proof
   - Only contract can mint reputation NFTs
   - Only after voting can funds be released

2. **Reentrancy Protection**
   - Odra framework handles this
   - State updates before external calls

3. **Integer Overflow**
   - Rust's type system prevents this
   - U512 for large amounts

4. **Voting Manipulation**
   - One vote per address
   - Voting deadline enforced
   - Minimum threshold required

### Frontend Security

1. **Wallet Security**
   - Never store private keys
   - All signing via CSPR.click
   - Verify transaction details

2. **Input Validation**
   - Sanitize all user inputs
   - Validate addresses
   - Check amount ranges

3. **RPC Security**
   - Use trusted RPC endpoints
   - Verify transaction receipts
   - Handle network errors

## Scalability

### Current Limitations
- Linear storage growth with projects
- Voting requires all participants to transact
- IPFS dependency for proofs

### Future Optimizations
1. **Merkle Trees** for efficient proof verification
2. **Batch Voting** to reduce gas costs
3. **Layer 2** for high-frequency operations
4. **Delegation** for voting power

## Gas Optimization

### Contract Level
- Minimal storage operations
- Efficient data structures (Mapping vs List)
- Optimized WASM compilation
- Event-driven architecture

### User Level
- Batch operations where possible
- Estimate gas before transactions
- Provide gas recommendations

## Testing Strategy

### Unit Tests
```bash
cargo test
```
- Test each function in isolation
- Mock dependencies
- Edge case coverage

### Integration Tests
```bash
cargo odra test
```
- Test contract interactions
- Full user flows
- Event emission verification

### Frontend Tests
```bash
npm test
```
- Component rendering
- User interactions
- Wallet integration

### Testnet Testing
- Deploy to Casper Testnet
- Real transaction testing
- Performance monitoring

## Monitoring & Analytics

### On-Chain Metrics
- Total projects created
- Total funds locked
- Total funds released
- Average voting participation
- Reputation NFTs minted

### Off-Chain Metrics
- Frontend usage
- Wallet connections
- Transaction success rate
- User retention

## Deployment Architecture

### Smart Contracts
- Deployed to Casper Testnet
- Immutable after deployment
- Upgradeable via proxy pattern (future)

### Frontend
- Deployed to Vercel
- CDN distribution
- Automatic HTTPS
- Environment-based configuration

### IPFS
- Pinata or Infura for pinning
- Redundant storage
- Content addressing

## Future Enhancements

### Phase 2
- Multi-signature approvals
- Weighted voting by reputation
- Milestone templates
- Project categories

### Phase 3
- Cross-chain bridges (Ethereum, Polygon)
- Mobile app (React Native)
- Real-world identity verification
- AI-powered proof verification

### Phase 4
- Government partnerships
- NGO onboarding program
- Grant funding integration
- Global expansion

## Technical Debt & Known Issues

1. **Mock Data**: Frontend uses mock data for demo
2. **Error Handling**: Needs more robust error messages
3. **Loading States**: Could be more granular
4. **Accessibility**: Needs ARIA labels and keyboard navigation
5. **Testing**: Needs comprehensive test coverage

## Performance Targets

- Contract deployment: < 2 minutes
- Transaction confirmation: < 60 seconds
- Frontend load time: < 2 seconds
- Voting period: 7 days (configurable)
- Gas costs: < 5 CSPR per operation

## Compliance & Legal

- Open source (MIT License)
- No personal data stored on-chain
- GDPR compliant (off-chain data)
- Audit-ready code structure
- Clear documentation

---

**This architecture is designed for hackathon success and real-world scalability.**
