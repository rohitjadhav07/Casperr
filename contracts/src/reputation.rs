use odra::prelude::*;
use odra::{Address, Mapping, Var};

#[odra::module]
pub struct ReputationNFT {
    token_counter: Var<u64>,
    token_owner: Mapping<u64, Address>,
    owner_tokens: Mapping<Address, Vec<u64>>,
    token_metadata: Mapping<u64, ReputationMetadata>,
    reputation_scores: Mapping<Address, u32>,
}

#[odra::odra_type]
pub struct ReputationMetadata {
    pub token_id: u64,
    pub recipient: Address,
    pub reputation_type: ReputationType,
    pub project_id: u64,
    pub issued_at: u64,
}

#[odra::odra_type]
pub enum ReputationType {
    NGOCompletion,
    VerifierHonesty,
    DonorSupport,
}

#[odra::module]
impl ReputationNFT {
    pub fn init(&mut self) {
        self.token_counter.set(0);
    }

    pub fn mint_reputation(
        &mut self,
        recipient: Address,
        reputation_type: ReputationType,
        project_id: u64,
    ) -> u64 {
        let token_id = self.token_counter.get_or_default() + 1;
        self.token_counter.set(token_id);

        let metadata = ReputationMetadata {
            token_id,
            recipient,
            reputation_type: reputation_type.clone(),
            project_id,
            issued_at: self.env().get_block_time(),
        };

        self.token_owner.set(&token_id, recipient);
        self.token_metadata.set(&token_id, metadata);

        let mut tokens = self.owner_tokens.get(&recipient).unwrap_or_default();
        tokens.push(token_id);
        self.owner_tokens.set(&recipient, tokens);

        let current_score = self.reputation_scores.get(&recipient).unwrap_or(0);
        self.reputation_scores.set(&recipient, current_score + 10);

        self.env().emit_event(ReputationMinted {
            token_id,
            recipient,
            project_id,
        });

        token_id
    }

    pub fn get_reputation_score(&self, address: Address) -> u32 {
        self.reputation_scores.get(&address).unwrap_or(0)
    }

    pub fn get_tokens(&self, owner: Address) -> Vec<u64> {
        self.owner_tokens.get(&owner).unwrap_or_default()
    }

    pub fn get_metadata(&self, token_id: u64) -> Option<ReputationMetadata> {
        self.token_metadata.get(&token_id)
    }
}

#[odra::odra_event]
pub struct ReputationMinted {
    pub token_id: u64,
    pub recipient: Address,
    pub project_id: u64,
}
