interface PingRequest {
    value?: string;
}
export declare function execute(): Promise<void>;
export declare function ping(payload: PingRequest): Promise<void>;
export {};
