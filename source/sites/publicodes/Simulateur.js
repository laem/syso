import { React } from 'Components'
import { EndingCongratulations } from 'Components/conversation/Conversation'
import PeriodSwitch from 'Components/PeriodSwitch'
import ShareButton from 'Components/ShareButton'
import Simulation from 'Components/Simulation'
import withSimulationConfig from 'Components/simulationConfigs/withSimulationConfig'
import { Markdown } from 'Components/utils/markdown'
import { decodeRuleName, findRuleByDottedName } from 'Engine/rules'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { flatRulesSelector } from 'Selectors/analyseSelectors'
import CarbonImpact from './CarbonImpact'
import ItemCard from './ItemCard'

export default connect(state => ({
	rules: flatRulesSelector(state),
	scenario: state.scenario
}))(props => {
	let objectif = props.match.params.name,
		decoded = decodeRuleName(objectif),
		rule = findRuleByDottedName(props.rules, decoded),
		Simulateur = withSimulationConfig({
			objectifs: [decoded]
		})(() => (
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
						rule.description ? (
							<Markdown source={rule.description} />
						) : (
							<EndingCongratulations />
						)
					}
					targets={
						<>
							<ItemCard large dottedName={rule.dottedName} />
							{rule.period === 'flexible' && <PeriodBlock />}
						</>
					}
				/>
				<CarbonImpact />
				<ShareButton
					text="Mesure ton impact sur Futur.eco !"
					url={'https://' + window.location.hostname + props.match.url}
					title={rule.title}
				/>
			</div>
		))

	return <Simulateur />
})

let PeriodBlock = () => (
	<div css="display: flex; justify-content: center">
		<PeriodSwitch />
	</div>
)
