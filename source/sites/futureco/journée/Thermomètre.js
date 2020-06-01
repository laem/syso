import React, { useContext } from 'react'
import emoji from 'react-easy-emoji'
import { Link } from 'react-router-dom'
import scenarios from '../scenarios.yaml'
import { StoreContext } from '../StoreContext'
import Activité from './Activité'
import LimitReached from './Limit'
import { splitEvery } from 'ramda'
import tinygradient from 'tinygradient'
import AddButton from './AddButton'
import {
	Objectif1point5,
	Objectif1point5Raté,
	AccordDeParis,
	Soutenable,
	PasSoutenable,
	Objectif2,
	Objectif2Raté,
} from '../jugement'

const computeFootprint = (analysis, items) =>
	analysis.reduce((memo, item) => {
		const itemNode = item.targets[0]
		const count =
			items.find((i) => i.dottedName === itemNode.dottedName).count || 1
		return memo + itemNode.nodeValue * count
	}, 0)

const blockWidth = 10

export const limitReached = (analysis, items, quota) =>
	computeFootprint(analysis, items) > (quota * 1000) / 365

const gradient = tinygradient([
		'#78e08f',
		'#f6b93b',
		'#b71540',
		'#e84393',
		'#8854d0',
		'#000000',
	]),
	colors = gradient.rgb(40)

export default function Thermomètre({ analysis }) {
	const {
		state: { items, scenario, progression },
		dispatch,
	} = useContext(StoreContext)
	const scenarioData = scenarios[scenario],
		{ 'crédit carbone par personne': quota } = scenarioData

	const setNextLimit = () => {
			const next = { C: 'B', B: 'A', A: '0' }[scenario]

			dispatch({
				type: 'SET_SCENARIO',
				scenario: next,
			})
		},
		quota0 = scenarios['C']['crédit carbone par personne']

	const dayFootprint = computeFootprint(analysis, items),
		footprint = dayFootprint * 365

	// For now, we compute limits knowing that we must reduce our footprint by 7% every year for 1.5°, and 4% every year for 2°.
	const footprintSoutenable = 2000,
		footprint1point5 = (11000 * (100 - 7)) / 100,
		footprint2 = (11000 * (100 - 4)) / 100

	const {
		done,
		pasSoutenable,
		accordDeParis,
		objectif1point5Raté,
		objectif2Raté,
	} = progression
	const currentLimit = !pasSoutenable
		? footprintSoutenable
		: !objectif1point5Raté
		? footprint1point5
		: footprint2

	if (done)
		return footprintSoutenable ? (
			<Soutenable />
		) : footprint < footprint1point5 ? (
			<Objectif1point5 />
		) : (
			<Objectif2 />
		)
	const update = (k, v) =>
		dispatch({
			type: 'SET_PROGRESSION',
			progression: { ...progression, [k]: v },
		})

	if (footprint > footprintSoutenable && !pasSoutenable)
		return <PasSoutenable next={() => update('pasSoutenable', true)} />
	if (footprint > footprintSoutenable && pasSoutenable && !accordDeParis)
		return <AccordDeParis next={() => update('accordDeParis', true)} />
	if (footprint > footprintSoutenable && accordDeParis) null

	if (footprint > footprint1point5 && !objectif1point5Raté)
		return (
			<Objectif1point5Raté next={() => update('objectif1point5Raté', true)} />
		)

	if (footprint > footprint1point5 && objectif1point5Raté) return null
	if (footprint > footprint2 && !objectif2Raté)
		return <Objectif2Raté next={() => update('objectif2Raté', true)} />

	return (
		<div css="position: relative">
			<AddButton displayCheck={items.length > 3} />

			{!items.length && (
				<p
					css={`
						padding: 0.4rem;
						background: var(--color);
						color: white;
						line-height: 1.5rem;
						position: fixed;
						top: 46%;
						width: 100%;
						text-align: center;
					`}
				>
					Ajoute ce que tu as fait aujourd'hui pour connaître ton impact sur le
					climat {emoji('🌍🌳🐨')}{' '}
				</p>
			)}

			<LimitBar
				{...{
					text: 'Limite pour une journée écolo',
					style: pasSoutenable
						? `top: ${
								((currentLimit - footprintSoutenable) / footprintSoutenable) *
								100
						  }vh; opacity: .75;`
						: 'top: 0vh;',
				}}
			/>
			{footprint > footprintSoutenable && (
				<LimitBar
					{...{ text: 'Limite pour un monde à +1.5°', style: ' top: 0vh;' }}
				/>
			)}
			<div
				css={`
					/* footprintsoutenable is 100vh : it's what we're supposed to limit our consumptions to.
				 * 
				 * */

					height: ${Math.round(
						(currentLimit / footprintSoutenable) * 100 -
							(footprint / footprintSoutenable) * 100
					)}vh;
					background: white;
				`}
			></div>
			{items.length > 0 && (
				<ul
					css={`
						display: flex;
						justify-content: flex-start;
						flex-wrap: wrap-reverse;
						width: 100vw;
						margin: 0;
						padding: 0;
						> div > li {
							padding-left: 1rem;
							list-style-type: none;
						}
						li img {
							font-size: 180%;
						}
						p {
							max-width: 25rem;
							text-align: center;
							margin: 0 auto;
							color: white;
						}
						> div {
							display: flex;
						}
						/* This should make it like a snake rather
						 * than returning to the beggining of the line 
						 * for each line break
						 * But of it to work we must add the missing bricks on the line
						> div:nth-child(even) {
							display: flex;
							flex-direction: row-reverse;
							justify-content: flex-end;

						}
						*/
					`}
				>
					{splitEvery(
						blockWidth,
						analysis
							.map((item, i) => {
								const dottedName = item.targets[0].dottedName
								const itemToUpdate = items.find(
									(i) => i.dottedName === dottedName
								)
								const count = itemToUpdate.count || 1
								return Activité({
									item,
									quota0,
									blockWidth,
									quota,
									count,
									changeItemCount: (increment = true) => () =>
										dispatch({
											type: 'SET_ITEMS',
											items: items.map((i) =>
												i.dottedName === dottedName
													? {
															...itemToUpdate,
															count: increment ? count + 1 : count - 1,
													  }
													: i
											),
										}),
									// animate the last item added only.
									animate: items.length - 1 === i,
									color: colors[i] || '#000000',
								})
							})
							.flat()
					).map((line, i) => (
						<div key={i}>{line}</div>
					))}
					<li
						css={`
							flex-grow: 1;
							background: white;
							display: flex;
							justify-content: center;
							align-items: center;
						`}
					></li>
				</ul>
			)}
		</div>
	)
}

const LimitBar = ({ text, style }) => {
	return (
		<div
			css={`
				position: absolute;
				color: white;
				background: #079992;
				width: 100%;
				text-align: center;
				padding-left: 0.6rem;
				z-index: 1;
				height: 1.5rem;
				line-height: 1.5rem;
				font-size: 120%;
				${style}
			`}
		>
			{text}
		</div>
	)
}
