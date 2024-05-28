using System;  // Importa el espacio de nombres System, que contiene clases y métodos fundamentales.
using System.Collections.Generic;  // Importa el espacio de nombres que contiene interfaces y clases definidas genéricamente, como listas y diccionarios.
using Microsoft.EntityFrameworkCore;  // Importa el espacio de nombres de Entity Framework Core, que incluye las clases necesarias para trabajar con EF Core.

namespace crudApp.Server.Models
{
    // Define el contexto de la base de datos, que hereda de DbContext de Entity Framework Core.
    public partial class CrudNetContext : DbContext
    {
        // Constructor sin parámetros. Se utiliza cuando se configura el contexto manualmente.
        public CrudNetContext()
        {
        }

        // Constructor que acepta opciones de configuración para el contexto.
        public CrudNetContext(DbContextOptions<CrudNetContext> options)
            : base(options)
        {
        }

        // Representa la tabla 'Contactos' en la base de datos.
        public virtual DbSet<Contacto> Contactos { get; set; }

        // Método para configurar el proveedor de base de datos si no se ha configurado externamente.
        // En este caso, se configura para usar PostgreSQL con las credenciales especificadas.
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("Host=localhost;Database=crud_net;Username=postgres;Password=admin");

        // Método para configurar el modelo a través del modelBuilder.
        // Define las reglas y mapeos para las entidades.
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contacto>(entity =>
            {
                // Configura la clave primaria de la entidad 'Contacto'.
                entity.HasKey(e => e.IdContacto).HasName("contacto_pkey");

                // Especifica el nombre de la tabla.
                entity.ToTable("contacto");

                // Configura las propiedades de la entidad 'Contacto'.
                entity.Property(e => e.IdContacto).HasColumnName("id_contacto");
                entity.Property(e => e.Correo)
                    .HasMaxLength(100)
                    .HasColumnName("correo");
                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .HasColumnName("nombre");
                entity.Property(e => e.Telefono)
                    .HasMaxLength(15)
                    .HasColumnName("telefono");
            });

            // Método parcial para permitir configuraciones adicionales en clases parciales.
            OnModelCreatingPartial(modelBuilder);
        }

        // Método parcial que puede ser implementado en otra parte del archivo para personalizar aún más el modelBuilder.
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
