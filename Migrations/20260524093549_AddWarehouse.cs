using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class AddWarehouse : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WarehouseId",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.CreateTable(
                name: "Warhouses",
                columns: table => new
                {
                    Id = table.Column<int>(
                        type: "int",
                        nullable: false)
                        .Annotation(
                            "SqlServer:Identity",
                            "1, 1"),

                    Location = table.Column<string>(
                        type: "nvarchar(max)",
                        nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey(
                        "PK_Warhouses",
                        x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Warhouses",
                columns: new[] { "Id", "Location" },
                values: new object[,]
                {
                    { 1, "Warehouse 1" },
                    { 2, "Warehouse 2" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_WarehouseId",
                table: "Products",
                column: "WarehouseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Warhouses_WarehouseId",
                table: "Products",
                column: "WarehouseId",
                principalTable: "Warhouses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Warhouses_WarehouseId",
                table: "Products");

            migrationBuilder.DropTable(
                name: "Warhouses");

            migrationBuilder.DropIndex(
                name: "IX_Products_WarehouseId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "WarehouseId",
                table: "Products");
        }
    }
}