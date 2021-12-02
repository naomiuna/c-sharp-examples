using Microsoft.EntityFrameworkCore.Migrations;

namespace Mav.API.Migrations
{
    public partial class AssessmentsStage3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assessments_Centres_CentreID",
                table: "Assessments");

            migrationBuilder.AlterColumn<int>(
                name: "CentreID",
                table: "Assessments",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Assessments_Centres_CentreID",
                table: "Assessments",
                column: "CentreID",
                principalTable: "Centres",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assessments_Centres_CentreID",
                table: "Assessments");

            migrationBuilder.AlterColumn<int>(
                name: "CentreID",
                table: "Assessments",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Assessments_Centres_CentreID",
                table: "Assessments",
                column: "CentreID",
                principalTable: "Centres",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
