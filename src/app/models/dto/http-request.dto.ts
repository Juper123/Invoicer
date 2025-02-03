export interface HttpRequestDto<T> {
    api_token: string;
    invoice: T;
}