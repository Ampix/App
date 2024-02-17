#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub fn foo(a: u128) -> [u64; 2] {
    [(a >> 64) as u64, a as u64]
}

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
use discord_rpc_client::Client;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

struct DRPC {
    id: u64,
    state: String,
    details: String,
    large_key: String,
    large_text: String,
    small_key: String,
    small_text: String,
}

impl DRPC {
    fn new(id: u64) -> Self {
        DRPC {
            id,
            state: String::new(),
            details: String::new(),
            large_key: String::new(),
            large_text: String::new(),
            small_key: String::new(),
            small_text: String::new(),
        }
    }
    fn start(self) {
        let mut drpc = Client::new(self.id);
        drpc.start();
        // Set the activity
        drpc.set_activity(|act| {
            act.state(self.state.clone())
                .details(self.details.clone())
                .timestamps(|func| {
                    func.start(
                        std::time::UNIX_EPOCH
                            .elapsed()
                            .unwrap()
                            .as_millis()
                            .try_into()
                            .unwrap(),
                    )
                })
                .assets(|acs| {
                    acs.large_image(self.large_key.clone())
                        .large_text(self.large_text.clone())
                        .small_image(self.small_key.clone())
                        .small_text(self.small_text.clone())
                })
        })
        .expect("Hiba");
    }
}

fn main() {
    // Create the client
    // darpc();
    let mut dc = DRPC::new(1147864570636030023);
    dc.state = "Betöltés".to_string();
    dc.details = "Indítja az appot".to_string();
    dc.large_key = "old_rounded".to_string();
    dc.large_text = "Ampix App".to_string();
    dc.start();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
