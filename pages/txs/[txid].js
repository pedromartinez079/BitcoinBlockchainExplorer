import { Fragment } from 'react';
import Head from 'next/head';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite'

import Tx from "../../components/txs/tx";
import Loading from '../../components/ui/loading';
import LoadFailed from '../../components/ui/loadfailed';
import NotFound from '../../components/ui/notfound';
import { getRandomQuote } from "../../lib/blockchain-util";

export default function txPage(props) {
    let pageHead = (
        <Head>
            <title>Tx {props.txId}</title>
            <meta
                name='A Bitcoin transaction'
                content='Bitcoin transaction tx hex inputs outputs'
            />
        </Head>
    );

    const [tx, setTx] = useState({});
    const [txOut, setTxOut] = useState([]);

    const {data: dataTx, error: errorTx} = useSWR(
        `/api/rawtx/${props.txId}`,
        (url) => fetch(url).then(res => res.json())
        );
    
    const getKey = (pageIndex, previousPageData) => {
        if (pageIndex >= tx.vout.length) { return null; }
        return `/api/txout/${tx.txid}?vout=${tx.vout[pageIndex].n}`;        
    }
        
    const {data: dataTxOut, error: errorTxOut, size, setSize } = useSWRInfinite(
        getKey,
        (url) => fetch(url).then(res => res.json())
    );
    
    useEffect(() => {
        if (dataTx) {
            dataTx.vout.map((out) => { out.spent = false })
            setTx(dataTx);          
        }
    }, [dataTx]);

    useEffect(() => {
        if (dataTxOut !== undefined) {
            setTxOut(dataTxOut);
            if (dataTxOut[size-1] === null) {
                if (tx.vout[size-1]) { tx.vout[size-1].spent = true }
            } else {
                if (tx.vout[size-1]) { tx.vout[size-1].spent = false }
            }
            setSize(size + 1);
        }      
    }, [dataTxOut]);

    if (dataTx === null) return(
        <Fragment>
            {pageHead}
            <NotFound />
        </Fragment>
        );
    if (errorTx) return(
        <Fragment>
            {pageHead}
            <LoadFailed />
        </Fragment>
        );
    if (!dataTx || dataTx === undefined) return (
        <Fragment>
            {pageHead}
            <Loading />            
        </Fragment>
        );                          
            
    if (errorTxOut) return(
        <Fragment>
            {pageHead}
            <LoadFailed />
        </Fragment>
        );
    if (!dataTxOut || dataTxOut === undefined) return (
        <Fragment>
            {pageHead}
            <Loading />
        </Fragment>
        );
    
    return(
        <Fragment>
            {pageHead}
            <div className="container text-center m-3 p-3 border">
                <div className='m-2'><h5 className="card-title">Tx</h5></div>
                <div className="row">
                    <div className="col-sm">
                        <Tx tx={tx}/>
                    </div>
                </div>            
            </div>
        </Fragment>
        );
}

export async function getServerSideProps(context) {
    const quote = await getRandomQuote();
    const {params} = context;
    const txId = params.txid;
    
    return{
        props: { txId: txId, quote: quote }, 
    };
}