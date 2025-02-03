import { CurrencyValues, TaxValues } from "../../../enums"


export interface Invoice {
    orderNumber: string,
    price: number | null,
    sellDate: string,

    customerTaxNumber: string,
    tax: TaxValues,
    paymentPeriod: number | null,
    exchangeCurrency: CurrencyValues,
    currency: CurrencyValues,
    description: string,
    quantity: number | null,
    quantityUnit: string,
}