# @reflector/reflector-coinmarketcap-connector

> CoinMarketCap data source for Reflector backend

## Installation

Add package reference to the `dependencies` section of `package.json`

```json
{
  "dependencies": {
    "@reflector/reflector-coinmarketcap-connector": "github:reflector-network/reflector-coinmarketcap-connector#v0.1.0"
  }
}
```

## Usage

Obtain API key from CoinMarketCap to use this connector.
Retrieve prices data:

```js
expect(await fetchQuotes(['BTC', 'ETH', 'SOL', 'XRP'], 14, 'api_key')).toStrictEqual()
/*{
    timestamp: 1701730809,
    prices: [
        4195490670451561891n,
        222869653423301861n,
        6094333522737736n,
        62223524826168n
    ]
}*/
```

## Tests

```
npm run test
```