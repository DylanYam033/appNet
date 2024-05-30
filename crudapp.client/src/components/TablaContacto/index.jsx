import React, { useState } from 'react';
import { Button, Table, Input } from 'reactstrap';
import { ModalCreate } from '../ModalCreate';
import Swal from 'sweetalert2';

function TablaContacto({ contactos, mostrarContactos}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [contactsPerPage, setContactsPerPage] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    // Índices de los contactos que se mostrarán en la página actual
    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = contactos.slice(indexOfFirstContact, indexOfLastContact);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Cambiar cantidad de contactos por página
    const handleContactsPerPageChange = (e) => {
        setCurrentPage(1);
        setContactsPerPage(Number(e.target.value));
    };

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleEdit = (contacto) => {
        setSelectedContact(contacto);
        toggleModal();
    };

    const handleSave = async (updatedContact) => {
        try {
            const response = await fetch('/api/Contacto/contactos/update', {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedContact),
            });
    
            if (response.ok) {
                Swal.fire({
                    title: 'Éxito',
                    text: 'Contacto Actualizado',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                mostrarContactos()
            }
            toggleModal();
        } catch (error) {
            console.error('Error al actualizar el contacto:', error);
    
            // Mostrar alerta de error
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al actualizar el contacto.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleDelete = async (idContacto) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`/api/Contacto/contactos/delete/${idContacto}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al eliminar el contacto');
                }

                Swal.fire({
                    title: 'Eliminado',
                    text: 'El contacto ha sido eliminado',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                mostrarContactos();

            } catch (error) {
                console.error('Error al eliminar el contacto:', error);

                Swal.fire({
                    title: 'Error',
                    text: error.message || 'Hubo un problema al eliminar el contacto.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    return (
        <div>
            <Table striped>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Telefono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentContacts.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center">No hay registros</td>
                        </tr>
                    ) : (
                        currentContacts.map((contacto) => (
                            <tr key={contacto.idContacto}>
                                <th scope="row">{contacto.idContacto}</th>
                                <td>{contacto.nombre}</td>
                                <td>{contacto.correo}</td>
                                <td>{contacto.telefono}</td>
                                <td>
                                    <Button color='primary' size='sm' className='me-2' onClick={() => handleEdit(contacto)}>Editar</Button>
                                    <Button color='danger' size='sm' className='me-2' onClick={() => handleDelete(contacto.idContacto)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
            {/* Controles de paginación */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <nav>
                    <ul className='pagination'>
                        {contactos.length > contactsPerPage && (
                            <li className='page-item'>
                                <button className='page-link' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                    Anterior
                                </button>
                            </li>
                        )}
                        {Array.from({ length: Math.ceil(contactos.length / contactsPerPage) }).map((_, index) => (
                            <li key={index} className='page-item'>
                                <button className={`page-link ${currentPage === index + 1 ? 'active' : ''}`} onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        {contactos.length > contactsPerPage && (
                            <li className='page-item'>
                                <button className='page-link' onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(contactos.length / contactsPerPage)}>
                                    Siguiente
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
                <div className="mb-3" style={{ marginLeft: '5px' }}>
                    <Input type="select" className="me-2" value={contactsPerPage} onChange={handleContactsPerPageChange}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        {/* Agrega más opciones según sea necesario */}
                    </Input>
                </div>

            </div>
            {selectedContact && (
                <ModalCreate
                    isOpen={isModalOpen}
                    toggle={toggleModal}
                    contact={selectedContact}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}

export default TablaContacto;