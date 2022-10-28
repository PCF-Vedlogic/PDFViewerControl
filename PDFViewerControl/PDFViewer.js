import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './css/AnnotationLayer.css';
import './css/TextLayer.css';
import { data } from './Resources';

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/',
};

const pdf = data.pdfURL;

const PDFViewer = ({ url }) => {
    pdfjs.GlobalWorkerOptions.workerSrc =
        `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const [file, setFile] = useState(url);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [scale, setScale] = useState(1);
    const fontstyle = { fontSize: 26, color: "black", "vertical-align": "text-top" }
    const imageStyle = { height: 20, width: 20 }
    const headerdivstyle = { "background-color": "white" }
    const bodydivstyle = {}

    const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
        console.log('nextNumPages', nextNumPages);
        setNumPages(nextNumPages);
    };

    const prevPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    }

    const nextPage = () => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    }

    const zoomIn = () => {
        setScale(scale + 0.1);
    }

    const zoomOut = () => {
        setScale(scale - 0.1);
    }

    const resetZoom = () => {
        setScale(1);
    }

    const changeRotate = () => {
        switch (rotate) {
            case 0:
                setRotate(90);
                break;
            case 90:
                setRotate(180);
                break;
            case 180:
                setRotate(270);
                break;
            case 270:
                setRotate(0);
                break;
            default:
                setRotate(0);
                break;
        }
    }

    console.log('file', file);

    return (
        <div style={headerdivstyle}>
            <div style={fontstyle}>
                <a title="Previous Page" onClick={() => prevPage()}>
                    <img style={imageStyle} src={data.prevIcon} />
                </a>&emsp;&emsp;
                <a title="zoom In" onClick={() => zoomIn()}>
                    <img style={imageStyle} src={data.zoomInIcon} />
                </a>&emsp;&emsp;
                <a title="Zoom Out" onClick={() => zoomOut()}>
                    <img style={imageStyle} src={data.zoomOutIcon} />
                </a>&emsp;&emsp;
                <b> Page {pageNumber} of {numPages} </b>&emsp;
                <a title="Reset Zoom" onClick={() => resetZoom()}>
                    <img style={imageStyle} src={data.resetZoomIcon} />
                </a>&emsp;&emsp;
                <a title="Rotate Page" onClick={() => changeRotate()}>
                    <img style={imageStyle} src={data.rotateIcon} />
                </a>&emsp;&emsp;
                <a title="Next Page" onClick={() => nextPage()}>
                    <img style={imageStyle} src={data.nextIcon} />
                </a>
            </div>
            <div style={bodydivstyle}>
                <Document file={url} onLoadSuccess={onDocumentLoadSuccess} renderMode="canvas" rotate={rotate}>
                    <Page pageNumber={pageNumber} scale={scale}></Page>
                </Document>
            </div>
        </div >
    );
};

export default PDFViewer;