import { render } from '@testing-library/react';
import React from 'react';
import TestComponent from './TestComponent';

test('Then should render', () => {
  const screen = render(<TestComponent />);

  screen.getByText('a test');
});
