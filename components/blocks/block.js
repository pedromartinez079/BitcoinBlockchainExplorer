
import Link from 'next/link';
import TxList from '../txs/txlist';

import classes from './block.module.css';

export default function Block(props) {
    let next_block = props.block.nextblockhash;
    if (props.block.nextblockhash && props.block.nextblockhash.length === 0) {
        next_block = null;
    }

    if (props.block.height === 0) { props.block.height = '0'}

    let date = new Date(props.block.time*1000);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
                        hour: 'numeric', minute: 'numeric', timeZone: 'UTC'};
    const blockTime = date.toLocaleString("en-US", options);
    
    return(
        <div className="card m-1 shadow">
            <div className="card-body">
                <div className={classes.tooltip}>
                    {props.block.tip && <span className={classes.tooltiptext}>{props.block.tip}</span>}
                    {props.block.height && <h5 className="card-title">Height: {props.block.height}</h5>}
                </div>
                {props.block.hash && <h6 className="card-subtitle mb-2 text-body-secondary">hash: {props.block.hash}</h6>}
                {props.block.confirmations && <p className="card-text m-0">Confirmations: {props.block.confirmations}</p>}
                {props.block.previousblockhash &&
                    <p className="card-text m-0">Previous Block:&nbsp;
                        <Link href={'/blocks/' + props.block.previousblockhash}>{props.block.previousblockhash}</Link>
                    </p>
                }
                {next_block &&
                    <p className="card-text m-0">Next Block:&nbsp;
                        <Link href={'/blocks/' + next_block}>{next_block}</Link>
                    </p>
                }
                {props.block.merkleroot && <p className="card-text m-0">Merkle Root: {props.block.merkleroot}</p>}
                {props.block.time && <span className="card-text m-0">Time UTC: {blockTime} |</span>}
                {props.block.nonce && <span className="card-text m-0"> nonce: {props.block.nonce} </span>}
                {props.block.nTx && <p className="card-text m-0">Txs: {props.block.nTx}</p>}
                {props.block.tx &&
                    <div>
                        <div className={classes.tooltip}>
                            <span className={classes.tooltiptext}>Tx Hashes</span>
                            <button className="btn btn-warning" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                Show Txs
                            </button>
                        </div>                       
                        <div className="collapse m-2" id="collapseExample">
                            <div className="card card-body">
                                <TxList txids={props.block.tx}/>
                            </div>
                        </div>
                    </div>
                }
                {props.block.link1 && <a href={props.block.link1} className="card-link">{props.block.link1txt}</a>}
                {props.block.link2 && <a href={props.block.link2} className="card-link">{props.block.link2txt}</a>}
            </div>
        </div>
    );
}