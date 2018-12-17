import React from 'react';
import isForm from '../../lib/is-form';
import Form from '../../components/form';
import TextInput from '../../components/text-input';
import Link from '../../components/link';

export default isForm(({ form }) => (
    <Form { ...form }>
        <TextInput name="name" label="Name" { ...form }  />
        <TextInput name="email" label="Email" { ...form }  />
        <TextInput name="password" label="Password" { ...form }  />
        <button disabled={ form.isSubmitting }>
            submit
        </button>
        <Link to="user-sign-in">Sign in</Link>
    </Form>
));