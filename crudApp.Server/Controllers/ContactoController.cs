using Microsoft.AspNetCore.Http; // Proporciona tipos y propiedades para manejar solicitudes y respuestas HTTP.
using Microsoft.AspNetCore.Mvc; // Proporciona atributos y tipos para construir controladores y acciones de MVC y Web API.
using crudApp.Server.Models; // Espacio de nombres donde está definido el modelo `Contacto`.
using Microsoft.EntityFrameworkCore; // Proporciona Entity Framework Core, un ORM para trabajar con bases de datos.

namespace crudApp.Server.Controllers
{
    // Define la ruta base para este controlador como "api/contacto"
    [Route("api/[controller]")]
    [ApiController] // Indica que este controlador responde a solicitudes de API y se utiliza la validación automática del modelo.
    public class ContactoController : ControllerBase
    {
        private readonly CrudNetContext _dbcontext; // Contexto de base de datos para interactuar con la base de datos.

        // Constructor que recibe el contexto de la base de datos a través de la inyección de dependencias.
        public ContactoController(CrudNetContext context)
        {
            _dbcontext = context;
        }

        // Acción HTTP GET para obtener la lista de contactos.
        [HttpGet]
        [Route("contactos/list")]
        public async Task<IActionResult> GetContacts()
        {
            // Obtiene la lista de contactos ordenados por IdContacto en orden descendente de manera asincrónica.
            List<Contacto> list_contacts = await _dbcontext.Contactos.OrderByDescending(contacto => contacto.IdContacto).ToListAsync();

            // Retorna la lista de contactos con un código de estado 200 (OK).
            return StatusCode(StatusCodes.Status200OK, list_contacts);
        }

        // Acción HTTP POST para crear un nuevo contacto.
        [HttpPost]
        [Route("contactos/create")]
        public async Task<IActionResult> SaveContact([FromBody] Contacto request)
        {
            // Agrega el nuevo contacto a la base de datos de manera asincrónica.
            await _dbcontext.Contactos.AddAsync(request);
            // Guarda los cambios en la base de datos de manera asincrónica.
            await _dbcontext.SaveChangesAsync();

            // Retorna un mensaje de éxito con un código de estado 200 (OK).
            return StatusCode(StatusCodes.Status200OK, "Contacto Creado Correctamente");
        }

        // Acción HTTP PUT para actualizar un contacto existente.
        [HttpPut]
        [Route("contactos/update")]
        public async Task<IActionResult> UpdateContact([FromBody] Contacto request)
        {
            // Actualiza el contacto en la base de datos.
            _dbcontext.Contactos.Update(request);
            // Guarda los cambios en la base de datos de manera asincrónica.
            await _dbcontext.SaveChangesAsync();

            // Retorna un mensaje de éxito con un código de estado 200 (OK).
            return StatusCode(StatusCodes.Status200OK, "Contacto Actualizado Correctamente");
        }

        // Acción HTTP PUT para eliminar un contacto por su Id.
        [HttpPut]
        [Route("contactos/delete/{id:int}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            // Busca el contacto por Id de manera síncrona.
            Contacto contacto = _dbcontext.Contactos.Find(id);

            // Remueve el contacto de la base de datos.
            _dbcontext.Contactos.Remove(contacto);
            // Guarda los cambios en la base de datos de manera asincrónica.
            await _dbcontext.SaveChangesAsync();

            // Retorna un mensaje de éxito con un código de estado 200 (OK).
            return StatusCode(StatusCodes.Status200OK, "Contacto Eliminado Correctamente");
        }
    }
}
