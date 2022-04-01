import React, { useEffect, useContext } from 'react';
import { Box } from '@chakra-ui/react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { LoanContext } from '../helpers/contexts/LoanContext';


const Html5QRcodeReader = ({ fps, qrbox, disableFlip }) => {
  const {codes, dispatchLoanEvent} = useContext(LoanContext)

  useEffect(() => {
    let html5QrcodeScanner = new Html5QrcodeScanner(
      'reader',
      { fps, qrbox, disableFlip },
      /* verbose= */ false
    );

    let resumeScanningTimeout = setTimeout(() => {
      html5QrcodeScanner.resume();
    }, 3000);

      
  const onScanSuccess = (decodedText, decodedResult) => {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
    if (!codes.isbn && !codes.returnee)
      dispatchLoanEvent("SET_ISBN", {isbn: decodedText})
    else if (!codes.isbn)
      dispatchLoanEvent("SET_ISBN", {isbn: decodedText})
    else dispatchLoanEvent("SET_RETURNEE", {returnee: decodedText});
    html5QrcodeScanner.clear();
  };

    html5QrcodeScanner.render(onScanSuccess);

    return () => {
      clearTimeout(resumeScanningTimeout);
      html5QrcodeScanner.clear();
    };
  }, []);

  return <Box id="reader" m="50px auto" maxW="800px"></Box>;
};

export default Html5QRcodeReader;
