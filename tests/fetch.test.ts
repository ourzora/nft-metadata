import { uri } from '../src'

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
})
