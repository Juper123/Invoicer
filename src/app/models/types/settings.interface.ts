import { CurrencyValues, TaxValues } from "../../enums";

export interface Settings {
    apiToken: string,
    apiUrl: string,
    paymentPeriod: number | null,
    sellerName: string,
    sellerStreet: string,
    sellerPostCode: string,
    sellerCity: string,
    sellerCountry: string,
    sellerTaxNumber: string,
    sellerBank: string,
    sellerBankAccountPln: string,
    sellerBankAccountEur: string,
    exchangeCurrency: CurrencyValues,
    currency: CurrencyValues,
    description: string,
    quantity: number | null,
    quantityUnit: string,
    tax: TaxValues,
}