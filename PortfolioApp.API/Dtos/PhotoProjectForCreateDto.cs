using System;
using Microsoft.AspNetCore.Http;

namespace PortfolioApp.API.Dtos
{
    public class PhotoProjectForCreateDto
    {
        public string Url { get; set; }
        public IFormFile File { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public string publicId { get; set; }

        public PhotoProjectForCreateDto()
        {
          DateAdded = DateTime.Now;  
        }
    }
}