import React from 'react'
import { Link } from 'react-router-dom'

export default ({}) => {
	const date = new Date(),
		today = date.toLocaleDateString('fr', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	return (
		<div
			css={`
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				height: 100vh;
				small {
					font-size: 100%;
					font-style: italic;
				}
				em {
					background: #78e08f;
					font-style: normal;
					padding: 0 0.2rem;
				}
				h1 {
					margin-top: 0.6rem;
					margin-bottom: 3rem;
				}
			`}
		>
			<small>{today}</small>
			<h1>
				Une journée <em>écolo</em> ?
			</h1>
			<Link to="/journée/ajouter">
				<button className="ui__ button plain">Faire le test</button>
			</Link>
		</div>
	)
}
