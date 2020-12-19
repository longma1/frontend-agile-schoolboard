import Button from "@material-ui/core/Button/Button"
import DialogActions from "@material-ui/core/DialogActions/DialogActions"
import DialogContent from "@material-ui/core/DialogContent/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle"
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel"
import Switch from "@material-ui/core/Switch/Switch"
import TextField from "@material-ui/core/TextField/TextField"
import React from "react"
import connectionManager from "../apiComponents/ConnectionManager"
import StudentBoard from "./AgileBoard"

interface AgileBoardCreateBoardDialogueProps {
    open: boolean
    closeDialogue: Function
    createdBoard: Function
}

interface AgileBoardCreateBoardDialogueState {
    name: string
    public: boolean
}

export default class AgileBoardCreateBoardDialogue extends React.Component<AgileBoardCreateBoardDialogueProps, AgileBoardCreateBoardDialogueState> {
    constructor(props: AgileBoardCreateBoardDialogueProps) {
        super(props);
        this.state = { name: "", public: false }
    }

    handleClose(e: React.MouseEvent) {
        e.preventDefault();
        this.props.closeDialogue();
    }

    handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        this.setState({ name: e.target.value })
    }

    handlePublicChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        this.setState((prevState: AgileBoardCreateBoardDialogueState) => (
            {
                public: !prevState.public
            })
        )
    }

    createBoardCallback(result: StudentBoard) {
        this.props.createdBoard(result);
        this.props.closeDialogue();
    }

    handleCreateBoard(e: React.MouseEvent) {
        e.preventDefault();
        connectionManager.postApi('api/board/', {
            board_name: this.state.name,
            board_class: null,
            public: this.state.public
        }, this.createBoardCallback.bind(this)
        );
    }

    render() {
        return (
            <React.Fragment>
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the name of your new board
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Board Name"
                        type="name"
                        value={this.state.name}
                        onChange={this.handleTextChange.bind(this)}
                        fullWidth
                    />
                    <FormControlLabel
                        control={<Switch checked={this.state.public} onChange={this.handlePublicChange.bind(this)} />}
                        label="Public"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose.bind(this)} color="primary">
                        Cancel
            </Button>
                    <Button onClick={this.handleCreateBoard.bind(this)} color="primary">
                        Create
            </Button>
                </DialogActions>
            </React.Fragment>
        )
    }
}