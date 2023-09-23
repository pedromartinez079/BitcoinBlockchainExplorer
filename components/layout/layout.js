import { Fragment } from "react";
import { useRouter } from 'next/router';

import NavBar from './nav-bar';
import Footer from './footer';

function Layout(props) {
    const router = useRouter();
    
    function searchHandler(slug) {
        router.push(`/search/${slug}`);
    }

    return(
        <Fragment>
            <NavBar onSearch={searchHandler}/>
            <main>{props.children}</main>
            <Footer quote={props.children.props.quote}/>
        </Fragment>
    );
}

export default Layout;