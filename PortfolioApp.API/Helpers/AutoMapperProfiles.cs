using System.Linq;
using AutoMapper;
using PortfolioApp.API.Dtos;
using PortfolioApp.API.Models;

namespace PortfolioApp.API.Helpers
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
           CreateMap<User,UserForListDto>()
            .ForMember(dest=>dest.PhotoUrl,
                       opt=>{opt.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsMain).Url);})
            .ForMember(dest=>dest.Age,
                       opt=>{opt.ResolveUsing(src=>src.DateOfBirth.CalculateAge());});

           //--> On va associée PhotoUrl avec la valeur de source qui contient IsMain=true
            CreateMap<User,UserForDetailDto>()
            .ForMember(dest=>dest.PhotoUrl,
                       opt=>{opt.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsMain).Url);})
            .ForMember(dest=>dest.Age,
                       opt=>{opt.ResolveUsing(src=>src.DateOfBirth.CalculateAge());});
            
           
           CreateMap<Project,ProjectForListDto>()
            .ForMember(dest=>dest.PhotoUrl,
                       opt=>{opt.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsMain).Url);});
           CreateMap<Project,ProjectForDetailDto>()
            .ForMember(dest=>dest.PhotoUrl,
                       opt=>{opt.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsMain).Url);});
           

           CreateMap<Skill,SkillForDetailDto>(); 
           CreateMap<Skill,SkillForListDto>(); 

           CreateMap<Photo,PhotoForDetailDto>(); 
           CreateMap<PhotoProjects,PhotoProjectsForDetailDto>(); 
        }
    }
}