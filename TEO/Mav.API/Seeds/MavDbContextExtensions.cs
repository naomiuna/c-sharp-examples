using System;
using System.Collections.Generic;
using System.Linq;
using Mav.API.DbContexts;
using Mav.Data.Entities;
using Mav.Data.Enums;

namespace Mav.API.Seeds
{
    public static class MavDbContextExtensions
    {
        public static void EnsureSeedDataForContext(this MavDbContext context)
        {
            var changesApplied = false;
            if (!context.Settings.Any())
            {
                var settings = new List<Setting>()
                {
                    new Setting()
                    {
                         Name = "GlobalEmailSender",
                         Entry = "no-reply@boxmodel.co.uk",
                         DataType = "System.String",
                         Description = "The sender email address for system generated emails"
                    },
                    new Setting()
                    {
                         Name = "MaxCentreInvigilators",
                         Entry = "40",
                         DataType = "System.Int32",
                         Description = "The maximum number of allowable invigilators per centre"
                    }
                };
                context.Settings.AddRange(settings);
                changesApplied = true;
            }

            if (!context.CentreTypes.Any())
            {
                var centreTypes = new List<CentreType>()
                {
                    new CentreType() { Code = "11-18", Name = "11-18", Deleted = false },
                    new CentreType() { Code = "11-16", Name = "11-16", Deleted = false },
                    new CentreType() { Code = "FE", Name = "FE", Deleted = false },
                    new CentreType() { Code = "PRU", Name = "PRU", Deleted = false },
                    new CentreType() { Code = "Other", Name = "Other", Deleted = false }
                };
                context.CentreTypes.AddRange(centreTypes);
                changesApplied = true;
            }

            if (!context.Pages.Any()) {
                var dtn = DateTime.UtcNow;

                var pages = new List<Page>() {
                    // Privacy Policy
                    new Page () {
                        TypeID = (int)EnumPageType.Toolkit,
                        NavigationTypeID = (int)EnumPageNavigation.MainMenu,
                        OrderID = 1,
                        Published = true,
                        Deleted = false,
                        PageInfos = new List<PageInfo>() {
                            new PageInfo() {
                                CreatedOn = dtn,
                                ModifiedOn = dtn,
                                Url = "privacy-policy",
                                Title = "Privacy Policy",
                                Content = ""
                            }
                        }
                    },
                    // Terms and Conditions
                    new Page () {
                        TypeID = (int)EnumPageType.Toolkit,
                        NavigationTypeID = (int)EnumPageNavigation.MainMenu,
                        OrderID = 2,
                        Published = true,
                        Deleted = false,
                        PageInfos = new List<PageInfo>() {
                            new PageInfo() {
                                CreatedOn = dtn,
                                ModifiedOn = dtn,
                                Url = "terms-and-conditions",
                                Title = "Terms and Conditions",
                                Content = ""
                            }
                        }
                    },
                    // Terms and Conditions (Registration)
                    new Page () {
                        TypeID = (int)EnumPageType.Toolkit,
                        NavigationTypeID = (int)EnumPageNavigation.Hidden,
                        OrderID = 3,
                        Published = true,
                        Deleted = false,
                        PageInfos = new List<PageInfo>() {
                            new PageInfo() {
                                CreatedOn = dtn,
                                ModifiedOn = dtn,
                                Url = "terms-and-conditions-register",
                                Title = "Terms and Conditions (Registration)",
                                Content = ""
                            }
                        }
                    },
                    // Security and Confidentiality Agreement
                    new Page () {
                        TypeID = (int)EnumPageType.Toolkit,
                        NavigationTypeID = (int)EnumPageNavigation.Hidden,
                        OrderID = 4,
                        Published = true,
                        Deleted = false,
                        PageInfos = new List<PageInfo>() {
                            new PageInfo() {
                                CreatedOn = dtn,
                                ModifiedOn = dtn,
                                Url = "security-and-confidentiality-agreement",
                                Title = "Security and Confidentiality Agreement",
                                Content = ""
                            }
                        }
                    }
                };

                context.Pages.AddRange(pages);
                changesApplied = true;
            }

            if (!context.AssessmentYears.Any())
            {
                var years = new List<AssessmentYear>()
                {
                    new AssessmentYear() { YearID = 2018, Display = "2018/19", Deleted = false },
                    new AssessmentYear() { YearID = 2019, Display = "2019/20", Deleted = false }
                };
                context.AssessmentYears.AddRange(years);
                changesApplied = true;
            }

            if (changesApplied)
            {
                context.SaveChanges();
            }
        }
    }
}
