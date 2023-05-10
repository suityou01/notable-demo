import axios, { AxiosResponse } from 'axios';
import { getTodos } from './todos';

jest.mock('axios');

const mAxios = axios as jest.MockedFunction<typeof axios>;

describe('todos.spec.ts', () => {
    it('should get some todos', async() => {
        const mockResponse = { data: [
            {
                "id": 1,
                "todo": "Varnish the soap",
                "created": "2023-05-08T16:55:43.000Z",
                "updated": null,
                "completed": null,
                "deleted": null
            },
            {
                "id": 2,
                "todo": "Grease the stairs",
                "created": "2023-05-08T16:55:43.000Z",
                "updated": null,
                "completed": null,
                "deleted": null
            },
            {
                "id": 3,
                "todo": "Clean the walrus",
                "created": "2023-05-08T16:55:43.000Z",
                "updated": null,
                "completed": null,
                "deleted": null
            },
            {
                "id": 4,
                "todo": "Teach grandma how to floss",
                "created": "2023-05-08T16:55:43.000Z",
                "updated": null,
                "completed": null,
                "deleted": null
            }
        ], status: 200, statusText: 'ok' } as AxiosResponse;
        mAxios.get = jest.fn().mockResolvedValue(mockResponse);
        const todos = await getTodos();
        expect(todos.length).toEqual(4);
        /* other meaningful tests go here */
    });
})