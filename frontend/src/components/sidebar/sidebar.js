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
                    {/* <ul className="list-unstyled">
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                    </ul> */}
                    <ul className="vertical-text">
                        What the heck
                    </ul>
                </button>
                <div className="bg-secondary" width="500" height="500">
                    <p>p1 this is my phone number</p>
                    <p>p2 this is the address</p>
                    <p>p3 this is the chat</p>
                </div>    
            </aside>

            // <div class="sidebar">
            //     <ul class="sidebar-list">
            //         <li class="sidebar-item"><a href="#" class="sidebar-anchor">Item 1</a></li>
            //         <li class="sidebar-item"><a href="#" class="sidebar-anchor">Item 2</a></li>
            //         <li class="sidebar-item"><a href="#" class="sidebar-anchor">Item 3</a></li>
            //         <li class="sidebar-item"><a href="#" class="sidebar-anchor">Item 4</a></li>
            //     </ul>
            // </div>
        )
    }
}

export default Sidebar;