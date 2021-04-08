import React from 'react'; 
import ReactLoading from 'react-loading'; 

function Loader({type, color, message}) { 
    return ( 
        <div class="contentWrap"> 
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}> 
            <div style={{color:"#666666", textAlign:"center"}}>
                <div>{message} 😀</div> <div>잠시만 기다려주세요. </div> 
            </div>
            <div style={{marginLeft:"35%"}}>
                <ReactLoading type={type} color={color} height={'40%'} width={'40%'} /> 
            </div>
                
            </div> 
         </div> 
        
    ); 
            
        
} 

export default Loader;
