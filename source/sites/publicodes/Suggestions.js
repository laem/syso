import { emoji, React } from 'Components'
import searchWeights from 'Components/searchWeights'
import { encodeRuleName, findRuleByDottedName } from 'Engine/rules'
import Fuse from 'fuse.js'
import { apply, concat, has, partition, pick, pipe, prop, sortBy } from 'ramda'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { flatRulesSelector } from 'Selectors/analyseSelectors'
import ItemCard from './ItemCard'

let buildFuse = rules =>
	new Fuse(
		rules.map(pick(['title', 'espace', 'description', 'name', 'dottedName'])),
		{
			keys: searchWeights,
			threshold: 0.3
		}
	)

import { setSimulationConfig } from 'Actions/actions'
import { analysisWithDefaultsSelector } from '../../selectors/analyseSelectors'
export default connect(
	state => ({
		flatRules: flatRulesSelector(state),
		analysis: state.simulation && analysisWithDefaultsSelector(state)
	}),
	{ setSimulationConfig }
)(({ input, flatRules, setSimulationConfig, analysis }) => {
	console.log('ana', analysis)

	let [fuse, setFuse] = useState(null)

	let exposedRules = flatRules.filter(rule => rule.exposé === 'oui')

	useEffect(() => {
		setFuse(buildFuse(exposedRules))
		setSimulationConfig({
			objectifs: exposedRules.map(({ dottedName }) => dottedName)
		})
	}, [])

	if (!analysis) return <div>Calculs en cours...</div>

	let filteredRules = pipe(
		partition(has('formule')),
		apply(concat)
	)(fuse && input ? fuse.search(input) : exposedRules)

	return (
		<section style={{ marginTop: '2rem' }}>
			{filteredRules.length ? (
				input && <h2 css="font-size: 100%;">Résultats :</h2>
			) : (
				<p>Rien trouvé {emoji('😶')}</p>
			)}
			{filteredRules && (
				<ul css="display: flex; flex-wrap: wrap; justify-content: space-evenly;     ">
					{sortBy(
						prop('nodeValue'),
						filteredRules.map(({ dottedName }) =>
							findRuleByDottedName(analysis.targets, dottedName)
						)
					)
						.reverse()
						.map(rule => {
							return (
								<li css="list-style-type: none" key={rule.dottedName}>
									<Link
										to={
											rule.formule != null
												? '/simulateur/' + encodeRuleName(rule.dottedName)
												: '#'
										}
										css={`
											text-decoration: none !important;
											:hover {
												opacity: 1 !important;
											}
										`}>
										<ItemCard dottedName={rule.dottedName} />
									</Link>
								</li>
							)
						})}
				</ul>
			)}
		</section>
	)
})
