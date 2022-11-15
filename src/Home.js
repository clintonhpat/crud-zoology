import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export class Home extends Component{

    render(){
        return(
            <>
            <div className='mt-5 w-75 m-auto text-center'>
                This is the Home Page! This site was created for educational purposes to learn basic CRUD operations utilizing React, ASP.net, and SQL and was not created to be appealing to the eye.
            </div>
            <div className='mt-5 m-auto w-50'>
                <ListGroup>
                    <ListGroup.Item>1. Navigate to the "Animal" tab in the Navbar to Add your favorite animal!</ListGroup.Item>
                    <ListGroup.Item>2. Click on "Add Animal" and you will be prompted to add your animal's name, class, date of listing, and a photo of the animal!</ListGroup.Item>
                    <ListGroup.Item>3. If you do not see your animal's class, or would like to be more specific, you can add a new animal class to the "Animal Class" section of the Nav bar and it will be added to the drop-down list when you go to add your animal.</ListGroup.Item>
                    <ListGroup.Item>4. If you've made a mistake, don't worry! You can edit or delete the animals or classes.</ListGroup.Item>
                    <ListGroup.Item>5. Check out the list of other peoples' favorite animals!</ListGroup.Item>
                </ListGroup>
            </div>
            </>
        )
    }
}