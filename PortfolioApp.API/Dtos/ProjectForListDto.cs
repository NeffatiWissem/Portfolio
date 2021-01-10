using System;

namespace PortfolioApp.API.Dtos
{
    public class ProjectForListDto
    {
        public int Id { get; set; }       
        public string  CompanyName { get; set; }
        public DateTime DateOn { get; set; }
        public DateTime DateOf { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PhotoUrl { get; set; }

    }
}