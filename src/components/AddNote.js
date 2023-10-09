import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AddNote(props) {
    const context = useContext(noteContext)
    const { addNote } = context
    const [note, setnote] = useState({ title: "", description: "", tag: "" })
    const handelclick = (e) => {
        // preventDefault() method is used to stop the default behavior of an event from occurring
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setnote({ title: "", description: "", tag: "" })
    props.showaleart('Note added successfully', "success ")
    }
    const handelchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className=''>
                <h1>Add Note</h1>
                <Form className='my-3'>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={note.title} placeholder="Enter Title" name="title" onChange={handelchange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tag</Form.Label>
                        <Form.Control type="text" value={note.tag} placeholder="Enter Tag" name="tag" onChange={handelchange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={note.description} placeholder="Description" name="description" onChange={handelchange} />
                    </Form.Group>
                    <Button disabled={note.title.length<5 || note.description.length<5} variant="outline-info" type="submit" onClick={handelclick}>
                        Add Note
                    </Button>
                </Form>
            </div>
        </>
    )
}