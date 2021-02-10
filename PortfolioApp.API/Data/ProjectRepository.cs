using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using PortfolioApp.API.Models;
using PortfolioApp.API.Data;

namespace PortfolioApp.API.Data
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly DataContext _context;
        public ProjectRepository(DataContext context)
        {
            _context = context;

        }

       public async Task<Project> AddProject (Project project)
       {
            await _context.Projects.AddAsync(project); //--> Ajouter nouvel project
                await _context.SaveChangesAsync();

             return project;
        }

        public async Task<bool> ProjectExists(string projectName)
        {
            if(await _context.Projects.AnyAsync(x=> x.ProjectName==projectName)) return true;

            return false;
        }

         public async Task<Project> GetProject(int id){
            return await _context.Projects
                    .Include(p=>p.Photos)
                    .FirstOrDefaultAsync(p=>p.Id==id);
        }

         public async Task<IEnumerable<Project>> GetAllProjects(){
            return await _context.Projects.Include(u=>u.Photos).ToListAsync();
        }

         public async Task<PhotoProjects> GetMainPhotoForProject(int projectId)
        {
           return await _context.PhotosProjects.Where(p=>p.ProjectId==projectId).FirstOrDefaultAsync(p=>p.IsMain);
           
        }

        public async Task<PhotoProjects> GetPhotoProject(int id)
        {
            var photo = await _context.PhotosProjects.FirstOrDefaultAsync(p=>p.Id==id);
            return photo;
        }

         public async Task<bool> SaveAll(){
            return await _context.SaveChangesAsync()>0;
        }

         public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
    }
}