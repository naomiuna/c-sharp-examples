using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Mav.API.Migrations
{
    public partial class OrganisationTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Organisations",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TypeID = table.Column<int>(nullable: false),
                    OrganisationName = table.Column<string>(maxLength: 100, nullable: false),
                    AddressLine1 = table.Column<string>(maxLength: 100, nullable: false),
                    AddressLine2 = table.Column<string>(nullable: true),
                    AddressLine3 = table.Column<string>(nullable: true),
                    MainContactName = table.Column<string>(maxLength: 100, nullable: false),
                    MainContactEmail = table.Column<string>(nullable: true),
                    LeadFinancialName = table.Column<string>(nullable: true),
                    LeadFinancialEmail = table.Column<string>(nullable: true),
                    LeadFinancialNumber = table.Column<int>(nullable: false),
                    CentreLimit = table.Column<int>(nullable: false),
                    Deleted = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organisations", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Organisations_OrganisationTypes_TypeID",
                        column: x => x.TypeID,
                        principalTable: "OrganisationTypes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Organisations_TypeID",
                table: "Organisations",
                column: "TypeID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Organisations");
        }
    }
}
