import React from 'react'
import { Link } from 'react-router-dom'

export default ({ displayCheck }) => (
	<div
		css={`
			position: fixed;
			bottom: 1rem;
			right: 1rem;
			z-index: 1;

			a {
				display: block;
				margin: 0.4rem 0;
			}

			button {
				padding: 0;
				border-radius: 10rem !important;
				width: 6rem;
				height: 6rem;
				color: var(--textColor);
				box-shadow: 0 1px 3px rgba(41, 117, 209, 0.12),
					0 1px 2px rgba(41, 117, 209, 0.24);
				font-size: 300%;
				@media (max-width: 600px) {
					width: 4.5rem;
					height: 4.5rem;
				}
			}
		`}
	>
		{displayCheck && (
			<Link to="/journée/finie">
				<button
					css={`
						background: #079992;
					`}
				>
					✔
				</button>
			</Link>
		)}
		<Link to="/journée/ajouter">
			<button
				css={`
					background: var(--color);
				`}
			>
				+
			</button>
		</Link>
	</div>
)
