import { connect } from 'react-redux';
import {
	filterByQuery, q, where, eq, not,
} from 'datenkrake';
import MoneyTransactionActions from '../../domain/money-transactions/actions';
import UserActions from '../../domain/users/actions';
import Organism from './organism';
import {compose} from 'ramda';
import hasSideEffect from '../../lib/has-side-effect';

const mapStateToProps = state => ({
	users: filterByQuery(q(where({ id: not(eq(state.userAuthentication.id)) })), state.users),
	authenticatedUserId: state.userAuthentication.id,
});

const mapDispatchToProps = dispatch => ({
	onSubmit: props => dispatch(MoneyTransactionActions.create(props)),
	sideEffect: () => dispatch(UserActions.where()),
	onUserLoad: filter => dispatch(UserActions.where(filter)),
});

const mergeProps = (state, actions) => ({
	...state,
	...actions,
	onDebtCreate: ({ userId, ...props }) => actions.onSubmit({
		...props,
		creditorId: userId,
		debitorId: state.authenticatedUserId,
	}),
	onCreditCreate: ({ userId, ...props }) => actions.onSubmit({
		...props,
		debitorId: userId,
		creditorId: state.authenticatedUserId,
	}),
});

export default compose(
	connect(mapStateToProps, mapDispatchToProps, mergeProps),
	hasSideEffect(),
)(Organism);
