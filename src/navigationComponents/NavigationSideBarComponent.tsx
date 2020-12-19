import Divider from "@material-ui/core/Divider/Divider"
import Drawer from "@material-ui/core/Drawer/Drawer"
import IconButton from "@material-ui/core/IconButton/IconButton"
import List from "@material-ui/core/List/List"
import ListItem from "@material-ui/core/ListItem/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText/ListItemText"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import BurstModeIcon from "@material-ui/icons/BurstMode"
import React from "react"

import './NavigationSideBarComponent.scss'
import { Route } from "react-router-dom"

type NavigationSideBarProps = {
    isOpen: boolean;
    closeSideBar: Function;
}

class NavigationSideBarComponent extends React.Component<NavigationSideBarProps, {}>{
    handleCloseDrawer = (e: React.MouseEvent) => {
        e.preventDefault();
        this.props.closeSideBar();
    }

    nagivate(address: string, history: any) {
        history.push(address);
        this.props.closeSideBar();
    }

    render() {
        return (
            <Route render={({ history }) => (
                <Drawer
                    className="MainAppDrawer"
                    variant="persistent"
                    anchor="left"
                    open={this.props.isOpen}
                >
                    <div className="MainAppDrawerCollapseButton">
                        <IconButton onClick={this.handleCloseDrawer}>
                            {this.props.isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button key='Board' onClick={() => { this.nagivate('/board', history) }}>
                            <ListItemIcon><BurstModeIcon /></ListItemIcon>
                            <ListItemText primary='Board' />
                        </ListItem>
                        {['Option1', 'Option2', 'Option3', 'Option4'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon><ChevronLeftIcon /></ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>)}>

            </Route>
        )
    }
}

export default NavigationSideBarComponent;