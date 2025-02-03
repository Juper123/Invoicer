import { InvoicePositionDto } from "./invoice-position.dto";

export interface InvoiceDto {
    kind: string;
    // number: string;
    sell_date: string | null;
    issue_date: string | null;
    payment_to: string | null;
    seller_name: string;
    seller_tax_no: string;
    seller_bank_account: string;
    seller_bank: string;
    buyer_name: string;
    buyer_tax_no: string;
    buyer_post_code: string;
    buyer_city: string;
    buyer_street: string;
    buyer_country: string;
    exchange_currency: string;
    currency: string;
    description: string;
    positions: InvoicePositionDto[];
}