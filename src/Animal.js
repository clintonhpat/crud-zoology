import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddAnimalModal} from './AddAnimalModal';
import {EditAnimalModal} from './EditAnimalModal';
import {ViewAnimalInfoModal} from './ViewAnimalInfoModal';

export class Animal extends Component{

    constructor(props){
        super(props);
        this.state={anims:[], addModalShow:false, editModalShow:false, viewModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Animal')
        .then(response=>response.json())
        .then(data=>{
            this.setState({anims:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteAnim(animid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'Animal/'+animid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                        'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {anims, animid,animname,animclass,photofilename,dol}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        let viewModalClose=()=>this.setState({viewModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Animal Id</th>
                            <th>Animal Name</th>
                            <th>Animal Class</th>
                            <th>Date Of Listing</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {anims.map(anim=>
                            <tr key={anim.AnimalId}>
                                <td>{anim.AnimalId}</td>
                                <td>{anim.AnimalName}</td>
                                <td>{anim.AnimalClass}</td>
                                <td>{anim.DateOfListing}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2 me-1" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        animid:anim.AnimalId,animname:anim.AnimalName,animclass:anim.AnimalClass,
        photofilename:anim.PhotoFileName,dol:anim.DateOfListing})}>
            Edit
        </Button>

        <Button className="mr-2 me-1" variant="danger"
    onClick={()=>this.deleteAnim(anim.AnimalId)}>
            Delete
        </Button>

        <Button className="mr-2" variant="warning"
    onClick={()=>this.setState({viewModalShow:true,
        animid:anim.AnimalId,animname:anim.AnimalName,animclass:anim.AnimalClass,
        photofilename:anim.PhotoFileName,dol:anim.DateOfListing})}>
            View
        </Button>

        <EditAnimalModal show={this.state.editModalShow}
        onHide={editModalClose}
        animid={animid}
        animname={animname}
        animclass={animclass}
        photofilename={photofilename}
        dol={dol}
        />

        <ViewAnimalInfoModal show={this.state.viewModalShow} 
        onHide={viewModalClose}
        animid={animid}
        animname={animname}
        animclass={animclass}
        photofilename={photofilename}
        dol={dol}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Animal</Button>

                    <AddAnimalModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}