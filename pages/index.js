import { Fragment } from "react";
import Head from "next/head";

import Summary from "../components/blockchain/summary";
import { getNetworkStatus, getRandomQuote } from "../lib/blockchain-util";

export default function ExplorerHome(props) {
  return (
    <Fragment>
      <Head>
        <title>Bitcoin Blockchain Explorer</title>
        <meta
          name='A blockchain explorer for Bitcoin Main network'
          content='Bicoin blockchain transactions tx txs txin txout block address'
        />
    | </Head>
      <Summary networkStatus={props.networkStatus}/>
    </Fragment>
  );
}

export async function getStaticProps() {
  const networkStatus = await getNetworkStatus();
  // const quote = await getRandomQuote();
  const quote = {text:"Every informed person needs to know about Bitcoin because it might be one of the world’s most important developments.",
    speaker:"Leon Luow, Nobel Peace Prize nominee", url:""
  };

  return{
    props: { networkStatus: networkStatus, quote: quote },
    revalidate: 600, 
  };
}
