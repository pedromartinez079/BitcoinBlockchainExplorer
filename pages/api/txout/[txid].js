
export default async function handler(req, res) {
    const txid = req.query.txid;
    const vout = parseInt(req.query.vout, 10);
        
    if (req.method === 'GET') {
        const GETBLOCK_URL = `https://go.getblock.io/${process.env.GETBLOCK_ACCESS_TOKEN}`;
        const headers = {'Content-Type': 'application/json'};
        const data_raw = {"jsonrpc": "2.0", "method": "gettxout", "params": [txid, vout], "id": "getblock.io"}; 
        const response = await fetch(
            GETBLOCK_URL,
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

