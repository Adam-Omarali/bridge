import { useState } from "react";


export function Testing() {

    const [showMenu, setMenu] = useState();
    const [showURL, setURL] = useState("Insert URL Here");
    const [returnName, setName] = useState("Set");

    return (
        <div>
            <head>
                <h2>Hi, My Name is George</h2>
            </head>
            <body>
                <div>
                    <button type = "button" onClick={() => setMenu(
                        !showMenu
                    )}>+Cmd</button>
                    {showMenu && 
                    <div>
                        <URL name={showURL} setURL = {setURL}></URL>
                        <Menu name={returnName} setName={setName}></Menu>
                    </div>}
                    
                </div>
                <p>{returnName}</p>
                <p>{showURL}</p>
            </body>
        </div>
    );
}

function Menu(props) {
    return(
        
        <div>
             
            <label for="cmds">Choose a Command:</label>
            <select name="cmds" id="cmds" value={props.returnName} onChange={(e) => props.setName(e.target.value)} >
                <option value="Set">Set</option>
                <option value="Delete">Delete</option>
                <option value="Add">Add</option>
                <option value="Record">Record</option>
            </select>
        </div>
    );
}


function URL(props) {
 return(      
    <div>
    <fieldset name = "URL" id = "URL" value = {props.showURL} onKeyPress={(e) => e.key == "Enter" ? props.setURL(e.target.value) : null}>
    <legend>URL:</legend>
    <label for="URL">URL:</label>
    <input type="text" id="URL" name="URL">
    </input>
    </fieldset>
    </div>
 );
}