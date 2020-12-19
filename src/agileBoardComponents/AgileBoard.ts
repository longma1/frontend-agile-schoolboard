export default interface StudentBoard {
    board_id: string
    board_name: string
    board_class: string
    public: boolean
    owner: number
}

export interface StudentBoardApiResult {
    result: StudentBoard[]
}