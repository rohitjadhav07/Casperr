# CivicTrust - Frequently Asked Questions

---

## General Questions

### What is CivicTrust?

CivicTrust is a blockchain-based platform that ensures transparency and accountability in NGO and welfare funding. It uses smart contracts to lock funds and release them only after community-verified proof of milestone completion.

### Why does this matter?

Billions of dollars in welfare funds, NGO grants, and disaster relief are lost annually to corruption, middlemen, and fake beneficiaries. CivicTrust makes corruption impossible by requiring proof and community approval before any funds are released.

### Who can use CivicTrust?

- **NGOs** seeking transparent funding
- **Donors** wanting accountability
- **Governments** distributing welfare
- **Corporations** managing CSR programs
- **Disaster relief organizations**
- **DAOs** distributing grants

### Is this just for crypto projects?

No! While built on blockchain, CivicTrust is designed for real-world use cases like school construction, clean water projects, disaster relief, and government welfare programs.

---

## Technical Questions

### Why Casper Network?

Casper offers:
- **Enterprise-ready** blockchain suitable for government use
- **Low gas costs** for community voting
- **Liquid staking** for yield generation
- **Governance features** perfect for our use case
- **Rust smart contracts** for security and performance

### What programming languages are used?

- **Smart Contracts**: Rust (using Odra framework)
- **Frontend**: TypeScript with Next.js and React
- **Styling**: Tailwind CSS

### Is the code open source?

Yes! CivicTrust is fully open source under the MIT License. You can view, fork, and contribute to the code on GitHub.

### Has the code been audited?

The hackathon MVP has not been formally audited yet. A professional security audit is planned for Phase 1 (post-hackathon) before production deployment.

---

## How It Works

### How do I create a project?

1. Connect your CSPR.click wallet
2. Click "Create Project"
3. Fill in project details (name, beneficiary, amount)
4. Define milestones (description, percentage)
5. Send CSPR to fund the project
6. Funds are locked in the smart contract

### What are milestones?

Milestones are checkpoints in a project. Each milestone:
- Has a description (e.g., "Foundation Complete")
- Represents a percentage of total funds (e.g., 50%)
- Requires proof of completion
- Needs community approval
- Triggers automatic fund release when approved

### How does proof submission work?

1. NGO completes milestone work
2. NGO uploads proof documents (photos, videos, reports) to IPFS
3. NGO submits the IPFS hash on-chain
4. This opens a 7-day voting period
5. Community reviews and votes

### What kind of proof is acceptable?

Proof can include:
- Photos of completed work
- Video documentation
- Progress reports
- Third-party verification
- Receipts and invoices
- Beneficiary testimonials

The community decides if proof is sufficient.

### How does voting work?

1. Any wallet can vote (one vote per address)
2. Voters review the proof on IPFS
3. Voters cast Yes or No vote on-chain
4. Voting period lasts 7 days
5. Minimum threshold must be met (e.g., 3 votes)
6. Majority Yes votes = milestone approved

### What happens if voting fails?

If the vote fails (more No than Yes):
- Funds remain locked
- NGO can submit new/better proof
- Donor can cancel project and reclaim funds
- Community can discuss improvements

### How are funds released?

Automatically by the smart contract when:
1. Voting period ends
2. Minimum votes threshold met
3. Majority voted Yes

The contract calculates the percentage and transfers CSPR to the beneficiary address.

---

## Security & Trust

### How secure is CivicTrust?

- **Smart contracts** written in Rust (memory-safe language)
- **Odra framework** provides security patterns
- **Access control** ensures only authorized actions
- **One vote per address** prevents manipulation
- **Immutable records** on Casper blockchain

### Can funds be stolen?

No. Funds are locked in the smart contract and can only be released through the voting mechanism. No single party (including the contract deployer) can withdraw funds without community approval.

### What if the NGO submits fake proof?

The community voting mechanism is designed to catch this. If proof is fake or insufficient, verifiers vote No and funds remain locked.

### What prevents fake voters?

- Each address can only vote once per milestone
- Reputation NFTs track voting history
- Future versions will implement weighted voting based on reputation
- Sybil resistance through staking requirements (planned)

### What if someone hacks the website?

The website is just an interface. All critical operations happen on-chain. Even if the website is compromised, funds remain safe in the smart contract.

---

## Reputation NFTs

### What are Reputation NFTs?

Non-transferable (soulbound) NFTs that represent trust and participation in the CivicTrust ecosystem.

### How do I earn them?

- **NGOs**: Complete milestones successfully
- **Verifiers**: Vote honestly and consistently
- **Donors**: Fund multiple projects

### What are they used for?

- Build trust and credibility
- Unlock weighted voting (future)
- Access to premium features (future)
- Recognition in the community

### Can I sell or transfer them?

No. Reputation NFTs are soulbound (non-transferable) to prevent gaming the system.

---

## Liquid Staking

### What is liquid staking?

While funds are locked in escrow, they are automatically staked on Casper Network to generate yield.

### Who gets the yield?

This is configurable per project. Options include:
- **Donor rebate**: Reduces effective cost of funding
- **NGO operations**: Supports overhead costs
- **Community pool**: Funds platform development
- **Split**: Combination of above

### Is staking risky?

Casper's native staking is secure and battle-tested. Funds remain in the escrow contract and can be unstaked when needed for milestone releases.

---

## Costs & Fees

### How much does it cost to use CivicTrust?

**MVP (Hackathon)**:
- No platform fees
- Only pay Casper network gas fees

**Future**:
- Small platform fee (0.5-1%) for sustainability
- Gas fees remain (paid to Casper validators)

### What are gas fees?

Gas fees are paid to Casper Network validators for processing transactions. Typical costs:
- Create project: ~5 CSPR
- Submit proof: ~2.5 CSPR
- Vote: ~2.5 CSPR
- Finalize milestone: ~2.5 CSPR

### Can I get testnet CSPR for free?

Yes! Visit the [Casper Testnet Faucet](https://testnet.cspr.live/tools/faucet) to get free testnet CSPR for testing.

---

## Wallet & Setup

### What wallet do I need?

CSPR.click browser extension. Download from [cspr.click](https://cspr.click).

### How do I get CSPR?

**Testnet** (for testing):
- Use the [faucet](https://testnet.cspr.live/tools/faucet)

**Mainnet** (future):
- Buy on exchanges (Coinbase, Gate.io, etc.)
- Receive from another wallet

### Do I need to know blockchain to use this?

No! The interface is designed to be user-friendly. If you can use a website and browser extension, you can use CivicTrust.

---

## Roadmap & Future

### When will this be on mainnet?

After the hackathon, we plan:
- Security audit (Month 1-2)
- Pilot programs (Month 3-6)
- Mainnet deployment (Month 6-7)

### Will you support other blockchains?

Yes! Interoperability is planned:
- Accept donations from Ethereum, Polygon, etc.
- Settlement and governance remain on Casper
- Cross-chain bridges in Phase 3

### Will there be a mobile app?

Yes! Mobile app (iOS + Android) is planned for Phase 3 to enable field verification and easier access.

### Will there be a token?

Not necessarily. The platform works without a token. If a governance token becomes necessary for decentralization, it will be considered in Phase 4.

---

## For NGOs

### How do NGOs benefit?

- **Increased trust** from transparent operations
- **More funding** as donors gain confidence
- **Reputation building** through NFTs
- **Reduced overhead** from liquid staking yield
- **Global reach** through blockchain

### What if we don't have crypto experience?

We'll provide:
- Onboarding tutorials
- Step-by-step guides
- Support team
- Wallet setup assistance

### Can we use this for existing projects?

Yes! You can create projects for ongoing work, defining milestones for remaining phases.

### What if our project has many milestones?

The system supports multiple milestones. For very complex projects, you can group work into larger milestones (e.g., quarterly checkpoints).

---

## For Donors

### Why should I use CivicTrust instead of donating directly?

- **Transparency**: See exactly where your money goes
- **Accountability**: Funds released only with proof
- **Community oversight**: Not just trusting one organization
- **Yield generation**: Staked funds reduce your effective cost
- **Immutable records**: Permanent proof of your impact

### Can I cancel a project?

Yes, if:
- No milestones have been completed
- Voting repeatedly fails
- NGO is unresponsive

Cancellation returns remaining funds to the donor.

### Can I donate anonymously?

Your wallet address is public on the blockchain, but it's not directly linked to your real identity unless you choose to reveal it.

---

## For Verifiers

### Who can be a verifier?

Anyone with a Casper wallet can vote on milestones.

### Do I get paid for voting?

Currently, you earn Reputation NFTs. Future versions may include:
- Staking rewards
- Platform token rewards
- Priority access to features

### How do I know if proof is valid?

- Review documents on IPFS
- Check against milestone description
- Use your judgment
- Discuss with community
- Vote honestly

### What if I vote wrong?

Honest mistakes are okay. Reputation system tracks overall voting patterns, not individual votes. Consistently voting against consensus may affect reputation.

---

## Troubleshooting

### Transaction failed

Common causes:
- Insufficient CSPR for gas
- Wrong network (mainnet vs testnet)
- Wallet not connected
- Contract hash incorrect

### Can't connect wallet

- Ensure CSPR.click extension installed
- Check you're on correct network
- Try refreshing the page
- Clear browser cache

### Proof submission not working

- Verify you're the beneficiary
- Check proof not already submitted
- Ensure valid IPFS hash format
- Confirm sufficient gas

### Vote not counting

- Check you haven't already voted
- Verify voting period still active
- Ensure proof has been submitted
- Confirm sufficient gas

---

## Contributing

### How can I contribute?

- **Code**: Submit PRs on GitHub
- **Documentation**: Improve guides and docs
- **Testing**: Test on testnet and report bugs
- **Community**: Help others in Discord
- **Partnerships**: Connect us with NGOs/governments

### I found a bug

Please report it:
1. Check existing GitHub issues
2. Create new issue with details
3. Include steps to reproduce
4. Add screenshots if applicable

### I have a feature idea

Great! Please:
1. Check roadmap and existing issues
2. Create feature request on GitHub
3. Explain the problem it solves
4. Describe your proposed solution

---

## Contact & Support

### How do I get help?

- **GitHub Issues**: Technical problems
- **Discord**: Community support
- **Email**: [your-email]
- **Documentation**: Check guides first

### Where can I learn more?

- **README.md**: Project overview
- **ARCHITECTURE.md**: Technical details
- **QUICKSTART.md**: Setup guide
- **DEMO_SCRIPT.md**: How to demo

### How do I stay updated?

- Star the GitHub repo
- Join Discord community
- Follow on Twitter
- Subscribe to newsletter (coming soon)

---

## Hackathon Specific

### Why should I vote for CivicTrust?

- **Real-world impact**: Addresses $100B+ problem
- **Technical excellence**: Rust contracts, full testnet deployment
- **Casper-native**: Built specifically for Casper
- **Multi-track**: Qualifies for Main + Liquid Staking + Interoperability
- **Production-ready**: Not just a concept, fully functional

### What makes this different from other projects?

- **Focus**: Specifically for welfare/NGO accountability
- **Completeness**: Full stack implementation
- **Real-world**: Designed for actual adoption, not just demo
- **Impact**: Clear societal benefit
- **Innovation**: Novel combination of escrow + governance + reputation

---

**Have more questions? Open a GitHub Discussion or join our Discord!**
