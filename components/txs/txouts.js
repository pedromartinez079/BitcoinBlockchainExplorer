import Link from "next/link";

export default function TxOuts(props) {
    const txOuts = props.outputs;

    // console.log('txOuts', txOuts);

    return(
        <div className="card card-body">
            {txOuts.map((tx) => {
                const index = ((tx.n === 0) && '0') || ((tx.n !== 0) && tx.n)
                const value = ((tx.value === 0) && '0') || ((tx.value !== 0) && tx.value)
                
                return(
                    <div key={index} className="card card-body m-1">
                        {tx.scriptPubKey && <p className="card-text m-0">Receiver Address: <Link href={'/address/' + tx.scriptPubKey.address}>{tx.scriptPubKey.address}</Link></p>}
                        {value && <p className="card-text m-0">Value (BTC): {value}</p>}
                        {(tx.spent !== null) && <p className="card-text m-0">Spent: {tx.spent.toLocaleString()}</p>}
                        {index && <p className="card-text m-0">Index: {index}</p>}
                        {tx.scriptPubKey && <p className="card-text m-0">asm: {tx.scriptPubKey.asm}</p>}
                        {tx.scriptPubKey && <p className="card-text m-0">type: {tx.scriptPubKey.type}</p>}
                        {tx.scriptPubKey && <p className="card-text m-0">Description: {tx.scriptPubKey.desc}</p>}
                        {tx.scriptPubKey && <p className="card-text m-0">hex: {tx.scriptPubKey.hex}</p>}
                    </div>
                );
            })}
            
        </div>
    );
}

{/*
[
    {
      value: 0.00320006,
      n: 0,
      scriptPubKey: {
        asm: '0 872891f3d9b49147a26d03394d419b6b7fad1000',
        desc: 'addr(bc1qsu5fru7ekjg50gndqvu56svmddl66yqq08mqfe)#h6evfyxv',
        hex: '0014872891f3d9b49147a26d03394d419b6b7fad1000',
        address: 'bc1qsu5fru7ekjg50gndqvu56svmddl66yqq08mqfe',
        type: 'witness_v0_keyhash'
      }
    },
    {
      value: 0.00060014,
      n: 1,
      scriptPubKey: {
        asm: 'OP_DUP OP_HASH160 ad2a9a14a537cc4d9ec56ff9fa0678e7b8b1b069 OP_EQUALVERIFY OP_CHECKSIG',
        desc: 'addr(1GncwDb1RhrxFopXANpwtk76qLX1T5DAfp)#3urtqyzn',
        hex: '76a914ad2a9a14a537cc4d9ec56ff9fa0678e7b8b1b06988ac',
        address: '1GncwDb1RhrxFopXANpwtk76qLX1T5DAfp',
        type: 'pubkeyhash'
      }
    }
  ]
*/}