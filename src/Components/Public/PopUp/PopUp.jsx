import React from 'react';
import swal from 'sweetalert';

const PopUp = () =>{

    const handleErrorClick = ()=>{
        swal("Good job!", "You clicked the button!", "success");
    }

    return (
        <div>
            <button onClick={()=>handleErrorClick()}>LỖI</button>
        </div>
    )
}

export default PopUp;