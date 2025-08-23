import React, { useState } from 'react'
import '../CartStyles/OrderConfirm.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'
import CheckoutPath from './CheckoutPath'
import { useNavigate } from 'react-router-dom'

const OrderConfirm = () => {
    const {shippingInfo, cartItems} = useSelector(state => state.cart);
    const {user} = useSelector(state => state.user);
    const subTotal = cartItems.reduce( (acc, item)=> acc + item.price * item.quantity,0 )
    const tax = Math.ceil(subTotal* 0.18);
    const shippingCharges = subTotal> 499 ? 0 : 50;
    const total = subTotal + tax + shippingCharges;
    const navigate = useNavigate();

    const proceedToPayment = ()=> {
        const data = {
            subTotal,
            tax,
            shippingCharges,
            total
        }
        sessionStorage.setItem('orderItem', JSON.stringify(data))
        navigate('/process/payment')
    }

  return (
    <>
    <PageTitle title='Order Confirmation' />
    <Navbar />
    <CheckoutPath activePath={1}/>
    <div className="confirm-container">
        <h1 className="confirm-header">Order Confirmation</h1>
        <div className="confirm-table-container">
            <table className="confirm-table">
                <caption>Shipping Details</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user.name}</td>
                        <td>{shippingInfo.phoneNumber}</td>
                        <td>{shippingInfo.address},{shippingInfo.city},{shippingInfo.state},{shippingInfo.country}-{shippingInfo.pinCode}</td>
                    </tr>
                </tbody>
            </table>

            <table className="confirm-table cart-table">
                <caption>Cart Items</caption>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartItems.map((item)=>(
                            <tr key={item.product}>
                                <td><img src={item.image} alt={item.name} className='order-product-image' /></td>
                                <td>{item.name}</td>
                                <td>{item.price}/-</td>
                                <td>{item.quantity}</td>
                                <td>{item.quantity * item.price}/-</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <table className="confirm-table">
                <caption>Order Summary</caption>
                <thead>
                    <tr>
                        <th>Subtotal</th>
                        <th>Gst</th>
                        <th>Shipping Charges</th>
                        <th>Total </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{subTotal}/-</td>
                        <td>{tax}/-</td>
                        <td>{shippingCharges}/-</td>
                        <td>{total}/-</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <button className="proceed-button"
        onClick={proceedToPayment}>
            Proceed to Payment
        </button>
        
    </div>
    <Footer />
    </>
  )
}

export default OrderConfirm
