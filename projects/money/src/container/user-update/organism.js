import React from 'react';
import isForm from '../../lib/is-form';
import Form from 'design-system/lib/form';
import TextInput from 'design-system/lib/text-input';
import Button from 'design-system/lib/button';

export default isForm(({ form }) => (
	<Form {...form}>
		<TextInput name="name" label="Name" {...form} />
		<Button type="submit">
			{ 'Save' }
		</Button>
	</Form>
));
