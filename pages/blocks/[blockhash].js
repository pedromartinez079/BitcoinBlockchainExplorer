import { Fragment } from 'react';
import Head from 'next/head';

import { useState, useEffect } from 'react';
import useSWR from 'swr';

import Block from '../../components/blocks/block';
import { getRandomQuote } from "../../lib/blockchain-util";

export default function blockPage(props) {
    const [block, setBlock] = useState({});

    const {data, error} = useSWR(
        `/api/rawblock/${props.blockHash}`,
        (url) => fetch(url).then(res => res.json())
        );
    
    useEffect(() => {
        if (data) {  
            setBlock(data);
        }        
    }, [data]);

    let pageHead = (
        <Head>
            <title>Block {props.blockHash}</title>
            <meta
                name='A Bitcoin block'
                content='Bitcoin block confirmations merkle root nonce txs'
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
                <span className="badge text-bg-danger fs-5">Load failed</span>            
            </div>
        </Fragment>
        );
    if (!data) return (
        <Fragment>
            {pageHead}
            <div className="d-flex justify-content-center m-3">
                <button className="btn btn-warning" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span role="status">Loading...</span>
                </button>
            </div>
        </Fragment>
        );

    return(
        <Fragment>
            {pageHead}
            <div className="container text-center m-3 p-3 border">
                <div className='m-2'><h5 className="card-title">Block</h5></div>
                <div className="row">
                    <div className="col-sm">
                        <Block block={block}/>
                    </div>
                </div>            
            </div>
        </Fragment>
    );
}

export async function getServerSideProps(context) {
    const {params} = context;
    const blockHash = params.blockhash;
    
    const quote = await getRandomQuote();

    // console.log(blockId);

    return{
        props: { blockHash: blockHash, quote: quote }, 
    };
}

