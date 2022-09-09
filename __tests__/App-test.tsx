/**
 * @format
 */

import 'react-native';
import React from 'react';
import { LoginPage } from '../pages/login-page';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<LoginPage componentId={'Component1'} />);
});
