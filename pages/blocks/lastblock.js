import { Fragment } from 'react';
import Head from 'next/head';

import { useState, useEffect } from 'react';
import useSWR from 'swr';

import { getBlockCount, getLastBlockHash, getRandomQuote} from "../../lib/blockchain-util";

import BlockList from "../../components/blocks/blocklist";

export default function LastBlock(props) {
    const [blockList, setBlockList] = useState([]);

    const {data, error} = useSWR(
        `/api/rawblock/${props.lastblockhash}`,
        (url) => fetch(url).then(res => res.json())
        );
    
    useEffect(() => {
        if (data) {  
            const block = [];          
            block.push(data);
            setBlockList(block);
        }        
    }, [data]);

    let pageHead = (
        <Head>
            <title>Last Block</title>
            <meta
                name='Last Bitcoin block'
                content='Last Bitcoin block confirmations merkle root nonce txs'
            />
        </Head>
    );

    if (data === null) return(
        <Fragment>
            {pageHead}
            <div className="d-flex justify-content-center m-5">
                <span className="badge text-bg-danger fs-5">Block not found</span>            
            </div>
        </Fragment>
        );
    if (error) return(
        <Fragment>
            {pageHead}
            <div className="d-flex justify-content-center m-5">
                <span class="badge text-bg-danger fs-5">Load failed</span>            
            </div>
        </Fragment>
        );
    if (!data || data === undefined) return (
        <Fragment>
            {pageHead}
            <div className="d-flex justify-content-center m-3">
                <button className="btn btn-warning" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span role="status">Loading...</span>
                </button>
            </div>
        </Fragment>
        )

    return(
        <Fragment>
            {pageHead}
            <div className="container text-center m-3 p-3 border">
                <div className='m-2'><h5 className="card-title">Last Block</h5></div>
                <div className="row">
                    <div className="col-sm">
                        <BlockList blocks={blockList}/>
                    </div>
                </div>            
            </div>
        </Fragment>
    );
}

export async function getStaticProps() {
    const quote = await getRandomQuote();
    const lastblockhash = await getLastBlockHash();
  
    return{
      props: { quote: quote, lastblockhash: lastblockhash },
      revalidate: 600, 
    };
  }