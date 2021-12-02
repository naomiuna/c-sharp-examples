using Microsoft.EntityFrameworkCore.Migrations;

namespace Mav.API.Migrations
{
    public partial class UserAssessmentsUpdate1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SectionID",
                table: "UserAssessmentSections",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserAssessmentSections_SectionID",
                table: "UserAssessmentSections",
                column: "SectionID");

            migrationBuilder.AddForeignKey(
                name: "FK_UserAssessmentSections_Sections_SectionID",
                table: "UserAssessmentSections",
                column: "SectionID",
                principalTable: "Sections",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAssessmentSections_Sections_SectionID",
                table: "UserAssessmentSections");

            migrationBuilder.DropIndex(
                name: "IX_UserAssessmentSections_SectionID",
                table: "UserAssessmentSections");

            migrationBuilder.DropColumn(
                name: "SectionID",
                table: "UserAssessmentSections");
        }
    }
}
