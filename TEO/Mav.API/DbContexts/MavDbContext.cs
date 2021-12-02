using Mav.Data.Entities;
using Mav.Models.ReportModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Mav.API.DbContexts
{
    public class MavDbContext : DbContext
    {
        public MavDbContext(DbContextOptions<MavDbContext> options)
           : base(options)
        {
        }

        public DbSet<Setting> Settings { get; set; }
        public DbSet<CentreType> CentreTypes { get; set; }
        public DbSet<Centre> Centres { get; set; }
        public DbSet<UserCentre> UserCentres { get; set; }
        public DbSet<Page> Pages { get; set; }
        public DbSet<PageInfo> PageInfos { get; set; }
        public DbSet<Assessment> Assessments { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<QuestionGroup> QuestionGroups { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Certificate> Certificates { get; set; }
        public DbSet<UserAssessment> UserAssessments { get; set; }
        public DbSet<UserAssessmentSection> UserAssessmentSections { get; set; }
        public DbSet<UserAssessmentSectionAnswer> UserAssessmentSectionAnswers { get; set; }
        public DbSet<AssessmentYear> AssessmentYears { get; set; }
        public DbSet<RoleAssessment> RoleAssessments { get; set; }

        public DbSet<Statement> Statements { get; set; }
        public DbSet<StatementQuestion> StatementQuestions { get; set; }

        public DbSet<UserStatementAnswer> UserStatementAnswers { get; set; }

        public DbSet<Organisation> Organisations { get; set; }

        public DbSet<OrganisationType> OrganisationTypes { get; set; }

        public DbSet<Licence> Licences { get; set; }

        // Queries
        public DbQuery<CentreReportModel> CentreReportModels { get; set; }
        public DbQuery<AssessmentSectionReportModel> AssessmentReportModels { get; set; }
        public DbQuery<SectionReportModel> SectionReportModels { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Query<CentreReportModel>().ToView("View_ExamCentreReportAll");
            builder.Query<AssessmentSectionReportModel>().ToView("View_ExamAssessmentReportAll");
            builder.Query<SectionReportModel>().ToView("View_ExamSectionReportAll");

            //builder.Entity<RoleAssessment>(entity =>
            //{
            //    entity.Property(e => e.Id).HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);
            //    entity.Property(e => e.RoleId).IsRequired();

            //    //entity.HasOne(e => e.Assessment)
            //    //.WithOne(p => p.Role)
            //    //.HasForeignKey<RoleAssessment>(fk => fk.AssessmentId)
            //    //.HasConstraintName("FK_RoleAssessment_Assessment");


            //    //builder.Entity<Page>(b => {
            //    //    b.HasMany(x => x.PageInfos).WithOne().HasForeignKey(ur => ur.PageID).IsRequired();
            //    //});
            //});
        }            
    }
}
