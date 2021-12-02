﻿// <auto-generated />
using System;
using Mav.API.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Mav.API.Migrations
{
    [DbContext(typeof(MavDbContext))]
    [Migration("20200612094857_AddedTimerTable")]
    partial class AddedTimerTable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.14-servicing-32113")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Mav.Data.Entities.Answer", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Active");

                    b.Property<bool?>("Deleted");

                    b.Property<bool>("IsCorrect");

                    b.Property<int?>("OrderID");

                    b.Property<int>("QuestionID");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(500);

                    b.HasKey("ID");

                    b.HasIndex("QuestionID");

                    b.ToTable("Answers");
                });

            modelBuilder.Entity("Mav.Data.Entities.Assessment", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Active");

                    b.Property<int?>("CentreID");

                    b.Property<string>("CreatedBy")
                        .HasMaxLength(450);

                    b.Property<DateTime?>("CreatedOn");

                    b.Property<bool?>("Deleted");

                    b.Property<bool>("EoQualification");

                    b.Property<string>("Guide");

                    b.Property<int>("MinScore");

                    b.Property<string>("Objectives");

                    b.Property<bool>("Published");

                    b.Property<DateTime?>("PublishedOn");

                    b.Property<int?>("StatementID");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(400);

                    b.Property<int>("YearID");

                    b.HasKey("ID");

                    b.HasIndex("CentreID");

                    b.HasIndex("StatementID");

                    b.ToTable("Assessments");
                });

            modelBuilder.Entity("Mav.Data.Entities.AssessmentGrade", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AssessmentID");

                    b.Property<int>("DistinctionScore");

                    b.Property<int>("MeritScore");

                    b.Property<int>("PassScore");

                    b.HasKey("ID");

                    b.HasIndex("AssessmentID")
                        .IsUnique();

                    b.ToTable("AssessmentGrade");
                });

            modelBuilder.Entity("Mav.Data.Entities.AssessmentYear", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool?>("Deleted");

                    b.Property<string>("Display")
                        .IsRequired()
                        .HasMaxLength(10);

                    b.Property<int>("YearID");

                    b.HasKey("ID");

                    b.ToTable("AssessmentYears");
                });

            modelBuilder.Entity("Mav.Data.Entities.Centre", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CreatedBy");

                    b.Property<DateTime?>("CreatedOn");

                    b.Property<bool?>("Deleted");

                    b.Property<bool>("Enabled");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<string>("Number")
                        .HasMaxLength(100);

                    b.Property<int>("TypeID");

                    b.HasKey("ID");

                    b.HasIndex("TypeID");

                    b.ToTable("Centres");
                });

            modelBuilder.Entity("Mav.Data.Entities.CentreType", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasMaxLength(10);

                    b.Property<bool?>("Deleted");

                    b.Property<int?>("MaxInvigilators");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.HasKey("ID");

                    b.ToTable("CentreTypes");
                });

            modelBuilder.Entity("Mav.Data.Entities.Certificate", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Active");

                    b.Property<int>("AssessmentID");

                    b.Property<bool?>("Deleted");

                    b.HasKey("ID");

                    b.HasIndex("AssessmentID");

                    b.ToTable("Certificates");
                });

            modelBuilder.Entity("Mav.Data.Entities.Licence", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AcademicYear");

                    b.Property<double>("Cost");

                    b.Property<bool?>("Deleted");

                    b.Property<bool>("Enabled");

                    b.Property<int>("MaxCentres");

                    b.Property<int>("OrganisationID");

                    b.Property<bool>("Paid");

                    b.HasKey("ID");

                    b.HasIndex("OrganisationID");

                    b.ToTable("Licences");
                });

            modelBuilder.Entity("Mav.Data.Entities.Organisation", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AddressLine1")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<string>("AddressLine2");

                    b.Property<string>("AddressLine3");

                    b.Property<int>("CentreLimit");

                    b.Property<bool?>("Deleted");

                    b.Property<bool>("Enabled");

                    b.Property<string>("LeadFinancialEmail")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<string>("LeadFinancialName")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<string>("LeadFinancialNumber")
                        .IsRequired()
                        .HasMaxLength(12);

                    b.Property<int?>("LicenceID");

                    b.Property<string>("MainContactEmail")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<string>("MainContactName")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<string>("OrganisationName")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<int>("TypeID");

                    b.HasKey("ID");

                    b.HasIndex("LicenceID");

                    b.HasIndex("TypeID");

                    b.ToTable("Organisations");
                });

            modelBuilder.Entity("Mav.Data.Entities.OrganisationType", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CentreLimit");

                    b.Property<bool?>("Deleted");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("ID");

                    b.ToTable("OrganisationTypes");
                });

            modelBuilder.Entity("Mav.Data.Entities.Page", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Deleted");

                    b.Property<int>("NavigationTypeID");

                    b.Property<int?>("OrderID");

                    b.Property<int?>("ParentID");

                    b.Property<bool>("Published");

                    b.Property<int>("TypeID");

                    b.HasKey("ID");

                    b.HasIndex("ParentID");

                    b.ToTable("Pages");
                });

            modelBuilder.Entity("Mav.Data.Entities.PageInfo", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Content");

                    b.Property<DateTime>("CreatedOn");

                    b.Property<DateTime>("ModifiedOn");

                    b.Property<int>("PageID");

                    b.Property<string>("Title")
                        .HasMaxLength(400);

                    b.Property<string>("Url")
                        .HasMaxLength(400);

                    b.HasKey("ID");

                    b.HasIndex("PageID");

                    b.ToTable("PageInfos");
                });

            modelBuilder.Entity("Mav.Data.Entities.Question", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Active");

                    b.Property<bool?>("Deleted");

                    b.Property<int?>("GroupID");

                    b.Property<string>("HintText")
                        .IsRequired()
                        .HasMaxLength(500);

                    b.Property<int>("Number");

                    b.Property<int?>("SectionID");

                    b.Property<int?>("Selections");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(500);

                    b.Property<int>("TypeID");

                    b.Property<int?>("YesNoCorrectID");

                    b.HasKey("ID");

                    b.HasIndex("GroupID");

                    b.HasIndex("SectionID");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("Mav.Data.Entities.QuestionGroup", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool?>("Deleted");

                    b.Property<int>("OrderId");

                    b.Property<int?>("SectionID");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(400);

                    b.HasKey("ID");

                    b.HasIndex("SectionID");

                    b.ToTable("QuestionGroups");
                });

            modelBuilder.Entity("Mav.Data.Entities.RoleAssessment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AssessmentId");

                    b.Property<string>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("AssessmentId")
                        .IsUnique();

                    b.ToTable("RoleAssessments");
                });

            modelBuilder.Entity("Mav.Data.Entities.Section", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AssessmentID");

                    b.Property<bool?>("Deleted");

                    b.Property<string>("ImageUri");

                    b.Property<string>("Information");

                    b.Property<bool?>("IsEoQualification");

                    b.Property<bool>("IsRandom");

                    b.Property<int?>("MaxAttempts");

                    b.Property<int>("Number");

                    b.Property<int?>("Quantity");

                    b.Property<string>("Reference");

                    b.Property<int?>("StatementID");

                    b.Property<bool?>("TimedSection");

                    b.Property<int?>("TimerID");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(400);

                    b.HasKey("ID");

                    b.HasIndex("AssessmentID");

                    b.HasIndex("StatementID");

                    b.HasIndex("TimerID");

                    b.ToTable("Sections");
                });

            modelBuilder.Entity("Mav.Data.Entities.Setting", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DataType")
                        .IsRequired()
                        .HasMaxLength(35);

                    b.Property<string>("Description")
                        .HasMaxLength(200);

                    b.Property<string>("Entry")
                        .IsRequired()
                        .HasMaxLength(400);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.ToTable("Settings");
                });

            modelBuilder.Entity("Mav.Data.Entities.Statement", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasMaxLength(4000);

                    b.Property<bool?>("Deleted");

                    b.Property<int>("Number");

                    b.HasKey("ID");

                    b.ToTable("Statements");
                });

            modelBuilder.Entity("Mav.Data.Entities.StatementQuestion", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Active");

                    b.Property<bool?>("Deleted");

                    b.Property<int>("StatementID");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(500);

                    b.HasKey("ID");

                    b.HasIndex("StatementID");

                    b.ToTable("StatementQuestions");
                });

            modelBuilder.Entity("Mav.Data.Entities.Timer", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool?>("Deleted");

                    b.Property<int>("SectionID");

                    b.Property<double>("TimeLimit");

                    b.HasKey("ID");

                    b.ToTable("Timer");
                });

            modelBuilder.Entity("Mav.Data.Entities.UserAssessment", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AssessmentID");

                    b.Property<Guid?>("KeyID");

                    b.Property<DateTime>("StartedOn");

                    b.Property<DateTime?>("SubmittedOn");

                    b.Property<string>("UserID")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.Property<int>("YearID");

                    b.HasKey("ID");

                    b.HasIndex("AssessmentID");

                    b.ToTable("UserAssessments");
                });

            modelBuilder.Entity("Mav.Data.Entities.UserAssessmentSection", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Attempts");

                    b.Property<int?>("MaxAttempts");

                    b.Property<bool?>("Passed");

                    b.Property<DateTime?>("PassedOn");

                    b.Property<string>("QuestionSet");

                    b.Property<int?>("QuestionSetSize");

                    b.Property<int?>("Score");

                    b.Property<int?>("SectionID");

                    b.Property<DateTime>("StartedOn");

                    b.Property<int?>("StatementID");

                    b.Property<int>("UserAssessmentID");

                    b.HasKey("ID");

                    b.HasIndex("SectionID");

                    b.HasIndex("StatementID");

                    b.HasIndex("UserAssessmentID");

                    b.ToTable("UserAssessmentSections");
                });

            modelBuilder.Entity("Mav.Data.Entities.UserAssessmentSectionAnswer", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AnswerAsString");

                    b.Property<int?>("AnswerID");

                    b.Property<int>("Correct");

                    b.Property<DateTime?>("ModifiedOn");

                    b.Property<int>("QuestionID");

                    b.Property<int>("UserAssessmentSectionID");

                    b.HasKey("ID");

                    b.HasIndex("UserAssessmentSectionID");

                    b.ToTable("UserAssessmentSectionAnswers");
                });

            modelBuilder.Entity("Mav.Data.Entities.UserCentre", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CentreID");

                    b.Property<string>("UserID")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("ID");

                    b.HasIndex("CentreID");

                    b.ToTable("UserCentres");
                });

            modelBuilder.Entity("Mav.Data.Entities.UserStatementAnswer", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Answer");

                    b.Property<int>("QuestionID");

                    b.Property<int>("StatementID");

                    b.Property<string>("UserID")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("ID");

                    b.HasIndex("QuestionID");

                    b.HasIndex("StatementID");

                    b.ToTable("UserStatementAnswers");
                });

            modelBuilder.Entity("Mav.Data.Entities.Answer", b =>
                {
                    b.HasOne("Mav.Data.Entities.Question", "Question")
                        .WithMany("Answers")
                        .HasForeignKey("QuestionID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Mav.Data.Entities.Assessment", b =>
                {
                    b.HasOne("Mav.Data.Entities.Centre", "Centre")
                        .WithMany("Assessments")
                        .HasForeignKey("CentreID");

                    b.HasOne("Mav.Data.Entities.Statement", "Statement")
                        .WithMany()
                        .HasForeignKey("StatementID");
                });

            modelBuilder.Entity("Mav.Data.Entities.AssessmentGrade", b =>
                {
                    b.HasOne("Mav.Data.Entities.Assessment", "Assessment")
                        .WithOne("AssessmentGrade")
                        .HasForeignKey("Mav.Data.Entities.AssessmentGrade", "AssessmentID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Mav.Data.Entities.Centre", b =>
                {
                    b.HasOne("Mav.Data.Entities.CentreType", "CentreType")
                        .WithMany()
                        .HasForeignKey("TypeID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Mav.Data.Entities.Certificate", b =>
                {
                    b.HasOne("Mav.Data.Entities.Assessment", "Assessment")
                        .WithMany()
                        .HasForeignKey("AssessmentID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Mav.Data.Entities.Licence", b =>
                {
                    b.HasOne("Mav.Data.Entities.Organisation", "Organisation")
                        .WithMany()
                        .HasForeignKey("OrganisationID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Mav.Data.Entities.Organisation", b =>
                {
                    b.HasOne("Mav.Data.Entities.Licence", "Licence")
                        .WithMany()
                        .HasForeignKey("LicenceID");

                    b.HasOne("Mav.Data.Entities.OrganisationType", "OrganisationType")
                        .WithMany()
                        .HasForeignKey("TypeID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Mav.Data.Entities.Page", b =>
                {
                    b.HasOne("Mav.Data.Entities.Page", "Parent")
                        .WithMany()
                        .HasForeignKey("ParentID");
                });

            modelBuilder.Entity("Mav.Data.Entities.PageInfo", b =>
                {
                    b.HasOne("Mav.Data.Entities.Page", "Page")
                        .WithMany("PageInfos")
                        .HasForeignKey("PageID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Mav.Data.Entities.Question", b =>
                {
                    b.HasOne("Mav.Data.Entities.QuestionGroup", "QuestionGroup")
                        .WithMany("Questions")
                        .HasForeignKey("GroupID");

                    b.HasOne("Mav.Data.Entities.Section", "Section")
                        .WithMany("Questions")
                        .HasForeignKey("SectionID");
                });

            modelBuilder.Entity("Mav.Data.Entities.QuestionGroup", b =>
                {
                    b.HasOne("Mav.Data.Entities.Section", "Section")
                        .WithMany("QuestionGroups")
                        .HasForeignKey("SectionID");
                });

            modelBuilder.Entity("Mav.Data.Entities.RoleAssessment", b =>
                {
                    b.HasOne("Mav.Data.Entities.Assessment", "Assessment")
                        .WithOne("Role")
                        .HasForeignKey("Mav.Data.Entities.RoleAssessment", "AssessmentId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Mav.Data.Entities.Section", b =>
                {
                    b.HasOne("Mav.Data.Entities.Assessment", "Assessment")
                        .WithMany("Sections")
                        .HasForeignKey("AssessmentID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Mav.Data.Entities.Statement", "Statement")
                        .WithMany()
                        .HasForeignKey("StatementID");

                    b.HasOne("Mav.Data.Entities.Timer", "Timer")
                        .WithMany()
                        .HasForeignKey("TimerID");
                });

            modelBuilder.Entity("Mav.Data.Entities.StatementQuestion", b =>
                {
                    b.HasOne("Mav.Data.Entities.Statement", "Statement")
                        .WithMany("Questions")
                        .HasForeignKey("StatementID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Mav.Data.Entities.UserAssessment", b =>
                {
                    b.HasOne("Mav.Data.Entities.Assessment", "Assessment")
                        .WithMany("UserAssessments")
                        .HasForeignKey("AssessmentID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Mav.Data.Entities.UserAssessmentSection", b =>
                {
                    b.HasOne("Mav.Data.Entities.Section", "Section")
                        .WithMany("UserAssessmentSections")
                        .HasForeignKey("SectionID");

                    b.HasOne("Mav.Data.Entities.Statement", "Statement")
                        .WithMany()
                        .HasForeignKey("StatementID");

                    b.HasOne("Mav.Data.Entities.UserAssessment", "UserAssessment")
                        .WithMany("UserAssessmentSections")
                        .HasForeignKey("UserAssessmentID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Mav.Data.Entities.UserAssessmentSectionAnswer", b =>
                {
                    b.HasOne("Mav.Data.Entities.UserAssessmentSection", "UserAssessmentSection")
                        .WithMany("UserAssessmentSectionAnswers")
                        .HasForeignKey("UserAssessmentSectionID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Mav.Data.Entities.UserCentre", b =>
                {
                    b.HasOne("Mav.Data.Entities.Centre", "Centre")
                        .WithMany()
                        .HasForeignKey("CentreID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Mav.Data.Entities.UserStatementAnswer", b =>
                {
                    b.HasOne("Mav.Data.Entities.StatementQuestion", "StatementQuestion")
                        .WithMany()
                        .HasForeignKey("QuestionID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Mav.Data.Entities.Statement", "Statement")
                        .WithMany()
                        .HasForeignKey("StatementID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
