
export default async function handler(req, res) {
    const addressId = req.query.addressid;

    if (req.method === 'GET') {
        // const response = await fetch(`https://blockchain.info/rawaddr/${addressId}`); // API limit reached
        const response = await fetch(`https://bitcoinexplorer.org/api/address/${addressId}?limit=100`);
        const data = await response.json();

        // console.log(data);
        res.status(200).json(data);
        return;
    }
    res.status(200).json({ message: 'Method not implemented' })
}