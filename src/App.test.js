import { render, screen, waitFor, cleanup } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios;

beforeEach(() => {
  jest.clearAllMocks();
  
  // Mock axios get to prevent network calls
  mockedAxios.get = jest.fn().mockResolvedValue({ 
    data: { utilisateurs: [] } 
  });
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

test('renders app without crashing', async () => {
  render(<App />);
  
  // Wait for the initial axios call to complete
  await waitFor(() => {
    expect(mockedAxios.get).toHaveBeenCalledWith("http://localhost:8000/users");
  });
});
