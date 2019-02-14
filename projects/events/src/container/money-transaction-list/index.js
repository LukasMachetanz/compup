import { connect } from 'react-redux';
import { q, filterByQuery } from 'datenkrake';
import { fromQueryParams } from 'datenkrake/src/adapters/postgrest';
import MoneyTransactionActions from '../../domain/money-transactions/actions';
import UserActions from '../../domain/users/actions';
import Organism from './organism';
import {compose} from 'ramda';
import hasSideEffect from 'compup/lib/has-side-effect';

const mapStateToProps = (state, props) => ({
	users: state.users,
	moneyTransactions: filterByQuery(q(
		fromQueryParams(props.history.location.search),
	), state.moneyTransactions),
	userId: state.userAuthentication.id,
});

const mapDispatchToProps = (dispatch, props) => ({
	onDestroy: query =>
		dispatch(MoneyTransactionActions.destroy(query)),

	sideEffect: () =>
		dispatch(UserActions.where()),

	onMoneyTransactionsLoad: paginationQuery => dispatch(MoneyTransactionActions.where(q(
		paginationQuery,
		fromQueryParams(props.history.location.search),
	))),
	onMoneyTransactionSubmit: (query, record) => 
		dispatch(MoneyTransactionActions.update(query, record)),
});

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	hasSideEffect(),
)(Organism);
