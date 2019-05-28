import React, { Component } from 'react';
import Search from './Search';
import { Button } from 'reactstrap';

class MakeBoard extends Component {
    constructor(){
        super();
        this.state = {
            title: "",
            description: "",
            images: [],
            selectedImage: {}
        }
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            title: null,
            description: null
        }) 
        this.props.createBoard(this.state);
    };

    render(){
        console.log(this.state, 'make board')
        return (
            <div>
                <h1>Create a New Board</h1>
                <form onSubmit={ this.handleSubmit }>
                    <div>
                        *Title: <input onChange={ this.handleChange } type="text" name="title" placeholder=""/>
                    </div>
                    <div>
                        Description: <input onChange={ this.handleChange } type="text" name="description" />
                    </div>
                    <div>
                        <Button className="button" color="secondary" type="submit">Submit</Button>
                    </div>
                    </form>

                    <div>
                        <small>* required</small>
                    </div>
                    <div>
                        <Search imageStateChange={ this.props.imageStateChange } handleImageClick={ this.props.handleImageClick } 
                        updateBoard={ this.props.updateBoard } toggle={ this.props.toggle } modal={ this.props.modal } 
                        classChange={ this.props.classChange } handleImageSubmit={ this.props.handleImageSubmit } clearModal= { this.props.clearModal } />
                    </div>

            </div>

        )
    }

}

export default MakeBoard;