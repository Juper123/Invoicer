export interface SaveResponse<T> {
    success: boolean,
    err: string | null
    data: T
}