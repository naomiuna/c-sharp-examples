using AutoMapper;
using Mav.Data.Entities;
using Mav.Data.Repositories;
using Mav.Models.ReportModels;
using Mav.Models.SearchModels;
using Mav.Models.ViewModels;
using Mav.Services.Abstract;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mav.Services.Concrete
{
    public class UserCentreService : IUserCentreService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserCentreService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<T>> GetUserCentres<T>(int centreId)
        {
            var centreRepo = _unitOfWork.GetRepositoryAsync<UserCentre>();
            var r = await centreRepo.GetAsync(
                predicate: x => x.CentreID == centreId,
                include: source => source.Include(x => x.Centre)
            );

            var mR = _mapper.Map<IEnumerable<T>>(r);
            return mR;
        }

        public async Task<int> GetUserCountForCentreById(int centreId)
        {
            var centreRepo = _unitOfWork.GetRepositoryAsync<UserCentre>();
            var r = await centreRepo.GetAsync(
                predicate: x => x.CentreID == centreId
            );

            return r.ToList().Count();
        }

        public async Task<List<UserAssessmentViewModel>> GetUserAssessmentCount(List<UserCentreViewModel> users)
        {
            var userAssRepo = _unitOfWork.GetRepositoryAsync<UserAssessment>();
            var r = await userAssRepo.GetAsync(predicate: null);
            List<UserAssessment> userAssessments = new List<UserAssessment>();

            foreach(var item in users)
            {
                var matches = r.Where(x => x.UserID == item.UserID);
                userAssessments.AddRange(matches);
            }

            var mR = _mapper.Map<List<UserAssessmentViewModel>>(userAssessments);
            return mR;
        }

        public async Task<List<UserAssessmentSectionViewModel>> GetUserScoreCount(List<UserAssessmentViewModel> userAssessments)
        {
            var userAssSecRepo = _unitOfWork.GetRepositoryAsync<UserAssessmentSection>();
            var r1 = await userAssSecRepo.GetAsync(predicate: null);
            List<UserAssessmentSection> userSections = new List<UserAssessmentSection>();

            foreach (var item in userAssessments)
            {
                var matches = r1.Where(x => x.UserAssessmentID == item.ID);
                userSections.AddRange(matches);
            }

            var mR = _mapper.Map<List<UserAssessmentSectionViewModel>>(userSections);
            return mR;
        }
    }
}
