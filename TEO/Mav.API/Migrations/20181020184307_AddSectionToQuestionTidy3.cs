using Microsoft.EntityFrameworkCore.Migrations;

namespace Mav.API.Migrations
{
    public partial class AddSectionToQuestionTidy3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_QuestionGroups_GroupID",
                table: "Questions");

            migrationBuilder.AlterColumn<int>(
                name: "GroupID",
                table: "Questions",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_QuestionGroups_GroupID",
                table: "Questions",
                column: "GroupID",
                principalTable: "QuestionGroups",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_QuestionGroups_GroupID",
                table: "Questions");

            migrationBuilder.AlterColumn<int>(
                name: "GroupID",
                table: "Questions",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_QuestionGroups_GroupID",
                table: "Questions",
                column: "GroupID",
                principalTable: "QuestionGroups",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
