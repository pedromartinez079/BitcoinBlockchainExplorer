
export default async function handler(req, res) {
    const txhash = req.query.txhash;

    if (req.method === 'GET') {
        const GETBLOCK_URL = `https://go.getblock.io/${process.env.GETBLOCK_ACCESS_TOKEN}`;
        // const headers = {'x-api-key': `${process.env.GETBLOCK_API_KEY}`, 'Content-Type': 'application/json'}
        const headers = {'Content-Type': 'application/json'}
        const data_raw = {"jsonrpc": "2.0", "method": "getrawtransaction",
                          "params": [txhash, true],
                          "id": "getblock.io"}; 
        // const response = await fetch('https://btc.getblock.io/mainnet/',
        const response = await fetch(GETBLOCK_URL,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data_raw),
            }
        );
        const data = await response.json();
        // console.log(data);
        
        res.status(200).json(data.result);
        return;
    }
    res.status(200).json({ message: 'Method not implemented' })
}