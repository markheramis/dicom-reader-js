#!/usr/bin/env node

"use strict";
const fs = require('fs')
const dicom = require("dicom");
const { TransducerType } = require('dicom/lib/tags');



class DicomReader {
    file = undefined;
    result = {}
    decoder = dicom.decoder({
        guess_header: TransducerType,
        read_header: false
    })
    encoder = new dicom.json.JsonEncoder()
    sink = new dicom.json.JsonSink((err, json) => {
        if (err) {
            process.exit(10);
        }
        for (const [key, value] of Object.entries(json)) {
            let propertyName = dicom.tags.for_tag(key).name
            this.result[propertyName] = value
        }
    })
    constructor(file) {
        this.file = file;
    }
    exists() {
        return fs.existsSync(this.file);
    }
    read() {
        return new Promise((resolve, reject) => {
            let stream = fs.createReadStream(this.file)
                .pipe(this.decoder)
                .pipe(this.encoder)
                .pipe(this.sink)
            stream.on("finish", () => resolve(this.result));
            /**
             * @todo error handler
             * error handling apparently not working if passed with non-dicom file.
             * try catch isn't working as well.
             */
            stream.on("error", err => reject(err));
        });
    }
}
if (require.main === module) {
    const [, , ...args] = process.argv;
    const file = args[0];
    const dicomReader = new DicomReader(file);
    if (dicomReader.exists()) {
        dicomReader.read()
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.log(error)
            })
    } else {
        module.exports = DicomReader
    }

} else {
    console.log('required as a module');
}






/*

var decoder = dicom.decoder({
    guess_header: true
})


try {

} catch (err) {

}
let result = {}
var encoder = new dicom.json.JsonEncoder()
var sink = new dicom.json.JsonSink(function (err, json) {
    if (err) {
        console.log("Error:", err)
        process.exit(10);
    }
    for (const [key, value] of Object.entries(json)) {
        let propertyName = dicom.tags.for_tag(key).name
        result[propertyName] = value
    }
    console.log(JSON.stringify(result))
})

require("fs")
    .createReadStream(args[0])
    .pipe(decoder)
    .pipe(encoder)
    .pipe(sink)
*/