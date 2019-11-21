import { emoji } from 'Components'
import React, { useContext } from 'react'
import HumanImpact from './HumanImpact'
import { useSelector } from 'react-redux'
import { StoreContext } from './StoreContext'
import {
	analysisWithDefaultsSelector,
	nextStepsSelector
} from 'Selectors/analyseSelectors'

export default ({ large = false, dottedName }) => {
	const {
		analysis: { targets },
		foldedSteps,
		nextSteps
	} = useSelector(state => ({
		analysis: analysisWithDefaultsSelector(state),
		foldedSteps: state.conversationSteps.foldedSteps,
		nextSteps: nextStepsSelector(state)
	}))
	const {
		state: { scenario }
	} = useContext(StoreContext)

	let { formule, icônes, nodeValue, title } = targets.find(
		target => target.dottedName === dottedName
	)

	return (
		<div css="display: flex; justify-content: center;">
			<div
				key={dottedName}
				css={`
					font-size: ${large ? '120%' : '115%'};
					padding: 0;
					width: ${large ? '18rem' : '10rem'};
					position: relative;
					display: flex;
					align-items: center;
					justify-content: middle;
					text-align: center;
					flex-wrap: wrap;
					line-height: 1.2em;
					${formule != null ? '' : 'filter: grayscale(70%); opacity: 0.6;'}

					background-color: var(--lightestColour);
					color: var(--darkColour);
					margin: 1rem 0;
					border-radius: 0.3rem;
					box-shadow: 0 1px 3px rgba(41, 117, 209, 0.12),
						0 1px 2px rgba(41, 117, 209, 0.24);
					transition: box-shadow 0.2s;

					:hover {
						opacity: 1 !important;
						box-shadow: 0px 2px 4px -1px rgba(41, 117, 209, 0.2),
							0px 4px 5px 0px rgba(41, 117, 209, 0.14),
							0px 1px 10px 0px rgba(41, 117, 209, 0.12);
					}
				`}>
				<div
					css={`
						padding: 1rem;
						padding-bottom: 0.8rem;
						width: 100%;
						${!large ? 'min-height: 7rem;' : ''}
					`}>
					<div css="width: 100%; img { font-size: 150%}}; line-height: 2rem">
						{icônes && emoji(icônes + ' ')}
					</div>
					<span css="width: 100%">{title}</span>
				</div>
				<HumanImpact
					{...{
						large,
						nodeValue,
						formule,
						dottedName,
						scenario,
						nextSteps,
						foldedSteps
					}}
				/>
			</div>
		</div>
	)
}
