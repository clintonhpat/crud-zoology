import React,{ Component } from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';

export class ViewAnimalInfoModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photoofanimal = "anonymous.jpg";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photoofanimal;

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'AnimalClass')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Animal',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                AnimalId:event.target.AnimalId.value,
                AnimalName:event.target.AnimalName.value,
                AnimalClass:event.target.AnimalClass.value,
                DateOfListing:event.target.DateOfListing.value,
                PhotoOfAnimal:this.photoofanimal
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }


    handleFileSelected(event){
        event.preventDefault();
        this.photoofanimal=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'Animal/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
        },
        (error)=>{
            alert('Failed');
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
            Animal Info
        </Modal.Title>
    </Modal.Header>

    <Modal.Body>
        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="AnimalId">
                        <Form.Label>Animal Id</Form.Label>
                        <Form.Control type="text" name="AnimalId" required 
                        placeholder="AnimalId"
                        disabled
                        defaultValue={this.props.animid}/>
                    </Form.Group>

                    <Form.Group controlId="AnimalName">
                        <Form.Label>Animal Name</Form.Label>
                        <Form.Control type="text" name="AnimalName" required 
                        defaultValue={this.props.animname}
                        placeholder="AnimalName"
                        disabled />
                    </Form.Group>

                    <Form.Group controlId="AnimalClass">
                        <Form.Label>Animal Class</Form.Label>
                        <Form.Control as="select" defaultValue={this.props.animclass} disabled>
                        {this.state.deps.map(dep=>
                            <option key={dep.AnimalClassId}>{dep.AnimalClassName}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="DateOfListing">
                        <Form.Label>Date Of Listing</Form.Label>
                        <Form.Control 
                        type="date"
                        name="DateOfListing"
                        required
                        placeholder="DateOfListing"
                        defaultValue={this.props.dol}
                        disabled
                        />
                       
                        
                    </Form.Group>
                </Form>
            </Col>

            <Col sm={6}>
                <Image width="100%" height="100%"
                src={process.env.REACT_APP_PHOTOPATH+this.props.photoofanimal}/>
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
