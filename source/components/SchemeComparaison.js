/* @flow */
import { setSituationBranch } from 'Actions/actions'
import {
	defineDirectorStatus,
	isAutoentrepreneur
} from 'Actions/companyStatusActions'
import classnames from 'classnames'
import { T } from 'Components'
import Conversation from 'Components/conversation/Conversation'
import SeeAnswersButton from 'Components/conversation/SeeAnswersButton'
import PeriodSwitch from 'Components/PeriodSwitch'
// $FlowFixMe
import ComparaisonConfig from 'Components/simulationConfigs/rémunération-dirigeant.yaml'
import withSimulationConfig from 'Components/simulationConfigs/withSimulationConfig'
import withSitePaths from 'Components/utils/withSitePaths'
import { compose, tryCatch } from 'ramda'
import React, { useCallback, useState } from 'react'
import emoji from 'react-easy-emoji'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { branchAnalyseSelector } from 'Selectors/analyseSelectors'
import {
	règleAvecMontantSelector,
	règleAvecValeurSelector
} from 'Selectors/regleSelectors'
import Animate from 'Ui/animate'
import AnimatedTargetValue from 'Ui/AnimatedTargetValue'
import InfoBulle from 'Ui/InfoBulle'
import Montant from 'Ui/Montant'
import './SchemeComparaison.css'

import type { RègleAvecMontant, RègleAvecValeur } from 'Types/RegleTypes'

type OwnProps = {
	hideAutoEntrepreneur?: boolean,
	hideAssimiléSalarié?: boolean
}

type Props = OwnProps & {
	assimiléSalarié?: SimulationResult,
	indépendant?: SimulationResult,
	autoEntrepreneur?: SimulationResult,

	setSituationBranch: number => void,
	defineDirectorStatus: string => void,
	sitePaths: any,
	isAutoentrepreneur: boolean => void,
	plafondAutoEntrepreneurDépassé: boolean
}

type SimulationResult = {
	retraite: RègleAvecMontant,
	trimestreValidés: RègleAvecValeur,
	indemnitésJournalières: RègleAvecMontant,
	indemnitésJournalièresATMP?: RègleAvecMontant,
	revenuNetAvantImpôts: RègleAvecMontant,
	revenuNetAprèsImpôts: RègleAvecMontant,
	plafondDépassé?: boolean
}

const SchemeComparaison = ({
	/* Own Props */
	hideAutoEntrepreneur = false,
	hideAssimiléSalarié = false,
	/* Injected Props */
	assimiléSalarié,
	indépendant,
	autoEntrepreneur,

	defineDirectorStatus,
	isAutoentrepreneur,
	setSituationBranch
}: Props) => {
	const [showMore, setShowMore] = useState(false)
	const [conversationStarted, setConversationStarted] = useState(false)
	const startConversation = useCallback(() => setConversationStarted(true), [
		setConversationStarted
	])
	return (
		<div
			className={classnames('comparaison-grid', {
				hideAutoEntrepreneur,
				hideAssimiléSalarié
			})}>
			<h2 className="AS">
				{emoji('☂')} <T>Assimilé salarié</T>
				<small>
					<T k="comparaisonRégimes.AS.tagline">Le régime tout compris</T>
				</small>
			</h2>
			<h2 className="indep">
				{emoji('👩‍🔧')}{' '}
				{hideAssimiléSalarié ? (
					<T>Entreprise Individuelle</T>
				) : (
					<T>Indépendant</T>
				)}
				<small>
					<T k="comparaisonRégimes.indep.tagline">
						La protection sociale à la carte
					</T>
				</small>
			</h2>
			<h2 className="auto">
				{emoji('🚶‍♂️')} <T>Auto-entrepreneur</T>
				<small>
					<T k="comparaisonRégimes.auto.tagline">Pour commencer sans risques</T>
				</small>
			</h2>

			<h3 className="legend">
				<T k="comparaisonRégimes.status.legend">Statuts juridiques possibles</T>
			</h3>
			<div className="AS">
				<div>
					<T k="comparaisonRégimes.status.AS">
						SAS, SASU ou SARL avec gérant minoritaire
					</T>
				</div>
			</div>
			<div className="indep">
				<div>
					{hideAssimiléSalarié ? (
						<T k="comparaisonRégimes.status.indep.2">EI ou EIRL</T>
					) : (
						<T k="comparaisonRégimes.status.indep.1">
							EI, EIRL, EURL ou SARL avec gérant majoritaire
						</T>
					)}
				</div>
			</div>
			<div className="auto">
				<T k="comparaisonRégimes.status.auto">Auto-entreprise</T>
			</div>

			<T k="comparaisonRégimes.sécuritéSociale">
				<h3 className="legend">Sécurité sociale</h3>
				<div className="AS">
					Régime général <small />
				</div>
				<div className="indep-et-auto">
					Sécurité sociale des indépendants <small />
				</div>
			</T>
			<T k="comparaisonRégimes.AT">
				<h3 className="legend">Couverture accidents du travail</h3>
			</T>
			<div className="AS">
				<T>
					<T>Oui</T>
				</T>
			</div>
			<div className="indep-et-auto">
				<T>Non</T>
			</div>
			<T k="comparaisonRégimes.assuranceMaladie">
				<h3 className="legend">
					Assurance maladie{' '}
					<small>(médicaments, soins, hospitalisations)</small>
				</h3>
				<div className="AS-indep-et-auto">Identique pour tous</div>
			</T>
			<T k="comparaisonRégimes.mutuelle">
				<h3 className="legend">
					Mutuelle santé
					<small />
				</h3>
				<div className="AS">Obligatoire</div>
				<div className="indep-et-auto">Fortement conseillée</div>
			</T>

			<T k="comparaisonRégimes.indemnités">
				<h3 className="legend">Indemnités journalières</h3>
			</T>
			<div className="green AS">++</div>
			<div className="green indep">++</div>
			<div className="green auto">+</div>
			<T k="comparaisonRégimes.retraite">
				<h3 className="legend">Retraite</h3>
			</T>
			<div className="green AS">+++</div>
			<div className="green indep">++</div>
			<div className="green auto">+</div>

			{conversationStarted && (
				<>
					<T k="comparaisonRégimes.période">
						<h3 className="legend">Période</h3>
					</T>
					<div className="AS-indep-et-auto" style={{ alignSelf: 'start' }}>
						<PeriodSwitch />
					</div>
				</>
			)}

			{conversationStarted && (
				<>
					<T k="comparaisonRégimes.revenuNetApresImpots">
						<h3 className="legend">Revenu net après impôts</h3>
					</T>
					<div className="AS">
						{assimiléSalarié && (
							<Animate.appear className="ui__ plain card">
								<RuleValueLink
									onClick={() => setSituationBranch(0)}
									{...assimiléSalarié.revenuNetAprèsImpôts}
								/>
							</Animate.appear>
						)}
					</div>
					<div className="indep">
						{indépendant && (
							<Animate.appear className="ui__ plain card">
								<RuleValueLink
									onClick={() => setSituationBranch(1)}
									{...indépendant.revenuNetAprèsImpôts}
								/>
							</Animate.appear>
						)}
					</div>
					<div className="auto">
						{autoEntrepreneur && (
							<Animate.appear
								className={classnames(
									'ui__ plain card',
									autoEntrepreneur.plafondDépassé && 'disabled'
								)}>
								{autoEntrepreneur.plafondDépassé ? (
									'Plafond de CA dépassé'
								) : (
									<RuleValueLink
										onClick={() => setSituationBranch(2)}
										{...autoEntrepreneur.revenuNetAprèsImpôts}
									/>
								)}
							</Animate.appear>
						)}
					</div>
					<T k="comparaisonRégimes.revenuNetAvantImpots">
						<h3 className="legend">
							Revenu net de cotisations <small>(avant impôts)</small>
						</h3>
					</T>
					<div className="AS">
						{assimiléSalarié && (
							<Animate.appear>
								<RuleValueLink
									onClick={() => setSituationBranch(0)}
									{...assimiléSalarié.revenuNetAvantImpôts}
								/>
							</Animate.appear>
						)}
					</div>
					<div className="indep">
						{indépendant && (
							<Animate.appear>
								<RuleValueLink
									onClick={() => setSituationBranch(1)}
									{...indépendant.revenuNetAvantImpôts}
								/>
							</Animate.appear>
						)}
					</div>
					<div className="auto">
						{autoEntrepreneur && (
							<Animate.appear>
								{autoEntrepreneur.plafondDépassé ? (
									'—'
								) : (
									<RuleValueLink
										onClick={() => setSituationBranch(2)}
										{...autoEntrepreneur.revenuNetAvantImpôts}
									/>
								)}
							</Animate.appear>
						)}
					</div>
					<h3 className="legend">
						<T k="comparaisonRégimes.retraiteEstimation">
							<span>
								Pension de retraite{' '}
								<InfoBulle>
									calculée pour 172 trimestres cotisés dans ce régime sans
									variations de revenus
								</InfoBulle>
							</span>
							<small>(avant impôts)</small>
						</T>
					</h3>
					<div className="AS">
						{assimiléSalarié &&
						assimiléSalarié.retraite.applicable !== false ? (
							<div>
								<RuleValueLink
									onClick={() => setSituationBranch(0)}
									{...assimiléSalarié.retraite}
								/>
								<div>
									<small>
										<strong>
											<RuleValueLink
												onClick={() => setSituationBranch(0)}
												{...assimiléSalarié.trimestreValidés}
											/>{' '}
											<T>trimestres validés</T>
										</strong>
									</small>
								</div>
							</div>
						) : (
							<span className="ui__ notice">
								<T>Pas implémenté</T>
							</span>
						)}
					</div>
					<div className="indep">
						{indépendant && indépendant.retraite.applicable !== false ? (
							<div>
								<RuleValueLink
									onClick={() => setSituationBranch(1)}
									{...indépendant.retraite}
								/>
								<div>
									<small>
										<strong>
											<RuleValueLink
												onClick={() => setSituationBranch(1)}
												{...indépendant.trimestreValidés}
											/>{' '}
											<T>trimestres validés</T>
										</strong>
									</small>
								</div>
							</div>
						) : (
							<span className="ui__ notice">
								<T>Pas implémenté</T>
							</span>
						)}
					</div>
					<div className="auto">
						{autoEntrepreneur &&
							(autoEntrepreneur.plafondDépassé ? (
								'—'
							) : autoEntrepreneur.retraite.applicable !== false ? (
								<div>
									<RuleValueLink
										onClick={() => setSituationBranch(2)}
										{...autoEntrepreneur.retraite}
									/>
									<div>
										<small>
											<strong>
												<RuleValueLink
													onClick={() => setSituationBranch(2)}
													{...autoEntrepreneur.trimestreValidés}
												/>{' '}
												<T>trimestres validés</T>
											</strong>
										</small>
									</div>
								</div>
							) : (
								<span className="ui__ notice">
									<T>Pas implémenté</T>
								</span>
							))}
					</div>
					<T k="comparaisonRégimes.indemnités">
						<h3 className="legend">
							Indemnités journalières <small>(en cas d'arrêt maladie)</small>
						</h3>
					</T>
					<div className="AS">
						{assimiléSalarié && (
							<>
								<div>
									<RuleValueLink
										onClick={() => setSituationBranch(0)}
										{...assimiléSalarié.indemnitésJournalières}
									/>{' '}
									/ <T>jour</T>
								</div>
								<small>
									(
									<RuleValueLink
										onClick={() => setSituationBranch(0)}
										{...assimiléSalarié.indemnitésJournalièresATMP}
									/>{' '}
									<T>pour les accidents de trajet/travail et maladie pro</T>)
								</small>
							</>
						)}
					</div>
					<div className="indep">
						{indépendant && (
							<div>
								<RuleValueLink
									onClick={() => setSituationBranch(1)}
									{...indépendant.indemnitésJournalières}
								/>{' '}
								/ <T>jour</T>
							</div>
						)}
					</div>
					<div className="auto">
						{autoEntrepreneur &&
							(autoEntrepreneur.plafondDépassé ? (
								'—'
							) : (
								<div>
									<RuleValueLink
										onClick={() => setSituationBranch(2)}
										{...autoEntrepreneur.indemnitésJournalières}
									/>{' '}
									/ <T>jour</T>
								</div>
							))}
					</div>
				</>
			)}

			{showMore ? (
				<>
					<T k="comparaisonRégimes.ACRE">
						<h3 className="legend">ACRE</h3>
						<div className="AS-et-indep">
							1 an <small>(exonération partielle de cotisations)</small>
						</div>
						<div className="auto">
							3 ans
							<small>(application de taux réduits de cotisations)</small>
						</div>
					</T>
					<T k="comparaisonRégimes.déduction">
						<h3 className="legend">Déduction des charges</h3>
						<div className="AS-et-indep">
							Oui <small>(régime fiscal du réel)</small>
						</div>
						<div className="auto">
							Non
							<small>
								(mais abattement forfaitaire pour le calcul de l'impôt sur le
								revenu)
							</small>
						</div>
					</T>

					<T k="comparaisonRégimes.cotisations">
						<h3 className="legend">Paiement des cotisations</h3>
						<div className="AS">Mensuel</div>
						<div className="indep">
							Provision mensuelle
							<small>
								(avec régularisation après coup en fonction du revenu réel)
							</small>
						</div>
						<div className="auto">Mensuel ou trimestriel</div>
					</T>
					<T k="comparaisonRégimes.complémentaireDeductible">
						<h3 className="legend">
							Contrats prévoyance et retraite facultatives déductibles
						</h3>
						<div className="AS">
							Oui <small>(sous certaines conditions)</small>
						</div>
						<div className="indep">
							Oui <small>(Loi Madelin)</small>
						</div>
					</T>
					<div className="auto">
						<T>Non</T>
					</div>
					<T k="comparaisonRégimes.cotisationMinimale">
						<h3 className="legend">Paiement de cotisations minimales</h3>
					</T>
					<div className="AS">
						<T>Non</T>
					</div>
					<div className="indep">
						<T>Oui</T>
					</div>
					<div className="auto">
						<T>Non</T>
					</div>
					<T k="comparaisonRégimes.seuil">
						<h3 className="legend">
							Revenu minimum pour l'ouverture des droits aux prestations
						</h3>
						<div className="AS">Oui</div>
						<div className="indep">
							Non <small>(cotisations minimales obligatoires)</small>
						</div>
						<div className="auto">Oui</div>
					</T>
					{!hideAutoEntrepreneur && (
						<T k="comparaisonRégimes.plafondCA">
							<h3 className="legend">Plafond de chiffre d'affaires</h3>
							<div className="AS-et-indep">
								<T>Non</T>
							</div>
							<div className="auto">
								<T>Oui</T>
								<small>
									(70 000 € en services / 170 000 € en vente de biens,
									restauration ou hébergement)
								</small>
							</div>
						</T>
					)}
					<T k="comparaisonRégimes.comptabilité">
						<h3 className="legend">Gestion comptable, sociale, juridique...</h3>
						<div className="AS-et-indep">
							Accompagnement fortement conseillé
							<small>
								(expert comptable, comptable, centre de gestion agrée...)
							</small>
						</div>

						<div className="auto">
							Simplifiée{' '}
							<small>(peut être gérée par l'auto-entrepreneur)</small>
						</div>
					</T>
				</>
			) : (
				<T k="comparaisonRégimes.comparaisonDétaillée">
					<div className="AS-indep-et-auto">
						<button
							onClick={() => setShowMore(true)}
							className="ui__ simple small button">
							Afficher plus d'informations
						</button>
					</div>
				</T>
			)}
			<div className="all">
				{!conversationStarted ? (
					<T k="comparaisonRégimes.simulationText">
						<img
							css="height: 8em"
							src={require('../sites/mon-entreprise.fr/images/retraite.svg')}
						/>
						<button
							className="ui__ cta plain button"
							onClick={startConversation}>
							Simuler retraite et indemnités maladie
						</button>
					</T>
				) : (
					<div className="ui__ container">
						<SeeAnswersButton />
						<Conversation />
					</div>
				)}
			</div>
			<div className="AS no-border">
				<button
					className="ui__  button"
					onClick={() => {
						!hideAssimiléSalarié && defineDirectorStatus('SALARIED')
						!hideAutoEntrepreneur && isAutoentrepreneur(false)
					}}>
					<T k="comparaisonRégimes.choix.AS">Choisir assimilé&nbsp;salarié</T>
				</button>
			</div>
			<div className="indep no-border">
				<button
					className="ui__  button"
					onClick={() => {
						!hideAssimiléSalarié && defineDirectorStatus('SELF_EMPLOYED')
						!hideAutoEntrepreneur && isAutoentrepreneur(false)
					}}>
					{hideAssimiléSalarié ? (
						<T k="comparaisonRégimes.choix.EI">
							Choisir entreprise individuelle
						</T>
					) : (
						<T k="comparaisonRégimes.choix.indep">Choisir indépendant</T>
					)}
				</button>
			</div>
			<div className="auto no-border">
				<button
					className="ui__ button"
					onClick={() => {
						!hideAssimiléSalarié && defineDirectorStatus('SELF_EMPLOYED')
						!hideAutoEntrepreneur && isAutoentrepreneur(true)
					}}>
					<T k="comparaisonRégimes.choix.auto">Choisir auto-entrepreneur</T>
				</button>
			</div>
		</div>
	)
}

const RuleValueLink = withSitePaths(
	({ lien, montant, valeur, sitePaths, onClick }) => (
		<Link onClick={onClick} to={sitePaths.documentation.index + '/' + lien}>
			{montant != undefined && <AnimatedTargetValue value={montant} />}
			{valeur != undefined && (
				<Montant numFractionDigit={0} type="decimal">
					{valeur}
				</Montant>
			)}
		</Link>
	)
)

export default (compose(
	withSimulationConfig(ComparaisonConfig),
	connect(
		tryCatch(
			state => ({
				autoEntrepreneur: {
					retraite: règleAvecMontantSelector(state, {
						situationBranchName: 'Auto-entrepreneur'
					})('protection sociale . retraite'),
					trimestreValidés: règleAvecValeurSelector(state, {
						situationBranchName: 'Auto-entrepreneur'
					})('protection sociale . retraite . trimestres validés par an'),
					indemnitésJournalières: règleAvecMontantSelector(state, {
						situationBranchName: 'Auto-entrepreneur'
					})('protection sociale . santé . indemnités journalières'),
					revenuNetAprèsImpôts: règleAvecMontantSelector(state, {
						situationBranchName: 'Auto-entrepreneur'
					})('revenu net'),
					revenuNetAvantImpôts: règleAvecMontantSelector(state, {
						situationBranchName: 'Auto-entrepreneur'
					})('auto entrepreneur . revenu net de cotisations'),
					// $FlowFixMe
					plafondDépassé: branchAnalyseSelector(state, {
						situationBranchName: 'Auto-entrepreneur'
					}).controls?.find(
						({ test }) =>
							test.includes && test.includes('base des cotisations > plafond')
					)
				},
				indépendant: {
					retraite: règleAvecMontantSelector(state, {
						situationBranchName: 'Indépendant'
					})('protection sociale . retraite'),
					trimestreValidés: règleAvecValeurSelector(state, {
						situationBranchName: 'Indépendant'
					})('protection sociale . retraite . trimestres validés par an'),
					indemnitésJournalières: règleAvecMontantSelector(state, {
						situationBranchName: 'Indépendant'
					})('protection sociale . santé . indemnités journalières'),
					revenuNetAprèsImpôts: règleAvecMontantSelector(state, {
						situationBranchName: 'Indépendant'
					})('revenu net'),
					revenuNetAvantImpôts: règleAvecMontantSelector(state, {
						situationBranchName: 'Indépendant'
					})('indépendant . revenu professionnel')
				},
				assimiléSalarié: {
					retraite: règleAvecMontantSelector(state, {
						situationBranchName: 'Assimilé salarié'
					})('protection sociale . retraite'),
					trimestreValidés: règleAvecValeurSelector(state, {
						situationBranchName: 'Assimilé salarié'
					})('protection sociale . retraite . trimestres validés par an'),
					indemnitésJournalières: règleAvecMontantSelector(state, {
						situationBranchName: 'Assimilé salarié'
					})('protection sociale . santé . indemnités journalières'),
					indemnitésJournalièresATMP: règleAvecMontantSelector(state, {
						situationBranchName: 'Assimilé salarié'
					})(
						'protection sociale . accidents du travail et maladies professionnelles'
					),
					revenuNetAprèsImpôts: règleAvecMontantSelector(state, {
						situationBranchName: 'Assimilé salarié'
					})('revenu net'),
					revenuNetAvantImpôts: règleAvecMontantSelector(state, {
						situationBranchName: 'Assimilé salarié'
					})('contrat salarié . salaire . net')
				}
			}),
			e => console.log(e) || {}
		),

		{
			defineDirectorStatus,
			isAutoentrepreneur,
			setSituationBranch
		}
	)
)(SchemeComparaison): React$Component<OwnProps>)
