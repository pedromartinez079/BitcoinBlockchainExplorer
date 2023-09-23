import { getRandomQuote } from "../../lib/blockchain-util";

export default function Footer(props) {
    const bgColorDiv = '#ffcc00'  //style={{ 'backgroundColor': orange800 }}
    const quote = props.quote;

    if (!quote) {
        return(
            <div className="d-flex justify-content-center m-3">
                <button className="btn btn-warning" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span role="status">Loading...</span>
                </button>
            </div>
        );
    }

    return(
        <footer>
            <div className="card-header" style={{ 'backgroundColor': bgColorDiv }}>
                <figure className="text-center py-3 px-5">
                    <blockquote className="blockquote">
                        <p>{quote.text}</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                        <strong>{quote.speaker}</strong> <cite title="Source Title"><a href={quote.url}>{quote.url}</a></cite>
                    </figcaption>
                </figure>                
            </div>
        </footer>
    );
}
