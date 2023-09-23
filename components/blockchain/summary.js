import Card from "./card";

import { formatBytes, nFormatter } from "../../lib/formatNumbers";

export default function Summary(props) {
    const mempoolUsage = formatBytes(props.networkStatus.mempool.usage);
    
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
                        hour: 'numeric', minute: 'numeric', timeZone: 'UTC'};
    const nextHalvingDate = new Date(props.networkStatus.nexthalving.nextHalvingEstimatedDate);
    
    // console.log(props.networkStatus);    

    return(
        <div className="container text-center m-3 p-3 border">
            <div className='m-2'><h5 className="card-title">Mainnet Network Status</h5></div>
            <div className="row">
                <div className="col-sm">
                    <Card elements={
                        {
                            title: 'Blocks',
                            subtitle: null,
                            text: (props.networkStatus.blocks),
                            link1: null, link1txt: null,
                            link2: null, link2txt: null,
                            tip: null,
                        }
                    }/>
                </div>
                <div className="col-sm">
                    <Card elements={
                        {
                            title: 'Global Hashrate',
                            subtitle: 'H/s (Last 24h)',
                            text: nFormatter(props.networkStatus.hashrate, 2),
                            link1: null, link1txt: null,
                            link2: null, link2txt: null,
                            tip: null,
                        }
                    }/>
                </div>
                <div className="col-sm">
                    <Card elements={
                        {
                            title: 'Difficulty',
                            subtitle: null,
                            text: nFormatter(props.networkStatus.difficulty, 2),
                            link1: null, link1txt: null,
                            link2: null, link2txt: null,
                            tip: null,
                        }
                    }/>
                </div>
                <div className="col-sm">
                    <Card elements={
                        {
                            title: 'Reward/block',
                            subtitle: 'Bitcoin units',
                            text: props.networkStatus.rewardperblock,
                            link1: null, link1txt: null,
                            link2: null, link2txt: null,
                            tip: null,
                        }
                    }/>
                </div>                
            </div>
            <div className="row">
                <div className="col-sm">
                    <Card elements={
                        {
                            title: 'Mempool',
                            subtitle: 'Transactions (Txs) waiting for confirmation...',
                            text: ("Total Txs: " + props.networkStatus.mempool.size
                                    + "\nMemory: " + mempoolUsage
                                    + "\nTotal Fee: " + props.networkStatus.mempool.total_fee
                                    + "\nMinimum Fee: " + props.networkStatus.mempool.mempoolminfee),
                            link1: null, link1txt: null,
                            link2: null, link2txt: null,
                            tip: 'Source: www.bitcoinexplorer.org Fee: Bitcoin units',
                        }
                    }/>
                </div>
                <div className="col-sm">
                    <Card elements={
                        {
                            title: 'Estimated Fees',
                            subtitle: 'Tx fee to get a confirmation within...',
                            text: ("Immediate: " + props.networkStatus.estimatefees.nextBlock + " sat/vB"
                                    + "\n30 minutes: " + props.networkStatus.estimatefees['30min'] + " sat/vB"
                                    + "\n1 hour: " + props.networkStatus.estimatefees['60min'] + " sat/vB"
                                    + "\n1 day: " + props.networkStatus.estimatefees['1day']) + " sat/vB",
                            link1: null, link1txt: null, 
                            link2: null, link2txt: null,
                            tip: 'sat/vB: satoshis/virtual Bytes',
                        }
                    }/>
                </div>
                <div className="col-sm">
                    <Card elements={
                        {
                            title: 'Next Halving',
                            subtitle: null,
                            text: ("Block Height: " + props.networkStatus.nexthalving.nextHalvingBlock
                                    + "\nReward/block: " + props.networkStatus.nexthalving.nextHalvingSubsidy
                                    + "\nRemaining Time: " + props.networkStatus.nexthalving.timeUntilNextHalving
                                    + "\nETA: " + nextHalvingDate.toLocaleString("en-US", options)),
                            link1: null, link1txt: null,
                            link2: null, link2txt: null,
                            tip: null,
                        }
                    }/>
                </div>
                <div className="col-sm">
                    <Card elements={
                        {
                            title: 'Bitcoin Supply',
                            subtitle: 'Bitcoin units (Max. 21M)',
                            text: nFormatter(props.networkStatus.totalcoins / 100000000, 6),
                            link1: null, link1txt: null,
                            link2: null, link2txt: null,
                            tip: null,
                        }
                    }/>
                </div>
            </div>
        </div>
    );
}