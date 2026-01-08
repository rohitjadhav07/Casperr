'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import CreateProject from '@/components/CreateProject'
import ProjectList from '@/components/ProjectList'
import ProjectDetail from '@/components/ProjectDetail'
import { MoneyIcon, DocumentIcon, VoteIcon, CheckIcon } from '@/components/Icons'

export default function Home() {
  const [activeView, setActiveView] = useState<'list' | 'create' | 'detail'>('list')
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)

  const handleProjectSelect = (projectId: number) => {
    setSelectedProjectId(projectId)
    setActiveView('detail')
  }

  return (
    <div className="min-h-screen bg-black relative">
      <Header />
      
      {/* Hero Section with Background */}
      <div className="relative pt-20">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16 animate-fadeIn">
            <div className="inline-block mb-4 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest">
              Blockchain-Powered Transparency
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              End Corruption in<br />
              <span className="text-gradient">NGO Funding</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Milestone-based escrow with community governance on Casper Network.<br />
              <span className="text-white font-medium">No proof. No vote. No funds.</span>
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-gradient mb-1">$100B+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Lost to Corruption</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-gradient mb-1">100%</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">On-Chain Transparency</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 text-center">
              <div className="text-3xl font-bold text-gradient mb-1">0</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Middlemen</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveView('list')}
              className={`px-8 py-3 text-sm font-medium uppercase tracking-wider transition-all ${
                activeView === 'list'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              View Projects
            </button>
            <button
              onClick={() => setActiveView('create')}
              className={`px-8 py-3 text-sm font-medium uppercase tracking-wider transition-all ${
                activeView === 'create'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              Create Project
            </button>
          </div>

          {/* Content Area */}
          <div className="animate-slideUp">
            {activeView === 'list' && (
              <ProjectList onProjectSelect={handleProjectSelect} />
            )}
            
            {activeView === 'create' && (
              <CreateProject onSuccess={() => setActiveView('list')} />
            )}
            
            {activeView === 'detail' && selectedProjectId && (
              <ProjectDetail 
                projectId={selectedProjectId} 
                onBack={() => setActiveView('list')} 
              />
            )}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Fund Project', desc: 'Donor locks CSPR in smart contract escrow', Icon: MoneyIcon },
            { step: '02', title: 'Complete Work', desc: 'NGO completes milestone and submits proof', Icon: DocumentIcon },
            { step: '03', title: 'Community Votes', desc: 'Decentralized voting verifies completion', Icon: VoteIcon },
            { step: '04', title: 'Auto Release', desc: 'Smart contract releases funds automatically', Icon: CheckIcon },
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-6 group hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="text-cyan-400 font-mono text-sm">{item.step}</div>
                <item.Icon className="w-6 h-6 text-cyan-500 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              © 2026 CivicTrust. Built on Casper Network.
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">Testnet Explorer</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
