import React, { useEffect } from 'react'

const Alert = ({msg,type,removeAlert,list}) => {
    useEffect(() => {
        let timeout = setTimeout(()=>{
          removeAlert() // alert.show is false by default value
        },3000)

        return () => {
          clearTimeout(timeout)
        }
    }, [list])
    return (
        <p className={`alert alert-${type}`}>{msg}</p>
    )
}

export default Alert
