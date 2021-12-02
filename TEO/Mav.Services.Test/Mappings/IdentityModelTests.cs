using AutoMapper;
using Mav.Services.Identity.Mappings;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Mav.Services.Test.Mappings
{
    [TestClass]
    public class IdentityModelTests
    {
        private MapperConfiguration _mapperConfiguration;

        [TestInitialize]
        public void Init()
        {
            _mapperConfiguration = new MapperConfiguration(cfg => {
                cfg.AddProfile<UserMappingProfile>();
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
