using System;
using System.Collections.Generic;
using PortfolioApp.API.Models;

namespace PortfolioApp.API.Dtos
{
    public class ProjectForDetailDto
    {
        public int Id { get; set; }       
        public string ProjectName { get; set; }
        public string  CompanyName { get; set; }
        public DateTime DateOn { get; set; }
        public DateTime DateOf { get; set; }
        public string Mission { get; set; }
        public string Environment {get;set;}
        public string City { get; set; }
        public string Country { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<PhotoProjectsForDetailDto> Photos  { get; set; }
    }
}