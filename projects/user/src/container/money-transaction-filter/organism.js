import React from 'react';
import isForm from '../../lib/is-form';
import Form from 'design-system/lib/form';
import NumberInput from 'design-system/lib/number-input';
import Select from 'design-system/lib/select-input';
import styles from './organism.css';

const OPTIONS = [
	{ value: 'createdAt.asc', label: 'Date asc' },
	{ value: 'createdAt.desc', label: 'Date desc' },
	{ value: 'amount.asc', label: 'Amount asc' },
	{ value: 'amount.desc', label: 'Amount desc' },
];

export default isForm(({ form }) => (
	<Form {...form} className={styles['form-wrapper']}>
		<NumberInput
			name="amount"
			label="Amount gte"
			onChange={form.onSubmit}
			{...form}
		/>
		<Select
			options={OPTIONS}
			name="order"
			label="Order"
			onChange={form.onSubmit}
			{...form}
		/>
	</Form>
));
