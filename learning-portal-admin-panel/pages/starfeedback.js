import React from 'react'
import { Transition } from '@headlessui/react'
import { useState,useEffect } from "react";
const axios = require("axios");
import { API_URL } from "../config/constants";
import { XIcon } from "@heroicons/react/outline";



import { Rating } from 'react-simple-star-rating'







const starfeedback = () => {



const [isShowing, setIsShowing] = useState(false);




const [rating, setRating] = useState("your rating"); // initial rating value

// Catch Rating value
const handleRating = (rate) => {
  setRating(rate)
  // other logic
}






    return (
        <div>
            

            <div className='App'>
      <Rating
        onClick={handleRating}
        ratingValue={rating}
        size={20}
        label
        transition
        fillColor='orange'
        emptyColor='gray'
        className='foo' 
        emptyStyle={{display : "flex"}}
        transition="true"
        
      />
  
      {rating}
    </div>

            
            {/* <div className='App'>
      <Rating onClick={handleRating} ratingValue={rating} showTooltip="true" emptyStyle={{display : "flex"}} fullStyle={{display : "inline"}} transition="true" className='foo'/>
    </div>
    

{rating} */}
        </div>
    )
}

export default starfeedback
