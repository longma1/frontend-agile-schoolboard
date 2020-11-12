import React from "react";
import NavigationBarComponent from "../navigationComponents/NavigationBarComponent";
import NavigationSideBarComponent from "../navigationComponents/NavigationSideBarComponent";

import "./MainApp.scss";

type AppState = {
    drawerOpen: boolean
}

class MainApp extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = { drawerOpen: false };
    }

    handleOpenDrawer = () => {
        this.setState({ drawerOpen: true })
    }

    handleCloseDrawer = () => {
        this.setState({ drawerOpen: false })
    }

    render() {
        return (
            <div className="MainAppContainer">
                <NavigationBarComponent
                    handleOpen={this.handleOpenDrawer}
                    isOpen={this.state.drawerOpen}
                />
                <NavigationSideBarComponent
                    isOpen={this.state.drawerOpen}
                    closeSideBar={this.handleCloseDrawer}
                />
                <div className={this.state.drawerOpen ? "MainApplicationComponent MainApplicationComponentSideBarOpen" : "MainApplicationComponent"}>
                    Lorem ipsum dolor sit amet
                </div>
            </div>

        )
    }
}

export default MainApp;