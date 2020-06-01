import React from 'react'
import { Link } from 'react-router-dom'
import { blackScreenStyle } from '../jugement'
import emoji from 'react-easy-emoji'

export default ({ objectif2Raté, objectif1point5Raté, pasSoutenable }) => (
	<div
		css={`
			${blackScreenStyle}
			background: green;
		`}
	>
		<h1>{emoji('🥳')} Bravo !</h1>
		<p>
			Tu sembles bien parti pour une vie sobre, compatible avec un climat
			stable.
		</p>
		<p>
			Attention cependant, il suffit d'un vol d'avion dans l'année pour ruiner
			tout le reste.
		</p>
		<p>
			D'autres indicateurs sont à surveiller également, mais pas encore faciles
			à mesurer. Par exemple l'empreinte au sol, qui impacte la biodiversité 🦔.
		</p>
	</div>
)
