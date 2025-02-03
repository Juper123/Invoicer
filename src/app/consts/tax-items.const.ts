import { ComboboxItemConfig } from "../../../libs";
import { TaxLabels, TaxValues } from "../enums";


export const TAX_ITEMS: ComboboxItemConfig<TaxValues>[] = [
    {
        value: TaxValues.Tax23,
        valueLabel: TaxLabels.Tax23
    },
    {
        value: TaxValues.Tax8,
        valueLabel: TaxLabels.Tax8
    },
    {
        value: TaxValues.Tax5,
        valueLabel: TaxLabels.Tax5
    },
    {
        value: TaxValues.Tax0,
        valueLabel: TaxLabels.Tax0
    }
]