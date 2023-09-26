
export default function Loading() {
    return(
        <div className="d-flex justify-content-center m-3">
            <button className="btn btn-warning" type="button" disabled>
                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span role="status">Loading...</span>
            </button>
        </div>
    );
}