import React from "react";
import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const AddProjectModal = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [clientId, setClientId] = useState("");
    const [status, setStatus] = useState("new");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, clientId, status },
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] },
            });
        },
    });

    // Get Clients for select
    const { loading, error, data } = useQuery(GET_CLIENTS);

    const onSubmit = (e) => {
        e.preventDefault();

        if (name === "" || description === "" || status === "") {
            return alert("Please fill in all fields");
        }

        addProject(name, description, clientId, status);

        setName("");
        setDescription("");
        setStatus("new");
        setClientId("");
        handleClose();
    };

    if (loading) return null;
    if (error) return "Something Went Wrong";

    return (
        <>
            {!loading && !error && (
                <>
                    <div className="d-flex align-items-center justify-content-center">
                        <Button variant="primary" onClick={handleShow}>
                            <FaList /> Add Project
                        </Button>
                    </div>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Project</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={onSubmit}>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                    >
                                        <option>Select Status</option>
                                        <option value="new">
                                            Not Initiated
                                        </option>
                                        <option value="progress">
                                            In Progress
                                        </option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group controlId="formBasicClient">
                                    <Form.Label>Client</Form.Label>
                                    <Form.Select
                                        aria-label="Select Client"
                                        value={clientId}
                                        onChange={(e) =>
                                            setClientId(e.target.value)
                                        }
                                    >
                                        <option>Select Client</option>
                                        {data.clients.map((client) => (
                                            <option
                                                key={client.id}
                                                value={client.id}
                                            >
                                                {client.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <br></br>
                                <Button variant="primary" type="submit" block>
                                    Add Project
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
            )}
        </>
    );
};

export default AddProjectModal;
