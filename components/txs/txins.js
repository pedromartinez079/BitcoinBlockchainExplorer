import Link from "next/link";


export default function TxIns(props) {
    const txIns = props.inputs;
    
    return(
        <div className="card card-body">
            {txIns.map((tx) => {
                let asm = null;
                let hex = null;

                if (tx.scriptSig) {
                    if (tx.scriptSig.asm !== '') { asm = tx.scriptSig.asm}
                    if (tx.scriptSig.hex !== '') { hex = tx.scriptSig.hex}
                }

                if (tx.vout === 0) { tx.vout = '0'}

                return(
                    <div key={tx.txid || tx.coinbase} className="card card-body m-1">
                        {tx.coinbase && <p className="card-text m-0">Coinbase: {tx.coinbase}</p>}
                        {tx.txid && <p className="card-text m-0">Id: <Link href={'/txs/' + tx.txid}>{tx.txid}</Link></p>}
                        {tx.vout && <p className="card-text m-0">Index: {tx.vout}</p>}
                        {asm && <p className="card-text m-0">ScriptSig asm: {asm}</p>}
                        {hex && <p className="card-text m-0">ScriptSig hex: {hex}</p>}
                        {tx.txinwitness && <p className="card-text m-0">Witness:</p>}
                        {tx.txinwitness &&                            
                            tx.txinwitness.map((wit) => (<p key={wit} className="card-text m-0">{wit}</p>))                        
                        }                      
                    </div>
                );
            })}
        </div>
    );
}

{/*
[
  {
    txid: 'cf8bb1425c692ca712a8a08ca60578834e40d4fd25d217e95a9e8e1e8b29500a',
    vout: 2,
    scriptSig: { asm: '', hex: '' },
    txinwitness: [
      '3045022100b5adb384f570ec97e9d03096250c80117060cf85397f0f6292ebbe13b494ab18022024927c3bafed83ff2352ca257db526a4cba98170d133f1d60ce4c61ad585406b01',
      '026e5628506ecd33242e5ceb5fdafe4d3066b5c0f159b3c05a621ef65f177ea286'
    ],
    sequence: 4294967293
  }
]
*/}