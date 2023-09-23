
export default async function handler(req, res) {
    // addresslist = address1|address2|address3|....
    const addresslist = req.query.addresslist;

    if (req.method === 'GET') {
        const response = await fetch(`https://blockchain.info/multiaddr?active=${addresslist}`);
        const data = await response.json();

        res.status(200).json(data);
        return;
    }
    res.status(200).json({ message: 'Method not implemented' })
}