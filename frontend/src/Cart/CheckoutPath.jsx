import React from 'react'
import '../CartStyles/CheckoutPath.css'
import { AccountBalance, LibraryAddCheck, LocalShipping } from '@mui/icons-material'

const CheckoutPath = ({activePath}) => {
    const path = [
        {
            label:'Shipping Details',
            icon: <LocalShipping />
        },
        {
            label:'Confirm Order',
            icon: <LibraryAddCheck />
        },
        {
            label:'Payment',
            icon: <AccountBalance />
        }
    ]
  return (
    <div className='checkoutPath'>
      { path.map((item,index)=>(
        <div key={index} className="checkoutPath-step"
        active={activePath===index? 'true':'false'} 
        completed={ activePath>=index ?'true': 'false' } >
        <p className="checkoutPath-icon">
            {item.icon}
        </p>
        <p className="checkoutPath-label">{item.label}</p>
      </div>
      ))}
    </div>
  )
}

export default CheckoutPath
