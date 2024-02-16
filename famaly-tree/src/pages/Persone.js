import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { Button, Col, Container, Form, Image } from "react-bootstrap";
import { Context } from "..";
import { checkId } from "../routes";
import {
  fetchOnePersone,
  changeOnePersone,
  setImage,
} from "../http/personeAPI";
import {
  changeOneDescription,
  createDescription,
  deleteOneDescriptoin,
} from "../http/descriptionAPI";
import { REACT_APP_API_URL } from "../utils/consts";

const Persone = () => {
  const [isRedact, setIsRedact] = useState();
  const [render, setRender] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useContext(Context);

  // let descriptionData = [
  //   { id: 1, title: "Дата рождения", description: "16.05.1976" },
  //   { id: 3, title: "Город", description: "Кобрин" },
  //   { id: 4, title: "Область", description: "Брестская" },
  //   { id: 5, title: "Страна", description: "Беларусь" },
  // ];

  const [persone, setPersone] = useState();

  useEffect(() => {
    fetchOnePersone(checkId())
      .then((data) => {
        if (loading) {
          setPersone(data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  });

  if (loading) {
    return (
      <div>
        <Spinner animation={"grow"} />
        <h2>Профиль загружается</h2>
      </div>
    );
  }

  return (
    <Container className="mt-3 ">
      {isRedact ? (
        <div>
          <Row>
            <Col md={4}>
              <Image
                width={300}
                height={300}
                thumbnail
                src={REACT_APP_API_URL + persone.img}
              />
              <Form.Group controlId="file" className="mt-3 ">
                <Form.Control
                  type="file"
                  className="bg-transparent text-white"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Row className="d-flex align-items-center justify-content-center">
                <Form.Group>
                  <Form.Control
                    className="bg-transparent text-white form-control-lg"
                    defaultValue={persone.lastname}
                    onChange={(e) => {
                      persone.lastname = e.target.value;
                    }}
                  />
                  <Form.Control
                    className="bg-transparent text-white form-control-lg"
                    defaultValue={persone.firstname}
                    onChange={(e) => {
                      persone.firstname = e.target.value;
                    }}
                  />
                  <Form.Control
                    className="bg-transparent text-white form-control-lg"
                    defaultValue={persone.surname}
                    onChange={(e) => {
                      persone.surname = e.target.value;
                    }}
                  />
                  <Container>
                    <Form.Check
                      defaultChecked={persone.gender === "men" ? true : false}
                      className="m-3"
                      inline
                      label="Мужчина"
                      name="group1"
                      type="radio"
                      id={"inline-radio-1"}
                      onChange={() => {
                        persone.gender = "men";
                      }}
                    />
                    <Form.Check
                      defaultChecked={persone.gender === "women" ? true : false}
                      className="m-3"
                      inline
                      label="Женщина"
                      name="group1"
                      type="radio"
                      id={"inline-radio-2"}
                      onClick={() => {
                        persone.gender = "women";
                      }}
                    />
                  </Container>
                </Form.Group>
              </Row>
            </Col>
          </Row>
          <Form.Group className="d-flex flex-column m-3">
            {persone.info.map((info, index) => (
              <Row className="" key={info.id}>
                <Col className="col-sm-11 m-0 p-0">
                  <Form.Control
                    as="textarea"
                    rows={1}
                    size="sm"
                    className="bg-transparent text-white mr-5"
                    defaultValue={info.title + ": " + info.description}
                    onChange={(e) => {
                      const des = e.target.value.split(": ");
                      persone.info[index].title = des[0];
                      persone.info[index].description = des[1];
                    }}
                  />
                </Col>
                <Col className="p-0 m-0">
                  <Button
                    className="btn-close btn-close-white mt-1"
                    variant={"outline-light"}
                    onClick={() => {
                      persone.info.splice(index, 1);
                      setRender(!render);
                    }}
                  ></Button>
                </Col>
              </Row>
            ))}
          </Form.Group>
          <Button
            className="mx-1"
            variant={"outline-light"}
            onClick={() => {
              persone.info.push({
                id: 0,
                title: "",
                description: "",
              });
              setRender(!render);
            }}
          >
            Добавить пункт
          </Button>
          <Container className="d-flex justify-content-end m-3">
            <Button
              variant={"outline-success"}
              onClick={() => {
                let descriptionOld;
                const id = checkId();
                fetchOnePersone(checkId())
                  .then((data) => {
                    descriptionOld = data.info;
                  })
                  .finally(() => {
                    console.log(descriptionOld);
                    if (descriptionOld.length !== 0) {
                      descriptionOld.forEach((des) => {
                        let found = false;
                        persone.info.forEach((inf) => {
                          if (inf.id === 0) {
                            createDescription({
                              title: inf.title,
                              description: inf.description,
                              personeId: id,
                            });
                          } else if (des.id === inf.id) {
                            changeOneDescription(inf.id, {
                              title: inf.title,
                              description: inf.description,
                            });
                            found = true;
                          }
                        });
                        if (!found) {
                          deleteOneDescriptoin(des.id);
                        }
                      });
                    } else {
                      persone.info.forEach((inf) => {
                        if (inf.id === 0) {
                          createDescription({
                            title: inf.title,
                            description: inf.description,
                            personeId: id,
                          });
                        }
                      });
                    }
                  });

                var imagefile = document.querySelector("#file");
                if (imagefile) {
                  setImage(id, imagefile.files[0]).catch((e) => {
                    console.log(e);
                  });
                }
                console.log(imagefile.files[0]);
                changeOnePersone(id, persone);
                setLoading(true);
                setIsRedact(false);
              }}
            >
              Сохранить изменения
            </Button>
            <Button
              variant={"outline-danger"}
              className="mx-3"
              onClick={() => {
                setLoading(true);
                setIsRedact(false);
              }}
            >
              Отмена
            </Button>
          </Container>
        </div>
      ) : (
        <div>
          <Row>
            <Col md={4}>
              <Image
                width={300}
                height={300}
                thumbnail
                src={REACT_APP_API_URL + persone.img}
              />
            </Col>
            <Col md={4}>
              <Row className="d-flex align-items-center justify-content-center">
                <h2>{persone.lastname}</h2>
                <h2>{persone.firstname}</h2>
                <h2>{persone.surname}</h2>
                <p className="m-0">
                  {persone.gender
                    ? persone.gender === "men"
                      ? "Мужчина"
                      : "Женщина"
                    : "Не определён"}
                </p>
              </Row>
            </Col>
          </Row>
          <Row className="d-flex flex-column m-3">
            {persone.info.map((info, index) => (
              <Row
                key={info.id}
                style={{
                  backgroundColor:
                    index % 2 === 0
                      ? "rgba(166, 166, 166, 0.2)"
                      : "transparent",
                  wordBreak: "break-all",
                }}
              >
                {info.title}: {info.description}
              </Row>
            ))}
          </Row>
          {user.user.id === persone.user ? (
            <Row className="d-flex justify-content-end m-4">
              <Button
                onClick={() => {
                  setIsRedact(true);
                }}
                variant={"outline-light"}
                className="w-25"
              >
                Изменить
              </Button>
            </Row>
          ) : (
            <Row></Row>
          )}
        </div>
      )}
    </Container>
  );
};

export default Persone;
