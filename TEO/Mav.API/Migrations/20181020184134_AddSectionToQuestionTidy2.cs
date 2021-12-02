using Microsoft.EntityFrameworkCore.Migrations;

namespace Mav.API.Migrations
{
    public partial class AddSectionToQuestionTidy2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionGroups_Sections_SectionID",
                table: "QuestionGroups");

            migrationBuilder.AlterColumn<int>(
                name: "SectionID",
                table: "QuestionGroups",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionGroups_Sections_SectionID",
                table: "QuestionGroups",
                column: "SectionID",
                principalTable: "Sections",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionGroups_Sections_SectionID",
                table: "QuestionGroups");

            migrationBuilder.AlterColumn<int>(
                name: "SectionID",
                table: "QuestionGroups",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionGroups_Sections_SectionID",
                table: "QuestionGroups",
                column: "SectionID",
                principalTable: "Sections",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
