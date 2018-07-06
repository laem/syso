/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Simu from '../../../Simu'
import * as Animate from '../../animate'

type Props = {
	hideText: boolean
}
class Hiring extends Component<Props, {}> {
	render() {
		return (
			<Animate.fromBottom>
				{!this.props.hideText && (
					<>
						<h1>Social security: costs and benefits</h1>
						<p>
							France has chosen to provide its citizens with a high-level social
							safety net. This mandatory system is based on solidarity and
							designed to ensure the general welfare of its people.
						</p>
						<p>
							As soon as you declare and pay your employees, you automatically
							entitle them to all of France’s health, maternity, disability, old
							age, unemployment, occupational accidents and occupational illness
							insurance programs.
						</p>
						<h2>How much does it cost ?</h2>
					</>
				)}
				<Simu />
			</Animate.fromBottom>
		)
	}
}

export default connect(
	state => ({ hideText: state.conversationStarted }),
	{}
)(Hiring)