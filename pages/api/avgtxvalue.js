
export default async function handler(req, res) {
    if (req.method === 'GET') {
        const response = await fetch('https://blockchain.info/q/avgtxvalue');
        const data = await response.json();

        res.status(200).json({ avgvalue: data });
        return;
    }
    res.status(200).json({ message: 'Method not implemented' })
}