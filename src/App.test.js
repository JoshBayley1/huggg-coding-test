import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders shops title', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const h1 = screen.getByText(/Shops/i);
  expect(h1).toBeInTheDocument();
});
