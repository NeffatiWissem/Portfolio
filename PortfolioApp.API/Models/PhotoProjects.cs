using System;
namespace PortfolioApp.API.Models
{
    public class PhotoProjects
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        //-->Si photo principal
        public bool IsMain { get; set; }
         //--> Ajouter Id pour photo dans Cloudinary
        public string PublicId { get; set; }        
        //--> Faire la laision avec Project
        public Project Project { get; set; }
        public int ProjectId { get; set; }
    }
}