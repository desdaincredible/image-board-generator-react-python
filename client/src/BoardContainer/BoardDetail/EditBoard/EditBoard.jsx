import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class EditBoard extends Component {
    constructor(){
        super();
        this.state = {
            title: "",
            description: "",
        }
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    // handleSubmit = (e, id) => {
    //     e.preventDefault();
    //     this.searchImages(this.state);
    // };

    render(){
        console.log(this.props)
        return (
            <div>
                <Modal isOpen={ this.props.editModal } toggle={ this.props.toggleEdit }>
                <ModalHeader toggle={ this.props.toggleEdit }>Edit Board Details</ModalHeader>
                <ModalBody>
                    <div>
                        *Title: <input onChange={ this.handleChange } type="text" name="title" value={ this.props.title }/>
                    </div>
                    <div>
                        Description: <input onChange={ this.handleChange } type="text" name="description" value={ this.props.description } />
                    </div>
                    <div>
                        <small>* required</small>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={ () => this.props.handleEditSubmit(this.state) }>Submit</Button>{' '}
                    <Button color="secondary" onClick={ this.props.toggleEdit }>Cancel</Button>
                </ModalFooter>
                </Modal>
            </div>
        )
    };
}

export default EditBoard;