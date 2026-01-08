'use client'

import { useState } from 'react'

interface CreateProjectProps {
  onSuccess: () => void
}

export default function CreateProject({ onSuccess }: CreateProjectProps) {
  const [formData, setFormData] = useState({
    name: '',
    beneficiary: '',
    amount: '',
    milestones: [
      { description: '', percentage: 50 },
      { description: '', percentage: 50 },
    ],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Contract interaction logic here
      console.log('Creating project:', formData)
      
      // Simulate contract call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('Project created successfully!')
      onSuccess()
    } catch (error) {
      console.error('Project creation failed:', error)
      alert('Failed to create project')
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateMilestone = (index: number, field: 'description' | 'percentage', value: string | number) => {
    const newMilestones = [...formData.milestones]
    newMilestones[index] = { ...newMilestones[index], [field]: value }
    setFormData({ ...formData, milestones: newMilestones })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-casper-gray rounded-xl p-8 border border-gray-800">
        <h2 className="text-3xl font-bold text-white mb-6">Create New Project</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-casper-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-casper-red"
              placeholder="e.g., School Building Project"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Beneficiary Address
            </label>
            <input
              type="text"
              value={formData.beneficiary}
              onChange={(e) => setFormData({ ...formData, beneficiary: e.target.value })}
              className="w-full bg-casper-dark border border-gray-700 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-casper-red"
              placeholder="account-hash-..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Total Funding Amount (CSPR)
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full bg-casper-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-casper-red"
              placeholder="10000"
              required
              min="1"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Milestones</h3>
            
            {formData.milestones.map((milestone, index) => (
              <div key={index} className="bg-casper-dark rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-400">
                    Milestone {index + 1}
                  </span>
                  <span className="text-casper-red font-bold">{milestone.percentage}%</span>
                </div>
                
                <input
                  type="text"
                  value={milestone.description}
                  onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                  className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-casper-red"
                  placeholder={`e.g., ${index === 0 ? 'Foundation Complete' : 'Building Complete'}`}
                  required
                />
              </div>
            ))}
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <p className="text-yellow-400 text-sm">
              <strong>Note:</strong> Funds will be locked in escrow and released only after community approval of each milestone.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-casper-red hover:bg-red-700 text-white py-4 rounded-lg font-bold text-lg transition disabled:opacity-50"
          >
            {isSubmitting ? 'Creating Project...' : 'Create & Fund Project'}
          </button>
        </form>
      </div>
    </div>
  )
}
