import { Fragment } from 'react';
import Head from 'next/head';

import { useState, useEffect } from 'react';
import useSWR from 'swr';

import Wallet from '../../components/wallets/wallet';

import { getRandomQuote, getRawAddress } from "../../lib/blockchain-util";

export default function AddressPage(props) {    
    const [address, setAddress] = useState({});

    const {data, error} = useSWR(
        `/api/rawaddress/${props.addressId}`,
        (url) => fetch(url).then(res => res.json())
        );
    
    useEffect(() => {
        if (data) {
            // console.log(data);
            setAddress(data);
        }        
    }, [data]);

    //console.log(address);
    let pageHead = (
        <Head>
            <title>Address {props.addressId}</title>
            <meta
                name='A Bitcoin address'
                content='Bitcoin address encoding scriptpubkey balance txs'
            />
        </Head>
    );

    if (error) return (
        <Fragment>
            {pageHead}
            <div className="d-flex justify-content-center m-5">
                <span className="badge text-bg-danger fs-5">Load failed</span>            
            </div>
        </Fragment>
        );

    if (address.hasOwnProperty("error")) return (
        <Fragment>
            {pageHead}
            <div className="d-flex justify-content-center m-5">
                <span className="badge text-bg-warning fs-5">Address wasn't found!</span>            
            </div>
        </Fragment>
        );

    if (!data || data === undefined || !address.validateaddress) return (
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
    
    // console.log(address); !address.validateaddress

    return(
        <Fragment>
            {pageHead}
            <div className="container text-center m-3 p-3 border">
                <div className='m-2'><h5 className="card-title">Address</h5></div>
                <div className="row">
                    <div className="col-sm">
                        <Wallet wallet={address}/>                    
                    </div>
                </div>            
            </div>
        </Fragment>
    );

}

export async function getServerSideProps(context) {
    const {params} = context;
    const addressId = params.addressid;
    
    const quote = await getRandomQuote();

    return{
        props: { addressId: addressId, quote: quote }, 
    };
}
