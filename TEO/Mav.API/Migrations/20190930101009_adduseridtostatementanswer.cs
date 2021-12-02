using Microsoft.EntityFrameworkCore.Migrations;

namespace Mav.API.Migrations
{
    public partial class adduseridtostatementanswer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleAssessment_Assessment",
                table: "RoleAssessments");

            migrationBuilder.AddColumn<string>(
                name: "UserID",
                table: "UserStatementAnswers",
                maxLength: 450,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "RoleId",
                table: "RoleAssessments",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddForeignKey(
                name: "FK_RoleAssessments_Assessments_AssessmentId",
                table: "RoleAssessments",
                column: "AssessmentId",
                principalTable: "Assessments",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleAssessments_Assessments_AssessmentId",
                table: "RoleAssessments");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "UserStatementAnswers");

            migrationBuilder.AlterColumn<string>(
                name: "RoleId",
                table: "RoleAssessments",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_RoleAssessment_Assessment",
                table: "RoleAssessments",
                column: "AssessmentId",
                principalTable: "Assessments",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
