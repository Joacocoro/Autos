using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Autos.Migrations
{
    /// <inheritdoc />
    public partial class DefaultTrue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Vehiculos",
                newName: "VehiculoID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "VehiculoID",
                table: "Vehiculos",
                newName: "Id");
        }
    }
}
