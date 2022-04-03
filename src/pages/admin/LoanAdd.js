import React, {useState} from 'react'
import { Scanner } from '../../components'
import { config } from '../../helpers/constants'
import { LoanContext } from '../../helpers/contexts/LoanContext';
import {useScanner} from '../../helpers/hooks';

const LoanAdd = () => {
    const [codes, result, dispatchLoanEvent] = useScanner();

    const action = () => {
        fetch(config.url.API_URL + `/api/Loans/newLoan/${codes.isbn}/${codes.returnee}`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then(async (response) => {
            if (!response.ok) {
                throw Error(await response.text());
        }
            else return response.text();
        })
        .then((text) => {
            dispatchLoanEvent("SET_RESULT", {
                color: "green",
                message: "Loan Successful!"
            })
        }).catch((err) => {
            dispatchLoanEvent("SET_RESULT", {
                color: "red",
                message: err.message
            })
        })
    }

  return (
    <LoanContext.Provider value={{codes, dispatchLoanEvent}}>  
        <Scanner result={result} title={"Loan"} action={action}/>
    </LoanContext.Provider>
  )
}

export default LoanAdd