import React, { useState } from "react";
import * as Api from "../../api";
import { Form, Row, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

const CertificateEditForm = ({ currentCertificate, setCertificates, setIsEditing }) => {

  // useState로 title 상태를 생성함.
  const [title, setTitle] = useState(currentCertificate.title);
  // useState로 description 상태를 생성함.
  const [description, setDescription] = useState(currentCertificate.description);
  // useState로 when_date 상태를 생성함.
  const [when_date, setWhenDate] = useState(new Date(currentCertificate.when_date))

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentCertificate의 user_id를 user_id 변수에 할당함.
    const user_id = currentCertificate.user_id;

    // "certificates/프로젝트 id" 엔드포인트로 PUT 요청함.
    await Api.put(`awards/${currentCertificate.id}`, {
      user_id,
      title,
      description,
      when_date,
    });

    // "certificatelist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("certificatelist", user_id);
    setCertificates(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="formBasicTitle">
      <Form.Control
        type="text"
        placeholder="자격증 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </Form.Group>
    <Form.Group controlId="formBasicDescription" className="mt-3">
      <Form.Control
        type="text"
        placeholder="상세 내역"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </Form.Group>
    <Form.Group controlId="formBasicWhenDate" className="mt-3">
        <DatePicker
            selected={when_date}
            onChange={(date) => {setWhenDate(date)}}
        />
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
};

export default CertificateEditForm;
