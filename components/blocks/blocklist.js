import Block from "./block";

export default function BlockList(props) {
    const blockList = props.blocks;

    return(
        <ul>
            {blockList.map((block) => (
                <Block key={block.height} block={block}/>
            ))}            
        </ul>
    );
}