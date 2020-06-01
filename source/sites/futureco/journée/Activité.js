import React, { useEffect, useState } from 'react'
import emoji from 'react-easy-emoji'
import { animated, useSpring } from 'react-spring'

const ActivitéComponent = ({
	animate,
	color,
	i,
	changeItemCount,
	share,
	item,
	blockWidth,
}) => {
	const [focused, focus] = useState(false)
	const [open, toggle] = useState(false)
	const style = useSpring({
		from: {
			border: !animate || open ? '0px solid #fbcfa1' : '6px solid #fbcfa1',
			opacity: 0,
		},
		to: {
			border: '0px solid #fbcfa170',
			opacity: !animate ? 1 : open ? 1 : 0,
		},
	})

	useEffect(() => {
		toggle(true)
	}, [])

	const icônes = item.icônes || ''
	return (
		<animated.li
			key={item.dottedName + i}
			css={`
				background: ${color};
				line-height: initial;
				height: 5vh;
				width: ${blockWidth}vw;
				justify-content: center;
				position: relative;
				box-shadow: 0px 0px 8px 0px rgb(0 0 0 / 8%);
			`}
			style={style}
		>
			<div
				css={`
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					height: 100%;
					small {
						margin-left: 0.6rem;
						color: white;
					}
				`}
			>
				<div
					css={`
						${i && 'display: none;'}
						img {
							vertical-align: middle !important;
							font-size: 180% !important;
						}
						cursor: pointer;
					`}
					onClick={() => false && focus(!focused)}
				>
					{focused ? (
						<small>{Math.round(share) + '%'} de ta journée</small>
					) : (
						icônes.length && (
							<span
								css={`
									img {
										padding: 0.2rem;
										background: white;
										border-radius: 1rem;
									}
									button {
										padding: 0.2rem;
										font-size: 100%;
										font-weight: 600;
										color: white;
									}
								`}
							>
								{emoji(icônes)[i]}
								{/* Désactivé pour l'instant, l'affichage est très perturbant 
								<button onClick={changeItemCount(true)}>+</button>
								<button onClick={changeItemCount(false)}>-</button>
								*/}
							</span>
						)
					)}
				</div>
			</div>
		</animated.li>
	)
}

export default function Activité({
	item: { targets },
	quota,
	quota0,
	animate,
	color,
	blockWidth,
	changeItemCount,
	count,
}) {
	const item = targets[0]
	const weight = item.formule.nodeValue
	const dayQuota = (quota0 * 1000) / 365

	const width = 20 * ((weight * count) / dayQuota) * 100,
		share = (weight / ((quota * 1000) / 365)) * 100

	const numberOfBlocks = Math.round(width / blockWidth) || 1

	return [...Array(numberOfBlocks).keys()].map((i) => (
		<ActivitéComponent
			key={i}
			{...{ item, blockWidth, animate, color, i, changeItemCount, share }}
		/>
	))
}
