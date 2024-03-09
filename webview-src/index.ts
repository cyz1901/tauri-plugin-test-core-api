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