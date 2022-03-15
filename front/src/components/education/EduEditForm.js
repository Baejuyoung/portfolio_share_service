import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

import EduRadioForm from "./EduRadioForm";

function EduEditForm({ currentEdu, setEdus, setIsEditing }) {
    //useState로 title 상태를 생성함.
    //title, description 변수 이름 변경?
    const [title, setTitle] = useState(currentEdu.title);
    //useState로 description 상태를 생성함.
    const [description, setDescription] = useState(currentEdu.description);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // currentEdu의 user_id를 user_id 변수에 할당함.
        const user_id = currentEdu.user_id;

        // "educations/수상 id" 엔드포인트로 PUT 요청함.
        await Api.put(`educations/${currentEdu.id}`, {
            user_id,
            title,
            description,
        });

        // "educationlist/유저 id" 엔드포인트로 GET 요청함.
        const res = await Api.get("educationlist", user_id);
        // edus를 response의 data로 세팅함.
        setEdus(res.data);
        // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
        setIsEditing(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTitle">
                <Form.Control
                    type="text"
                    placeholder="학교 이름"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicDescription" className="mt-3">
                <Form.Control
                    type="text"
                    placeholder="전공"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formBasicRadio" >
                <EduRadioForm/>
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center mb-4">
                <Col sm={{ span: 20 }}>
                    <Button variant="primary" type="submit" className="me-3">
                        확인
                    </Button>
                    <Button variant="secondary" onClick={() => setIsEditing(false)}>
                        취소
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    );
}

export default EduEditForm;
