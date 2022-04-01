import React, {useState} from 'react'
import { Scanner } from '../../components'
import { config } from '../../helpers/constants'
import { LoanContext } from '../../helpers/contexts/LoanContext';

const LoansScanner = () => {
    const [codes, setCodes] = useState({
        isbn: '',
        returnee: '',
      });

    const action = () => {
        // fetch(config.url.API_URL + `/api/Loans/reserve/${codes.isbn}`, {
        //     headers: {
        //         'Authorization': `Bearer ${localStorage.getItem("accessToken")}`;
        //     }
        // }).then((response) => response.text())
        // .then((text) => {
        //     let parsed = JSON.parse(text);
        //     setCodes({
        //         isbn: "", returnee: ""
        //     })
        // })
    }

    const dispatchLoanEvent = (actionType, payload) => {
		switch (actionType) {
			case 'SET_ISBN':
				setCodes({ ...codes, isbn: payload.isbn });
				return;
            case 'SET_RETURNEE':
                setCodes({ ...codes, returnee: payload.returnee });
				return;
			default:
				return;
		}
	};

  return (
    <LoanContext.Provider value={{codes, dispatchLoanEvent}}>  
        <Scanner title={"Loan"} action={action}/>
    </LoanContext.Provider>
  )
}

export default LoansScanner