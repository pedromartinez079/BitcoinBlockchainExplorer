import Link from 'next/link';

export default function TxList(props) {
    const txIds = props.txids;
    const txs = props.txs;
    
    if (txIds) {
        return(
            <div>
                {txIds.map((txid) => (
                    <div key={txid}>
                        <Link href={'/txs/' + txid.hash}>
                            {txid.hash}
                        </Link>
                    </div>
                ))}            
            </div>
        );
    }

    if (txs) {
        return(
            <div>
                {txs.map((tx) => {
                    let date = new Date(tx.time*1000);
                    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
                                    hour: 'numeric', minute: 'numeric', timeZone: 'UTC'};
                    const txTime = date.toLocaleString("en-US", options);

                    return(
                        <div key={tx.hash} className="card card-body m-1">
                            <p className="card-text m-0">TxId: <Link href={'/txs/' + tx.hash}>{tx.hash}</Link></p>
                            <p className="card-text m-0">Result(sats): {tx.result}</p>
                            <p className="card-text m-0">Fee(sats): {tx.fee}</p>
                            <p className="card-text m-0">Time: {txTime}</p>
                        </div>
                    );
                })}                
            </div>
        
        );
    }

    return(<p>Tx List empty!</p>);
}