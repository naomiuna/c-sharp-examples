using Microsoft.EntityFrameworkCore.Migrations;

namespace Mav.API.Migrations
{
    public partial class UserAssessmentsUpdate3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "QuestionSet",
                table: "UserAssessmentSections",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "QuestionSetSize",
                table: "UserAssessmentSections",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QuestionSet",
                table: "UserAssessmentSections");

            migrationBuilder.DropColumn(
                name: "QuestionSetSize",
                table: "UserAssessmentSections");
        }
    }
}
