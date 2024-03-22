import { invoke } from '@tauri-apps/api/core'

interface PingRequest {
  value?: string;
}

interface PingResponse {
  value?: string;
}

export async function execute() {
  await invoke('plugin:test-core|execute')
}

export async function ping(payload: PingRequest) {
  await invoke('plugin:test-core|ping')
}

export async function trigger(value: string) {
  console.log("[tauri-plugin-haptics] triggered");
  await invoke('plugin:test-core|trigger', { value })
}