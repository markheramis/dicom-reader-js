#!/usr/bin/env node

"use strict";
const dwv = require('dwv');
const fs = require('fs')
const dicomDataDictionary = require('dicom-data-dictionary');
var result = [];
if (require.main === module) {
    const [, , ...args] = process.argv;
    const file = args[0];
    var data = fs.readFileSync(file);
    // convert data to array buffer
    var arrayBuffer = new Uint8Array(data).buffer;
    // parse
    var dicomParser = new dwv.dicom.DicomParser();
    dicomParser.parse(arrayBuffer);

    var tags = dicomParser.getDicomElements();
    const excludedTag = [
        "PixelData"
    ]
    const vrExcluded = [
        "UV", "UN", "SQ"
    ];
    Object.entries(dicomDataDictionary.standardDataElements).forEach(tag => {
        const [tagKey, tagValue] = tag;
        var item = tags.getFromName(tagValue.name);
        if (
            !(item == null || item == undefined || item == "") &&
            excludedTag.indexOf(tagValue.name) === -1 &&
            vrExcluded.indexOf(tagValue.vr) === -1
        ) {
            result[tagKey] = {
                vr: tagValue.vr,
                tag: tagValue.name,
                value: item
            };

        }
    });
    console.log(result)
    
} else {
    console.log('required as a module');
}