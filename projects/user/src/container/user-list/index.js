import { connect } from 'react-redux';
import UserActions from '../../domain/users/actions';
import Organism from './organism';
import {compose} from 'ramda';
import hasSideEffect from 'compup/lib/has-side-effect';

const mapStateToProps = state => ({
	users: state.users
});

const mapDispatchToProps = dispatch => ({
	sideEffect: () => dispatch(UserActions.where()),
});

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	hasSideEffect(),
)(Organism);
