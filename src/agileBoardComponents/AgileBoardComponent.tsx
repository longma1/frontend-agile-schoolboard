import React from 'react';
import connectionManager from '../apiComponents/ConnectionManager';
import StudentBoard, { StudentBoardApiResult } from './AgileBoard';
import AgileBoardHeaderComponent from './AgileBoardHeaderComponent';

interface AgileBoardState {
    currentBoardID: string | null
    boards: StudentBoard[]
    loaded: boolean
}


export default class AgileBoardComponent extends React.Component<{}, AgileBoardState> {
    constructor(props: {}) {
        super(props);
        this.state = { currentBoardID: null, boards: [], loaded: false };
    }

    dataLoaded(data: StudentBoardApiResult) {
        if (data.result.length > 1) {
            this.setState({ currentBoardID: data.result[0].board_id, boards: data.result, loaded: true });
        }
        else {
            this.setState({ boards: data.result, loaded: true });
        }
    }

    componentDidMount() {
        connectionManager.getApi('api/board/', this.dataLoaded.bind(this));
    }

    changeBoard(boardID: string) {
        this.setState({ currentBoardID: boardID });
    }

    createdBoard(newBoard: StudentBoard) {
        console.log(newBoard)
        this.setState(prevState => ({
            currentBoardID: newBoard.board_id,
            boards: [...prevState.boards, newBoard]
        }));
    }

    render() {
        return (
            this.state.loaded ?
                <AgileBoardHeaderComponent
                    changeBoard={this.changeBoard.bind(this)}
                    boards={this.state.boards}
                    createdBoard={this.createdBoard.bind(this)}
                    currentBoard={this.state.currentBoardID}
                /> :
                <>loading</>

        )
    }

}