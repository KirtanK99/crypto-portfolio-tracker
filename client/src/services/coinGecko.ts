const COINGECKO_API = 'https://api.coingecko.com/api/v3';
export async function fetchTokenPrices(contractAddresses: string[]) {
    // Filter out zero or malformed addresses
    const validAddresses = contractAddresses.filter(
        (addr) => addr !== '0x0000000000000000000000000000000000000000' && !addr.includes('000000')
    );

    if (validAddresses.length === 0) return {};

    const url = `${COINGECKO_API}/simple/token_price/ethereum?contract_addresses=${validAddresses.join(
        ','
    )}&vs_currencies=usd`;

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to fetch token prices');
    }

    return res.json(); // { [contractAddress]: { usd: price } }
}

