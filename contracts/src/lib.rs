#![no_std]
#![no_main]

extern crate alloc;

use alloc::{string::String, vec::Vec};
use casper_contract::{
    contract_api::{runtime, storage},
    unwrap_or_revert::UnwrapOrRevert,
};
use casper_types::{
    contracts::NamedKeys, runtime_args, CLType, CLValue, EntryPoint, EntryPointAccess,
    EntryPointType, EntryPoints, Key, Parameter, RuntimeArgs, U512,
};

const PROJECT_COUNT_KEY: &str = "project_count";
const MIN_VOTES_KEY: &str = "min_votes";

#[no_mangle]
pub extern "C" fn create_project() {
    let name: String = runtime::get_named_arg("name");
    let beneficiary: Key = runtime::get_named_arg("beneficiary");
    let amount: U512 = runtime::get_named_arg("amount");
    
    let project_count: u64 = storage::read(PROJECT_COUNT_KEY)
        .unwrap_or_revert()
        .unwrap_or(0);
    
    let new_count = project_count + 1;
    
    // Store project data
    let project_key = alloc::format!("project_{}", new_count);
    storage::write(&project_key, (name, beneficiary, amount, 0u32));
    
    // Update count
    storage::write(PROJECT_COUNT_KEY, new_count);
}

#[no_mangle]
pub extern "C" fn vote() {
    let project_id: u64 = runtime::get_named_arg("project_id");
    let voter: Key = runtime::caller();
    
    let vote_key = alloc::format!("vote_{}_{}", project_id, voter);
    storage::write(&vote_key, true);
}

#[no_mangle]
pub extern "C" fn release_funds() {
    let project_id: u64 = runtime::get_named_arg("project_id");
    
    let project_key = alloc::format!("project_{}", project_id);
    let _project_data: (String, Key, U512, u32) = storage::read(&project_key)
        .unwrap_or_revert()
        .unwrap_or_revert();
    
    // Mark as released
    storage::write(&alloc::format!("released_{}", project_id), true);
}

#[no_mangle]
pub extern "C" fn call() {
    let min_votes: u32 = runtime::get_named_arg("min_votes");
    
    let mut entry_points = EntryPoints::new();
    
    entry_points.add_entry_point(EntryPoint::new(
        "create_project",
        vec![
            Parameter::new("name", CLType::String),
            Parameter::new("beneficiary", CLType::Key),
            Parameter::new("amount", CLType::U512),
        ],
        CLType::Unit,
        EntryPointAccess::Public,
        EntryPointType::Contract,
    ));
    
    entry_points.add_entry_point(EntryPoint::new(
        "vote",
        vec![Parameter::new("project_id", CLType::U64)],
        CLType::Unit,
        EntryPointAccess::Public,
        EntryPointType::Contract,
    ));
    
    entry_points.add_entry_point(EntryPoint::new(
        "release_funds",
        vec![Parameter::new("project_id", CLType::U64)],
        CLType::Unit,
        EntryPointAccess::Public,
        EntryPointType::Contract,
    ));
    
    let mut named_keys = NamedKeys::new();
    named_keys.insert(PROJECT_COUNT_KEY.to_string(), storage::new_uref(0u64).into());
    named_keys.insert(MIN_VOTES_KEY.to_string(), storage::new_uref(min_votes).into());
    
    let (contract_hash, _version) = storage::new_contract(
        entry_points,
        Some(named_keys),
        Some("civictrust_escrow".to_string()),
        Some("civictrust_escrow_hash".to_string()),
    );
    
    runtime::put_key("civictrust_escrow", contract_hash.into());
}
