using System.ComponentModel.DataAnnotations;

namespace PortfolioApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string UserName { get; set; }
       
       [Required]
        [StringLength(8,MinimumLength=4,ErrorMessage="il faut que mot de passe ayant entre 4 et 8 caractère")]
        public string   Password { get; set; }
    }
}