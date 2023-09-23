
export const config = {
    api: {
      responseLimit: false,
    },
  }

export default async function handler(req, res) {
    const height = req.query.height;

    if (req.method === 'GET') {
        const response = await fetch(`https://blockchain.info/block-height/${height}?format=json`);
        const data = await response.json();

        res.status(200).json(data);
        return;
    }
    res.status(200).json({ message: 'Method not implemented' })
}