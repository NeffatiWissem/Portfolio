using System;
using System.Collections.Generic;

namespace PortfolioApp.API.Models
{
    public class Project
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
        public ICollection<PhotoProjects> Photos  { get; set; }
    }
}