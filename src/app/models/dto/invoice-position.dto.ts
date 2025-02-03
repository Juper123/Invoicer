export interface InvoicePositionDto {
    name: string;
    tax: number | null;
    total_price_gross: string;
    quantity: number | null;
    quantity_unit: string;
}

