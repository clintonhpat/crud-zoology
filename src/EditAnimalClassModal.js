import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class EditAnimalClassModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'AnimalClass',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                AnimalClassId:event.target.AnimalClassId.value,
                AnimalClassName:event.target.AnimalClassName.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(JSON.stringify(result));
        },
        (error)=>{
            alert(JSON.strigify('Failed'));
        })
    }
    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit Animal Class
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="AnimalClassId">
                        <Form.Label>AnimalClassId</Form.Label>
                        <Form.Control type="text" name="AnimalClassId" required
                        disabled
                        defaultValue={this.props.depid} 
                        placeholder="DepartmentName"/>
                    </Form.Group>

                    <Form.Group controlId="AnimalClassName">
                        <Form.Label>AnimalClassName</Form.Label>
                        <Form.Control type="text" name="AnimalClassName" required 
                        defaultValue={this.props.depname}
                        placeholder="AnimalClassName"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Animal Class
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}