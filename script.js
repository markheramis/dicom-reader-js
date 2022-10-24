#!/usr/bin/env node

"use strict";
const fs = require('fs')
const dicomParser = require('dicom-parser');
const dicomDataDictionary = require('dicom-data-dictionary');
const standardDataElements = dicomDataDictionary.standardDataElements;
var result = [];
if (require.main === module) {
    const [, , ...args] = process.argv;
    const file = args[0];
    if (!fs.existsSync(file)) {
        console.log({
            error: true,
            message: `File ${file} does not exists`
        })
    } else {
        var dicomFileAsBuffer = fs.readFileSync(file);
        try {
            var dataSet = dicomParser.parseDicom(dicomFileAsBuffer);
            
            var result = {};
            var exclude = ['SQ']
            Object.entries(dataSet.elements).forEach(function ([key, object]) {
                const tagName = standardDataElements[key.substring(1)];
                if (tagName != undefined && !exclude.includes(object.vr)) {
                    result[tagName.name] = {
                        tag: object.tag,
                        vr: object.vr,
                        length: object.length,
                        value: dataSet.string(key)
                    }
                    
                }
            });
            console.log(JSON.stringify(result))
        } catch (error) {
            console.error({
                error: true,
                message: error
            })
        }
    }
} else {
    console.log('required as a module');
}