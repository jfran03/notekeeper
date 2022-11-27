import React, {Component} from 'react'
import { Container,Form, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import '../css/keeper.css'

export default class Keeper extends Component{
    constructor(props){
        super(props);

        this.state = {
            title: "",
            body: "",
            notes: [],
        }

        this.appendNote = (json) => this.setState(state =>{
            const list = state.notes.push(json);
            return {list};
        })

        this.updateNote = (id,newTitle,newDesc) => this.setState(state =>{
            const list = state.notes;

            list.forEach((obj) =>{
                if (obj[0] == id){
                    obj[1].title = newTitle;
                    obj[1].body = newDesc;
                }
            })

            return {list};
        })

        this.removeNote = (rid) => this.setState(state =>{
            let list = state.notes

            console.log("trying to find " + rid);

            const filter = list.filter((obj) =>{
                return obj[0] != rid;
            })

           list = filter;
           console.log(list);

           return {list};
        })
        
        this.getNotes = () =>{
            axios.get('http://localhost:5000/api/notes').then(
                (res)=>{
                    this.setState({notes: res.data});
            })
        }

        this.addNote = () =>{
            axios.post('http://localhost:5000/api/create',{iTitle: this.state.title, iBody: this.state.body}).then((res)=>{
                this.appendNote(res.data);
            })
            
        }

        this.remove = (rid) =>{
            axios.post('http://localhost:5000/api/delete',{id: rid}).then(res =>{
                this.removeNote(rid);
                this.getNotes();
            });
        }

        this.edit = (id) =>{
            let element = document.getElementById("note"+id);
            let title = document.getElementById("title"+id);
            let desc = document.getElementById("desc"+id);

            if (element.innerHTML == "Edit"){
                element.innerHTML = "Save"
                title.readOnly = false
                desc.readOnly = false
                title.value = title.placeholder;
                desc.value = desc.placeholder;
            }else{
                element.innerHTML = "Edit"
                title.readOnly = true
                desc.readOnly = true

                axios.post('http://localhost:5000/api/update',{id: id, newTitle: title.value, newBody: desc.value}).then(res =>{
                    this.updateNote(id,title.value,desc.value);
                })
            }
        }
    }

    componentDidMount(){
        this.getNotes();
    }

    componentDidUpdate(){
        console.log("updated");
    }

    render(){
        return (
            <Container id="note-container">
            <h1>Jerome's NoteKeeper</h1>
            <Form id="note-form">
                <Form.Group>
                    <Form.Control type="text" size="lg" placeholder="Title" className="mb-1" onChange={e => this.setState({title: e.target.value})} value={this.state.title} />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="text" placeholder="Add a note" className="mb-1" onChange={e => this.setState({body: e.target.value})} value={this.state.body} />
                </Form.Group>
                <Button variant="primary" onClick={()=> {this.addNote()}}>Submit</Button>
            </Form>

            <div id="notes-div" className="mx-auto">
                {this.state.notes.map((note) =>
                
                <Card id="note" className="mx-auto mb-2">
                    <Card.Body>
                        <Card.Title><input type="text" id={"title"+note[0]} placeholder={note[1].title} readOnly></input></Card.Title>
                        <Card.Text><input type="text" id={"desc"+note[0]} placeholder={note[1].body} readOnly></input></Card.Text>
                        <Button variant="danger" onClick={()=> {this.remove(note[0])}}>Delete</Button>
                        <Button id={"note"+note[0]} onClick={()=>{this.edit(note[0])}}>Edit</Button>
                    </Card.Body>
                </Card>
                
                )}
            </div>
        </Container>
        )
    }
}