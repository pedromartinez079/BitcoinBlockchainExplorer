import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS

import { useEffect } from "react";

import Layout from "../components/layout/layout";


export default function App({ Component, pageProps }) {
  //Use Bootstrap-bundled JavaScript
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return(
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
