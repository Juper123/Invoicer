import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { HttpRequestDto, PostInvoiceDto } from '../models';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    constructor(private readonly httpClient: HttpClient) { }

    postInvoice<T>(
        payload: HttpRequestDto<T>,
        apiUrl: string
    ): Observable<PostInvoiceDto> {
        return this.httpClient.post<PostInvoiceDto>(
            apiUrl,
            JSON.stringify(payload),
            { headers: this.getHeaders() }
        );
    }

    getInvoice(
        apiUrl: string
    ): Observable<Blob> {
        return this.httpClient.get(
            apiUrl,
            { responseType: 'blob' },

        );
    }

    private getHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        headers = headers.append('Content-Type', 'application/json;');
        return headers;
    }

    // private getHeaders2(): HttpHeaders {
    //     let headers = new HttpHeaders();
    //     headers = headers.append('Accept', 'application/json');
    //     headers = headers.append('Content-Type', 'application/json;');
    //     headers = headers.append('Access-Control-Allow-Origin', '*');
    //     headers = headers.append('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    //     headers = headers.append('Access-Control-Rewuest-Methods', 'GET,POST,PUT,PATCH,DELETE');
    //     return headers;
    // }
}