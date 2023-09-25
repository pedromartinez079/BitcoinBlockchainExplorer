import { useRef } from 'react';

export default function NavBar(props) {
    const bgColorDiv = '#ffcc00';
    const slugRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const slug = slugRef.current.value;
        
        props.onSearch(slug);
    }

    return(
        <nav className="navbar navbar-expand-lg" style={{ 'backgroundColor': bgColorDiv }}>
            <div className="container-fluid">
                <a className="navbar-brand fs-4 fw-bolder" href="/">Bitcoin Blockchain Explorer</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/blocks/lastblock">Last Block</a>
                        </li>
                        {/*<li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/txs/lasttxs">Last Transactions</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>*/}                    
                    </ul>
                    <form className="d-flex col-8" role="search" onSubmit={submitHandler}>
                        <input className="form-control me-0" id="search" type="search" placeholder="Search Blocks, Txs, Addresses" aria-label="Search" ref={slugRef}/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}