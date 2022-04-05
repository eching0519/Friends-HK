import React from "react";
import { Form } from 'react-bootstrap';

import './InputBar.css';

function InputBar(props) {
    return (
        <Form className="form-sample">
            <Form.Group className="m-2">
            <div className="row justfiy">
                <Form.Control
                    type="text"
                    className="input-box form-control col mr-3"
                    placeholder="Type a message..."
                    aria-label="Type a message..."
                    aria-describedby="basic-addon2"
                    value={props.message}
                    onChange={(event) => props.setMessage(event.target.value)}
                    onKeyPress={event => event.key === 'Enter' ? props.sendMessage(event) : null}
                />

                <button className="btn btn-rounded btn-gradient-primary col-auto" onClick={e => {
                    //props.setMessages([...messages, message])
                    props.sendMessage(e);
                }}>Send</button>
            </div>
                
            </Form.Group>

            {/*
            <input
                className=""
                type="text"
                placeholder="Type a message..."
                value={props.message}
                onChange={(event) => props.setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? props.sendMessage(event) : null}
            />
            <button className="btn btn-rounded btn-gradient-danger" onClick={e => {
                //props.setMessages([...messages, message])
                props.sendMessage(e);
            }}>Send</button>
            */}

        </Form>
    )
}

export default InputBar;