import React from 'react';

class Sidebar extends React.Component {
    state = {
        isOpen: false
    }

    openMenu = () => {
        if(!this.state.isOpen) {
            window.$(".sidebar").addClass("open");
            this.setState({isOpen: true});
            return;
        }
        window.$(".sidebar").removeClass("open");
        this.setState({isOpen: false});
    }

    render() {
        return (
            <aside className="sidebar-container bg-danger d-inline">
                <button className="sidebar bg-primary" onClick={() => this.openMenu()}>
                    <ul className="vertical-text">
                        Sidebar
                    </ul>
                </button>
                <div className="bg-secondary" width="500" height="500">
                    <p>p1 this is my phone number</p>
                    <p>p2 this is the address</p>
                    <p>p3 this is the chat</p>
                </div>    
            </aside>
        )
    }
}

export default Sidebar;