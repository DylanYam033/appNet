import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

function ModalCreate({ isOpen, toggle, contact, onSave }) {

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');

  useEffect(() => {
    if (contact) {
      setNombre(contact.nombre);
      setCorreo(contact.correo);
      setTelefono(contact.telefono);
    }
  }, [contact]);

  const handleSave = () => {
    onSave({ ...contact, nombre, correo, telefono });
    setNombre('');
    setCorreo('');
    setTelefono('');
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{contact ? 'Editar contacto' : 'Nuevo contacto'}</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="nombre">Nombre</Label>
            <Input
              type="text"
              name="nombre"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="correo">Correo</Label>
            <Input
              type="email"
              name="correo"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="telefono">Teléfono</Label>
            <Input
              type="tel"
              name="telefono"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>Guardar</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
}

export {ModalCreate};
