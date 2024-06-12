import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row, Button } from 'reactstrap';
import TablaContacto from './components/TablaContacto';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ModalCreate } from './components/ModalCreate';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function App() {

    const [contactos, setContactos] = useState([]);
    const [loading, setLoading] = useState(true);

    const mostrarContactos = async () => {
        setLoading(true);
        try {
            const response = await fetch('api/Contacto/contactos/list');
            if (response.ok) {
                const data = await response.json();
                setContactos(data);
            } else {
                console.error("Error al cargar los contactos");
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
        setLoading(false); // ponemos en false el loading despues de cargar los contactos
    }

    useEffect(() => {
        mostrarContactos();
    }, []);

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
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Contacto guardado exitosamente',
                });
                toggleModal();
                mostrarContactos();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al guardar el contacto. Por favor, inténtalo de nuevo más tarde.',
                });
            }
        } catch (error) {
            console.error('Error de red:', error);
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
                            {loading ? (
                                <Skeleton count={5} height={40} />
                            ) : (
                                <TablaContacto contactos={contactos} mostrarContactos={mostrarContactos} />
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalCreate isOpen={showModal} toggle={toggleModal} onSave={handleSaveContact} />
        </Container>
    );
}

export default App;
