using Microsoft.EntityFrameworkCore.Migrations;

namespace Mav.IDP.Data.Migrations
{
    public partial class CentreAddedToUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CentreID",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CentreID",
                table: "AspNetUsers");
        }
    }
}
