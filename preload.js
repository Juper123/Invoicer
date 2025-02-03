const { contextBridge } = require('electron')
const fs = require('node:fs')
const JSZip = require('jszip')
const FileSaver = require('file-saver')

// `libs/data/${context}.json` - dev path
// `resources/app/libs/data/${context}.json` - production path

async function getFromDatabase(context) {
    return new Promise((resolve) => {

        fs.readFile(`libs/data/${context}.json`, 'utf8', (err, data) => {
            if (err) {
                resolve({ success: false, err: err })
            }
            resolve({ data, success: true, err: null })
        })
    })
}

async function saveToDatabase(data, context) {
    return new Promise((resolve) => {
        fs.writeFile(`libs/data/${context}.json`, data, err => {
            if (err) {
                resolve({ success: false, err: err })
            }
            resolve({ data, success: true, err: null })
        })
    })
}

function downloadInvoices(invoices) {
    const zip = new JSZip();
    invoices.forEach(invoice => {
        zip.file(`${invoice.number}.pdf`, invoice.blob);
    });

    zip.generateAsync({ type: 'blob' }).then(function (content) {
        FileSaver.saveAs(content, 'faktury.zip');
    });
}



contextBridge.exposeInMainWorld('dataBase', {
    saveToDatabase: (data, context) => saveToDatabase(data, context),
    getFromDatabase: (context) => getFromDatabase(context),
    downloadInvoices: (invoices) => downloadInvoices(invoices)
})

