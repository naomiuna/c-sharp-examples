using Microsoft.EntityFrameworkCore.Migrations;

namespace Mav.API.Migrations
{
    public partial class EditedLicenceModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "MainContactEmail",
                table: "Organisations",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LeadFinancialName",
                table: "Organisations",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LeadFinancialEmail",
                table: "Organisations",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OrganisationID",
                table: "Licences",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Licences_OrganisationID",
                table: "Licences",
                column: "OrganisationID");

            migrationBuilder.AddForeignKey(
                name: "FK_Licences_Organisations_OrganisationID",
                table: "Licences",
                column: "OrganisationID",
                principalTable: "Organisations",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Licences_Organisations_OrganisationID",
                table: "Licences");

            migrationBuilder.DropIndex(
                name: "IX_Licences_OrganisationID",
                table: "Licences");

            migrationBuilder.DropColumn(
                name: "OrganisationID",
                table: "Licences");

            migrationBuilder.AlterColumn<string>(
                name: "MainContactEmail",
                table: "Organisations",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "LeadFinancialName",
                table: "Organisations",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "LeadFinancialEmail",
                table: "Organisations",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 100);
        }
    }
}
