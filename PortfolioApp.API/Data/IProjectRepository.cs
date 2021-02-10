using System.Threading.Tasks;
using System.Collections.Generic;
using PortfolioApp.API.Models;

namespace PortfolioApp.API.Data
{
    public interface IProjectRepository
    {
         Task<Project> AddProject (Project project);
         void Delete<T>(T entity) where T:class ;
         Task<bool> ProjectExists(string projectName);

         Task<bool> SaveAll();

          Task<IEnumerable<Project>> GetAllProjects();
         Task<Project> GetProject(int id);

          Task<PhotoProjects> GetPhotoProject(int id);
         Task<PhotoProjects> GetMainPhotoForProject(int projectId);
    }
}