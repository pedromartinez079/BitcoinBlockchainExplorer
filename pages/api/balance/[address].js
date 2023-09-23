
export default async function handler(req, res) {
    const address = req.query.address;

    if (req.method === 'GET') {
        const response = await fetch(`https://blockchain.info/balance?active=${address}`);
        const data = await response.json();

        res.status(200).json(data);
        return;
    }
    res.status(200).json({ message: 'Method not implemented' })
}