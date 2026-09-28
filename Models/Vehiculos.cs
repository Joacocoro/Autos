using Microsoft.EntityFrameworkCore;
using Autos.Models;
using System.ComponentModel.DataAnnotations;

namespace Autos.Models;

public class Vehiculos
{
    [Key]
    public int VehiculoID { get; set; }
    public required string Marca { get; set; }
    public required string Modelo { get; set; }
    public int Año { get; set; }
    public required string Patente { get; set; }
    public decimal Kilometraje { get; set; }
    public DateTime FechaIngreso { get; set; }
    public bool Disponible { get; set; } = true;
}