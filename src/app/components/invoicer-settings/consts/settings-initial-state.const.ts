import { TaxValues, CurrencyValues } from "../../../enums";
import { Settings } from "../../../models/types";


export const SETTINGS_INITIAL_STATE: Settings = {
    apiToken: '',
    apiUrl: '',
    paymentPeriod: null,
    sellerName: '',
    sellerStreet: '',
    sellerPostCode: '',
    sellerCity: '',
    sellerCountry: '',
    sellerTaxNumber: '',
    sellerBank: '',
    sellerBankAccountPln: '',
    sellerBankAccountEur: '',
    exchangeCurrency: CurrencyValues.Empty,
    currency: CurrencyValues.Empty,
    description: '',
    quantity: null,
    quantityUnit: '',
    tax: TaxValues.Empty,
}