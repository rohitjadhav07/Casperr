use odra::prelude::*;
use odra::{Address, Var, Mapping, List};

#[odra::odra_type]
pub struct Milestone {
    pub description: String,
    pub fund_percentage: u8,
    pub proof_hash: Option<String>,
    pub is_completed: bool,
    pub vote_count_yes: u32,
    pub vote_count_no: u32,
    pub voting_deadline: u64,
}

#[odra::odra_type]
pub struct Project {
    pub id: u64,
    pub name: String,
    pub beneficiary: Address,
    pub donor: Address,
    pub total_funds: U512,
    pub released_funds: U512,
    pub current_milestone: u32,
    pub is_active: bool,
    pub created_at: u64,
}

#[odra::odra_type]
pub enum VoteChoice {
    Yes,
    No,
}
