const GETBLOCK_URL = `https://go.getblock.io/${process.env.GETBLOCK_ACCESS_TOKEN}`;

async function fetchData(url) {
    const response = await fetch(url);
    const data = response.json();
    return(data);
}

async function fetchFromGetBlock(url, method, params) {
    const headers = {'Content-Type': 'application/json'};
    const data_raw = {"jsonrpc": "2.0", "method": method, "params": params, "id": "getblock.io"}; 
    const response = await fetch(url,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data_raw),
        }
    );
    const data = response.json();
    
    return(data);
}

export async function getRandomQuote() {
    const quote = await fetchData('https://bitcoinexplorer.org/api/quotes/random');

    return(quote);
}

export async function getNetworkStatus() {
    const totalcoins = await fetchData('https://blockchain.info/q/totalbc');
    const rewardperblock = await fetchData('https://blockchain.info/q/bcperblock');
    const estimatefees = await fetchData('https://mempool.space/api/v1/fees/recommended');
    //const nexthalving = await fetchData('https://bitcoinexplorer.org/api/blockchain/next-halving');
    const nexthalving = {nextHalvingEstimatedDate: "March 26, 2028",
        nextHalvingBlock: "1050000",
        nextHalvingSubsidy: "1.5625",
        timeUntilNextHalving: null,
    };
    
    const blockcount = await fetchFromGetBlock(GETBLOCK_URL, 'getblockcount', []);
    const difficulty = await fetchFromGetBlock(GETBLOCK_URL, 'getdifficulty', []);
    const mempool = await await fetchFromGetBlock(GETBLOCK_URL, 'getmempoolinfo', []);
    const hashrate = await await fetchFromGetBlock(GETBLOCK_URL, 'getnetworkhashps', []);

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
    
    return(networkStatus);
}

export async function getBlockCount() {
    const height = await fetchFromGetBlock(GETBLOCK_URL, 'getblockcount', []);
    
    return(height.result);
}

export async function getLastBlockHash() {
    const hash = await fetchFromGetBlock(GETBLOCK_URL, 'getbestblockhash', []);
    
    return(hash.result);
}

export async function getRawTx(txhash) {
    const tx = await fetchFromGetBlock(GETBLOCK_URL, 'getrawtransaction', [txhash, true]);

    return(tx.result);
}

export async function getTxOut(txhash, vout) {
    const tx = await fetchFromGetBlock(GETBLOCK_URL, 'gettxout', [txhash, vout]);

    return(tx.result);
}

export async function decodeRawTx(hexstr) {
    const decodedTx = await fetchFromGetBlock(GETBLOCK_URL, 'decoderawtransaction', [hexstr]);

    return(decodedTx.result);
}

export async function getRawAddress(addressId) {
    const rawAddress = await fetchData(`https://blockchain.info/rawaddr/${addressId}`);

    return(rawAddress);
}