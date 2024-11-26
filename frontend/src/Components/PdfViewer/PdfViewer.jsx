import { useState } from 'react';
import { Document, Page } from 'react-pdf';

export default function PdfViewer({ file }) {
    return <Document file={file}>
        <Page pageNumber={1} />
    </Document>
}