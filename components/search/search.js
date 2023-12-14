import Link from "next/link";

import Tx from '../txs/tx';
import Block from "../blocks/block";
import Wallet from "../wallets/wallet";

export default function SearchResult(props) {
    const isTx = props.result[0] !== null;
    const isBlock = props.result[1] !== null;
    const isAddress = !props.result[2].hasOwnProperty("error");
    let tx = { txid: '' };
    let block = { hash: '' };
    let address = { address: '' }

    if (isTx) { tx = props.result[0] }
    if (isBlock) { block = props.result[1] }
    if (isAddress) { address = props.result[2] }
    
    return(
        <div className="container text-center border">
            {isTx && <p className="card-text m-3">Tx: <Link href={`/txs/${tx.txid}`}>{tx.txid}</Link></p>}
            {isBlock && <p className="card-text m-3">Block: <Link href={`/blocks/${block.hash}`}>{block.hash}</Link></p>}
            {isAddress && <p className="card-text m-3">Address: <Link href={`/address/${address.validateaddress.address}`}>{address.validateaddress.address}</Link></p>}
            {!isTx && !isBlock && !isAddress &&
                <div className="d-flex justify-content-center m-3">
                    <span className="badge text-bg-warning fs-5">Nothing was found!</span>            
                </div>
            }
        </div>
    );
}