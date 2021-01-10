using System;
namespace PortfolioApp.API.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        //-->Si photo principal
        public bool IsMain { get; set; }

        //--> Faire la laison avec User
        public User User { get; set; }
        public int UserId { get; set; }
    }
}