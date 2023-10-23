import React from 'react';



export const ButtonListManager = (props) => {

  return (
 	<div>
 		{
	        props.stage == 'Discovery' ? (<button onClick={() => props.handleButtonClick("Show")}>
	           Show me the Upskilling Plan
	          </button> ) : (<button onClick={() => props.handleButtonClick("Plan")}>
	            Let's Get Started
	          </button>
	          ) 
      	}  
	      <button onClick={() => props.handleButtonClick("Recommend")}>
	          Recommend another suitable use case
	      </button>
 	</div>
  );
};

