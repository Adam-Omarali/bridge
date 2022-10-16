import { render, screen } from '@testing-library/react';
import Testing from './Testing';

test('renders learn react link', () => {
  render(<Testing />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
