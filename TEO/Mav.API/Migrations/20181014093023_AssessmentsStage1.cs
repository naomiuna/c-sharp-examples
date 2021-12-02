using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Mav.API.Migrations
{
    public partial class AssessmentsStage1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Assessments",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CentreID = table.Column<int>(nullable: false),
                    YearID = table.Column<int>(nullable: false),
                    Title = table.Column<string>(maxLength: 400, nullable: false),
                    Guide = table.Column<string>(nullable: true),
                    Objectives = table.Column<string>(nullable: true),
                    MinScore = table.Column<int>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: true),
                    CreatedBy = table.Column<string>(maxLength: 450, nullable: true),
                    Active = table.Column<bool>(nullable: false),
                    Published = table.Column<bool>(nullable: false),
                    PublishedOn = table.Column<DateTime>(nullable: true),
                    Deleted = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessments", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Assessments_Centres_CentreID",
                        column: x => x.CentreID,
                        principalTable: "Centres",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Certificates",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AssessmentID = table.Column<int>(nullable: false),
                    Active = table.Column<bool>(nullable: false),
                    Deleted = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Certificates", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Certificates_Assessments_AssessmentID",
                        column: x => x.AssessmentID,
                        principalTable: "Assessments",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Sections",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AssessmentID = table.Column<int>(nullable: false),
                    Number = table.Column<int>(nullable: false),
                    Title = table.Column<string>(maxLength: 400, nullable: false),
                    Information = table.Column<string>(nullable: true),
                    Reference = table.Column<string>(nullable: true),
                    ImageUri = table.Column<string>(nullable: true),
                    IsRandom = table.Column<bool>(nullable: false),
                    Quantity = table.Column<int>(nullable: true),
                    Deleted = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sections", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Sections_Assessments_AssessmentID",
                        column: x => x.AssessmentID,
                        principalTable: "Assessments",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuestionGroups",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    SectionID = table.Column<int>(nullable: false),
                    OrderId = table.Column<int>(nullable: false),
                    Title = table.Column<string>(maxLength: 400, nullable: false),
                    Deleted = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionGroups", x => x.ID);
                    table.ForeignKey(
                        name: "FK_QuestionGroups_Sections_SectionID",
                        column: x => x.SectionID,
                        principalTable: "Sections",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    GroupID = table.Column<int>(nullable: false),
                    Title = table.Column<string>(maxLength: 500, nullable: false),
                    HintText = table.Column<string>(maxLength: 500, nullable: false),
                    Number = table.Column<int>(nullable: false),
                    TypeID = table.Column<int>(nullable: false),
                    Selections = table.Column<int>(nullable: true),
                    Active = table.Column<bool>(nullable: false),
                    Deleted = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Questions_QuestionGroups_GroupID",
                        column: x => x.GroupID,
                        principalTable: "QuestionGroups",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Answers",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    QuestionID = table.Column<int>(nullable: false),
                    Title = table.Column<string>(maxLength: 500, nullable: false),
                    IsCorrect = table.Column<bool>(nullable: false),
                    OrderID = table.Column<int>(nullable: true),
                    Active = table.Column<bool>(nullable: false),
                    Deleted = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answers", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Answers_Questions_QuestionID",
                        column: x => x.QuestionID,
                        principalTable: "Questions",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Answers_QuestionID",
                table: "Answers",
                column: "QuestionID");

            migrationBuilder.CreateIndex(
                name: "IX_Assessments_CentreID",
                table: "Assessments",
                column: "CentreID");

            migrationBuilder.CreateIndex(
                name: "IX_Certificates_AssessmentID",
                table: "Certificates",
                column: "AssessmentID");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionGroups_SectionID",
                table: "QuestionGroups",
                column: "SectionID");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_GroupID",
                table: "Questions",
                column: "GroupID");

            migrationBuilder.CreateIndex(
                name: "IX_Sections_AssessmentID",
                table: "Sections",
                column: "AssessmentID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Answers");

            migrationBuilder.DropTable(
                name: "Certificates");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "QuestionGroups");

            migrationBuilder.DropTable(
                name: "Sections");

            migrationBuilder.DropTable(
                name: "Assessments");
        }
    }
}
