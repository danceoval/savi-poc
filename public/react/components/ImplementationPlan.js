import React, { useState, useEffect, useRef } from 'react';
import {ButtonContainer} from './ButtonContainer';
import {ProgressBar} from './ProgressBar';

export const ImplementationPlan = (props) => {
  const {
    stateIdx, 
    handleButtonClick, 
    plan, 
    percentage, 
    setPercentage,
    error, 
    setError,
    success,
    submitEvidence,
    setFileName,
    fileName,
    handleProgress,
    setLoadingState,
    submitMsg 
  } = props;

  console.log("PROPS IN IMPLEMENTATIONL ", props);

  return (
    <div>
     {
      !!Object.keys(plan).length && (
         <div>
            <h1>{plan.header}</h1>
            {
              plan.steps.map((step, idx) => {
                return ( idx == 0 ? (
                    <div className="step-active">
                      <h3 className="highlight">{step.title}</h3>
                      <h4 className="highlight">{step.length}</h4>
                      <p>Your goals are as follows:</p>
                      <ol>
                        {
                          step.goals.map((goal, goalIdx) => {
                            return <li key={goalIdx}>{goal}</li>
                          })
                        }
                      </ol>
                      <p>{step.submission}</p>
                      <h4>Recommended Resources:</h4>
                      <ul>
                        {
                          step.resources.map((resource, resourceIdx) => (
                            <li key={resourceIdx}><u className="highlight">{resource.title}</u> {resource.len} </li>
                          ))
                        }
                      </ul>
                      <ButtonContainer
                            stateIdx={props.stateIdx}
                            handleButtonClick={handleButtonClick}
                            submitEvidence={submitEvidence}
                            handleProgress={handleProgress}
                            setLoadingState={setLoadingState}
                            error={error}
                            setError={setError}
                            submitMsg={submitMsg}
                            setFileName={setFileName}
                            fileName={fileName}
                            success={success}
                          />
                    </div>
                  ) : (
                    <div className="step-inactive">
                      <div className="step-body">
                        <span className="step-title">{step.title}</span>
                        <span className="step-time">{step.length}</span>
                      </div>
                      <div className="open-icon">
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </div>
                    </div>
                  )
                )
              })
            }
          </div> 

      )
     }
    </div>

  )



}