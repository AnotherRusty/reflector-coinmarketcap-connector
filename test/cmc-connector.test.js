const testResponse = require('./test-response.json')
const {fetchQuotes} = require('../src')

test('fetchQuotes', async () => {
    const nativeFetch = global.fetch
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(testResponse)
    }))

    expect(await fetchQuotes(['ETH', 'sol'], 10, '111')).toStrictEqual({
        timestamp: 1701730809,
        prices: [
            22286965342330n,
            609433352274n
        ]
    })
    expect(await fetchQuotes(['nonexistent', 'sol'], 7, '111')).toStrictEqual({
        timestamp: 1701730809,
        prices: [
            0n,
            609433352n
        ]
    })
    expect(await fetchQuotes(['BTC', 'ETH', 'SOL', 'XRP'], 14, '111')).toStrictEqual({
        timestamp: 1701730809,
        prices: [
            4195490670451561891n,
            222869653423301861n,
            6094333522737736n,
            62223524826168n
        ]
    })
    global.fetch = nativeFetch
})