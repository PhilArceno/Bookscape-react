import React, {useEffect, useState} from 'react'
import {Html5QrcodeScanner} from "html5-qrcode"
import { Box } from '@chakra-ui/react';

const ReturnsScanner = () => {
    const [scannedCodes, setScannedCodes] = useState([]);

    
    
    useEffect(() => {
        let html5QrcodeScanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: {width: 500, height: 500} },
            /* verbose= */ false);
        
        const onScanSuccess = (decodedText, decodedResult) => {
            // handle the scanned code as you like, for example:
            console.log(`Code matched = ${decodedText}`, decodedResult);
          }
    
        const onScanFailure = (error) => {
            // handle the scanned code as you like, for example:
            // console.warn(`Code scan error = ${error}`);
        }
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    }, [])
    
      
  return (
    <div>
        {scannedCodes.length < 2 ? 
            <Box id="reader" style={{}}></Box> :
            ""}
        {/* {html5QrcodeScanner.render(onScanSuccess,onScanFailure)} */}
    </div>
  )
}

export default ReturnsScanner