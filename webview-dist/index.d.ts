interface PingRequest {
    value?: string;
}

interface PingResponse {
    value?: string;
}

export declare function execute(): Promise<void>;
export declare function ping(payload: PingRequest): Promise<PingResponse>;
export { };
