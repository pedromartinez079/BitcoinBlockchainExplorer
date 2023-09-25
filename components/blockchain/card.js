import classes from './card.module.css';

export default function Card(props) {
    function addnewlines(text) {
        if (typeof(text)==='string') {
            const pList = text.split(/\n/);
            
            return(
                pList.map((line) => (
                    <p key={line} className="card-text m-0">{line}</p>
                ))
            );
        } else {
            return(<p className="card-text">{text}</p>);
        }
    }

    return(
        <div className="card m-1 shadow" style={{"width": "18rem"}}>
            <div className="card-body">
                <div className={classes.tooltip}>
                    {props.elements.tip && <span className={classes.tooltiptext}>{props.elements.tip}</span>}
                    {props.elements.title && <h5 className="card-title">{props.elements.title}</h5>}
                </div>
                {props.elements.subtitle && <h6 className="card-subtitle mb-2 text-body-secondary">{props.elements.subtitle}</h6>}
                {props.elements.text && addnewlines(props.elements.text)}
                {props.elements.link1 && <a href={props.elements.link1} className="card-link">{props.elements.link1txt}</a>}
                {props.elements.link2 && <a href={props.elements.link2} className="card-link">{props.elements.link2txt}</a>}
            </div>
        </div>
    );
}