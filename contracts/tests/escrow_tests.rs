#[cfg(test)]
mod tests {
    use super::*;
    use odra::host::{Deployer, HostRef};
    use odra::casper_types::U512;

    #[test]
    fn test_create_project() {
        let env = odra_test::env();
        let mut contract = CivicTrustEscrowHostRef::deploy(&env, 3u32);
        
        let donor = env.get_account(0);
        let beneficiary = env.get_account(1);
        let amount = U512::from(10_000_000_000_000u64);
        
        env.set_caller(donor);
        
        contract.create_project(
            "Test Project".to_string(),
            beneficiary,
            vec!["Milestone 1".to_string(), "Milestone 2".to_string()],
            vec![50u8, 50u8],
            amount,
        );
        
        let project = contract.get_project(1).unwrap();
        assert_eq!(project.name, "Test Project");
        assert_eq!(project.total_funds, amount);
        assert_eq!(project.current_milestone, 0);
    }

    #[test]
    fn test_submit_proof() {
        let env = odra_test::env();
        let mut contract = CivicTrustEscrowHostRef::deploy(&env, 3u32);
        
        let donor = env.get_account(0);
        let beneficiary = env.get_account(1);
        let amount = U512::from(10_000_000_000_000u64);
        
        env.set_caller(donor);
        contract.create_project(
            "Test Project".to_string(),
            beneficiary,
            vec!["Milestone 1".to_string()],
            vec![100u8],
            amount,
        );
        
        env.set_caller(beneficiary);
        contract.submit_proof(1, "QmTestHash".to_string());
        
        let milestone = contract.get_milestone(1, 0).unwrap();
        assert_eq!(milestone.proof_hash, Some("QmTestHash".to_string()));
    }

    #[test]
    fn test_voting() {
        let env = odra_test::env();
        let mut contract = CivicTrustEscrowHostRef::deploy(&env, 2u32);
        
        let donor = env.get_account(0);
        let beneficiary = env.get_account(1);
        let voter1 = env.get_account(2);
        let voter2 = env.get_account(3);
        let amount = U512::from(10_000_000_000_000u64);
        
        env.set_caller(donor);
        contract.create_project(
            "Test Project".to_string(),
            beneficiary,
            vec!["Milestone 1".to_string()],
            vec![100u8],
            amount,
        );
        
        env.set_caller(beneficiary);
        contract.submit_proof(1, "QmTestHash".to_string());
        
        env.set_caller(voter1);
        contract.vote(1, 0, VoteChoice::Yes);
        
        env.set_caller(voter2);
        contract.vote(1, 0, VoteChoice::Yes);
        
        let milestone = contract.get_milestone(1, 0).unwrap();
        assert_eq!(milestone.vote_count_yes, 2);
        assert_eq!(milestone.vote_count_no, 0);
    }

    #[test]
    #[should_panic(expected = "Already voted")]
    fn test_double_voting_fails() {
        let env = odra_test::env();
        let mut contract = CivicTrustEscrowHostRef::deploy(&env, 2u32);
        
        let donor = env.get_account(0);
        let beneficiary = env.get_account(1);
        let voter = env.get_account(2);
        let amount = U512::from(10_000_000_000_000u64);
        
        env.set_caller(donor);
        contract.create_project(
            "Test Project".to_string(),
            beneficiary,
            vec!["Milestone 1".to_string()],
            vec![100u8],
            amount,
        );
        
        env.set_caller(beneficiary);
        contract.submit_proof(1, "QmTestHash".to_string());
        
        env.set_caller(voter);
        contract.vote(1, 0, VoteChoice::Yes);
        contract.vote(1, 0, VoteChoice::Yes); // Should fail
    }
}
