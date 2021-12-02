using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Mav.API.Migrations
{
    public partial class UserStatements : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StatementID",
                table: "UserAssessmentSections",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StatementID",
                table: "Sections",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StatementID",
                table: "Assessments",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Statements",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Number = table.Column<int>(nullable: false),
                    Content = table.Column<string>(maxLength: 4000, nullable: false),
                    Deleted = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statements", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "StatementQuestions",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    StatementID = table.Column<int>(nullable: false),
                    Title = table.Column<string>(maxLength: 500, nullable: false),
                    Active = table.Column<bool>(nullable: false),
                    Deleted = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StatementQuestions", x => x.ID);
                    table.ForeignKey(
                        name: "FK_StatementQuestions_Statements_StatementID",
                        column: x => x.StatementID,
                        principalTable: "Statements",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserStatementAnswers",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    StatementID = table.Column<int>(nullable: false),
                    QuestionID = table.Column<int>(nullable: false),
                    Answer = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserStatementAnswers", x => x.ID);
                    table.ForeignKey(
                        name: "FK_UserStatementAnswers_StatementQuestions_QuestionID",
                        column: x => x.QuestionID,
                        principalTable: "StatementQuestions",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserStatementAnswers_Statements_StatementID",
                        column: x => x.StatementID,
                        principalTable: "Statements",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserAssessmentSections_StatementID",
                table: "UserAssessmentSections",
                column: "StatementID");

            migrationBuilder.CreateIndex(
                name: "IX_Sections_StatementID",
                table: "Sections",
                column: "StatementID");

            migrationBuilder.CreateIndex(
                name: "IX_Assessments_StatementID",
                table: "Assessments",
                column: "StatementID");

            migrationBuilder.CreateIndex(
                name: "IX_StatementQuestions_StatementID",
                table: "StatementQuestions",
                column: "StatementID");

            migrationBuilder.CreateIndex(
                name: "IX_UserStatementAnswers_QuestionID",
                table: "UserStatementAnswers",
                column: "QuestionID");

            migrationBuilder.CreateIndex(
                name: "IX_UserStatementAnswers_StatementID",
                table: "UserStatementAnswers",
                column: "StatementID");

            migrationBuilder.AddForeignKey(
                name: "FK_Assessments_Statements_StatementID",
                table: "Assessments",
                column: "StatementID",
                principalTable: "Statements",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Sections_Statements_StatementID",
                table: "Sections",
                column: "StatementID",
                principalTable: "Statements",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserAssessmentSections_Statements_StatementID",
                table: "UserAssessmentSections",
                column: "StatementID",
                principalTable: "Statements",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assessments_Statements_StatementID",
                table: "Assessments");

            migrationBuilder.DropForeignKey(
                name: "FK_Sections_Statements_StatementID",
                table: "Sections");

            migrationBuilder.DropForeignKey(
                name: "FK_UserAssessmentSections_Statements_StatementID",
                table: "UserAssessmentSections");

            migrationBuilder.DropTable(
                name: "UserStatementAnswers");

            migrationBuilder.DropTable(
                name: "StatementQuestions");

            migrationBuilder.DropTable(
                name: "Statements");

            migrationBuilder.DropIndex(
                name: "IX_UserAssessmentSections_StatementID",
                table: "UserAssessmentSections");

            migrationBuilder.DropIndex(
                name: "IX_Sections_StatementID",
                table: "Sections");

            migrationBuilder.DropIndex(
                name: "IX_Assessments_StatementID",
                table: "Assessments");

            migrationBuilder.DropColumn(
                name: "StatementID",
                table: "UserAssessmentSections");

            migrationBuilder.DropColumn(
                name: "StatementID",
                table: "Sections");

            migrationBuilder.DropColumn(
                name: "StatementID",
                table: "Assessments");
        }
    }
}
