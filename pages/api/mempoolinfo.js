
export default async function handler(req, res) {
    if (req.method === 'GET') {
        const headers = {'x-api-key': `${process.env.GETBLOCK_API_KEY}`, 'Content-Type': 'application/json'};
        const data_raw = {"jsonrpc": "2.0", "method": "getmempoolinfo", "params": [], "id": "getblock.io"}; 
        const response = await fetch(
            'https://btc.getblock.io/mainnet/',
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data_raw),
            }
        );
        const data = await response.json();

        res.status(200).json(data.result);
        return;
    }
    res.status(200).json({ message: 'Method not implemented' })
}



{/* 
curl --location --request POST 'https://btc.getblock.io/mainnet/' \
--header 'x-api-key: YOUR-API-KEY' \
--header 'Content-Type: application/json' \
--data-raw '{"jsonrpc": "2.0",
"method": "getmempoolinfo",
"params": [],
"id": "getblock.io"}'

*/}