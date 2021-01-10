using Newtonsoft.Json;
using System.Collections.Generic;
using PortfolioApp.API.Models;

namespace PortfolioApp.API.Data
{
    public class TrialData
    {
        private readonly DataContext _context;
        public TrialData(DataContext context)
        {
            _context = context;            
        }

        //--> Trail Data For User
        public void TrialUsers(){
            //--> Lire le contenu de fichier Json "UserTrialData.Json"
            var userData = System.IO.File.ReadAllText("Data/UserTrialData.Json");
            //--> Convertir userData vers Objet class
            var users = JsonConvert.DeserializeObject<List<User>>(userData);
            foreach (var user in users)
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash("password",out passwordHash, out passwordSalt);
                user.PasswordHash=passwordHash;
                user.PasswordSalt=passwordSalt;
                user.UserName=user.UserName.ToLower();
                _context.Add(user);
            }
            _context.SaveChanges();
        }
        
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512()){
                  passwordSalt = hmac.Key;
                  passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }     
        }

           //--> Trail Data For Project
        public void TrialProjects(){
            //--> Lire le contenu de fichier Json "ProjectTrialData.Json"
            var projectData = System.IO.File.ReadAllText("Data/ProjectTrialData.Json");
            //--> Convertir projectData vers Objet class
            var projects = JsonConvert.DeserializeObject<List<Project>>(projectData);
            foreach (var project in projects)
            {
                project.ProjectName=project.ProjectName.ToLower();
                _context.Add(project);
            }
            _context.SaveChanges();
        }

        //--> Trail Data For Skill
        public void TrialSkills(){
            //--> Lire le contenu de fichier Json "SkillTrialData.Json"
            var skillData = System.IO.File.ReadAllText("Data/SkillTrialData.Json");
            //--> Convertir skillData vers Objet class
            var skills = JsonConvert.DeserializeObject<List<Skill>>(skillData);
            foreach (var skill in skills)
            {
                skill.SkillName=skill.SkillName.ToLower();
                _context.Add(skill);
            }
            _context.SaveChanges();
        }
    }
}