using Microsoft.EntityFrameworkCore.Migrations;

namespace Mav.API.Migrations
{
    public partial class UpdatedNumberTypeOrg : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "LeadFinancialNumber",
                table: "Organisations",
                maxLength: 12,
                nullable: false,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "LeadFinancialNumber",
                table: "Organisations",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 12);
        }
    }
}
