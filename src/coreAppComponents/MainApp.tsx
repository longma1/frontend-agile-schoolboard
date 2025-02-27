import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
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
                <Router>
                    <NavigationBarComponent
                        handleOpen={this.handleOpenDrawer}
                        isOpen={this.state.drawerOpen}
                    />
                    <NavigationSideBarComponent
                        isOpen={this.state.drawerOpen}
                        closeSideBar={this.handleCloseDrawer}
                    />
                    <div className={this.state.drawerOpen ? "MainApplicationComponent MainApplicationComponentSideBarOpen" : "MainApplicationComponent"}>

                        <Switch>
                            <Route exact path="/">
                                Home
                        </Route>
                            <Route path="/topics">
                                topics
                        </Route>
                        </Switch>

                    </div>
                </Router>
            </div>

        )
    }
}

export default MainApp;