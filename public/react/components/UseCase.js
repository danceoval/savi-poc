import React from 'react';
import {ButtonContainer} from './ButtonContainer'

export const UseCase = (props) => {
	const {useCase} = props;
	return (
		<div>
			<div>
			<h1>{useCase.header}</h1>
			{
				useCase.hasOwnProperty("text") && useCase.text.map((t, i) => <p key={i}>{t}</p>)
			}
			</div>
			<div>
			{
				useCase.hasOwnProperty("time") && (<p className="highlight">{useCase.time}</p>)
			}
			</div>
			<ButtonContainer stateIdx={props.stateIdx} handleButtonClick={props.handleButtonClick}/>
		</div>

	)

}