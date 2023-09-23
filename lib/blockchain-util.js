async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return(data);
}

async function fetchFromGetBlock(url, method, params) {
    const headers = {'x-api-key': `${process.env.GETBLOCK_API_KEY}`, 'Content-Type': 'application/json'}
    const data_raw = {"jsonrpc": "2.0", "method": method, "params": params, "id": "getblock.io"}; 
    const response = await fetch(url,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data_raw),
        }
    );
    const data = await response.json();
    // console.log(data);
    return(data);
}

export async function getRandomQuote() {
    const quote = await fetchData('https://bitcoinexplorer.org/api/quotes/random');

    return(quote);
}

export async function getNetworkStatus() {
    const blockcount = await fetchFromGetBlock('https://btc.getblock.io/mainnet/', 'getblockcount', []);
    const difficulty = await fetchFromGetBlock('https://btc.getblock.io/mainnet/', 'getdifficulty', []);
    const totalcoins = await fetchData('https://blockchain.info/q/totalbc');
    const rewardperblock = await fetchData('https://blockchain.info/q/bcperblock');
    const mempool = await await fetchFromGetBlock('https://btc.getblock.io/mainnet/', 'getmempoolinfo', []);
    const estimatefees = await fetchData('https://bitcoinexplorer.org/api/mempool/fees');
    const nexthalving = await fetchData('https://bitcoinexplorer.org/api/blockchain/next-halving');
    const hashrate = await await fetchFromGetBlock('https://btc.getblock.io/mainnet/', 'getnetworkhashps', []);

    const networkStatus = {
        blocks: blockcount.result,
        difficulty: difficulty.result,
        totalcoins: totalcoins,
        rewardperblock: rewardperblock,
        mempool: mempool.result,
        estimatefees: estimatefees,
        nexthalving: nexthalving,
        hashrate: hashrate.result,
    };

    // console.log(networkStatus);

    return(networkStatus);
}

export async function getBlockCount() {
    const height = await fetchFromGetBlock('https://btc.getblock.io/mainnet/', 'getblockcount', []);
    
    return(height.result);
}

export async function getLastBlockHash() {
    const hash = await fetchFromGetBlock('https://btc.getblock.io/mainnet/', 'getbestblockhash', []);
    
    return(hash.result);
}

export async function getRawTx(txhash) {
    const tx = await fetchFromGetBlock('https://btc.getblock.io/mainnet/', 'getrawtransaction', [txhash, true]);

    return(tx.result);
}

export async function getTxOut(txhash, vout) {
    const tx = await fetchFromGetBlock('https://btc.getblock.io/mainnet/', 'gettxout', [txhash, vout]);

    // console.log('getTxOut', txhash, vout, tx);
    return(tx.result);
}

export async function decodeRawTx(hexstr) {
    const decodedTx = await fetchFromGetBlock('https://btc.getblock.io/mainnet/', 'decoderawtransaction', [hexstr]);

    // console.log(decodedTx.result.vin);
    return(decodedTx.result);
}

export async function getRawAddress(addressId) {
    const rawAddress = await fetchData(`https://blockchain.info/rawaddr/${addressId}`);

    console.log(rawAddress)
    return(rawAddress);
}