import React, { useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom'
import Noteitem from './Noteitem';
import Row from 'react-bootstrap/Row';
import AddNote from './AddNote';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function Notes(props) {
  const context = useContext(noteContext)
  const { notes, getNotes, editnote } = context;
  const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
  const [show, setShow] = useState(false);
  const ref = useRef(null)
  const closeref = useRef(null)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    } else {
      navigate("/Login");
    }
    // eslint-disable-next-line
  }, [])
  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }
  const handelchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }
  const handelclick = (e) => {
    closeref.current.click();
    editnote(note.id, note.etitle, note.edescription, note.etag);
    props.showaleart('Updated successfully', "success ")
    // addNote(note.title, note.description, note.tag)
  }
  return (
    <>
      <AddNote showaleart={props.showaleart}/>
      <Button variant="primary" className='d-none' onClick={handleShow} ref={ref}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='my-3'>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter Title" name="etitle" value={note.etitle} onChange={handelchange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tag</Form.Label>
              <Form.Control type="text" placeholder="Enter Tag" name="etag" value={note.etag} onChange={handelchange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Description" value={note.edescription} name="edescription" onChange={handelchange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button ref={closeref} variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button disabled={note.etitle.length<5 || note.edescription.length<5} variant="outline-info" onClick={handelclick}>
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <h1>Your Notes</h1>
        {notes.length === 0 ? "No notes to display" : notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} showaleart={props.showaleart}/>;
        })}
      </Row>
    </>
  )
}