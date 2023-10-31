      /* This is for upskilling plan*/ 
              (props.stateIdx == 3 && Object.keys(plan).length > 0) && (
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
                                messages={messages}
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