using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Mav.API.Migrations
{
    public partial class AddTablesCentres : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CentreTypes",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Code = table.Column<string>(maxLength: 10, nullable: false),
                    Name = table.Column<string>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CentreTypes", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Centres",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TypeID = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 200, nullable: false),
                    Number = table.Column<string>(maxLength: 100, nullable: true),
                    Enabled = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Centres", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Centres_CentreTypes_TypeID",
                        column: x => x.TypeID,
                        principalTable: "CentreTypes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserCentres",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CentreID = table.Column<int>(nullable: false),
                    UserID = table.Column<string>(maxLength: 450, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserCentres", x => x.ID);
                    table.ForeignKey(
                        name: "FK_UserCentres_Centres_CentreID",
                        column: x => x.CentreID,
                        principalTable: "Centres",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Centres_TypeID",
                table: "Centres",
                column: "TypeID");

            migrationBuilder.CreateIndex(
                name: "IX_UserCentres_CentreID",
                table: "UserCentres",
                column: "CentreID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserCentres");

            migrationBuilder.DropTable(
                name: "Centres");

            migrationBuilder.DropTable(
                name: "CentreTypes");
        }
    }
}
