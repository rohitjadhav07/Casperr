#!/bin/bash
# CivicTrust WSL Setup Script
# Run this in WSL after installation

set -e

echo "🚀 CivicTrust WSL Setup Starting..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Update system
echo -e "${BLUE}📦 Updating system packages...${NC}"
sudo apt update && sudo apt upgrade -y

# Install build essentials
echo -e "${BLUE}🔧 Installing build tools...${NC}"
sudo apt install -y build-essential pkg-config libssl-dev curl git

# Install Rust
echo -e "${BLUE}🦀 Installing Rust...${NC}"
if ! command -v rustc &> /dev/null; then
    curl --proto='=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source $HOME/.cargo/env
    echo 'source $HOME/.cargo/env' >> ~/.bashrc
else
    echo "Rust already installed"
fi

# Add WASM target
echo -e "${BLUE}🎯 Adding WASM target...${NC}"
rustup target add wasm32-unknown-unknown

# Install Casper CLI
echo -e "${BLUE}⛓️  Installing Casper CLI...${NC}"
if ! command -v casper-client &> /dev/null; then
    cargo install casper-client
else
    echo "Casper CLI already installed"
fi

# Verify installations
echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "Installed versions:"
rustc --version
cargo --version
casper-client --version

echo ""
echo -e "${GREEN}🎉 You're ready to deploy!${NC}"
echo ""
echo "Next steps:"
echo "1. cd /mnt/d/casper/contracts"
echo "2. cargo build --release --target wasm32-unknown-unknown"
echo "3. Follow DEPLOYMENT.md for deployment steps"
echo ""
