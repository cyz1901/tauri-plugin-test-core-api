use tauri::{
  plugin::{Builder, TauriPlugin},
  Manager, Runtime,
};

use std::{collections::HashMap, sync::Mutex};

pub use models::*;

#[cfg(desktop)]
mod desktop;
#[cfg(mobile)]
mod mobile;

mod commands;
mod error;
mod models;

pub use error::{Error, Result};

#[cfg(desktop)]
use desktop::TestCore;
#[cfg(mobile)]
use mobile::TestCore;

#[derive(Default)]
struct MyState(Mutex<HashMap<String, String>>);

/// Extensions to [`tauri::App`], [`tauri::AppHandle`] and [`tauri::Window`] to access the test-core APIs.
pub trait TestCoreExt<R: Runtime> {
  fn test_core(&self) -> &TestCore<R>;
}

impl<R: Runtime, T: Manager<R>> crate::TestCoreExt<R> for T {
  fn test_core(&self) -> &TestCore<R> {
    self.state::<TestCore<R>>().inner()
  }
}

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("test-core")
    .invoke_handler(tauri::generate_handler![commands::execute])
    .setup(|app, api| {
      #[cfg(mobile)]
      let test_core = mobile::init(app, api)?;
      #[cfg(desktop)]
      let test_core = desktop::init(app, api)?;
      app.manage(test_core);

      // manage state so it is accessible by the commands
      app.manage(MyState::default());
      Ok(())
    })
    .build()
}
