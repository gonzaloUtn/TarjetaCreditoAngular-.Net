using FBBTarjeta.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FBBTarjeta
{
    public class AplicationDbContext : DbContext // crea una instacia de la base de datos, nos permite almacenar datos
    {

        public DbSet<TarjetaCredito>tarjetaCredito { get; set; }//mapear modelo con la base de datos

        public AplicationDbContext(DbContextOptions<AplicationDbContext>options): base(options)
        {

        }
    }
}
