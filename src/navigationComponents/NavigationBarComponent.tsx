import AppBar from "@material-ui/core/AppBar/AppBar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import React from "react";
import MenuIcon from '@material-ui/icons/Menu';

import './NavigationBarComponent.scss'

type NavigationBarProps = {
    handleOpen: Function;
    isOpen: boolean;
}

class NavigationBarComponent extends React.Component<NavigationBarProps, {}>{

    handleOpenSideBar = (e: React.MouseEvent) => {
        e.preventDefault();
        this.props.handleOpen();
    }

    render() {
        return (
            <AppBar
                position="fixed"
                className={this.props.isOpen ? "MainAppAppBar MainAppAppBarOpen" : "MainAppAppBar"}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.handleOpenSideBar}
                        edge="start"
                        className={this.props.isOpen ? "MainAppOpenDrawerButton MainAppOpenDrawerButtonHidden" : "MainAppOpenDrawerButton"}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        #TODO: name this app
                </Typography>
                </Toolbar>
            </ AppBar>
        )
    }
}

export default NavigationBarComponent;