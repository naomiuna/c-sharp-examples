using AutoMapper;
using Mav.Services.Mappings;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Mav.Services.Test.Mappings
{
    [TestClass]
    public class ViewModelTests
    {
        private MapperConfiguration _mapperConfiguration;

        [TestInitialize]
        public void Init()
        {
            _mapperConfiguration = new MapperConfiguration(cfg => {
                cfg.AddProfile<CentreMappingProfile>();
                cfg.AddProfile<PageMappingProfile>();
                cfg.AddProfile<SettingMappingProfile>();
                cfg.AddProfile<AssessmentMappingProfile>();
                cfg.AddProfile<UserAssessmentMappingProfile>();
            });
        }

        /// <summary>
        /// Test AutoMapper ServiceModel vs. ViewModel mappings - will trigger alerts for missed mappings or invalid casting
        /// </summary>
        [TestMethod]
        public void ViewModelMappingTest()
        {
            _mapperConfiguration.AssertConfigurationIsValid();
        }
    }
}
