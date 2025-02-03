import { ComboboxItemConfig } from "../../../libs";
import { CurrencyValues } from "../enums";


export const CURRENCY_ITEMS: ComboboxItemConfig<CurrencyValues>[] = [
    {
        value: CurrencyValues.EUR,
        valueLabel: CurrencyValues.EUR
    },
    {
        value: CurrencyValues.PLN,
        valueLabel: CurrencyValues.PLN
    },
    {
        value: CurrencyValues.USD,
        valueLabel: CurrencyValues.USD
    },
]