import React from 'react';
import { storiesOf } from '@storybook/react';
import Link from './link';

storiesOf('Link', module)
	.add('default', () => <Link to="/something-random">A Link</Link>)
	.add('button variant', () => <Link variant="button" to="/something-random">A Link</Link>);
