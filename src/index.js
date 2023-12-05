/**
 * Fetch quotes from CoinMarketCap API
 * @param {String[]} symbols
 * @param {Number} decimals
 * @param {String} apiKey
 * @return {Promise<{timestamp: Number, prices: BigInt[]}>}
 */
function fetchQuotes(symbols, decimals, apiKey) {
    symbols = symbols.map(s => s.toUpperCase())
    const queryParams = `symbol=${symbols.join()}&aux=cmc_rank&CMC_PRO_API_KEY=${apiKey}`
    return fetch(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?${queryParams}`)
        .then(res => res.json())
        .then(res => {
            return {
                timestamp: Math.floor(new Date(res.status.timestamp).getTime() / 1000),
                prices: symbols.map(symbol => processPrice(res.data[symbol], decimals))
            }
        })
}

/**
 * @param {{}} entry
 * @param {Number} decimals
 * @return {BigInt}
 */
function processPrice(entry, decimals) {
    if (!entry)
        return 0n
    const {price} = entry[0].quote.USD
    if (!price)
        return 0n
    let [int, fract] = price.toFixed(decimals).split('.')
    fract = fract.substring(0, Number(decimals)).padEnd(decimals, '0')
    if (int === '0')
        return BigInt(fract)
    return BigInt(int + '0'.repeat(decimals)) + BigInt(fract)
}

module.exports = {fetchQuotes}