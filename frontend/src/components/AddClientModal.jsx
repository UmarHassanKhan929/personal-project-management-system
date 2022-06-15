import React from "react";

import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENTS } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

export default function AddClientModal() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [addClient] = useMutation(ADD_CLIENTS, {
        variables: { name, email, phone },
        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS });

            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] },
            });
        },
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (name === "" || email === "" || phone === "") {
            return alert("Please fill in all fields");
        }

        addClient(name, email, phone);

        setName("");
        setEmail("");
        setPhone("");
        handleClose();
    };

    return (
        <>
            <div className="d-flex align-items-center justify-content-center">
                <Button variant="primary" onClick={handleShow}>
                    <FaUser/> Add Client 
                </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Client</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="phone"
                                placeholder="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Form.Group>
                        <br></br>
                        <Button variant="primary" type="submit" block>
                            Add Client
                        </Button>
                    </Form>
                </Modal.Body>
              
                
            </Modal>
        </>
    );
}
