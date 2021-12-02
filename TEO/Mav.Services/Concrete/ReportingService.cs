using AutoMapper;
using System.Linq;
using Mav.Data.Entities;
using Mav.Data.Repositories;
using Mav.Models.ReportModels;
using Mav.Models.SearchModels;
using Mav.Services.Abstract;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Mav.Models.ViewModels;
using System.Text;
using Mav.Common.Services;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.Query;

namespace Mav.Services.Concrete
{
    public class ReportingService : IReportingService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ISectionService SectionService;
        private readonly IQuestionService QuestionService;
        private readonly IUserAssessmentAnswerService UserAssessmentAnswerService;
        private readonly ICentreService CentreService;
        private readonly IUserCentreService UserCentreService;
        private readonly ICentreSearchService CentreSearchService;
        private readonly IAssessmentService AssessmentService;

        public ReportingService(IUnitOfWork unitOfWork,
            IMapper mapper,
            ISectionService sectionService,
            IQuestionService questionService,
            IUserAssessmentAnswerService userAssessmentAnswerService,
            ICentreService centreService,
            IUserCentreService userCentreService,
            ICentreSearchService centreSearchService,
            IAssessmentService assessmentService
        )
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            SectionService = sectionService;
            QuestionService = questionService;
            UserAssessmentAnswerService = userAssessmentAnswerService;
            CentreService = centreService;
            UserCentreService = userCentreService;
            CentreSearchService = centreSearchService;
            AssessmentService = assessmentService;
        }

        // GetAssessmentSectionReport
        public async Task<IEnumerable<AssessmentSectionReportModel>> GetAssessmentSectionReport(AssessmentSectionSearchModel vm)
        { 
            var view = _unitOfWork.GetViewAsync<AssessmentSectionReportModel>();

            vm.SearchTerm = vm.SearchTerm?.ToLower() ?? "";

            Expression<Func<AssessmentSectionReportModel, bool>> whereExpr = x => x.AssessmentID == vm.AssessmentID && (vm.SearchTerm == "" || (x.Title.ToLower().Contains(vm.SearchTerm)));

            Func<IQueryable<AssessmentSectionReportModel>, IOrderedQueryable<AssessmentSectionReportModel>> orderExpr = query => query.OrderBy(x => x.AssessmentID);
            if(vm.OrderID == 1)
            {
                orderExpr = query => query.OrderBy(y => y.Number);
            }
            if(vm.OrderID == 2)
            {
                orderExpr = query => query.OrderBy(y => y.Attempts);
            }
            else if(vm.OrderID == 3)
            {
                orderExpr = query => query.OrderByDescending(y => y.Attempts);
            }

            var items = await view.GetAsync(whereExpr,
                orderExpr,
                true);

            if (items == null)
            {
                return null;
            }
            else
            {
                return items;
            }
        }

        // GetSectionReport
        public async Task<IEnumerable<SectionReportModel>> GetSectionReport(SectionSearchModel vm)
        {
            var view = _unitOfWork.GetViewAsync<SectionReportModel>();
            var v = await view.GetAsync(
                predicate: x => x.SectionId == vm.SectionID);

            if (v == null)
            {
                return null;
            }
            else
            {
                return v;
            }
        }

        // GetCentreReport
        public async Task<CentreReportModel> GetCentreReport(CentreSearchModel vm)
        {
            var view = _unitOfWork.GetViewAsync<CentreReportModel>();
            var v = await view.SingleAsync(
                predicate: x => x.ID == vm.CentreId);

            if (v == null)
            {
                return null;
            }
            else
            {
                return v;
            }
        }

        public async Task<IEnumerable<CentreReportModel>> GetCentreReportsAll(CentreSearchModel vm)
        {
            var view = _unitOfWork.GetViewAsync<CentreReportModel>();

            vm.SearchTerm = vm.SearchTerm?.ToLower() ?? "";

            Expression<Func<CentreReportModel, bool>> whereExpr = x => (vm.SearchTerm == "") || (
                        (vm.SearchField.Equals("Name") && x.Name.ToLower().Contains(vm.SearchTerm))
                        ||
                        (vm.SearchField.Equals("Number") && x.Number.ToLower().Contains(vm.SearchTerm)));

            Func<IQueryable<CentreReportModel>, IOrderedQueryable<CentreReportModel>> orderExpr = null;
            if (vm.OrderId == 1)
            {
                orderExpr = query => query.OrderBy(y => y.Name);
            }

            var items = await view.GetAsync(whereExpr,
                orderExpr,
                true);

            if(items == null)
            {
                return null;
            }
            else
            {
                return items;
            }
        }

        // Export a csv of the centre report
        public async Task<CsvModel> ExportCentreReports(CentreSearchModel vm)
        {
            // Get results
            var results = await GetCentreReportsAll(vm);

            // Empty list to convert to CSV
            List<object> centreReportExport = new List<CentreReportModel>().ToList<object>();


            // Column Headers
            string[] columnHeadings = new string[]
            {
                "Centre Name",
                "Centre Number",
                "Count Of Users",
                "Count of Assessments Started",
                "Count of Assessments Not Started",
                "Count of Assessments Completed",
                "Count of Minimum Score Gained",
                "Count of Minimum Score Not Gained"
            };

            // Insert the file contents
            foreach(var item in results)
            {
                string[] r = new string[]
                {
                    item.Name.ToString(),
                    item.Number.ToString(),
                    item.UsersCount.ToString(),
                    item.AssStartedCount.ToString(),
                    item.AssNotStartedCount.ToString(),
                    item.AssCompletedCount.ToString(),
                    item.MinScoreGainedCount.ToString(),
                    item.MinScoreNotGainedCount.ToString()
                };
                centreReportExport.Add(r);
            }

            // Insert column names
            centreReportExport.Insert(0, columnHeadings);

            // Build the CSV
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < centreReportExport.Count; i++)
            {
                string[] export = (string[])centreReportExport[i];
                for (int j = 0; j < export.Length; j++)
                {
                    // Append data with separator
                    sb.Append(export[j] + ',');
                }

                // Append new line character
                sb.Append("\r\n");
            }

            return new CsvModel
            {
                FileName = "Centre Reports " + DateTime.UtcNow.Date.ToString("dd-MM-yyyy") + ".csv",
                Csv = sb.ToString()
            };
        }

        public async Task<CsvModel> ExportAssessmentReports(AssessmentSearchModel vm)
        {
            var results = await AssessmentService.GetAllAssessmentsEnum<AssessmentListingModel>(vm);

            // Empty list to convert to CSV
            List<object> assessmentReportExport = new List<AssessmentListingModel>().ToList<object>();

            // Column Headings
            string[] columnHeadings = new string[]
            {
                "Assessment Title",
                "Academic Year",
                "Active",
                "Created On"
            };

            // Insert the file contents
            foreach(var item in results)
            {
                string[] r = new string[]
                {
                    item.Title.ToString(),
                    item.YearID.ToString(),
                    item.Published.ToString(),
                    item.CreatedOn.ToString()
                };
                assessmentReportExport.Add(r);
            }

            // Insert column names
            assessmentReportExport.Insert(0, columnHeadings);

            // Build the CSV
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < assessmentReportExport.Count; i++)
            {
                string[] export = (string[])assessmentReportExport[i];
                for (int j = 0; j < export.Length; j++)
                {
                    // Append data with separator
                    sb.Append(export[j] + ',');
                }

                // Append new line character
                sb.Append("\r\n");
            }

            return new CsvModel
            {
                FileName = "Assessment Reports " + DateTime.UtcNow.Date.ToString("dd-MM-yyyy") + ".csv",
                Csv = sb.ToString()
            };
        }

        public async Task<CsvModel> ExportAssessmentSectionReports(AssessmentSectionSearchModel vm)
        {
            var assessment = await AssessmentService.GetAssessmentById<AssessmentListingModel>(vm.AssessmentID);

            if (assessment == null)
            {
                return null;
            }

            var results = await GetAssessmentSectionReport(vm);

            // Empty list to convert to CSV
            List<object> assessmentSectionReportExport = new List<AssessmentSectionReportModel>().ToList<object>();

            // Column Headings
            string[] columnHeadings = new string[]
            {
                "Number",
                "Title",
                "Attempts"
            };

            // Insert the file contents
            foreach (var item in results)
            {
                string[] r = new string[]
                {
                    item.Number.ToString(),
                    item.Title.ToString(),
                    item.Attempts.ToString()
                };
                assessmentSectionReportExport.Add(r);
            }

            // Insert column names
            assessmentSectionReportExport.Insert(0, columnHeadings);

            // Build the CSV
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < assessmentSectionReportExport.Count; i++)
            {
                string[] export = (string[])assessmentSectionReportExport[i];
                for (int j = 0; j < export.Length; j++)
                {
                    // Append data with separator
                    sb.Append(export[j] + ',');
                }

                // Append new line character
                sb.Append("\r\n");
            }
            return new CsvModel
            {
                FileName = assessment.Title +" Assessment Section Report: " + DateTime.UtcNow.Date.ToString("dd-MM-yyyy") + ".csv",
                Csv = sb.ToString()
            };
        }

        public async Task<CsvModel> ExportSectionReports(SectionSearchModel vm)
        {
            var section = await SectionService.GetSectionById<SectionListingModel>(vm.SectionID);
            var sectionTitle = "";

            if(section == null)
            {
                sectionTitle = "Invalid Section";
            }
            else
            {
                sectionTitle = section.Title;
            }

            var results = await GetSectionReport(vm);

            // Empty list to convert to CSV
            List<object> sectionReportExport = new List<SectionReportModel>().ToList<object>();

            // Column Headings
            string[] columnHeadings = new string[]
            {
                "Question Number",
                "Question Title",
                "Count of Correct Answers",
                "Count of Incorrect Answers"
            };

            // Insert the file contents
            foreach (var item in results)
            {
                string[] r = new string[]
                {
                    item.Number.ToString(),
                    item.Title.ToString(),
                    item.CorrectAnswers.ToString(),
                    item.IncorrectAnswers.ToString()
                };
                sectionReportExport.Add(r);
            }

            // Insert column names
            sectionReportExport.Insert(0, columnHeadings);

            // Build the CSV
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < sectionReportExport.Count; i++)
            {
                string[] export = (string[])sectionReportExport[i];
                for (int j = 0; j < export.Length; j++)
                {
                    // Append data with separator
                    sb.Append(export[j] + ',');
                }

                // Append new line character
                sb.Append("\r\n");
            }

            return new CsvModel
            {
                FileName = sectionTitle + " Section Report: " + DateTime.UtcNow.Date.ToString("dd-MM-yyyy") + ".csv",
                Csv = sb.ToString()
            };
        }
    }
}
