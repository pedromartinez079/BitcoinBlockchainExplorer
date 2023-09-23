
export default async function handler(req, res) {
    if (req.method === 'GET') {
        const response = await fetch('https://bitcoinexplorer.org/api/blockchain/next-halving');
        const data = await response.json();

        res.status(200).json(data);
        return;
    }
    res.status(200).json({ message: 'Method not implemented' })
}