import { Markdown } from 'Components/utils/markdown'
import React, { useEffect } from 'react'
import emoji from 'react-easy-emoji'
import { Link } from 'react-router-dom'

const blackScreenStyle = `
		background: black;
		width: 100vw;
		height: 100vh;
		color: white;
		h1{
		text-shadow: red 3px 3px 3px;
		margin: 0 0 1.6rem;font-size: 300%
		}
		button, h1 {
			color: white;
		}
		display: flex; flex-direction: column; justify-content: center;
		padding: 2rem;
		text-align: center;
		p {
			line-height: 1.3rem;
			max-width: 30rem;
			margin: 1rem auto;

		}
		> a {
		  margin-top: 1.4rem;
		}
		blockquote{padding: .1rem}
`

export default function LimitReached({
	setNextLimit,
	scenarioData: { réchauffement, message, titre },
}) {
	useEffect(() => {
		window.navigator.vibrate(200)
	}, [])
	const gameOver = titre.includes('change rien')
	return (
		<div css={blackScreenStyle}>
			<>
				{!gameOver && (
					<h1>
						{emoji('🌡️')} {réchauffement}
					</h1>
				)}
				<Markdown source={message} />
				<Link to="/journée/thermomètre" onClick={() => setNextLimit()}>
					{!gameOver ? (
						<button className="ui__ button plain">Continuer ma journée</button>
					) : (
						'Voir mes résultats'
					)}
				</Link>
			</>
		</div>
	)
}
