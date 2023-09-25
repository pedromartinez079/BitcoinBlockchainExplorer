
export const config = {
    api: {
      responseLimit: false,
    },
  }

export default async function handler(req, res) {
    const blockhash = req.query.blockhash;

    if (req.method === 'GET') {
        const headers = {'x-api-key': `${process.env.GETBLOCK_API_KEY}`, 'Content-Type': 'application/json'}
        const data_raw = {"jsonrpc": "2.0", "method": "getblock",
                          "params": [blockhash, 1],
                          "id": "getblock.io"}; 
        const response = await fetch('https://btc.getblock.io/mainnet/',
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