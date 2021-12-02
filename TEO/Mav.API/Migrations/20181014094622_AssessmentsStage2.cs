using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Mav.API.Migrations
{
    public partial class AssessmentsStage2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserAssessments",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AssessmentID = table.Column<int>(nullable: false),
                    UserID = table.Column<string>(maxLength: 450, nullable: false),
                    YearID = table.Column<int>(nullable: false),
                    StartedOn = table.Column<DateTime>(nullable: false),
                    SubmittedOn = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAssessments", x => x.ID);
                    table.ForeignKey(
                        name: "FK_UserAssessments_Assessments_AssessmentID",
                        column: x => x.AssessmentID,
                        principalTable: "Assessments",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserAssessmentSections",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserAssessmentID = table.Column<int>(nullable: false),
                    StartedOn = table.Column<DateTime>(nullable: false),
                    Score = table.Column<int>(nullable: true),
                    Passed = table.Column<bool>(nullable: true),
                    PassedOn = table.Column<DateTime>(nullable: true),
                    Attempts = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAssessmentSections", x => x.ID);
                    table.ForeignKey(
                        name: "FK_UserAssessmentSections_UserAssessments_UserAssessmentID",
                        column: x => x.UserAssessmentID,
                        principalTable: "UserAssessments",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserAssessmentSectionAnswers",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserAssessmentSectionID = table.Column<int>(nullable: false),
                    QuestionID = table.Column<int>(nullable: false),
                    AnswerID = table.Column<int>(nullable: true),
                    AnswerAsString = table.Column<string>(nullable: true),
                    Correct = table.Column<int>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAssessmentSectionAnswers", x => x.ID);
                    table.ForeignKey(
                        name: "FK_UserAssessmentSectionAnswers_UserAssessmentSections_UserAssessmentSectionID",
                        column: x => x.UserAssessmentSectionID,
                        principalTable: "UserAssessmentSections",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserAssessments_AssessmentID",
                table: "UserAssessments",
                column: "AssessmentID");

            migrationBuilder.CreateIndex(
                name: "IX_UserAssessmentSectionAnswers_UserAssessmentSectionID",
                table: "UserAssessmentSectionAnswers",
                column: "UserAssessmentSectionID");

            migrationBuilder.CreateIndex(
                name: "IX_UserAssessmentSections_UserAssessmentID",
                table: "UserAssessmentSections",
                column: "UserAssessmentID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserAssessmentSectionAnswers");

            migrationBuilder.DropTable(
                name: "UserAssessmentSections");

            migrationBuilder.DropTable(
                name: "UserAssessments");
        }
    }
}
