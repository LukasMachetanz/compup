import React from 'react';
import {
	assertThat, hasProperties, not,
} from 'hamjest';

import { mount } from 'enzyme';
import buildInput from './is-input';

const simulateInputChange = (input, value) => {
	input.instance().value = value; // eslint-disable-line no-param-reassign
	input.simulate('change', input);
};

test('passes props to input', () => {
	const MyInput = buildInput(({ Input, ...props }) => <Input {...props} />);
	const input = mount(<MyInput autoComplete="true" />).find('input');
	assertThat(input.props(), hasProperties({ autoComplete: 'true' }));
});

describe('when errors/values and name given', () => {
	const ERRORS = { firstName: ['Can\'t be blank'] };
	const VALUES = { firstName: 'Sepp' };

	test('uses name attribute to  the value of the input', () => {
		const MyInput = buildInput(({ Input, ...props }) => <Input {...props} />);
		const input = mount(<MyInput name="firstName" values={VALUES} errors={ERRORS} />).find('input');
		assertThat(input.instance(), hasProperties({ value: VALUES.firstName }));
	});
});

describe('when component is uncontrolled (no value prop given)', () => {
	describe('WHEN default value is given', () => {
		it('has defaultValue as value of the input field', () => {
			const value = 'hola';
			const MyInput = buildInput(({ Input, ...props }) => <Input {...props} />);
			const input = mount(<MyInput defaultValue={value} />).find('input');
			assertThat(input.instance(), hasProperties({ value }));
		});

		it('updates the value of the input field, when input changed', () => {
			const changedValue = 'changed';
			const MyInput = buildInput(({ Input, ...props }) => <Input {...props} />);
			const input = mount(<MyInput defaultValue="hola" />).find('input');

			simulateInputChange(input, changedValue);
			assertThat(input.instance(), hasProperties({ value: changedValue }));
		});
	});

	describe('WHEN no default value given', () => {
		it('does NOT have a value given', () => {
			const value = 'hola';
			const MyInput = buildInput(({ Input, ...props }) => <Input {...props} />);
			const input = mount(<MyInput />).find('input');
			assertThat(input.instance(), not(hasProperties({ value })));
		});

		it('sets the value, when input changed', () => {
			const changedValue = 'changed';
			const MyInput = buildInput(({ Input, ...props }) => <Input {...props} />);
			const input = mount(<MyInput />).find('input');

			simulateInputChange(input, changedValue);
			assertThat(input.instance(), hasProperties({ value: changedValue }));
		});
	});
});

describe('when component is a controlled input (value prop given)', () => {
	it('passes the value to the input field', () => {
		const value = 'value';
		const MyInput = buildInput(({ Input, ...props }) => <Input {...props} />);
		const input = mount(<MyInput value={value} />).find('input');
		assertThat(input.instance(), hasProperties({ value }));
	});

	it('does NOT change the value, when value change is triggered', () => {
		const value = 'value';
		const MyInput = buildInput(({ Input, ...props }) => <Input {...props} />);
		const input = mount(<MyInput value={value} />).find('input');
		simulateInputChange(input, 'change');
		assertThat(input.instance(), hasProperties({ value }));
	});
});

describe('focused', () => {
	test('false, initially', () => {
		const MyInput = buildInput(({ Input }) => <Input />);
		const wrapper = mount(<MyInput />);
		assertThat(wrapper.children().props(), hasProperties({ focused: false }));
	});

	test('true, when focused', () => {
		const MyInput = buildInput(({ Input }) => <Input />);
		const wrapper = mount(<MyInput />);
		wrapper.find('input').simulate('focus');
		assertThat(wrapper.children().props(), hasProperties({ focused: true }));
	});

	test('false, when focused and blured afterwards', () => {
		const MyInput = buildInput(({ Input }) => <Input />);
		const wrapper = mount(<MyInput />);
		wrapper.find('input').simulate('focus');
		wrapper.find('input').simulate('blur');
		assertThat(wrapper.children().props(), hasProperties({ focused: false }));
	});

	test('onFocus can be passed to input (this test times out when something broke)', (done) => {
		const MyInput = buildInput(({ Input, ...props }) => <Input {...props} />);
		const wrapper = mount(<MyInput onFocus={() => done()} />);
		wrapper.find('input').simulate('focus');
	});

	test('onBlur can be passed to input (this test times out when something broke)', (done) => {
		const MyInput = buildInput(({ Input, ...props }) => <Input {...props} />);
		const wrapper = mount(<MyInput onBlur={() => done()} />);
		wrapper.find('input').simulate('blur');
	});
});

describe('touched', () => {
	test('false, initially', () => {
		const MyInput = buildInput(({ Input }) => <Input />);
		const wrapper = mount(<MyInput />);
		assertThat(wrapper.children().props(), hasProperties({ touched: false }));
	});

	test('true, when changed', () => {
		const MyInput = buildInput(({ Input }) => <Input />);
		const wrapper = mount(<MyInput />);
		wrapper.find('input').simulate('change', { target: { value: 'Changed' } });
		assertThat(wrapper.children().props(), hasProperties({ touched: true }));
	});

	test('onChange can be passed to input (this test times out when something broke)', (done) => {
		const MyInput = buildInput(({ Input, ...props }) => <Input {...props} />);
		const wrapper = mount(<MyInput onChange={() => done()} />);
		simulateInputChange(wrapper.find('input'), 'changed');
	});
});

describe('WHEN disabled', () => {
	test('property is passed to input', () => {
		const MyInput = buildInput(({ Input, ...props }) => <Input {...props} />);
		const wrapper = mount(<MyInput disabled />);
		assertThat(wrapper.find('input').instance(), hasProperties({ disabled: true }));
	});

	test('onChange is NOT triggered', () => {
		const MyInput = buildInput(({ Input }) => <Input />);
		const wrapper = mount(<MyInput onChange={() => { throw new Error('should NOT be triggered'); }} disabled />);
		simulateInputChange(wrapper.find('input'), 'changed');
	});

	test('onFocus is NOT triggered', () => {
		const MyInput = buildInput(({ Input }) => <Input />);
		const wrapper = mount(<MyInput onFocus={() => { throw new Error('should NOT be triggered'); }} disabled />);
		wrapper.find('input').simulate('focus');
	});

	test('onBlur is NOT triggered', () => {
		const MyInput = buildInput(({ Input }) => <Input />);
		const wrapper = mount(<MyInput onBlur={() => { throw new Error('should NOT be triggered'); }} disabled />);
		wrapper.find('input').simulate('blur');
	});
});

describe('onChange', () => {
	test('WHEN disabled, is not triggered', () => {
		const MyInput = buildInput(({ Input }) => <Input />);
		const wrapper = mount(<MyInput onChange={() => { throw new Error('should NOT be triggered'); }} disabled />);
		simulateInputChange(wrapper.find('input'), 'changed');
	});

	test('WHEN validator returns invalid, is not triggered', () => {
		const MyInput = buildInput(({ Input }) => <Input />);
		const wrapper = mount(
			<MyInput
				onChange={() => { throw new Error('should NOT be triggered'); }}
				validate={() => false}
			/>,
		);
		simulateInputChange(wrapper.find('input'), 'changed');
	});
});


describe('when name prop given', () => {
	const MyInput = buildInput(({ Input, Label }) => (
		<div>
			<Label>A Label</Label>
			<Input />
		</div>
	));

	test('automatically adds "for" attribute to Label', () => {
		const wrapper = mount(<MyInput name="irrelevant" />);
		assertThat(wrapper.find('label').props(), hasProperties({ htmlFor: 'irrelevant' }));
	});

	test('automatically adds "name" attribute to input', () => {
		const wrapper = mount(<MyInput name="irrelevant" />);
		assertThat(wrapper.find('input').props(), hasProperties({ name: 'irrelevant' }));
	});
});
