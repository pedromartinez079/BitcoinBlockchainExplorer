import { Fragment } from 'react';
import Head from 'next/head';

import { useState, useEffect } from 'react';
import useSWR from 'swr';

import Block from '../../components/blocks/block';
import Loading from '../../components/ui/loading';
import LoadFailed from '../../components/ui/loadfailed';
import NotFound from '../../components/ui/notfound';
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
            <NotFound />
        </Fragment>
        );
    if (error) return(
        <Fragment>
            {pageHead}
            <LoadFailed />
        </Fragment>
        );
    if (!data || data === undefined) return (
        <Fragment>
            {pageHead}
            <Loading />
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
    
    // const quote = await getRandomQuote();
    const quote = {text:"Every informed person needs to know about Bitcoin because it might be one of the world’s most important developments.",
        speaker:"Leon Luow, Nobel Peace Prize nominee", url:""
      };

    return{
        props: { blockHash: blockHash, quote: quote }, 
    };
}

