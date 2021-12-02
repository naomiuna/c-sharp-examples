using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Mav.API.Migrations
{
    public partial class AddedUserSectionTimerTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Sections_TimerID",
                table: "Sections");

            migrationBuilder.AddColumn<int>(
                name: "UserSectionTimerID",
                table: "UserAssessmentSections",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserSectionTimer",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TimeLimit = table.Column<double>(nullable: false),
                    TimePassed = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSectionTimer", x => x.ID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserAssessmentSections_UserSectionTimerID",
                table: "UserAssessmentSections",
                column: "UserSectionTimerID",
                unique: true,
                filter: "[UserSectionTimerID] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Sections_TimerID",
                table: "Sections",
                column: "TimerID",
                unique: true,
                filter: "[TimerID] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_UserAssessmentSections_UserSectionTimer_UserSectionTimerID",
                table: "UserAssessmentSections",
                column: "UserSectionTimerID",
                principalTable: "UserSectionTimer",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAssessmentSections_UserSectionTimer_UserSectionTimerID",
                table: "UserAssessmentSections");

            migrationBuilder.DropTable(
                name: "UserSectionTimer");

            migrationBuilder.DropIndex(
                name: "IX_UserAssessmentSections_UserSectionTimerID",
                table: "UserAssessmentSections");

            migrationBuilder.DropIndex(
                name: "IX_Sections_TimerID",
                table: "Sections");

            migrationBuilder.DropColumn(
                name: "UserSectionTimerID",
                table: "UserAssessmentSections");

            migrationBuilder.CreateIndex(
                name: "IX_Sections_TimerID",
                table: "Sections",
                column: "TimerID");
        }
    }
}
