"use strict";
var dicom = require("dicom")
var decoder = dicom.decoder({
    guess_header: true
})
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
    .createReadStream(process.argv[2])
    .pipe(decoder)
    .pipe(encoder)
    .pipe(sink)