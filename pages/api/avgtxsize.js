
export default async function handler(req, res) {
    if (req.method === 'GET') {
        const response = await fetch('https://blockchain.info/q/avgtxsize');
        const data = await response.json();

        res.status(200).json({ avgsize: data });
        return;
    }
    res.status(200).json({ message: 'Method not implemented' })
}