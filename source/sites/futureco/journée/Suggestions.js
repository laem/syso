import React, { useContext } from 'react'
import emoji from 'react-easy-emoji'
import { Link } from 'react-router-dom'
import { encodeRuleName, findRuleByDottedName } from 'Engine/rules'
import { StoreContext } from '../StoreContext'

const suggestions = [
	'logement . un jour sous un toit',
	'nourriture . Viennoiserie brioche - type brioche',
	'nourriture . Tasse de café',
	'nourriture . Tasse de thé',
	'nourriture . Bol de céréales',
	'douche . impact par douche',
	"transport . impact à l'usage",
	'numérique . téléphone journée',
	'numérique . ordinateur journée',
	'lire un livre',
	'nourriture . Steak-frites',
	'nourriture . Salade verte - avec sauce',
]

export default ({ rules }) => {
	const {
		state: { items, crossedSuggestions },
		dispatch,
	} = useContext(StoreContext)
	return (
		<div>
			<small>Suggestions</small>
			<ul
				css={`
					padding: 0;
					margin-bottom: 2rem;
					li {
						margin: 0 0 1rem;
						list-style-type: none;
						width: 100%;
					}
					img {
						font-size: 150%;
					}
				`}
			>
				{suggestions
					.filter((s) => !crossedSuggestions.includes(s))
					.map((dottedName) => findRuleByDottedName(rules, dottedName))
					.filter(
						({ journée, dottedName }) =>
							!items.find((item) => item.dottedName === dottedName)
					)
					.map((item) => {
						let { title, icônes, dottedName, formule } = item
						return (
							<li
								key={title}
								css={`
									a,
									a button {
										width: 30rem;
										max-width: 80%;
									}
									a button {
										padding: 0.6rem;
									}
									> button {
										padding: 0;
									}
								`}
							>
								<Link to={'/journée/simulateur/' + encodeRuleName(dottedName)}>
									<button className="ui__ card">
										{emoji(icônes || '')} {title}
									</button>
								</Link>
								<button
									css="font-size: 50%"
									onClick={() =>
										dispatch({
											type: 'CROSS_SUGGESTION',
											suggestion: dottedName,
										})
									}
								>
									{emoji('✖')}
								</button>
							</li>
						)
					})}
			</ul>
		</div>
	)
}
