import React from "react";
import { FaList } from "react-icons/fa";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

//   return (

//       <form onSubmit={onSubmit}>
//         <div className='mb-3'>
//           <label className='form-label'>Name</label>
//           <input
//             type='text'
//             className='form-control'
//             id='name'
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className='mb-3'>
//           <label className='form-label'>Description</label>
//           <textarea
//             className='form-control'
//             id='description'
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           ></textarea>
//         </div>
//         <div className='mb-3'>
//           <label className='form-label'>Status</label>
//           <select
//             id='status'
//             className='form-select'
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//           >
//             <option value='new'>Not Started</option>
//             <option value='progress'>In Progress</option>
//             <option value='completed'>Completed</option>
//           </select>
//         </div>

//         <button type='submit' className='btn btn-primary'>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

const EditProjectForm = ({ project }) => {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: project.id, name, description, status },
        refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (!name || !description || !status) {
            return alert("Please fill out all fields");
        }

        updateProject(name, description, status);

        handleClose();
    };

    return (
        <div className="mt-5">
            <h3>Update Project Details</h3>
            <>
                <Button variant="primary" onClick={handleShow}>
                    <FaList /> Edit Project
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={onSubmit}>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    aria-label="Select Status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option>Select Status</option>
                                    <option value="new">Not Initiated</option>
                                    <option value="progress">
                                        In Progress
                                    </option>
                                    <option value="completed">Completed</option>
                                </Form.Select>
                            </Form.Group>
                            <br></br>
                            <Button variant="primary" type="submit" block>
                                Update Project
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        </div>
    );
};

export default EditProjectForm;
