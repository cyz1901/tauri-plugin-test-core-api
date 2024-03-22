import { invoke } from '@tauri-apps/api/core'

export async function trigger(value: string) {
  console.log("[tauri-plugin-test-core] triggered");
  return await invoke('plugin:test-core|trigger', { value })
}