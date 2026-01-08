'use client'

import { useState, useEffect } from 'react'

interface Milestone {
  description: string
  fundPercentage: number
  proofHash: string | null
  isCompleted: boolean
  voteCountYes: number
  voteCountNo: number
  votingDeadline: number
}

interface ProjectDetailProps {
  projectId: number
  onBack: () => void
}

export default function ProjectDetail({ projectId, onBack }: ProjectDetailProps) {
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [proofHash, setProofHash] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    loadMilestones()
  }, [projectId])

  const loadMilestones = async () => {
    // Mock data
    const mockMilestones: Milestone[] = [
      {
        description: 'Foundation Complete',
        fundPercentage: 50,
        proofHash: 'QmX1234...abcd',
        isCompleted: true,
        voteCountYes: 5,
        voteCountNo: 1,
        votingDeadline: Date.now() - 1000000,
      },
      {
        description: 'Building Complete',
        fundPercentage: 50,
        proofHash: null,
        isCompleted: false,
        voteCountYes: 0,
        voteCountNo: 0,
        votingDeadline: 0,
      },
    ]
    setMilestones(mockMilestones)
  }

  const submitProof = async (milestoneIdx: number) => {
    if (!proofHash) {
      alert('Please enter proof hash')
      return
    }

    setIsSubmitting(true)
    try {
      console.log('Submitting proof:', { projectId, milestoneIdx, proofHash })
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('Proof submitted successfully!')
      loadMilestones()
    } catch (error) {
      console.error('Proof submission failed:', error)
      alert('Failed to submit proof')
    } finally {
      setIsSubmitting(false)
      setProofHash('')
    }
  }

  const vote = async (milestoneIdx: number, choice: 'yes' | 'no') => {
    setIsSubmitting(true)
    try {
      console.log('Voting:', { projectId, milestoneIdx, choice })
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('Vote cast successfully!')
      loadMilestones()
    } catch (error) {
      console.error('Voting failed:', error)
      alert('Failed to cast vote')
    } finally {
      setIsSubmitting(false)
    }
  }

  const finalizeMilestone = async (milestoneIdx: number) => {
    setIsSubmitting(true)
    try {
      console.log('Finalizing milestone:', { projectId, milestoneIdx })
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('Milestone finalized! Funds released.')
      loadMilestones()
    } catch (error) {
      console.error('Finalization failed:', error)
      alert('Failed to finalize milestone')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 text-gray-400 hover:text-white transition flex items-center gap-2"
      >
        ← Back to Projects
      </button>

      <div className="bg-casper-gray rounded-xl p-8 border border-gray-800 mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">School Building Project</h2>
        <p className="text-gray-400 mb-4">Project ID: {projectId}</p>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-gray-400 mb-1">Total Funds</div>
            <div className="text-2xl font-bold text-white">10,000 CSPR</div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-1">Released</div>
            <div className="text-2xl font-bold text-green-400">5,000 CSPR</div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-white mb-4">Milestones</h3>

      <div className="space-y-6">
        {milestones.map((milestone, idx) => (
          <div
            key={idx}
            className={`bg-casper-gray rounded-xl p-6 border ${
              milestone.isCompleted
                ? 'border-green-500'
                : milestone.proofHash
                ? 'border-yellow-500'
                : 'border-gray-800'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-bold text-white mb-1">
                  Milestone {idx + 1}: {milestone.description}
                </h4>
                <p className="text-gray-400">Release: {milestone.fundPercentage}% of funds</p>
              </div>
              
              {milestone.isCompleted && (
                <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                  ✓ Completed
                </div>
              )}
              
              {!milestone.isCompleted && milestone.proofHash && (
                <div className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
                  ⏳ Voting
                </div>
              )}
            </div>

            {milestone.proofHash && (
              <div className="bg-casper-dark rounded-lg p-4 mb-4">
                <div className="text-sm text-gray-400 mb-2">Proof Submitted</div>
                <div className="text-white font-mono text-sm break-all">{milestone.proofHash}</div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Yes Votes</div>
                    <div className="text-2xl font-bold text-green-400">{milestone.voteCountYes}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">No Votes</div>
                    <div className="text-2xl font-bold text-red-400">{milestone.voteCountNo}</div>
                  </div>
                </div>
              </div>
            )}

            {!milestone.isCompleted && !milestone.proofHash && (
              <div className="space-y-3">
                <input
                  type="text"
                  value={proofHash}
                  onChange={(e) => setProofHash(e.target.value)}
                  className="w-full bg-casper-dark border border-gray-700 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-casper-red"
                  placeholder="IPFS hash (e.g., QmX...)"
                />
                <button
                  onClick={() => submitProof(idx)}
                  disabled={isSubmitting}
                  className="w-full bg-casper-red hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  Submit Proof
                </button>
              </div>
            )}

            {!milestone.isCompleted && milestone.proofHash && (
              <div className="flex gap-3">
                <button
                  onClick={() => vote(idx, 'yes')}
                  disabled={isSubmitting}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  Vote Yes
                </button>
                <button
                  onClick={() => vote(idx, 'no')}
                  disabled={isSubmitting}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  Vote No
                </button>
                <button
                  onClick={() => finalizeMilestone(idx)}
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  Finalize
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
