# CivicTrust System Flow Diagrams

Visual representations of how CivicTrust works.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER LAYER                               │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────┐          │
│  │  Donors  │    │   NGOs   │    │  Community       │          │
│  │          │    │          │    │  Verifiers       │          │
│  └────┬─────┘    └────┬─────┘    └────────┬─────────┘          │
└───────┼───────────────┼──────────────────┼────────────────────┘
        │               │                   │
        │               │                   │
┌───────▼───────────────▼───────────────────▼────────────────────┐
│                    FRONTEND LAYER                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Next.js Application                                     │  │
│  │  - Project Creation UI                                   │  │
│  │  - Proof Submission Interface                            │  │
│  │  - Voting Dashboard                                      │  │
│  │  - CSPR.click Wallet Integration                         │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ RPC Calls
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    BLOCKCHAIN LAYER                              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Casper Network (Testnet)                               │   │
│  │                                                          │   │
│  │  ┌──────────────────────┐  ┌──────────────────────┐    │   │
│  │  │ CivicTrustEscrow     │  │ ReputationNFT        │    │   │
│  │  │ - Projects           │  │ - Soulbound Tokens   │    │   │
│  │  │ - Milestones         │  │ - Reputation Scores  │    │   │
│  │  │ - Voting             │  │ - Trust Building     │    │   │
│  │  │ - Fund Release       │  │                      │    │   │
│  │  └──────────────────────┘  └──────────────────────┘    │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │ Casper Liquid Staking                            │  │   │
│  │  │ - Stake locked funds                             │  │   │
│  │  │ - Generate yield                                 │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              │ Proof Storage
                              │
┌─────────────────────────────▼───────────────────────────────────┐
│                    STORAGE LAYER                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  IPFS / Arweave                                          │  │
│  │  - Milestone proof documents                             │  │
│  │  - Images, videos, reports                               │  │
│  │  - Decentralized storage                                 │  │
│  │  (Only hashes stored on-chain)                           │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Complete User Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 1: PROJECT CREATION                     │
└─────────────────────────────────────────────────────────────────┘

    Donor                Frontend              Smart Contract
      │                     │                        │
      │  1. Connect Wallet  │                        │
      ├────────────────────>│                        │
      │                     │                        │
      │  2. Create Project  │                        │
      │     + Fund (CSPR)   │                        │
      ├────────────────────>│                        │
      │                     │  3. create_project()   │
      │                     ├───────────────────────>│
      │                     │                        │
      │                     │  4. Lock Funds         │
      │                     │     Store Project      │
      │                     │     Create Milestones  │
      │                     │<───────────────────────│
      │                     │                        │
      │  5. Confirmation    │  6. ProjectCreated     │
      │<────────────────────│     Event              │
      │                     │                        │

┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 2: PROOF SUBMISSION                     │
└─────────────────────────────────────────────────────────────────┘

    NGO                  Frontend         IPFS        Smart Contract
     │                      │              │                │
     │  1. Complete Work    │              │                │
     │  2. Upload Proof     │              │                │
     ├─────────────────────>│              │                │
     │                      │  3. Store    │                │
     │                      ├─────────────>│                │
     │                      │              │                │
     │                      │  4. Get Hash │                │
     │                      │<─────────────│                │
     │                      │                               │
     │                      │  5. submit_proof(hash)        │
     │                      ├──────────────────────────────>│
     │                      │                               │
     │                      │  6. Store Hash                │
     │                      │     Open Voting               │
     │                      │     Set Deadline              │
     │                      │<──────────────────────────────│
     │                      │                               │
     │  7. Confirmation     │  8. ProofSubmitted Event      │
     │<─────────────────────│                               │
     │                      │                               │

┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 3: COMMUNITY VOTING                     │
└─────────────────────────────────────────────────────────────────┘

  Verifier 1-N          Frontend         IPFS        Smart Contract
      │                    │               │                │
      │  1. View Project   │               │                │
      ├───────────────────>│               │                │
      │                    │               │                │
      │  2. Get Proof      │               │                │
      │                    ├──────────────>│                │
      │                    │               │                │
      │  3. Review Proof   │               │                │
      │<───────────────────┤<──────────────│                │
      │                    │                                │
      │  4. Cast Vote      │                                │
      │     (Yes/No)       │                                │
      ├───────────────────>│                                │
      │                    │  5. vote(choice)               │
      │                    ├───────────────────────────────>│
      │                    │                                │
      │                    │  6. Record Vote                │
      │                    │     Update Counts              │
      │                    │     Check Duplicate            │
      │                    │<───────────────────────────────│
      │                    │                                │
      │  7. Confirmation   │  8. VoteCast Event             │
      │<───────────────────│                                │
      │                    │                                │

┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 4: FUND RELEASE                         │
└─────────────────────────────────────────────────────────────────┘

   Anyone              Frontend         Smart Contract      NGO
     │                    │                    │             │
     │  1. Finalize       │                    │             │
     │     Milestone      │                    │             │
     ├───────────────────>│                    │             │
     │                    │  2. finalize_      │             │
     │                    │     milestone()    │             │
     │                    ├───────────────────>│             │
     │                    │                    │             │
     │                    │  3. Check Votes    │             │
     │                    │     Verify Passed  │             │
     │                    │     Calculate %    │             │
     │                    │                    │             │
     │                    │  4. Transfer CSPR  │             │
     │                    │     to Beneficiary │             │
     │                    │────────────────────┼────────────>│
     │                    │                    │             │
     │                    │  5. Update State   │             │
     │                    │     Mark Complete  │             │
     │                    │     Mint NFT       │             │
     │                    │<───────────────────│             │
     │                    │                    │             │
     │  6. Confirmation   │  7. Milestone      │             │
     │<───────────────────│     Completed      │             │
     │                    │     Event          │             │
     │                    │                    │             │
```

---

## State Machine Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    PROJECT LIFECYCLE                             │
└─────────────────────────────────────────────────────────────────┘

                    ┌──────────────┐
                    │   CREATED    │
                    │              │
                    │ - Funded     │
                    │ - Active     │
                    │ - Milestone 0│
                    └──────┬───────┘
                           │
                           │ NGO submits proof
                           │
                    ┌──────▼───────┐
                    │   VOTING     │
                    │              │
                    │ - Proof hash │
                    │ - Deadline   │
                    │ - Vote count │
                    └──────┬───────┘
                           │
                ┌──────────┴──────────┐
                │                     │
         Vote PASSES           Vote FAILS
                │                     │
         ┌──────▼───────┐      ┌─────▼──────┐
         │  APPROVED    │      │  REJECTED  │
         │              │      │            │
         │ - Release %  │      │ - Resubmit │
         │ - Mint NFT   │      │   or       │
         │              │      │ - Cancel   │
         └──────┬───────┘      └────────────┘
                │
                │ Funds released
                │
         ┌──────▼───────┐
         │  MILESTONE   │
         │  COMPLETED   │
         │              │
         │ - Funds sent │
         │ - NFT minted │
         └──────┬───────┘
                │
                │
         ┌──────┴───────┐
         │              │
    More milestones   All done
         │              │
         │         ┌────▼────┐
         │         │ PROJECT │
         │         │COMPLETE │
         │         │         │
         │         │ - 100%  │
         │         │   paid  │
         │         └─────────┘
         │
         └──> Back to CREATED (next milestone)
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    DATA FLOW                                     │
└─────────────────────────────────────────────────────────────────┘

┌──────────┐
│  Donor   │
└────┬─────┘
     │
     │ CSPR + Project Details
     │
     ▼
┌─────────────────────┐
│  Escrow Contract    │
│                     │
│  Stores:            │
│  - Project ID       │───────┐
│  - Donor address    │       │
│  - Beneficiary      │       │
│  - Total funds      │       │
│  - Milestones       │       │
│  - Current state    │       │
└─────────────────────┘       │
                              │
                              │
┌──────────┐                  │
│   NGO    │                  │
└────┬─────┘                  │
     │                        │
     │ Proof Documents        │
     │                        │
     ▼                        │
┌─────────────────────┐       │
│       IPFS          │       │
│                     │       │
│  Stores:            │       │
│  - Images           │       │
│  - Videos           │       │
│  - Reports          │       │
│                     │       │
│  Returns: Hash      │       │
└─────────┬───────────┘       │
          │                   │
          │ Hash              │
          │                   │
          ▼                   │
┌─────────────────────┐       │
│  Escrow Contract    │◄──────┘
│                     │
│  Updates:           │
│  - Proof hash       │
│  - Voting deadline  │
│  - Opens voting     │
└─────────┬───────────┘
          │
          │ Voting open
          │
          ▼
┌─────────────────────┐
│  Community          │
│  Verifiers          │
└─────────┬───────────┘
          │
          │ Votes (Yes/No)
          │
          ▼
┌─────────────────────┐
│  Escrow Contract    │
│                     │
│  Records:           │
│  - Vote choice      │
│  - Voter address    │
│  - Vote counts      │
└─────────┬───────────┘
          │
          │ Voting passes
          │
          ▼
┌─────────────────────┐
│  Escrow Contract    │
│                     │
│  Executes:          │
│  - Calculate %      │
│  - Transfer CSPR    │───────┐
│  - Update state     │       │
│  - Mint NFT         │───┐   │
└─────────────────────┘   │   │
                          │   │
                          │   │
                          │   ▼
                          │ ┌──────────┐
                          │ │   NGO    │
                          │ │ (Funds)  │
                          │ └──────────┘
                          │
                          ▼
                    ┌─────────────────┐
                    │ Reputation NFT  │
                    │   Contract      │
                    │                 │
                    │  Mints:         │
                    │  - Token ID     │
                    │  - Metadata     │
                    │  - Score +10    │
                    └─────────────────┘
```

---

## Security Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    SECURITY CHECKS                               │
└─────────────────────────────────────────────────────────────────┘

create_project()
    │
    ├─> Check: amount > 0
    ├─> Check: milestones sum to 100%
    ├─> Check: valid beneficiary address
    │
    └─> ✓ Lock funds in contract

submit_proof()
    │
    ├─> Check: caller == beneficiary
    ├─> Check: project is active
    ├─> Check: proof not already submitted
    ├─> Check: valid IPFS hash format
    │
    └─> ✓ Store proof hash

vote()
    │
    ├─> Check: proof exists
    ├─> Check: within voting deadline
    ├─> Check: voter hasn't voted before
    ├─> Check: valid vote choice
    │
    └─> ✓ Record vote

finalize_milestone()
    │
    ├─> Check: voting deadline passed
    ├─> Check: minimum votes met
    ├─> Check: majority voted yes
    ├─> Check: sufficient contract balance
    │
    └─> ✓ Release funds
```

---

## Event Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    EVENT EMISSION                                │
└─────────────────────────────────────────────────────────────────┘

Action                    Event                    Listeners
  │                         │                          │
  │ create_project()        │                          │
  ├────────────────────────>│ ProjectCreated           │
  │                         ├─────────────────────────>│ Frontend
  │                         │                          │ Analytics
  │                         │                          │ Notifications
  │                         │                          │
  │ submit_proof()          │                          │
  ├────────────────────────>│ ProofSubmitted           │
  │                         ├─────────────────────────>│ Frontend
  │                         │                          │ Verifiers
  │                         │                          │ Email alerts
  │                         │                          │
  │ vote()                  │                          │
  ├────────────────────────>│ VoteCast                 │
  │                         ├─────────────────────────>│ Frontend
  │                         │                          │ Vote tracker
  │                         │                          │ Analytics
  │                         │                          │
  │ finalize_milestone()    │                          │
  ├────────────────────────>│ MilestoneCompleted       │
  │                         ├─────────────────────────>│ Frontend
  │                         │                          │ NGO
  │                         │                          │ Donor
  │                         │                          │ Analytics
  │                         │                          │
  │ mint_reputation()       │                          │
  ├────────────────────────>│ ReputationMinted         │
  │                         ├─────────────────────────>│ Frontend
  │                         │                          │ Recipient
  │                         │                          │ Leaderboard
```

---

## Liquid Staking Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    LIQUID STAKING INTEGRATION                    │
└─────────────────────────────────────────────────────────────────┘

Donor funds project
        │
        ▼
┌─────────────────┐
│ Escrow Contract │
│                 │
│ 10,000 CSPR     │
│ locked          │
└────────┬────────┘
         │
         │ Automatically stake
         │
         ▼
┌─────────────────┐
│ Casper Staking  │
│                 │
│ 10,000 CSPR     │
│ staked          │
└────────┬────────┘
         │
         │ Generate yield
         │ (e.g., 5% APY)
         │
         ▼
┌─────────────────┐
│ Yield Generated │
│                 │
│ ~500 CSPR/year  │
└────────┬────────┘
         │
         │ Distribution options:
         │
    ┌────┴────┬────────┬────────┐
    │         │        │        │
    ▼         ▼        ▼        ▼
┌───────┐ ┌──────┐ ┌──────┐ ┌────────┐
│ Donor │ │ NGO  │ │ Pool │ │Platform│
│ Rebate│ │ Ops  │ │ Fund │ │  Fee   │
└───────┘ └──────┘ └──────┘ └────────┘

When milestone completes:
    │
    ▼
Unstake → Release principal + yield
```

---

**These diagrams provide a complete visual understanding of CivicTrust's operation.**
