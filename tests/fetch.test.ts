import { uri } from '../src'
import { mocked } from 'ts-jest/utils'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = mocked(axios)

describe('fetch.ts', () => {
  describe('parses data-uris', () => {
    test.each`
      tag                                          | input                                                                                           | mime                     | expectedResult
      ${'handles a standard text data uri'}        | ${'data:text/plain,hello world'}                                                                | ${'text/plain'}          | ${'hello world'}
      ${'handles a semi-malfomred svg data uri'}   | ${'data:application/svg+xml,<svg><rect x="0" y="0" /></svg>'}                                   | ${'application/svg+xml'} | ${'<svg><rect x="0" y="0" /></svg>'}
      ${'handles a base64-encoded svg data uri'}   | ${'data:application/svg+xml;charset=utf-8;base64,PHN2Zz48cmVjdCB4PSIwIiB5PSIwIiAvPjwvc3ZnPg=='} | ${'application/svg+xml'} | ${'<svg><rect x="0" y="0" /></svg>'}
      ${'handles a json data uri'}                 | ${'data:application/json,{"name": "test"}'}                                                     | ${'application/json'}    | ${'{"name": "test"}'}
      ${'handles a base64-encoded json data uri'}  | ${'data:application/json;base64,eyJuYW1lIjogInRlc3QifQ=='}                                      | ${'application/json'}    | ${'{"name": "test"}'}
      ${'handles a percent-encoded json data uri'} | ${'data:application/json,%7B%22name%22%3A%20%22test%22%7D'}                                     | ${'application/json'}    | ${'{"name": "test"}'}
    `(
      '$tag: parses data uri correctly',
      ({ input, expectedResult, mime }: any) => {
        const dataUri = uri.parseDataUri(input)
        if (!dataUri) {
          throw new Error('missing data uri parse')
        }

        expect(dataUri.body).toEqual(expectedResult)
        expect(dataUri.mime).toEqual(mime)
      },
    )
  })

  describe('#fetchWithRetriesAndTimeout', () => {
    it('properly makes head requests', async () => {
      const mockResponse = {
        'content-type': 'image/svg+xml',
      }

      mockedAxios.mockResolvedValue({
        headers: mockResponse,
        data: '',
      } as any)

      const resource = 'https://example.com'

      const resp = await uri.fetchWithRetriesAndTimeout(resource, {
        timeout: 10000,
        method: 'head',
      })

      expect(mockedAxios).toHaveBeenCalledWith(resource, {
        timeout: 10000,
        method: 'head',
      })
      expect(resp.data).toEqual('')
    })

    it('defaults to make get requests', async () => {
      const mockResponse = {
        'content-type': 'image/svg+xml',
      }

      mockedAxios.mockResolvedValue({
        headers: mockResponse,
        data: 'pee pee poo poo',
      } as any)

      const resource = 'https://example.com'

      const resp = await uri.fetchWithRetriesAndTimeout(resource, {
        timeout: 10000,
      })

      expect(mockedAxios).toHaveBeenCalledWith(resource, {
        method: 'get',
        timeout: 10000,
      })
      expect(resp.data).toEqual('pee pee poo poo')
    })
    it('raises an error if it exhausts retries', async () => {
      mockedAxios.mockRejectedValue(new Error('idk'))

      const resource = 'https://example.com'

      await await expect(
        uri.fetchWithRetriesAndTimeout(resource, {
          timeout: 10000,
        }),
      ).rejects.toThrow(
        `Exhausted retries attempting to fetch ${resource} with error: idk`,
      )
    })
  })
})
