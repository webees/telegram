/// Starts the desktop shell.
///
/// The window currently renders the local surface from `frontendDist`. Loading
/// the remote Telegram Web A origin is tracked in
/// `docs/adr/0001-desktop-shell-architecture.md`.
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("failed to run the Webees shell");
}
