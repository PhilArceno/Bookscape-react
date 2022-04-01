import React from 'react'
import { Scanner } from '../../components'

const ReturnsScanner = () => {
    const action = () => {
        console.log("hrllo")
    }
  return (
    <Scanner title={"Return"} action={action}/>
  )
}

export default ReturnsScanner