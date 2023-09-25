import TxList from '../txs/txlist';

import classes from './wallet.module.css';

export default function Wallet(props) {
    const balance = ((props.wallet.txHistory.balanceSat === 0) && '0') || ((props.wallet.txHistory.balanceSat !== 0) && props.wallet.txHistory.balanceSat);
    const txs = ((props.wallet.txHistory.txCount === 0) && '0') || ((props.wallet.txHistory.txCount !== 0) && props.wallet.txHistory.txCount);

    return(
        <div className="card m-1 shadow">
            <div className="card-body">
                {props.wallet.validateaddress.address && <h5 className="card-title">{props.wallet.validateaddress.address}</h5>}
                {props.wallet.encoding && <h6 className="card-subtitle mb-2 text-body-secondary">Encoding: {props.wallet.encoding}</h6>}
                {props.wallet.validateaddress.scriptPubKey && <p className="card-text m-0">ScriptPubKey: {props.wallet.validateaddress.scriptPubKey}</p>}
                {balance && <p className="card-text m-0">Balance(sats): {balance}</p>}
                {txs && <p className="card-text m-0">Txs: {txs}</p>}
                {props.wallet.txHistory.txids &&
                    <div className='container m-2'>
                      <div className={classes.tooltip}>
                        <span className={classes.tooltiptext}>At most last 100 Txs</span>
                        <button className="btn btn-warning" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTxs" aria-expanded="false" aria-controls="collapseTxs">
                            Txs
                        </button>
                      </div>                        
                      <div className="collapse m-2" id="collapseTxs">
                        <TxList txids={props.wallet.txHistory.txids}/>
                      </div>
                    </div>
                }
            </div>
        </div>
    );

}

// https://bitcoinexplorer.org/api/address/${addressId}
{/*
  base58: { hash: '7cb19991a2af4d1ec4f2bb2837d92bde0a494f00', version: 5 },
  encoding: 'base58',
  validateaddress: {
    isvalid: true,
    address: '3D4LUBn2LFeUJWQVBvqL53nuWKqvitsPwR',
    scriptPubKey: 'a9147cb19991a2af4d1ec4f2bb2837d92bde0a494f0087',
    isscript: true,
    iswitness: false
  },
  electrumScripthash: '06bff24f26816ef5e3eecf8bd1e67b02812dc1e15dfbfb74d6dbaff1443a417f',
  txHistory: {
    txCount: 1,
    txids: [
      'b847d00560e78a50fcd060f0f981af6b3eec454fcc0939aaf3278b5985550f6a'
    ],
    blockHeightsByTxid: {
      b847d00560e78a50fcd060f0f981af6b3eec454fcc0939aaf3278b5985550f6a: 808634
    },
    balanceSat: 43671603,
    request: { limit: 10, offset: 0, sort: 'desc' }
  }
*/}


