using System;

namespace PortfolioApp.API.Dtos
{
    public class PhotoForDetailDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public bool IsMain { get; set; }

    }
}