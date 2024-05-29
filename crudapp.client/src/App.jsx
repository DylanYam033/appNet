import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row, Button } from 'reactstrap';
import TablaContacto from './components/TablaContacto';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactModal from './components/ModalCreate';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

    const [contactos, setContactos] = useState([]);

    const mostrarContactos = async () => {
        const response = await fetch('api/Contacto/contactos/list');

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setContactos(data);
        } else {
            console.error("Error")
        }
    }

    useEffect(() => {
        mostrarContactos()
    }, [])

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleSaveContact = async (contact) => {
        try {
          const response = await fetch('/api/Contacto/contactos/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact),
          });
    
          if (response.ok) {
            // Mostrar alerta de éxito
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Contacto guardado exitosamente',
            });
            toggleModal(); // Cerrar modal después de guardar exitosamente
            mostrarContactos();
          } else {
            // Mostrar alerta de error
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al guardar el contacto. Por favor, inténtalo de nuevo más tarde.',
            });
            
          }
        } catch (error) {
          console.error('Error de red:', error);
          // Mostrar alerta de error de red
          Swal.fire({
            icon: 'error',
            title: 'Error de red',
            text: 'Hubo un problema al conectarse al servidor. Por favor, revisa tu conexión a internet e inténtalo de nuevo.',
          });
         
        }
    };

    return (
        <Container>
            <Row className='mt-5'>
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Lista de contactos</h5>
                        </CardHeader>
                        <CardBody>
                            <Button color="success" onClick={toggleModal}>Nuevo contacto</Button>
                            <hr></hr>
                            <TablaContacto contactos={contactos} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ContactModal isOpen={showModal} toggle={toggleModal} onSave={handleSaveContact} />
        </Container>
    );

}

export default App;