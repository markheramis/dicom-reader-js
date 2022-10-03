# Dicom Reader JS

Dicom Reader JS is a small JS script that can accept a file parameter (specifically `.dcm` files) and output its `Dicom Properties` as `JSON` String.

### Setup
- clone the repository
- run `npm install`

### Usage

```bash
node index {path to dicom}
```

Example:

```bash
node index c:/dicoms/1231312-12312-123123-34254.dcm
```

```bash
node index ~/dicoms/534535/4535/3123/3432-5345-7567.dcm
```