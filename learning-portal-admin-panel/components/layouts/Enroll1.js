import React from 'react'
import { Transition } from '@headlessui/react'
import { useState,useEffect } from "react";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import { XIcon } from "@heroicons/react/outline";

const Enroll = (props) => {


    const [isShowing, setIsShowing] = useState(props.open);
    const [coursesdisplay,setCoursesDisplay]=useState(true);
    const [assessmentdisplay,setAssessmentDisplay]=useState(false);

    const[id,setId]=useState(props.id);

    const [userdata,setUserData]=useState();
    const [userdata1,setUserData1]=useState();


    const closed = () =>{

// setIsShowing(false);
props.onChangeOpen();

    }



    useEffect(() => {

        setIsShowing(props.open)




        axios.post(API_URL + "topicfeedback/displaytopicfeedback.php",{
id:props.id,


    }).then(function(response) {


console.log(response.data?.data)
setUserData(response.data?.data)

})

      












        
    },[props.open])















    return (
        <>
            






            <Transition
        show={isShowing}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        
      










            <div class="grid md:grid-cols-2 grid-cols-1  h-screen w-screen absolute top-0 z-20">


<div class="hai bg-black opacity-50 hidden md:block">

</div>

<div class="bg-white opacity-100">



<div class=" flex justify-between items-center  px-3 py-7 bg-gray-50 flex-1" > 

<div>
<p class=" text-lg">Feedback List</p>
<p class="text-sm text-gray-500">below you can see the feedback list given by students .</p>
</div> 


<XIcon onClick={() => closed()} className="h-8 w-8 hover:bg-gray-200 p-2" aria-hidden="true" />

</div>


{/* <div class="px-10 py-3 flex justify-center"> 

<div class="inline-flex">
    <button onClick={() =>{setCoursesDisplay(true);
    setAssessmentDisplay(false);
    }}  type="button" class="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-6 rounded-l active:z-1 focus:z-1 -mr-px border-indigo-200 bg-indigo-200 text-indigo-700 hover:text-indigo-700 hover:bg-indigo-300 hover:border-indigo-300 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-200 active:border-indigo-200">
      courses
    </button>
    <button onClick={() =>{setAssessmentDisplay(true);
    setCoursesDisplay(false)}} type="button" class="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-6 active:z-1 focus:z-1 -mr-px border-indigo-200 bg-indigo-200 text-indigo-700 hover:text-indigo-700 hover:bg-indigo-300 hover:border-indigo-300 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-200 active:border-indigo-200">
      Assessments
    </button>
   
</div>

</div> */}








{userdata ? (

userdata.map((data) => (

  <div key={data.ID} class="bg-gray-200 py-10 px-12 mb-1 rounded-lg mt-1 ">


<p class=" text-xl font-semibold">{data.FullName}</p>
<div>{data.Feedback}</div>

</div>


))):""}







</div>

</div>







</Transition>






        </>
    )
}

export default Enroll
