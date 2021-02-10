using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PortfolioApp.API.Models;

namespace PortfolioApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<User> Login(string userName, string password)
        {
            var user = await _context.Users.Include(p=>p.Photos).FirstOrDefaultAsync(x=> x.UserName==userName);
            if(user==null) return null;

            //--> Vérifier passwordHash de utilisateur
            if(!VerifyPasswordHash(password, user.PasswordSalt, user.PasswordHash))
            return null;

            return user;           
        }

        //--> vérifier PasswordHash
        private bool VerifyPasswordHash(string password, byte[] passwordSalt, byte[] passwordHash)
        {
             using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt)){

                 //--> Créer nouveau passwordHash
                  var ComputedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

                  //--> Comparer passwordHash dans base de donnée avec la nouvelle passwordHash(ComputedHash)
                  for (int i = 0; i < ComputedHash.Length; i++)
                  {
                      if(ComputedHash[i] != passwordHash[i]){
                          return false;
                      }  
                  }
                   return true;
            }
        }

        public async Task<User> Register(User user, string password)
        {
           byte[] passwordHash, passwordSalt;

           //--> Créer passwordHash et passwordSalt pour user
           CreatePasswordHash(password, out passwordHash, out passwordSalt);

           user.PasswordSalt = passwordSalt;
           user.PasswordHash = passwordHash;

             await _context.Users.AddAsync(user); //--> Ajouter nouvel user
             await _context.SaveChangesAsync();

             return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512()){
                  passwordSalt = hmac.Key;
                  passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }     
        }

        public async Task<bool> UserExists(string userName)
        {
            if(await _context.Users.AnyAsync(x=> x.UserName==userName)) return true;

            return false;
        }
    }
}