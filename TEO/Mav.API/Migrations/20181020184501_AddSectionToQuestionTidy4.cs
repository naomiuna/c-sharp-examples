using Microsoft.EntityFrameworkCore.Migrations;

namespace Mav.API.Migrations
{
    public partial class AddSectionToQuestionTidy4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SectionID",
                table: "Questions",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Questions_SectionID",
                table: "Questions",
                column: "SectionID");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Sections_SectionID",
                table: "Questions",
                column: "SectionID",
                principalTable: "Sections",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Sections_SectionID",
                table: "Questions");

            migrationBuilder.DropIndex(
                name: "IX_Questions_SectionID",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "SectionID",
                table: "Questions");
        }
    }
}
