import { invoke } from '@tauri-apps/api/core'

export async function execute() {
  await invoke('plugin:test-core|execute')
}

export async function ping() {
  await invoke('plugin:test-core|ping')
}