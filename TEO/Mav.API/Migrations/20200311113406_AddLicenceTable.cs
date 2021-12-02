using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Mav.API.Migrations
{
    public partial class AddLicenceTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Licences",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    OrganisationID = table.Column<int>(nullable: false),
                    MaxCentres = table.Column<int>(nullable: false),
                    Cost = table.Column<double>(nullable: false),
                    AcademicYear = table.Column<int>(nullable: false),
                    Paid = table.Column<bool>(nullable: false),
                    Deleted = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Licences", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Licences_Organisations_OrganisationID",
                        column: x => x.OrganisationID,
                        principalTable: "Organisations",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Licences_OrganisationID",
                table: "Licences",
                column: "OrganisationID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Licences");
        }
    }
}
