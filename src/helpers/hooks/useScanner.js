import { useState } from "react";

export const useScanner = () => {
    const [codes, setCodes] = useState({
        isbn: '',
        returnee: '',
      });
      const [result, setResult] = useState({
        color: "",
        message: ""
    });

    const dispatchLoanEvent = (actionType, payload) => {
        switch (actionType) {
            case 'SET_ISBN':
                setCodes({ ...codes, isbn: payload.isbn });
                return;
            case 'SET_RETURNEE':
                setCodes({ ...codes, returnee: payload.returnee });
                return;
            case 'SET_RESULT':
                setResult({color: payload.color, message: payload.message });
                return;
            case 'CLEAR_VALUES':
                setCodes({ isbn: "", returnee: ""});
                setResult({color: "",message: ""});
                return;
            default:
                return;
        }
    };

    return [codes, result, dispatchLoanEvent];
}