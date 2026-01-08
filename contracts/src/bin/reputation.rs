use civictrust_contracts::reputation::ReputationNFT;

fn main() {
    odra_casper_wasm_env::run(ReputationNFT::default());
}
