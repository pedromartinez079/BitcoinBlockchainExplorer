import { Fragment } from 'react';
import Head from 'next/head';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite'

import Tx from "../../components/txs/tx";
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
        // console.log(pageIndex);        
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
            // console.log(dataTxOut[size-1]);
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
            <div className="d-flex justify-content-center m-5">
                <span className="badge text-bg-danger fs-5">Tx not found</span>
            </div>
        </Fragment>
        );
    if (errorTx) return(
        <Fragment>
            {pageHead}
            <div className="d-flex justify-content-center m-5">
                <span className="badge text-bg-danger fs-5">Load failed</span>            
            </div>
        </Fragment>
        );
    if (!dataTx || dataTx === undefined) return (
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
            
    if (errorTxOut) return(
        <Fragment>
            {pageHead}
            <div className="d-flex justify-content-center m-5">
                <span className="badge text-bg-danger fs-5">Load failed</span>            
            </div>
        </Fragment>
        );
    if (!dataTxOut || dataTxOut === undefined) return (
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

    // console.log(tx);
    
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