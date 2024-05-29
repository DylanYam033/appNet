import { useEffect, useState } from 'react';
import { Button, Table, Input } from 'reactstrap';

function TablaContacto({ contactos }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [contactsPerPage, setContactsPerPage] = useState(5); // Número predeterminado de contactos por página

    // Índices de los contactos que se mostrarán en la página actual
    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = contactos.slice(indexOfFirstContact, indexOfLastContact);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Cambiar cantidad de contactos por página
    const handleContactsPerPageChange = (e) => {
        setCurrentPage(1); // Cuando cambia el número de contactos por página, volver a la primera página
        setContactsPerPage(Number(e.target.value));
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
                            <td colSpan="4" className="text-center">No hay registros</td>
                        </tr>
                    ) : (
                        currentContacts.map((contacto) => (
                            <tr key={contacto.idContacto}>
                                <th scope="row">{contacto.idContacto}</th>
                                <td>{contacto.nombre}</td>
                                <td>{contacto.correo}</td>
                                <td>{contacto.telefono}</td>
                                <td>
                                    <Button color='primary' size='sm' className='me-2'>Editar</Button>
                                    <Button color='danger' size='sm' className='me-2'>Eliminar</Button>
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
        </div>
    );
}

export default TablaContacto;