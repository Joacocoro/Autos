using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Autos.Data;
using Autos.Models;

namespace Autos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CargaVehiculoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CargaVehiculoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CargaVehiculo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vehiculos>>> GetVehiculos()
        {
            return await _context.Vehiculos.ToListAsync();
        }

        // GET: api/CargaVehiculo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Vehiculos>> GetVehiculos(int id)
        {
            Console.WriteLine($"ID recibido: {id}");
            var vehiculos = await _context.Vehiculos.FindAsync(id);

            if (vehiculos == null)
            {
                return NotFound();
            }

            Console.WriteLine($"Vehículo encontrado: {vehiculos.VehiculoID}");

            return vehiculos;
        }

        // PUT: api/CargaVehiculo/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehiculos(int id, Vehiculos vehiculos)
        {
            if (id != vehiculos.VehiculoID)
            {
                return BadRequest();
            }

            _context.Entry(vehiculos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehiculosExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CargaVehiculo
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Vehiculos>> PostVehiculos(Vehiculos vehiculos)
        {
            _context.Vehiculos.Add(vehiculos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVehiculos", new { id = vehiculos.VehiculoID }, vehiculos);
        }

        // DELETE: api/CargaVehiculo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehiculos(int id)
        {
            var vehiculos = await _context.Vehiculos.FindAsync(id);
            if (vehiculos == null)
            {
                return NotFound();
            }

            _context.Vehiculos.Remove(vehiculos);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VehiculosExists(int id)
        {
            return _context.Vehiculos.Any(e => e.VehiculoID == id);
        }

    }
}
