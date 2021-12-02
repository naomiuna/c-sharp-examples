using Microsoft.EntityFrameworkCore.Migrations;

namespace Mav.API.Migrations
{
    public partial class CentreTypeInvigilatorCap : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MaxInvigilators",
                table: "CentreTypes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaxInvigilators",
                table: "CentreTypes");
        }
    }
}
