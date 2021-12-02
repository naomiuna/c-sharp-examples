using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Mav.API.Migrations
{
    public partial class AddedTimerTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "TimedSection",
                table: "Sections",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TimerID",
                table: "Sections",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Timer",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    SectionID = table.Column<int>(nullable: false),
                    TimeLimit = table.Column<double>(nullable: false),
                    Deleted = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Timer", x => x.ID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Sections_TimerID",
                table: "Sections",
                column: "TimerID");

            migrationBuilder.AddForeignKey(
                name: "FK_Sections_Timer_TimerID",
                table: "Sections",
                column: "TimerID",
                principalTable: "Timer",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sections_Timer_TimerID",
                table: "Sections");

            migrationBuilder.DropTable(
                name: "Timer");

            migrationBuilder.DropIndex(
                name: "IX_Sections_TimerID",
                table: "Sections");

            migrationBuilder.DropColumn(
                name: "TimedSection",
                table: "Sections");

            migrationBuilder.DropColumn(
                name: "TimerID",
                table: "Sections");
        }
    }
}
