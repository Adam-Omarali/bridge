import "../App.css";
import Auth from './Auth';

function Header(props){
    return(
        <header>
            <div className="nav">
                <h1 onClick={() => props.setPage("user")}>BRIDGE - Notion Integration</h1>
                <div className="inline">
                    <p onClick={() => props.setPage("user")}>Users</p>
                    <p onClick={() => props.setPage("company")}>Companies</p>
                    <Auth />
                </div>
            </div>
        </header>
    )
}

export default Header