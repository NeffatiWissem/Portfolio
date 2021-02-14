using System;
using System.ComponentModel.DataAnnotations;

namespace PortfolioApp.API.Dtos
{
    public class ProjectForCreateDto
    {
        [Required]
        public string ProjectName { get; set; }
        [Required]
        public string CompanyName { get; set; }
        [Required]
        public string Mission { get; set; }
        [Required]
        public string Environment {get;set;}
        public string City { get; set; }
        public string Country { get; set; }
        public DateTime DateOn { get; set; }
    }
}