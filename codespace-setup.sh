#!/bin/bash
# CivicTrust Codespaces Setup & Deployment Script

set -e

echo "🚀 CivicTrust Deployment Starting..."
echo ""

# Install Rust
echo "📦 Installing Rust..."
curl --proto='=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source $HOME/.cargo/env

# Add WASM target
echo "🎯 Adding WASM target..."
rustup target add wasm32-unknown-unknown

# Install Casper CLI
echo "⛓️  Installing Casper CLI..."
cargo install casper-client

# Build contracts
echo "🔨 Building contracts..."
cd contracts
cargo build --release --target wasm32-unknown-unknown

echo ""
echo "✅ Build Complete!"
echo ""
echo "WASM files created at:"
echo "  - target/wasm32-unknown-unknown/release/civictrust_escrow.wasm"
echo "  - target/wasm32-unknown-unknown/release/civictrust_reputation.wasm"
echo ""
echo "Next steps:"
echo "1. Generate deployment keys: cd .. && mkdir keys && cd keys && casper-client keygen ."
echo "2. Get testnet CSPR: https://testnet.cspr.live/tools/faucet"
echo "3. Deploy contracts (see DEPLOYMENT.md)"
echo ""
