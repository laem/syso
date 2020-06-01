import React from 'react'
import emoji from 'react-easy-emoji'

export const blackScreenStyle = `
		background: black;
		width: 100vw;
		height: 100vh;
		color: white;
		font-size: 120%;
		h1{
		text-shadow: red 3px 3px 3px;
		margin: 0 0 1.6rem;
		font-size: 300%
		}
		button, h1 , h2 , h3{
			color: white;
		}
		button {
		max-width: 10rem;
margin: 2rem auto;

		}
		display: flex; flex-direction: column; justify-content: center;

		padding: 2rem;
		p {
			line-height: 1.3rem;
			max-width: 30rem;
			margin: 1rem auto;

		}
		> a {
		  margin-top: 1.4rem;
		}
		blockquote{padding: .1rem}
		 strong {
color: red
		 }
`

export const PasSoutenable = ({ next }) => (
	<div css={blackScreenStyle}>
		<h1>{emoji('😟')} Journée pas écolo</h1>
		<p>
			Ta journée n'est pas soutenable, car elle dépasse la capacité naturelle de
			notre pays à encaisser nos émissions de gaz à effet de serre.
		</p>
		<h2>Pas de panique ! </h2>
		<p>
			Nous somme presque tous dans cette galère, et ce n'est heureusement pas
			encore la fin du monde.
		</p>
		<button className="ui__ button plain" onClick={next}>
			OK
		</button>
	</div>
)

export const AccordDeParis = ({ next }) => (
	<div css={blackScreenStyle}>
		<p>
			Pas facile d'être écolo dans une société axée sur la croissance du PIB.
		</p>
		<p>
			Fin 2015 à Paris, les pays du monde l'ont bien compris et se sont mis
			d'accord :{' '}
			<strong>
				on doit limiter la casse climatique à un réchauffement de 1.5°.
			</strong>
		</p>
		<p>Prêt à relever le défi ?</p>
		<button className="ui__ button plain" onClick={next}>
			C'est parti !{' '}
		</button>
		<a href="https://www.40millionsdautomobilistes.com/" target="_blank">
			<button>Non</button>
		</a>
	</div>
)
export const Objectif1point5 = ({ next }) => (
	<div css={blackScreenStyle}>
		<h1>Objectif 1.5° : réussi {emoji('✅')}</h1>
		<p>
			Bravo, tu sembles être sur la voie d'un réchauffement pas si
			catastrophique, et c'est pas donné à tout le monde.
		</p>
		<p>
			Attention cependant, tu restes au-dessus de l'équilibre des 2 tonnes de
			CO2e/an. Chaque année, l'objectif sera rendu plus exigeant pour finalement
			atteindre cet objectif.
		</p>
		<button className="ui__ plain" onClick={next}>
			Voir mes résultats
		</button>
	</div>
)

export const Objectif1point5Raté = ({ next }) => (
	<div css={blackScreenStyle}>
		<h1>objectif 1.5° : râté</h1>
		<p>
			aujourd'hui, un français a une empreinte climat de 11 tonnes par an en
			moyenne.
		</p>
		<p>
			pour rester sous les 1.5°, il faut réduire notre empreinte de 7% par an à
			partir du 1er janvier 2020.
		</p>
		<p>
			tu as dépassé cet objectif. on est d'accord, c'est pas facile. mais
			gardons espoir, il te reste l'objectif des 2°.
		</p>
		<button className="ui__ plain" onClick={next}>
			continuer
		</button>
	</div>
)
export const Objectif2 = ({ next }) => (
	<div css={blackScreenStyle}>
		<h1>Objectif 2° : réussi {emoji('✅')}</h1>
		<p>
			Bravo, tu sembles être sur la voie qui évite la catastrophe climatique
			totale.
		</p>
		<p>
			Attention cependant, tu restes largement au-dessus de l'équilibre des 2
			tonnes de CO2e/an. Chaque année, l'objectif sera rendu plus exigeant pour
			finalement atteindre cet objectif.
		</p>
		<p>On se retrouve dans quelques mois {emoji('😊')}?</p>
		<button className="ui__ plain" onClick={next}>
			Voir mes résultats
		</button>
	</div>
)

export const Objectif2Raté = ({ next }) => (
	<div css={blackScreenStyle}>
		<h1>Objectif 2° : râté</h1>
		<p>
			Cette journée te place décidemment bien loin des objectifs de l'accord de
			Paris.
		</p>
		<h2>Tout n'est pas perdu !</h2>
		<p>
			Comme nous l'a montré le sprinteur{' '}
			<a href="https://www.youtube.com/watch?v=f2Dil00Pgbw" target="_blank">
				{' '}
				Marc Raquil{' '}
			</a>
			, peu importe le départ, l'essentiel c'est d'accélérer, on compte sur toi,
			et à bientôt !
		</p>
		<button className="ui__ plain" onClick={next}>
			Voir mes résultats
		</button>
	</div>
)

export const Soutenable = ({ next }) => (
	<div css={blackScreenStyle}>
		<h1>{emoji('🥳')} Magnifique ! </h1>
		<p>
			On dirait bien que tu a emprunté le chemin d'une vie soutenable,
			félicitations.
		</p>
		<p>
			Restons calme cependant : il s'agirait de ne pas gâcher cette belle
			journée soutenable par des vacances à Bali cet été.
		</p>
		<p>
			{emoji('💡 ')} Tu pourras bientôt faire le bilan de ton année entière.
		</p>
		<p>
			Futureco ne mesure pour l'instant que notre impact sur le climat. Vu ton
			excellent score, ton empreinte sur les autres indicateurs, comme la
			biodiversité, devrait être limité aussi, mais soyons vigileants !
		</p>
	</div>
)
