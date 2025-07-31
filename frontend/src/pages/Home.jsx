import React from 'react'
import '../pageStyles/Home.css';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import ImageSlider from '../components/ImageSlider';
import Product from '../components/Product';
const products = [
  {
            "_id": "687dde7dc9179ce303ad37c3",
            "name": "Product1",
            "description": "Product description1",
            "price": 230,
            "ratings": 1.5,
            "image": [
                {
                    "public_id": "This is test ID 1",
                    "url": "This is test url1",
                    "_id": "687dde7dc9179ce303ad37c4"
                }
            ],
            "category": "food",
            "stock": 6,
            "numOfReviews": 2,
            "reviews": [],
            "createdAt": "2025-07-21T06:30:21.161Z",
            "__v": 0
        },
        {
            "_id": "687dde9bc9179ce303ad37c6",
            "name": "Product3",
            "description": "Product description3",
            "price": 760,
            "ratings": 3,
            "image": [
                {
                    "public_id": "This is test ID 3",
                    "url": "This is test url3",
                    "_id": "687dde9bc9179ce303ad37c7"
                }
            ],
            "category": "chicken",
            "stock": 1,
            "numOfReviews": 3,
            "reviews": [],
            "createdAt": "2025-07-21T06:30:51.775Z",
            "__v": 0
        },
        
];

const Home = () => {
  return (
    <>
        <Navbar />
        <ImageSlider />
        <div className='home-container'>
            <h2 className='home-heading'> Trending Now</h2> 
            <div className="home-product-container">
              { products.map( (product, index)=> (
                <Product product={product} key={index} />
              ))} 
            </div>  
        </div>
        <Footer />
    </> 
  )
}

export default Home
