import Link from "next/link";
import TxIns from "./txins";
import TxOuts from "./txouts";

import classes from './tx.module.css';

export default function Tx(props) {
    let date = new Date(props.tx.time*1000);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
                        hour: 'numeric', minute: 'numeric', timeZone: 'UTC'};
    const txTime = date.toLocaleString("en-US", options);

    // ToDo: Decode Hex and get sender address

    return(
        <div className="card m-1 shadow" >
            <div className="card-body">
                {props.tx.txid && <h5 className="card-title">Id: {props.tx.txid}</h5>}
                {props.tx.hash && <h6 className="card-subtitle mb-2 text-body-secondary">Hash (Different from Id for segwit): {props.tx.hash}</h6>}
                {props.tx.confirmations && <p className="card-text m-0">Confirmations: {props.tx.confirmations}</p>}
                {props.tx.hex &&
                    <div className='container m-2'>
                      <div className={classes.tooltip}>
                        <span className={classes.tooltiptext}>Encoded transaction</span>
                        <button className="btn btn-warning" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTxHex" aria-expanded="false" aria-controls="collapseTxHex">
                            Hex
                        </button>
                      </div>                        
                      <div className="collapse m-2" id="collapseTxHex">
                        <p className="card-text m-0">{props.tx.hex}</p>
                      </div>
                    </div>
                }
                {props.tx.time && <p className="card-text m-0">Time UTC: {txTime}</p>}
                {props.tx.blockhash &&  <p className="card-text m-0">
                                          Block Hash: <Link href={'/blocks/' + props.tx.blockhash}>{props.tx.blockhash}</Link>
                                        </p>}                
                {props.tx.vin &&
                    <div className='container m-2'>
                      <div className={classes.tooltip}>
                        <span className={classes.tooltiptext}>Inputs used by the transaction</span>
                        <button className="btn btn-warning" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTxInputs" aria-expanded="false" aria-controls="collapseTxInputs">
                            Show Tx Inputs
                        </button>
                      </div>                        
                      <div className="collapse m-2" id="collapseTxInputs">
                        <TxIns inputs={props.tx.vin}/>
                      </div>
                    </div>
                }
                {props.tx.vout &&
                    <div className='container m-2'>
                      <div className={classes.tooltip}>
                        <span className={classes.tooltiptext}>Outputs for receiver and change for sender</span>
                        <button className="btn btn-warning" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTxOutputs" aria-expanded="false" aria-controls="collapseTxOutputs">
                            Show Tx Outputs
                        </button>
                      </div>                     
                      <div className="collapse m-2" id="collapseTxOutputs">
                          <TxOuts outputs={props.tx.vout}/>
                      </div>                      
                    </div>
                }
            </div>
        </div>
    );
}

{/* GetBlock
{
  txid: 'a69956cf913e7facb9cfd79065ed252f8b950e678b8e62036db4015a685562a4',
  hash: 'eecedbbc43e2cd3b3df5f6df48a098ad4beaf94be62861e54f1b04fc715d9a51',
  version: 2,
  size: 226,
  vsize: 144,
  weight: 574,
  locktime: 0,
  vin: [
    {
      txid: 'cf8bb1425c692ca712a8a08ca60578834e40d4fd25d217e95a9e8e1e8b29500a',
      vout: 2,
      scriptSig: [Object],
      txinwitness: [Array],
      sequence: 4294967293
    }
  ],
  vout: [
    { value: 0.0010387, n: 0, scriptPubKey: [Object] },
    { value: 0.3495849, n: 1, scriptPubKey: [Object] }
  ],
  hex: '020000000001010a50298b1e8e9e5ae917d225fdd4404e837805a68ca0a812a72c695c42b18bcf0200000000fdffffff02be950100000000001976a91492d09d2697ed1a632214987b94d845183e22e12188ac9a6c150200000000160014f60834ef165253c571b11ce9fa74e46692fc5ec102483045022100b5adb384f570ec97e9d03096250c80117060cf85397f0f6292ebbe13b494ab18022024927c3bafed83ff2352ca257db526a4cba98170d133f1d60ce4c61ad585406b0121026e5628506ecd33242e5ceb5fdafe4d3066b5c0f159b3c05a621ef65f177ea28600000000',
  blockhash: '00000000000000000003a7c66a45e5f94a38bf258cc12d54afeb52534979e4c5',
  confirmations: 3,
  time: 1694871601,
  blocktime: 1694871601
}
*/}