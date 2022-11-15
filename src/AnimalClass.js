import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddAnimalClassModal } from './AddAnimalClassModal';
import { EditAnimalClassModal } from './EditAnimalClassModal';

export class AnimalClass extends Component{

    constructor(props){
        super(props);
        this.state={deps:[], addModalShow:false, editModalShow:false};
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'AnimalClass')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteDep(depid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'AnimalClass/'+depid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                        'Content-Type':'application/json'}
            })
        }
    }

    render(){
        const {deps, depid, depname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Animal Class Id</th>
                            <th>Animal Class Name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep=>
                            <tr key={dep.AnimalClassId}>
                                <td>{dep.AnimalClassId}</td>
                                <td>{dep.AnimalClassName}</td>
                                <td>
            <ButtonToolbar>
                <Button className='mr-2' variant="info"
                onClick={()=>this.setState({editModalShow:true,depid:dep.AnimalClassId,depname:dep.AnimalClassName})}>
                    Edit
                </Button>

                <Button className='mr-2' variant="danger"
                onClick={()=>this.deleteDep(dep.AnimalClassId)}>
                    Delete
                </Button>

                <EditAnimalClassModal show={this.state.editModalShow}
                onHide={editModalClose}
                depid={depid}
                depname={depname}/>
            </ButtonToolbar>
                                </td>                                
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add Animal Class
                    </Button>

                    <AddAnimalClassModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}