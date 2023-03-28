import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import * as api from './ApiCalls';
import App from './App';

jest.mock("./ApiCalls");

describe('Application', () => {

  beforeEach(() => jest.clearAllMocks());

  afterEach(cleanup);
  
  it('should render table with to-do when api responds', async () => {
    api.getMetrics.mockResolvedValue({
      "data": {
          "averageMedium": null,
          "averageHigh": null,
          "averageAll": null,
          "averageLow": null
      },
      "status": 200
    });

    api.fetchAllToDos.mockResolvedValue({
      'toDos': [
        {
          'text': "Go to school",
          'priority': 3,
          'dueDate': null,
          'id': "759315c6-66a6-4bf8-a820-51b4494b657a",
          'isDone': false,
          'doneDate': null,
          'createdAt': "2023-03-27T09:35:05.003879"
        }
      ],
      'prev': null,
      'next': null,
      'pages': 1
    });

    render(<App/>);

    await waitFor(() => {
      expect(screen.getByText('Go to school')).toBeInTheDocument();
    });
  });

  it('should render table with no to-dos when api responds', async () => {
    api.getMetrics.mockResolvedValue({
      "data": {
          "averageMedium": null,
          "averageHigh": null,
          "averageAll": null,
          "averageLow": null
      },
      "status": 200
    });

    api.fetchAllToDos.mockResolvedValue({
      'toDos': [],
      'prev': null,
      'next': null,
      'pages': 1
    });

    render(<App/>);

    await waitFor(() => {
      expect(screen.getByText('No to dos found')).toBeInTheDocument();
    });
  });

  it('should render table with a created to-do when a to-do is created', async () => {
    const { location } = window;
    delete window.location;
    window.location = { reload: jest.fn() };

    api.getMetrics.mockResolvedValue({
      "data": {
          "averageMedium": null,
          "averageHigh": null,
          "averageAll": null,
          "averageLow": null
      },
      "status": 200
    });

    api.fetchAllToDos = jest.fn()
      .mockResolvedValueOnce({
        'toDos': [],
        'prev': null,
        'next': null,
        'pages': 1
      })
      .mockResolvedValueOnce({
        'toDos': [{
            text: "Work on frontend",
            priority: 1,
            dueDate: null,
            id: "2303c08e-50cf-4d89-a67c-5586f9eddedc",
            isDone: false,
            doneDate: null,
            createdAt: "2023-03-27T11:27:59.525399"
        }],
        'prev': null,
        'next': null,
        'pages': 1
      });

    render(<App/>);

    await waitFor(() => {
      expect(screen.getByText('No to dos found')).toBeInTheDocument();
    });

    act(() => {
      const newToDoButton = screen.getByRole('button', {name: '+ New To Do'});
      fireEvent.click(newToDoButton);
  
      const nameTextBox = screen.getByRole('textbox', {name: 'create-text'});
      const priorityOptionBox = screen.getByRole('combobox', {name: 'create-priority'});
  
      userEvent.type(nameTextBox, 'Work on frontend');
      userEvent.selectOptions(priorityOptionBox, "Low");
    })

    api.createToDo.mockResolvedValue({
      data: {
          text: "Work on frontend",
          priority: 1,
          dueDate: null,
          id: "2303c08e-50cf-4d89-a67c-5586f9eddedc",
          isDone: false,
          doneDate: null,
          createdAt: "2023-03-27T11:27:59.525399"
      },
      status: 201
    });

    const createButton = screen.getByRole('button', {name: 'Create'});

    fireEvent.click(createButton);

    //Render again to simulate a page reload
    render(<App/>)

    await waitFor(() => {
      expect(screen.getByText('Work on frontend')).toBeInTheDocument();
    });
  });

  it('should not render to-do after being deleted', async () => {
    const { location } = window;
    delete window.location;
    window.location = { reload: jest.fn() };

    api.fetchAllToDos = jest.fn()
      .mockResolvedValueOnce({
        'toDos': [
          {
            'text': "Go to school",
            'priority': 3,
            'dueDate': null,
            'id': "759315c6-66a6-4bf8-a820-51b4494b657a",
            'isDone': false,
            'doneDate': null,
            'createdAt': "2023-03-27T09:35:05.003879"
          }
        ],
        'prev': null,
        'next': null,
        'pages': 1
      })
      .mockResolvedValueOnce({
        toDos: [],
        prev: null,
        next: null,
        pages: 1
      })

    api.getMetrics.mockResolvedValue({
        "data": {
            "averageMedium": null,
            "averageHigh": null,
            "averageAll": null,
            "averageLow": null
        },
        "status": 200
    });

    render(<App/>);

    await waitFor(() => {
      expect(screen.getByText('Go to school')).toBeInTheDocument();
    });
    
    api.deleteToDo.mockResolvedValue(true);

    const deleteButton = screen.getByRole('button', {name: 'Delete'});
    
    fireEvent.click(deleteButton);

    //Render the App again to simulate a page reload
    render(<App/>);

    await waitFor(() => {
      expect(screen.getByText('No to dos found')).toBeInTheDocument();
    });
  }); 

  it('should render a done to-do after being set as done', async () => {
    const { location } = window;
    delete window.location;
    window.location = { reload: jest.fn() };

    api.fetchAllToDos = jest.fn()
      .mockResolvedValueOnce({
        'toDos': [
          {
            'text': "Go to school",
            'priority': 3,
            'dueDate': null,
            'id': "759315c6-66a6-4bf8-a820-51b4494b657a",
            'isDone': false,
            'doneDate': null,
            'createdAt': "2023-03-27T09:35:05.003879"
          }
        ],
        'prev': null,
        'next': null,
        'pages': 1
      })
      .mockResolvedValueOnce({
        'toDos': [
          {
            'text': "Go to school",
            'priority': 3,
            'dueDate': null,
            'id': "759315c6-66a6-4bf8-a820-51b4494b657a",
            'isDone': true,
            'doneDate': null,
            'createdAt': "2023-03-27T09:35:05.003879"
          }
        ],
        'prev': null,
        'next': null,
        'pages': 1
      })

    api.getMetrics.mockResolvedValue({
        "data": {
            "averageMedium": null,
            "averageHigh": null,
            "averageAll": null,
            "averageLow": null
        },
        "status": 200
    });

    render(<App/>);

    await waitFor(() => {
      expect(screen.getByText('Go to school')).toBeInTheDocument();
    });
    
    api.setToDoAsDone.mockResolvedValue({
      "data": {
          "text": "Call the doctor",
          "priority": 2,
          "dueDate": "2023-03-16",
          "id": "dc8cc7d5-19e7-4e57-a1b7-5ddb799e790e",
          "isDone": true,
          "doneDate": "2023-03-27T19:14:38.848292",
          "createdAt": "2023-03-27T19:14:18.13023"
      },
      "status": 200
    })

    const doneButton = screen.getByRole('checkbox');
    
    fireEvent.click(doneButton);

    //Render the App again to simulate a page reload
    render(<App/>);

    await waitFor(() => {
      expect(screen.getByRole('checkbox')).toBeChecked();
    });
  });

  it('should render table with an updated to-do when a to-do is updated', async () => {
    const { location } = window;
    delete window.location;
    window.location = { reload: jest.fn() };

    api.getMetrics.mockResolvedValue({
      "data": {
          "averageMedium": null,
          "averageHigh": null,
          "averageAll": null,
          "averageLow": null
      },
      "status": 200
    });

    api.fetchAllToDos = jest.fn()
      .mockResolvedValueOnce({
        'toDos': [{
            text: "Work on frontend",
            priority: 1,
            dueDate: null,
            id: "2303c08e-50cf-4d89-a67c-5586f9eddedc",
            isDone: false,
            doneDate: null,
            createdAt: "2023-03-27T11:27:59.525399"
        }],
        'prev': null,
        'next': null,
        'pages': 1
      })
      .mockResolvedValueOnce({
        'toDos': [{
          text: "Work on frontend",
          priority: 3,
          dueDate: null,
          id: "2303c08e-50cf-4d89-a67c-5586f9eddedc",
          isDone: false,
          doneDate: null,
          createdAt: "2023-03-27T11:27:59.525399"
        }],
        'prev': null,
        'next': null,
        'pages': 1
      })

    render(<App/>);

    await waitFor(() => {
      expect(screen.getByText('Work on frontend')).toBeInTheDocument();
    });

    act(() => {
      const updateButton = screen.getByRole('button', {name: 'Update'});
      fireEvent.click(updateButton);
    })

    await waitFor(() => {
      expect(screen.getByText('Update To-do')).toBeInTheDocument();
    })
    
    act(() => {
      const priorityOptionBox = screen.getByRole('combobox', {name: 'update-priority'});
  
      userEvent.selectOptions(priorityOptionBox, "High");
    })

    api.updateToDo.mockResolvedValue({
      data: {
        text: "Work on frontend",
        priority: 3,
        dueDate: null,
        id: "2303c08e-50cf-4d89-a67c-5586f9eddedc",
        isDone: false,
        doneDate: null,
        createdAt: "2023-03-27T11:27:59.525399"
      },
      status: 200
    });

    const updateButton = screen.getByRole('button', {name: 'update-button'});

    fireEvent.click(updateButton);

    //Render again to simulate a page reload
    render(<App/>)

    const options = screen.getAllByRole('option');

    await waitFor(() => {
      expect(screen.getByText('Work on frontend')).toBeInTheDocument();
      expect(options[0].selected).toBeTruthy();
      expect(options[1].selected).toBeFalsy();
      expect(options[2].selected).toBeFalsy();
    });
  });

});