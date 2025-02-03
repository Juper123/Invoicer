import { Injectable } from "@angular/core";
import { SaveResponse } from "./types/save-response.interface";
import { Context } from "./enums";
import { CreatedInvoice } from "./types/created-invoice.interface";

@Injectable()
export class DatabaseService {

    async getFromDatabase<T>(context: Context): Promise<SaveResponse<T>> {

        // settings
        // if (context === Context.Settings) {
        //     return {
        //         success: true,
        //         err: null,
        //         data: {
        //             apiToken: "1",
        //             apiUrl: "1",
        //             paymentPeriod: "60",
        //             sellerName: "Migos Mirosław Dudek",
        //             sellerStreet: "Potok 52",
        //             sellerPostCode: "43-382",
        //             sellerCity: "Bielsko-Biała",
        //             sellerCountry: "Polska",
        //             sellerTaxNumber: "5471156916",
        //             sellerBank: "PKO Bank Polski, SWIFT: BPKOPLPW",
        //             sellerBankAccountPln: "13 1020 1390 0000 6602 0193 8471",
        //             sellerBankAccountEur: "81 1020 1390 0000 6102 0616 7953",
        //             exchangeCurrency: "PLN",
        //             currency: "EUR",
        //             description: "GTU_13",
        //             quantity: "1",
        //             quantityUnit: "fracht",
        //             tax: 23
        //         } as T
        //     }
        // }

        // custoemrs
        // if (context === Context.Customers) {
        //     return {
        //         success: true,
        //         err: null,
        //         data: [
        //             {
        //                 name: "Domingo Dominik Jachnicki",
        //                 taxNumber: "9372719376",
        //                 postCode: "43-318",
        //                 city: "Bielsko-Biała",
        //                 street: "Żabia 9",
        //                 country: "Polska"
        //             },
        //             {
        //                 name: "Usługi Transportowe Beata Korzeniowska",
        //                 taxNumber: "9371021550",
        //                 postCode: "43-318",
        //                 city: "Bielsko-Biała",
        //                 street: "Żabia 9",
        //                 country: "Polska"
        //             }
        //         ] as T
        //     }
        // }



        try {
            const result = await (window as any).dataBase.getFromDatabase(context)
            const paresdData = JSON.parse(result.data)
            return {
                success: result.success,
                err: result.err,
                data: paresdData
            }

        } catch (error) {
            console.log(error)
            return {
                success: false,
                err: (error as { message: string })?.message,
                data: null as T
            }
        }

    }

    async saveToDatabase<T>(data: T, context: Context): Promise<SaveResponse<T>> {
        try {
            const dataJson = JSON.stringify(data)
            const result = await (window as any).dataBase.saveToDatabase(dataJson, context)
            const paresdData = JSON.parse(result.data)

            return {
                success: result.success,
                err: result.err,
                data: paresdData
            }

        } catch (error) {
            console.log(error)
            return {
                success: false,
                err: (error as { message: string })?.message,
                data: null as T
            }
        }

    }

    downloadInvoices(invoices: CreatedInvoice[]) {
        (window as any).dataBase.downloadInvoices(invoices)
    }
}