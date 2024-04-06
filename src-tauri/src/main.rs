#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
// Prevents additional console window on Windows in release, DO NOT REMOVE!!

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
