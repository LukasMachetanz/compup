import React from 'react';
import {
	q, findByQuery, eq, where,
} from 'datenkrake';
import Button from 'design-system/lib/button';
import ListItem from 'design-system/lib/list-item';
import CheckboxInput from 'design-system/lib/checkbox-input';
import className from '../../lib/class-name';

import PaginationBar from 'design-system/lib/pagination-bar';
import isPaginated from '../../lib/is-paginated';
import formatCurrency from '../../helper/format-currency';
import styles from './organism.css';


export default isPaginated({
	pageSize: 10,
	itemsLoadingFnName: 'onMoneyTransactionsLoad',
	itemsPropName: 'moneyTransactions',
}, ({
	userId,
	moneyTransactions,
	users,
	onDestroy,
	onPageChange,
	pageCount,
	currentPage,
	onMoneyTransactionSubmit,
}) => (
	<React.Fragment>
		<ul className={styles.wrapper}>
			{ moneyTransactions.map(({
				id, creditorId, debitorId, amount, paidAt,
			}) => {
				const isDebt = userId === debitorId;
				const otherUserId = isDebt ? creditorId : debitorId;
				const otherUser = findByQuery(q(where({ id: eq(otherUserId) })), users);
				const signedAmount = isDebt ? amount * -1 : amount;
				const updateFn = (evt) => {
					return onMoneyTransactionSubmit(q(where({ id: eq(id) })), {
						paidAt: evt.target.checked ? (new Date()).toISOString() : null,
					});
				}

				return (
				<ListItem
					key={id}
					header={(
						<>
							<CheckboxInput 
								onChange={ updateFn }
								defaultChecked={!!paidAt}
							/>
							<span 
								className={className(
									styles.name,
									paidAt && styles.paid,
								)}
							>
								{ otherUser.name }
							</span>
							<span 
								className={className(
									styles.amount,
									isDebt ? styles.debt : styles.credit,
									paidAt && styles.paid,
								)}
							>
								{ formatCurrency(signedAmount) }
							</span>
							<Button color="danger" onClick={() => onDestroy(q(where({ id: eq(id) })))}>
								{'Delete'}
							</Button>
						</>
					)}
				/>
			)}) }
		</ul>

		<PaginationBar
			onPageClick={onPageChange}
			currentPage={currentPage}
			pageCount={pageCount}
		/>
	</React.Fragment>

));
