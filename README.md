# Dicom Reader JS

Dicom Reader JS is a small JS script that can accept a file parameter (specifically `.dcm` files) and output its `Dicom Properties` as `JSON` String.

### Installation

```bash
npm i dicom-reader-js
npm link
```

### Usage

##### on Windows


```bash
./node_modules/.bin/dicom-reader {the path}
```
Example:
```.
./node_modules/.bin/dicom-reader /C:/dicom/2424/234324.dcm
```

##### on Linux

the command is registered to path, we can immedietly use the command globally.

```bash
dicom-reader {the path}
```