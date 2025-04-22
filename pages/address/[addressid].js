import { Fragment } from 'react';
import Head from 'next/head';

import { useState, useEffect } from 'react';
import useSWR from 'swr';

import Wallet from '../../components/wallets/wallet';
import Loading from '../../components/ui/loading';
import LoadFailed from '../../components/ui/loadfailed';
import NotFound from '../../components/ui/notfound';

import { getRandomQuote } from "../../lib/blockchain-util";

export default function AddressPage(props) {    
    const [address, setAddress] = useState({});

    const {data, error} = useSWR(
        // `/api/rawaddress/${props.addressId}`,
        `/api/multiaddress/${props.addressId}`,
        (url) => fetch(url).then(res => res.json())
        );
    
    useEffect(() => {
        if (data) {
            setAddress(data);
        }        
    }, [data]);

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
            <LoadFailed />
        </Fragment>
        );

    if (address.hasOwnProperty("error")) return (
        <Fragment>
            {pageHead}
            <NotFound />
        </Fragment>
        );

    if (!data || data === undefined || !address.validateaddress) return (
        <Fragment>
            {pageHead}
            <Loading />
        </Fragment>
        );
        
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
    
    // const quote = await getRandomQuote();
    const quote = {text:"Every informed person needs to know about Bitcoin because it might be one of the world’s most important developments.",
        speaker:"Leon Luow, Nobel Peace Prize nominee", url:""
      };

    return{
        props: { addressId: addressId, quote: quote }, 
    };
}
