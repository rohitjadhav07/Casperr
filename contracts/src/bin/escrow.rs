use civictrust_contracts::escrow::CivicTrustEscrow;

fn main() {
    odra_casper_wasm_env::run(CivicTrustEscrow::default());
}
