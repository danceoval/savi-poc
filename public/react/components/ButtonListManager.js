import React from 'react';



export const ButtonListManager = (props) => {

  return (
 	<div>
 		{
	        props.stage == 'Discovery' ? (<button onClick={() => props.handleButtonClick("Show")}>
	           Show me the implementation plan and dependencies
	          </button> ) : (<button onClick={() => props.handleButtonClick("Plan")}>
	            Implement the recommendation
	          </button>
	          ) 
      	}  
	      <button onClick={() => props.handleButtonClick("Recommend")}>
	          Recommend another suitable use case
	      </button>
 	</div>
  );
};

