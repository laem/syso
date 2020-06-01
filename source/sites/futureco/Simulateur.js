import { setSimulationConfig } from 'Actions/actions'
import { EndingCongratulations } from 'Components/conversation/Conversation'
import PeriodSwitch from 'Components/PeriodSwitch'
import ShareButton from 'Components/ShareButton'
import Simulation from 'Components/Simulation'
import { Markdown } from 'Components/utils/markdown'
import { decodeRuleName, findRuleByDottedName } from 'Engine/rules'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {
	analysisWithDefaultsSelector,
	flatRulesSelector,
	nextStepsSelector,
} from 'Selectors/analyseSelectors'
import CarbonImpact from './CarbonImpact'
import ItemCard from './ItemCard'
import useSound from 'use-sound'
import sound from 'file-loader!./brick.mp3'

const Simulateur = (props) => {
	const [play] = useSound(sound, { volume: 0.05 })
	const { name: objectif } = useParams(),
		decoded = decodeRuleName(objectif),
		rules = useSelector(flatRulesSelector),
		rule = findRuleByDottedName(rules, decoded),
		dispatch = useDispatch(),
		config = {
			objectifs: [decoded],
		},
		configSet = useSelector((state) => state.simulation?.config),
		situation = useSelector((state) => state.simulation?.situation),
		{ analysis, nextSteps, foldedSteps } = useSelector((state) => ({
			analysis: analysisWithDefaultsSelector(state),
			foldedSteps: state.conversationSteps.foldedSteps,
			nextSteps: nextStepsSelector(state),
		})),
		targets = analysis.targets

	useEffect(
		() =>
			console.log('dispatchsimulconf') || dispatch(setSimulationConfig(config)),
		[]
	)
	console.log('YAYA', configSet, analysis)
	if (!targets) return null

	return (
		<div className="ui__ container" css="margin-bottom: 1em">
			<Helmet>
				<title>{rule.title}</title>
				{rule.description && (
					<meta name="description" content={rule.description} />
				)}
			</Helmet>
			<Simulation
				noFeedback
				noProgressMessage
				showConversation
				customEnd={
					props.onEnd ? (
						<Link to="/journée/thermomètre">
							<button
								className="ui__ button"
								onClick={() => {
									play()
									props.onEnd(rule.dottedName, situation)
								}}
							>
								Ajouter
							</button>
						</Link>
					) : (
						<>
							{rule.description ? (
								<Markdown source={rule.description} />
							) : (
								<EndingCongratulations />
							)}
						</>
					)
				}
				targets={
					<>
						<ItemCard
							{...targets[0]}
							showHumanCarbon
							nextSteps={nextSteps}
							foldedSteps={foldedSteps}
						/>
						{rule.period === 'flexible' && <PeriodBlock />}
					</>
				}
			/>
			<CarbonImpact
				{...targets[0]}
				showHumanCarbon
				nextSteps={nextSteps}
				foldedSteps={foldedSteps}
			/>
			<ShareButton
				text="Mesure ton impact sur Futur.eco !"
				url={window.location.href}
				title={rule.title}
			/>
		</div>
	)
}

let PeriodBlock = () => (
	<div css="display: flex; justify-content: center">
		<PeriodSwitch />
	</div>
)

export default Simulateur
