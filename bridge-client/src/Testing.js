import { Button, Dropdown, excludedInputPropsForTextarea, Input } from "@nextui-org/react";
import { useState } from "react";


export function Testing() {

    function createCommand() {
        let cmd = { verb: returnName, url: showURL };
        const res = fetch("http://localhost:3000/cmd", {
          method: "POST",
          body: JSON.stringify(cmd),
        })
          .then((promise) => promise.json())
          .then((data) => data);
        console.log(res);
    }

    const [showMenu, setMenu] = useState();
    const [showURL, setURL] = useState("Insert URL Here");
    const [returnName, setName] = useState("Set");

    return (
        <div>
            <div>
                <Button type="button" onClick={() => setMenu(
                    !showMenu
                )}>Add a Command</Button>
                {showMenu && 
                <div>
                    <URL name={showURL} setURL = {setURL}></URL>
                    <Menu name={returnName} setName={setName}></Menu>
                    <Button style={{marginTop: "20px"}} onSubmit={() => createCommand()}>Submit</Button>
                </div>}
                
            </div>
        </div>
    );
}

function Menu(props) {

    return(
        
        <div style={{paddingTop: '20px'}}>
                <select
                value={props.name}
                label="Method"
                onChange={(e) => props.setName(e.target.value)}
                style={{border: 'none', width: '200px', height: '40px', borderRadius: '8px'}}
                >
                    <option value={"Create"}>Create</option>
                    <option value={"Update"}>Update</option>
                    <option value={"Delete"}>Delete</option>
                </select>
            
        </div>
    );
}


function URL(props) {
 return(      
    <div>
        <h3>Noun</h3>
        <Input placeholder="" value={props.showURL} onChange={(e) => props.setURL(e.target.value)}></Input>
    </div>
 );
}