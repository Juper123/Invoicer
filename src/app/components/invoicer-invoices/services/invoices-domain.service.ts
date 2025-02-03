import { Injectable } from "@angular/core";
import { HttpService } from "../../../services";
import { Invoice } from "../types";
import { Observable, switchMap } from "rxjs";
import { Customer, HttpRequestDto, InvoiceDto, Settings } from "../../../models";
import { DatePipe } from "@angular/common";
import { parseDate } from "../../../../../libs";

@Injectable()
export class InvoicesDomainService {

    constructor(private httpService: HttpService, private datePipe: DatePipe) {
    }

    postInvoice(
        invoice: Invoice,
        settings: Settings,
        customers: Customer[]
    ): Observable<Blob> {
        const payload = this.buildPostInvoicePayload(invoice, settings, customers);
        return this.httpService.postInvoice<InvoiceDto>(
            payload,
            `${settings.apiUrl}/invoices.json`).pipe(switchMap(({ id }) => this.getInvoiceBlob(id, settings)));
    }

    private getInvoiceBlob(invoiceId: number, settings: Settings): Observable<Blob> {
        return this.httpService.getInvoice(`${settings.apiUrl}/invoices/${invoiceId}.pdf?api_token=${settings.apiToken}`)
    }

    private buildPostInvoicePayload(
        invoice: Invoice,
        settings: Settings,
        customers: Customer[]): HttpRequestDto<InvoiceDto> {
        let customer = customers.find(customer => customer.taxNumber === invoice.customerTaxNumber) as Customer
        return {
            api_token: '1iJIBuwl5qX6NmNFsMx', // settings.apiToken,
            invoice: {
                kind: 'vat',
                sell_date: this.datePipe.transform(parseDate(invoice.sellDate), 'yyyy-MM-dd'),
                issue_date: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
                payment_to: this.getPaymentTo(new Date(parseDate(invoice.sellDate)), invoice.paymentPeriod),
                seller_name: `${settings.sellerName}, ${settings.sellerStreet}, ${settings.sellerPostCode} ${settings.sellerCity}, ${settings.sellerCountry}`,
                seller_tax_no: settings.sellerTaxNumber,
                seller_bank_account: `Numer konta w PLN: ${settings.sellerBankAccountPln} Numer konta w EUR: ${settings.sellerBankAccountEur}`,
                seller_bank: settings.sellerBank,
                buyer_name: customer.name,
                buyer_tax_no: invoice.customerTaxNumber,
                buyer_city: customer.city,
                buyer_country: customer.country,
                buyer_post_code: customer.postCode,
                buyer_street: customer.street,
                exchange_currency: invoice.exchangeCurrency,
                currency: invoice.currency,
                description: invoice.description,
                positions: [
                    {
                        name: invoice.orderNumber,
                        tax: +invoice.tax,
                        total_price_gross: this.getTotalPrice(
                            invoice.price,
                            +invoice.tax
                        ).toFixed(2),
                        quantity: invoice.quantity,
                        quantity_unit: invoice.quantityUnit,
                    },
                ],
            },
        };

    }

    private getTotalPrice(netPrice: number | null, vat: number): number {
        if (netPrice) {
            return +netPrice + +netPrice * vat * 0.01;
        }
        return 0
    }

    private getPaymentTo(sellDate: Date, paymentPeriod: number | null): string | null {
        let date: Date = new Date();
        if (paymentPeriod) {
            date.setDate(sellDate.getDate() + +paymentPeriod);
        }
        return this.datePipe.transform(date, 'yyyy-MM-dd');
    }
}