using System.Threading.Tasks;
using System.Collections.Generic;
using PortfolioApp.API.Models;

namespace PortfolioApp.API.Data
{
    public interface IPortfolioRepository
    {
         void Add<T>(T entity) where T:class;
         void Delete<T>(T entity) where T:class ;
         Task<bool> SaveAll();
         Task<IEnumerable<User>> GetAllUsers();
         Task<User> GetUser(int id);
         Task<IEnumerable<Project>> GetAllProjects();
         Task<Project> GetProject(int id);
         Task<IEnumerable<Skill>> GetAllSkills();
         Task<Skill> GetSkill(int id);
    }
}