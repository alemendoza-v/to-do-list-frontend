import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import nock from 'nock';
// import '@testing-library/jest-dom/extend-expect';
import ToDoTable from './components/ToDoTable';
import App from './App';
import { act } from 'react-dom/test-utils';

test('loads and displays no to dos', async () => {
  const fakeResponse = {
    next: null,
    data: [],
    prev: null,
    status: 200
  };
  jest.spyOn(global, "fetch").mockImplementation(() => 
  Promise.resolve({
    json: () => Promise.resolve(fakeResponse)
  })
  );
  act(() => render(<App/>))
  
  await waitFor(() => expect(screen.getByText("No to dos found")));  
  global.fetch.mockRestore();
})

it('loads and displays 1 to do', async () => {
  const fakeResponse = {
    next: null,
    data: [
      {
        text: "Call doctor",
        priority: 2,
        dueDate: "2023-03-06",
        id: "51fefa89-c24b-4127-9912-777d5c32ce73",
        isDone: false,
        doneDate: null,
        createdAt: "2023-03-12T14:24:30.709659" 
      },
    ],
    prev: null,
    status: 200
  };
  jest.spyOn(global, "fetch").mockImplementation(() => 
  Promise.resolve({
    json: () => Promise.resolve(fakeResponse)
  })
  );
  act(() => render(<App/>))
  
  await waitFor(() => expect(screen.getByText("Call doctor")).toBeInTheDocument());  
  global.fetch.mockRestore();
})