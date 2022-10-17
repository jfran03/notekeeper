import React from 'react';
import axios from 'axios';
import { Container,Form, Button, Card, Row, Col } from 'react-bootstrap';

export default class Note extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const remove = (rid) =>{
            axios.post('http://localhost:5000/api/delete',{id: rid})
        }

        return(
        <Card id="note" className="mx-auto mb-2">
            <Card.Body>
                <Card.Title>{this.props.title}</Card.Title>
                <Card.Text>{this.props.body}</Card.Text>
                <Button variant="danger" onClick={()=> {remove(this.props.id)}}>Delete</Button>
            </Card.Body>
        </Card>
        );  
    }
}