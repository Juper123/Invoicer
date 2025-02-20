import { Invoice } from "../../src/app/components";

export const hasValue = (value: string): boolean => {
    return value !== '' && value !== null && value !== undefined
}

export const getDateString = (date: string): string => {
    return [date.slice(0, 2), '.', date.slice(2, 4), '.', date.slice(4)].join('');
}

export const parseDate = (date: string): string => {
    const parseDate = date.split('-');
    const parsedDate = `${parseDate[2]}/${parseDate[1]}/${parseDate[0]}`
    return parsedDate
}

export function deleteInvoice(invoice: Invoice | null, invoices: Invoice[]): Invoice[] {
    if (invoice) {
        const index = invoices.indexOf(invoice)
        invoices = Object.assign([], invoices);
        invoices.splice(index, 1)
    }
    return invoices
}

export function sortBySellDate(
    invoices: Invoice[]
): Invoice[] {

    invoices = Object.assign([], invoices);
    return invoices.sort(
        (a, b) => new Date(a.sellDate).getTime() - new Date(b.sellDate).getTime()
    );
}

export function modifyInvoiceNumber(number: string): string {
    return number.replaceAll('/', '-')
}