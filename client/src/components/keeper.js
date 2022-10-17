import { useEffect, useState} from 'react';
import { Container,Form, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import Note from './Note'
import CardHeader from 'react-bootstrap/esm/CardHeader';
import '../css/keeper.css'


const Main = () =>{
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");

    const [notes,setNotes] = useState([]);

    const getNotes = (status) =>{
        axios.get('http://localhost:5000/api/notes').then(
        (res)=>{
            setNotes(res.data);
        })
    }
    
    const addNote = () =>{
        axios.post('http://localhost:5000/api/create',{iTitle: title, iBody: body}).then((res)=>{
            getNotes();
        })
    }

    useEffect(()=>{
        getNotes();
    })

    return(
        <Container id="note-container">
            <h1>Jerome's NoteKeeper</h1>
            <Form id="note-form">
                <Form.Group>
                    <Form.Control type="text" size="lg" placeholder="Title" className="mb-1" onChange={e => setTitle(e.target.value)} value={title} />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="text" placeholder="Add a note" className="mb-1" onChange={e => setBody(e.target.value)} value={body} />
                </Form.Group>
                <Button variant="primary" onClick={()=> {addNote()}}>Submit</Button>
            </Form>

            <div id="notes-div" className="mx-auto">
                {notes.map((note) => <Note id={note[0]} title={note[1].title} body={note[1].body} />)}
            </div>
        </Container>
    )
}

export default Main