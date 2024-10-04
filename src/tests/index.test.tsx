// src/index.test.tsx
import ReactDOM from 'react-dom';
import App from '../App';

test('renders the App component at root', () => {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
  ReactDOM.render(<App />, root);
  expect(root.querySelector('h1')).toBeInTheDocument(); // Change 'h1' based on what renders first
});
