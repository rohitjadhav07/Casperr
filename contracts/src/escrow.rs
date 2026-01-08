use odra::prelude::*;
use odra::{casper_types::U512, Address, Mapping, SubModule, Var, List};
use crate::types::{Milestone, Project, VoteChoice};

#[odra::module]
pub struct CivicTrustEscrow {
    projects: Mapping<u64, Project>,
    milestones: Mapping<(u64, u32), Milestone>,
    votes: Mapping<(u64, u32, Address), bool>,
    project_counter: Var<u64>,
    min_vote_threshold: Var<u32>,
}

#[odra::module]
impl CivicTrustEscrow {
    pub fn init(&mut self, min_votes: u32) {
        self.project_counter.set(0);
        self.min_vote_threshold.set(min_votes);
    }

    #[odra(payable)]
    pub fn create_project(
        &mut self,
        name: String,
        beneficiary: Address,
        milestone_descriptions: Vec<String>,
        milestone_percentages: Vec<u8>,
    ) {
        let caller = self.env().caller();
        let amount = self.env().attached_value();
        
        require!(amount > U512::zero(), "Must send funds");
        require!(milestone_descriptions.len() == milestone_percentages.len(), "Milestone mismatch");
        
        let total_percentage: u8 = milestone_percentages.iter().sum();
        require!(total_percentage == 100, "Percentages must sum to 100");

        let project_id = self.project_counter.get_or_default() + 1;
        self.project_counter.set(project_id);

        let project = Project {
            id: project_id,
            name,
            beneficiary,
            donor: caller,
            total_funds: amount,
            released_funds: U512::zero(),
            current_milestone: 0,
            is_active: true,
            created_at: self.env().get_block_time(),
        };

        self.projects.set(&project_id, project);

        for (idx, (desc, pct)) in milestone_descriptions.iter().zip(milestone_percentages.iter()).enumerate() {
            let milestone = Milestone {
                description: desc.clone(),
                fund_percentage: *pct,
                proof_hash: None,
                is_completed: false,
                vote_count_yes: 0,
                vote_count_no: 0,
                voting_deadline: 0,
            };
            self.milestones.set(&(project_id, idx as u32), milestone);
        }

        self.env().emit_event(ProjectCreated {
            project_id,
            donor: caller,
            beneficiary,
            amount,
        });
    }

    pub fn submit_proof(&mut self, project_id: u64, proof_hash: String) {
        let mut project = self.projects.get(&project_id).unwrap();
        require!(project.is_active, "Project not active");
        
        let caller = self.env().caller();
        require!(caller == project.beneficiary, "Only beneficiary can submit proof");

        let milestone_idx = project.current_milestone;
        let mut milestone = self.milestones.get(&(project_id, milestone_idx)).unwrap();
        
        require!(milestone.proof_hash.is_none(), "Proof already submitted");

        milestone.proof_hash = Some(proof_hash.clone());
        milestone.voting_deadline = self.env().get_block_time() + (7 * 24 * 60 * 60 * 1000); // 7 days
        
        self.milestones.set(&(project_id, milestone_idx), milestone);

        self.env().emit_event(ProofSubmitted {
            project_id,
            milestone_idx,
            proof_hash,
        });
    }

    pub fn vote(&mut self, project_id: u64, milestone_idx: u32, choice: VoteChoice) {
        let caller = self.env().caller();
        let vote_key = (project_id, milestone_idx, caller);
        
        require!(!self.votes.get(&vote_key).unwrap_or(false), "Already voted");

        let mut milestone = self.milestones.get(&(project_id, milestone_idx)).unwrap();
        require!(milestone.proof_hash.is_some(), "No proof submitted");
        require!(self.env().get_block_time() < milestone.voting_deadline, "Voting ended");

        match choice {
            VoteChoice::Yes => milestone.vote_count_yes += 1,
            VoteChoice::No => milestone.vote_count_no += 1,
        }

        self.votes.set(&vote_key, true);
        self.milestones.set(&(project_id, milestone_idx), milestone);

        self.env().emit_event(VoteCast {
            project_id,
            milestone_idx,
            voter: caller,
        });
    }

    pub fn finalize_milestone(&mut self, project_id: u64) {
        let mut project = self.projects.get(&project_id).unwrap();
        require!(project.is_active, "Project not active");

        let milestone_idx = project.current_milestone;
        let milestone = self.milestones.get(&(project_id, milestone_idx)).unwrap();

        require!(milestone.proof_hash.is_some(), "No proof submitted");
        require!(self.env().get_block_time() >= milestone.voting_deadline, "Voting still active");

        let total_votes = milestone.vote_count_yes + milestone.vote_count_no;
        let min_votes = self.min_vote_threshold.get_or_default();
        
        require!(total_votes >= min_votes, "Not enough votes");
        require!(milestone.vote_count_yes > milestone.vote_count_no, "Vote failed");

        let release_amount = project.total_funds * U512::from(milestone.fund_percentage) / U512::from(100u32);
        
        self.env().transfer_tokens(&project.beneficiary, &release_amount);
        
        project.released_funds = project.released_funds + release_amount;
        project.current_milestone += 1;

        self.projects.set(&project_id, project);

        let mut completed_milestone = milestone;
        completed_milestone.is_completed = true;
        self.milestones.set(&(project_id, milestone_idx), completed_milestone);

        self.env().emit_event(MilestoneCompleted {
            project_id,
            milestone_idx,
            amount_released: release_amount,
        });
    }

    pub fn get_project(&self, project_id: u64) -> Option<Project> {
        self.projects.get(&project_id)
    }

    pub fn get_milestone(&self, project_id: u64, milestone_idx: u32) -> Option<Milestone> {
        self.milestones.get(&(project_id, milestone_idx))
    }
}

#[odra::odra_event]
pub struct ProjectCreated {
    pub project_id: u64,
    pub donor: Address,
    pub beneficiary: Address,
    pub amount: U512,
}

#[odra::odra_event]
pub struct ProofSubmitted {
    pub project_id: u64,
    pub milestone_idx: u32,
    pub proof_hash: String,
}

#[odra::odra_event]
pub struct VoteCast {
    pub project_id: u64,
    pub milestone_idx: u32,
    pub voter: Address,
}

#[odra::odra_event]
pub struct MilestoneCompleted {
    pub project_id: u64,
    pub milestone_idx: u32,
    pub amount_released: U512,
}
