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
                {/*fee && <p className="card-text m-0"> Fee: {fee}</p>*/}
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



{/* bitcoinexplorer.org
{
  txid: '98613136121c6203d156265da61274adaa3925b1b34df6a37e1d54229cbaefcd',
  hash: 'cfa96db7eab5d705ee5a1b2b99022b93f220087e0a2f44e01869babb66118e24',
  version: 2,
  size: 192,
  vsize: 111,
  weight: 441,
  locktime: 0,
  vin: [
    {
      txid: '6bfb986287b2537f4a1db30f530eb0be31e049d75134a6c871b85145734c9543',
      vout: 1,
      scriptSig: [Object],
      txinwitness: [Array],
      sequence: 4294967295,
      value: 0.00228
    }
  ],
  vout: [ { value: 0.0022, n: 0, scriptPubKey: [Object] } ],
  hex: '0200000000010143954c734551b871c8a63451d749e031beb00e530fb31d4a7f53b2876298fb6b0100000000ffffffff01605b03000000000017a9140073d229fe465897337a1b2ffc8af31451e4aed78702473044022034c16e16005845e0d9c2840d35fa20639a9690a71761d0f25967a4c79b18e8c002206f81efc503605138225c2d905087458499c03859a086dc204e9d651e734257f1012102cd46a9a6d2e9d80419d49e68c7d093f2bb69a8e4bbdd82dd82ebb269e4b2fb6600000000',
  blockhash: '000000000000000000042e661b9241089467e35cb3e7c68762178aec064870a8',
  confirmations: 3,
  time: 1694617883,
  blocktime: 1694617883,
  fee: { amount: 0.00008, unit: 'BTC' }
}
*/}

{/* blockchain.com
{
    hash: 'eda03117e3259a00c752a0c7cb41019e569a11f9df54d68ded53b31b90117249',
    ver: 1,
    vin_sz: 1,
    vout_sz: 3,
    size: 317,
    weight: 1160,
    fee: 0,
    relayed_by: '0.0.0.0',
    lock_time: 0,
    tx_index: 2584136632202858,
    double_spend: false,
    time: 1694464832,
    block_index: 807230,
    block_height: 807230,
    inputs: [
      {
        sequence: 4294967295,
        witness: '01200000000000000000000000000000000000000000000000000000000000000000',
        script: '033e510c1a2f5669614254432f4d696e656420627920766164696d3030312f2cfabe6d6dfb2db0044fc292649f1fa15ae36767721249e581a05459871e58e4a21eeaa2c31000000000000000107500cd0025a6dd580b57a02558eb180000000000',
        index: 0,
        prev_out: [Object]
      }
    ],
    out: [
      {
        type: 0,
        spent: false,
        value: 647352017,
        spending_outpoints: [],
        n: 0,
        tx_index: 2584136632202858,
        script: '76a914536ffa992491508dca0354e52f32a3a7a679a53a88ac',
        addr: '18cBEMRxXHqzWWCxZNtU91F5sbUNKhL5PX'
      },
      {
        type: 0,
        spent: false,
        value: 0,
        spending_outpoints: [],
        n: 1,
        tx_index: 2584136632202858,
        script: '6a2952534b424c4f434b3ac9b9708c735911ec715cbda1519a5a2b4d8df3aab9d9543846d469280055ef46'
      },
      {
        type: 0,
        spent: false,
        value: 0,
        spending_outpoints: [],
        n: 2,
        tx_index: 2584136632202858,
        script: '6a24aa21a9ed5102a49b457d832dfbcd1adfad6d678b72705652acf94619add07de3ad4e70cc'
      }
    ]
}
*/}
  