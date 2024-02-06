import { updateVote, fetchMenuItems } from '../api'; // Adjust the import path as necessary
import fetchMock from 'jest-fetch-mock';

// resets the state of fetchMock before each test
beforeEach(() => {
  fetchMock.resetMocks();
});

// testing updateVote API
test('updateVote sends correct data', async () => {
  // single fetch call with successful response
  fetchMock.mockResponseOnce(JSON.stringify({ success: true }));

  // calling function with test data
  await updateVote(123, 10);

  // checking fetch is called one
  expect(fetchMock.mock.calls.length).toEqual(1);
  // checking if the URL is being called to the right place
  expect(fetchMock.mock.calls[0][0]).toEqual('http://127.0.0.1:5000/menu-items');
  // checking if the request configuration matches what is expected
  expect(fetchMock.mock.calls[0][1]).toEqual({
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "updateVote", itemId: 123, votes: 10 })
  });
});

// testing fetch menu items API
test('fetchMenuItems fetches data correctly', async () => {
  // mock response simulating test data
  const mockResponse = { menu: 'Test Menu' };
  fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

  // calls function with test parameters
  const result = await fetchMenuItems(['TestHall'], 'lunch');

  expect(fetchMock.mock.calls.length).toEqual(1);
  expect(fetchMock.mock.calls[0][0]).toEqual('http://127.0.0.1:5000/menu-items');
  expect(fetchMock.mock.calls[0][1]).toEqual({
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "fetchMenu", halls: ['TestHall'], meal: 'lunch' })
  });

  // checking if response is correct
  expect(result).toEqual(mockResponse);
});

// error testing
test('fetchMenuItems throws an error for non-ok response', async () => {
  fetchMock.mockReject(new Error('Network response was not ok'));

  await expect(fetchMenuItems(['TestHall'], 'lunch')).rejects.toThrow('Network response was not ok');
});
