'use client'

import { useState, useEffect } from 'react'
import Logo from './Logo'

export default function Header() {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = async () => {
    setIsConnecting(true)
    try {
      if (typeof window !== 'undefined' && (window as any).csprclick) {
        try {
          const accounts = await (window as any).csprclick.requestConnection()
          if (accounts && accounts.length > 0) {
            setAccount(accounts[0])
            localStorage.setItem('connectedAccount', accounts[0])
          }
        } catch (err) {
          console.error('Connection error:', err)
        }
      } else {
        alert('Please install CSPR.click wallet extension')
      }
    } catch (error) {
      console.error('Wallet connection failed:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    localStorage.removeItem('connectedAccount')
  }

  useEffect(() => {
    const savedAccount = localStorage.getItem('connectedAccount')
    if (savedAccount) {
      setAccount(savedAccount)
    }
  }, [])

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Logo className="w-10 h-10" />
            <div>
              <div className="text-xl font-bold tracking-tight">CivicTrust</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Blockchain Accountability</div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Network indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
              <span className="text-xs font-mono text-emerald-400">TESTNET</span>
            </div>

            {/* Wallet */}
            {account ? (
              <div className="flex items-center gap-2">
                <div className="px-4 py-2 bg-white/5 border border-white/10 font-mono text-sm">
                  {formatAddress(account)}
                </div>
                <button
                  onClick={disconnectWallet}
                  className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-500/20 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50"
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
