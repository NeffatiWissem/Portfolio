using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using PortfolioApp.API.Models;

namespace PortfolioApp.API.Data
{
    public class PortfolioRepository: IPortfolioRepository
    {
        private readonly DataContext _context;
        public PortfolioRepository(DataContext context)
        {
            _context = context;            
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(int id){
            return await _context.Users
                    .Include(u=>u.Photos)
                    .FirstOrDefaultAsync(u=>u.Id==id);
        }

        public async Task<Project> GetProject(int id){
            return await _context.Projects
                    .Include(p=>p.Photos)
                    .FirstOrDefaultAsync(p=>p.Id==id);
        }

        public async Task<Skill> GetSkill(int id){
            return await _context.Skills
                    .FirstOrDefaultAsync(s=>s.Id==id);
        }

        public async Task<IEnumerable<User>> GetAllUsers(){
            return await _context.Users .Include(u=>u.Photos).ToListAsync();
        }

        public async Task<IEnumerable<Project>> GetAllProjects(){
            return await _context.Projects.Include(u=>u.Photos).ToListAsync();
        }

        public async Task<IEnumerable<Skill>> GetAllSkills(){
            return await _context.Skills.ToListAsync();
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
           return await _context.Photos.Where(u=>u.UserId==userId).FirstOrDefaultAsync(p=>p.IsMain);
           
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p=>p.Id==id);
            return photo;
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

    }
}