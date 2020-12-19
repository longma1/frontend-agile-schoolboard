import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import FormControl from '@material-ui/core/FormControl/FormControl';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Select from '@material-ui/core/Select/Select';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import React from 'react';
import StudentBoard from './AgileBoard';
import AgileBoardCreateBoardDialogue from './AgileBoardCreateBoardDialogue';

import './AgileBoardHeaderComponent.scss'

interface AgileBoardHeaderProps {
    changeBoard: Function
    boards: StudentBoard[]
    createdBoard: Function
    currentBoard: string | null
}

interface AgileBoardHeaderState {
    createBoardDialogue: boolean
}


export default class AgileBoardHeaderComponent extends React.Component<AgileBoardHeaderProps, AgileBoardHeaderState>{
    constructor(props: AgileBoardHeaderProps) {
        super(props);
        this.state = { createBoardDialogue: false };

    }

    handleChange(e: React.ChangeEvent<{ value: any }>) {
        e.preventDefault();
        this.props.changeBoard(e.target.value);
    }

    handleCloseBoardDialogue() {
        this.setState({ createBoardDialogue: false })
    }

    handleOpenBoardDialogue() {
        this.setState({ createBoardDialogue: true })
    }


    render() {
        return (
            <Toolbar className="BoardHeaderToolBarComponent">
                <div>
                    <FormControl>
                        <Select
                            value={this.props.currentBoard}
                            onChange={this.handleChange.bind(this)}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            autoWidth
                            className={"BoardHeaderSelectComponent"}
                        >
                            {this.props.boards.length === 0 ?
                                (<MenuItem value="" disabled>
                                    You Have No Task Boards
                                </MenuItem>)
                                :
                                this.props.boards.map((board: StudentBoard) => (<MenuItem value={board.board_id} key={board.board_id}>{board.board_name}</MenuItem>))}
                        </Select>
                    </FormControl>
                    <Button onClick={this.handleOpenBoardDialogue.bind(this)}>
                        + Create a new Board
                    </Button>
                </div>
                <Button onClick={this.handleOpenBoardDialogue.bind(this)} disabled={this.props.currentBoard === null}>
                    + Create a new task
                </Button>
                <Dialog open={this.state.createBoardDialogue} onClose={this.handleCloseBoardDialogue.bind(this)} aria-labelledby="form-dialog-title">
                    <AgileBoardCreateBoardDialogue
                        open={this.state.createBoardDialogue}
                        closeDialogue={this.handleCloseBoardDialogue.bind(this)}
                        createdBoard={this.props.createdBoard}
                    />
                </Dialog>
            </Toolbar >
        );
    }

}