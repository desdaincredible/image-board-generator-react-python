import React, { Component } from 'react';
import MakeBoard from './MakeBoard/MakeBoard';
import BoardDetail from './BoardDetail/BoardDetail';

class BoardContainer extends Component {
    constructor(){
        super();
        this.state = {
            classChange: false,
            modal: false,
            editModal: false,
            boards: [],
            selectedImage: {},
            id: "",
            editBoardId: "",
            renderBoardDetail: false
        }
        this.toggle = this.toggle.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
    }

    componentDidMount(){
        this.getUser();
    };

    getUser = async () => {
        const userInfo = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards`, {
            credentials: 'include'
        })
        const userInfoJSON = await userInfo.json();
        this.setState({
            boards: userInfoJSON.data.boards,
            renderBoardDetail: true
        })
    };

    createBoard = async (formData) => {
        const newBoard = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards`, {
            credentials: 'include',
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await newBoard.json();
        if(newBoard.status === 200){
            this.setState({
                boards: [parsedResponse.data, ...this.state.boards]
            })
        }
    };

    selectedImageStateChange = (newState) => {
        this.setState({
            selectedImage: newState.selectedImage
        })
    };

    handleImageSubmit = ()=> {
        this.toggle();
        this.state.boards.map((board) => {
            if(board._id === this.state.id){
                this.updateBoard(board, board._id)
            }
        })
    }; 

    // toggleClass = () => {
    //     // console.log(this.state.classChange, 'toggle class');
    //     this.setState({
    //         classChange: true
    //     })
    // };

    handleImageClick = (e, image) => {
        this.setState({
            selectedImage: e
        })
        // this.toggleClass();
    };

    toggle(){
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    toggleEdit(){
        this.setState(prevState => ({
            editModal: !prevState.editModal
        }));
    };

    addNewImageButtonClick = (e, id) => {
        this.state.boards.map((board) => {
            this.setState({
                id: e.target.id
            })
        })
        this.toggle();
    };

    updateBoard = async (foundBoard, id) => {
        foundBoard.images.push(this.state.selectedImage);
        await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards/${id}`, {
            method: "PUT",
            body: JSON.stringify(foundBoard),
            headers: {
                "Content-Type": "application/json"
            }
        })
    };

    deleteBoardButtonClick = (e, id) => {
        this.state.boards.map((board) => {
            if (board._id === e.target.id){
                this.deleteBoard(board._id)
            }
        })
    };

    deleteBoard = async (id) => {
        console.log(id)
        const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards/${id}`, {
            method: "DELETE",
        })
        if(response.status === 200){
            this.setState({
                boards: this.state.boards.filter(board => board._id !== id)
            })
        }
    }; 

    updateBoardAfterDelete = async (board) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards/${board._id}`, {
            method: "PUT",
            body: JSON.stringify(board),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(response.status === 200){
            this.setState({
                boards: [...this.state.boards, board]
            })
        }
    };

    deleteImageButtonClick = async (board, image, i) => {
        if(board.images[i] === image){
            board.images.splice(image, 1)
        };        
        this.updateBoardAfterDelete(board);
    }; 

    // change add new image to this?
    editBoardButtonClick = (e) => {
        this.setState({
            editBoardId: e.target.id
        })
        this.toggleEdit();
    };

    handleEditSubmit = (text) => {
        this.state.boards.map((board) => {
            if (board._id === this.state.editBoardId){
                this.editBoard(text, board)
            }
        })
        this.toggleEdit();
    };

    // figure out why this is working but breaking image loop
    editBoard = async (text, board) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards/${this.state.editBoardId}`, {
            method: "PUT",
            body: JSON.stringify(text),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(response.status === 200){
            this.setState({
                boards: [...this.state.boards, text, board]
            })
        }
        this.getUser();
    }; 

    render(){
        console.log(this.state.boards)
        return (
            <div>   
                <MakeBoard createBoard={ this.createBoard } selectedImageStateChange={ this.selectedImageStateChange } 
                handleImageClick={ this.handleImageClick } imageStateChange={ this.imageStateChange } 
                updateBoard={ this.updateBoard } toggle={ this.toggle } modal={ this.state.modal } classChange={ this.state.classChange } 
                handleImageSubmit={ this.handleImageSubmit } />
                <hr />
                {
                    this.state.renderBoardDetail ?
                        <BoardDetail boards={ this.state.boards } addNewImageButtonClick={ this.addNewImageButtonClick } 
                        deleteBoardButtonClick={ this.deleteBoardButtonClick } deleteImageButtonClick= { this.deleteImageButtonClick }
                        toggleEdit={ this.toggleEdit } editModal={ this.state.editModal } editBoardButtonClick={ this.editBoardButtonClick }
                        handleEditSubmit={ this.handleEditSubmit } showBoards={ this.props.showBoards }  />
                    :
                    null
                }      
                 
            </div>
        )
    }
}

export default BoardContainer;