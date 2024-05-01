import { useState } from "react";
import { Document, Page } from "react-pdf";
import ReportPdf from "./sample1.pdf";

const  PDFComponent = () => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className= "pdf-div"
    //  style={{ overflowY:'scroll', paddingBottom: '50px'}}
    >
      <Document file={ReportPdf} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.apply(null, Array(numPages))
          .map((key, i) => i + 1)
          .map((page) => {return (
            <Page
              pageNumber={page}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
            );
          })}
      </Document>
    </div>
  );
}

export default PDFComponent;
