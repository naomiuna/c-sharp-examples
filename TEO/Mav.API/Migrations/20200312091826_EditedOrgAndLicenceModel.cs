using Microsoft.EntityFrameworkCore.Migrations;

namespace Mav.API.Migrations
{
    public partial class EditedOrgAndLicenceModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "LicenceID",
                table: "Organisations",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Organisations_LicenceID",
                table: "Organisations",
                column: "LicenceID");

            migrationBuilder.AddForeignKey(
                name: "FK_Organisations_Licences_LicenceID",
                table: "Organisations",
                column: "LicenceID",
                principalTable: "Licences",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Organisations_Licences_LicenceID",
                table: "Organisations");

            migrationBuilder.DropIndex(
                name: "IX_Organisations_LicenceID",
                table: "Organisations");

            migrationBuilder.DropColumn(
                name: "LicenceID",
                table: "Organisations");

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
    }
}
