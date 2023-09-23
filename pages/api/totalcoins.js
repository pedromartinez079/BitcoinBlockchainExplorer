
export default async function handler(req, res) {
    if (req.method === 'GET') {
        const response = await fetch('https://blockchain.info/q/totalbc');
        const data = await response.json();

        res.status(200).json({ totalcoins: data });
        return;
    }
    res.status(200).json({ message: 'Method not implemented' })
}