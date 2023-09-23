import Block from "./block";

export default function BlockList(props) {
    const blockList = props.blocks;
    // console.log(blockList);

    return(
        <ul>
            {blockList.map((block) => (
                <Block key={block.height} block={block}/>
            ))}            
        </ul>
    );
}