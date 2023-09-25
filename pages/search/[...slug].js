import { Fragment } from 'react';
import Head from 'next/head';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useSWRInfinite from 'swr/infinite'

import SearchResult from '../../components/search/search';
import { getRandomQuote } from "../../lib/blockchain-util";

export default function Search(props) {
    const router = useRouter();
    const slug = router.query.slug;
    const whatToSearch = ['rawtx','rawblock','rawaddress'];

    const [result, setResult] = useState([]);

    const getKey = (pageIndex, previousPageData) => {
        // console.log(`/api/${whatToSearch[pageIndex]}/${slug}`);        
        if (pageIndex >= whatToSearch.length) { return null; }
        return `/api/${whatToSearch[pageIndex]}/${slug}`;
    }

    const {data, error, size, setSize } = useSWRInfinite(
        getKey,
        (url) => fetch(url).then(res => res.json())
    );
    
    useEffect(() => {
        if (data !== undefined) {
            setResult(data);
            // console.log(data);
            setSize(size + 1);
        }
    }, [data]);

    let pageHead = (
        <Head>
            <title>Search</title>
            <meta
                name='A search on Bitcoin blockchain'
                content='Search Bitcoin address block transaction tx'
            />
        </Head>
    );

    if (error) return(
        <Fragment>
            {pageHead}
            <div className="d-flex justify-content-center m-5">
                <span className="badge text-bg-danger fs-5">Load failed</span>            
            </div>
        </Fragment>
        );

    if (result.length < whatToSearch.length) return(
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
                <div className='m-2'><h5 className="card-title">Search Results</h5></div>
                <div className="row">
                    <div className="col-sm">
                        <SearchResult result={result}/>
                    </div>
                </div>            
            </div>
        </Fragment>
    );
}

export async function getServerSideProps(context) {
    const quote = await getRandomQuote();
    
    return{
        props: { quote: quote }, 
    };
}