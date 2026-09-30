using Autos.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException(
            "Connection string 'DefaultConnection' not found.")
    ));

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddCors(options =>

{

    options.AddPolicy("AllowAll", policy =>

    {

        policy.AllowAnyOrigin()

              .AllowAnyMethod()

              .AllowAnyHeader();

    });

});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

Console.WriteLine("=================================");
Console.WriteLine("        INICIANDO API");
Console.WriteLine("=================================");
Console.WriteLine("API de gestión de vehículos");
Console.WriteLine("Endpoints disponibles:");
Console.WriteLine("- GET    /api/CargaVehiculo");
Console.WriteLine("- POST   /api/CargaVehiculo");
Console.WriteLine("- PUT    /api/CargaVehiculo");
Console.WriteLine("- DELETE /api/CargaVehiculo");
Console.WriteLine("=================================");

app.Use(async (context, next) =>
{
    Console.WriteLine("--------------------------------");
    Console.WriteLine($"Método: {context.Request.Method}");
    Console.WriteLine($"Ruta: {context.Request.Path}");
    Console.WriteLine("--------------------------------");

    await next();
});

app.UseDefaultFiles();
app.UseStaticFiles();

app.Run();
