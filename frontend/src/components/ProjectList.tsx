'use client'

import { useState, useEffect } from 'react'
import { LogoIcon } from './Logo'
import { UserIcon, ArrowRightIcon, SpinnerIcon } from './Icons'

interface Project {
  id: number
  name: string
  beneficiary: string
  totalFunds: string
  releasedFunds: string
  currentMilestone: number
  isActive: boolean
}

interface ProjectListProps {
  onProjectSelect: (projectId: number) => void
}

export default function ProjectList({ onProjectSelect }: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const mockProjects: Project[] = [
        {
          id: 1,
          name: 'School Building Project',
          beneficiary: 'account-hash-abc123...',
          totalFunds: '10000',
          releasedFunds: '5000',
          currentMilestone: 1,
          isActive: true,
        },
        {
          id: 2,
          name: 'Clean Water Initiative',
          beneficiary: 'account-hash-def456...',
          totalFunds: '25000',
          releasedFunds: '0',
          currentMilestone: 0,
          isActive: true,
        },
      ]
      
      setProjects(mockProjects)
    } catch (error) {
      console.error('Failed to load projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 10)}...${addr.slice(-4)}`
  }

  const calculateProgress = (released: string, total: string) => {
    const releasedNum = parseFloat(released)
    const totalNum = parseFloat(total)
    return totalNum > 0 ? (releasedNum / totalNum) * 100 : 0
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <SpinnerIcon className="w-12 h-12 text-cyan-500" />
        <p className="mt-4 text-gray-500 text-sm">Loading projects...</p>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 bg-white/5 border border-white/10 mx-auto mb-4 flex items-center justify-center">
          <LogoIcon className="w-10 h-10 text-gray-500" />
        </div>
        <h3 className="text-2xl font-bold mb-2">No Projects Yet</h3>
        <p className="text-gray-500">Create the first project to get started</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => {
          const progress = calculateProgress(project.releasedFunds, project.totalFunds)
          
          return (
            <div
              key={project.id}
              onClick={() => onProjectSelect(project.id)}
              className="group bg-white/5 border border-white/10 hover:border-cyan-500/50 p-6 cursor-pointer transition-all card-hover"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-all">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                    <UserIcon className="w-3 h-3" />
                    {formatAddress(project.beneficiary)}
                  </div>
                </div>
                <div className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase tracking-wider">
                  ACTIVE
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-black/30 border border-white/5 p-3">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Total</div>
                  <div className="text-lg font-bold">{project.totalFunds}</div>
                  <div className="text-[10px] text-gray-600">CSPR</div>
                </div>
                <div className="bg-emerald-500/5 border border-emerald-500/10 p-3">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Released</div>
                  <div className="text-lg font-bold text-emerald-400">{project.releasedFunds}</div>
                  <div className="text-[10px] text-emerald-600">CSPR</div>
                </div>
                <div className="bg-cyan-500/5 border border-cyan-500/10 p-3">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Milestone</div>
                  <div className="text-lg font-bold text-cyan-400">{project.currentMilestone + 1}</div>
                  <div className="text-[10px] text-cyan-600">Current</div>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-500 uppercase tracking-wider">Progress</span>
                  <span className="font-mono font-bold">{progress.toFixed(0)}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Click to view details</span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
