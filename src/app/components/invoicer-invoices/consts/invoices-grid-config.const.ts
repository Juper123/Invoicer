import { GridConfig } from "../../../../../libs";

export const INVOICES_GRID_CONFIG: GridConfig = {
    columns: [
        {
            name: 'Numer zlecenia',
            property: 'orderNumber',
        },
        {
            name: 'Cena netto',
            property: 'price',
        },
    ],
    classes: 'h-350'
}