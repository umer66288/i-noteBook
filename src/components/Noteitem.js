import React, { useContext } from 'react'
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import noteContext from '../context/notes/noteContext';

export default function Noteitem(props) {
    const context = useContext(noteContext)
    const { deletenote } = context
    const { note, updateNote } = props
    return (
        <Col md={4}>
            <Card className='my-2'>
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <Card.Title>{note.title}</Card.Title>
                        <div>
                            <i className="mx-1 bi bi-trash" onClick={() => {
                                deletenote(note._id);
                                props.showaleart('Note Deleted successfully', "success ")
                            }}></i>
                            <i className="mx-1 bi bi-pencil-square" onClick={() => { updateNote(note) }}></i>
                        </div>
                    </div>
                    <Card.Text>{note.description}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}