# CivicTrust

**Decentralized Welfare & NGO Fund Accountability on Casper**

## 🎯 The Problem

Billions in welfare funds, NGO grants, and disaster relief are lost annually to corruption, middlemen, and fake beneficiaries. Current systems lack accountability, public auditability, and community oversight.

## 💡 The Solution

CivicTrust is a milestone-based, on-chain escrow and governance platform built on Casper Network that ensures:
- Funds are locked in transparent smart contracts
- Releases happen only after verifiable proof + community approval
- Every transaction and decision is immutable and auditable

**No proof, no vote, no funds.**

## 🏆 Hackathon Tracks

- ✅ **Main Track** - Core innovation in transparency & governance
- ✅ **Liquid Staking Track** - Locked funds generate yield while awaiting milestones
- ✅ **Interoperability Track** - Cross-chain donation acceptance (future)

## 🔑 Core Features

### 1. On-Chain Escrow Smart Contract
- Written in Rust using Odra framework
- Locks CSPR donations for specific projects
- Milestone-based fund release mechanism

### 2. Community Governance Voting
- Decentralized approval for milestone completion
- One wallet = one vote (MVP)
- On-chain voting results trigger fund release

### 3. Reputation NFTs (Soulbound)
- Non-transferable NFTs for NGOs and verifiers
- Builds long-term trust and prevents fraud
- CEP-78 standard implementation

### 4. Liquid Staking Integration
- Locked funds automatically staked
- Generated yield reduces donor costs or supports operations
- Casper-native staking integration

## 🛠 Tech Stack

- **Blockchain**: Casper Network (Testnet)
- **Smart Contracts**: Rust + Odra Framework + WASM
- **NFTs**: CEP-78 Standard
- **Frontend**: React + Next.js
- **Wallet**: CSPR.click integration
- **Storage**: IPFS (hashes on-chain)

## 🚀 Quick Start

### Prerequisites
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Casper CLI
cargo install casper-client

# Install Odra
cargo install odra-casper-livenet-env
```

### Deploy Smart Contract
```bash
cd contracts
cargo odra build
cargo odra test
# Deploy to testnet (instructions in contracts/README.md)
```

### Run Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📋 MVP Demo Flow

1. **Donor** creates and funds a project (e.g., "School Building - $10,000")
2. **Funds locked** in escrow contract with 2 milestones
3. **NGO** completes Milestone 1, submits proof (IPFS hash)
4. **Community** votes on proof validity
5. **Smart contract** automatically releases 50% of funds
6. Process repeats for Milestone 2

## 🎬 Live Demo

- **Testnet Contract**: [View on Explorer](https://testnet.cspr.live)
- **Frontend**: [Live Demo](https://civictrust.vercel.app)
- **Video**: [2-min Demo](https://youtube.com/...)

## 🏗 Architecture

```
┌─────────────┐
│   Donors    │
└──────┬──────┘
       │ Fund Project
       ▼
┌─────────────────────┐
│  Escrow Contract    │
│  (Rust + Odra)      │
│  - Lock funds       │
│  - Track milestones │
│  - Liquid staking   │
└──────┬──────────────┘
       │
       ├─► Milestone 1 ──► Proof ──► Vote ──► Release 50%
       └─► Milestone 2 ──► Proof ──► Vote ──► Release 50%
```

## 🌟 Why CivicTrust Wins

1. **High Impact**: Addresses global corruption in welfare/NGO funding
2. **Casper-Native**: Built specifically for Casper's strengths
3. **On-Chain Activity**: Real transactions, voting, and governance
4. **Community Appeal**: Easy to understand, emotionally compelling
5. **Multi-Track**: Qualifies for Main + Liquid Staking + Interoperability

## 🗺 Roadmap

### Post-Hackathon
- Multi-signature approvals for large projects
- Integration with real-world identity verification
- Mobile app for field verification
- Partnership with UN agencies and major NGOs
- Cross-chain bridge for Ethereum/Polygon donations

### Grant Applications
- Casper Association Grant
- UNICEF Innovation Fund
- Government pilot programs

## 👥 Team

Built for Casper Hackathon 2026

## 📄 License

MIT

## 🔗 Resources

- [Casper Docs](https://docs.casper.network)
- [Odra Framework](https://odra.dev/docs)
- [CSPR.click SDK](https://docs.cspr.click)
- [Testnet Explorer](https://testnet.cspr.live)

---

**Built with ❤️ on Casper Network**
