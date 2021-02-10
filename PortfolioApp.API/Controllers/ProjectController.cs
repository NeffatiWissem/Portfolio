using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

using PortfolioApp.API.Data;
using PortfolioApp.API.Dtos;
using PortfolioApp.API.Models;

namespace PortfolioApp.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _repo;
        private readonly IMapper _mapper;
        public ProjectController(IProjectRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            var projects = await _repo.GetAllProjects();
            var projectsDto=_mapper.Map<IEnumerable<ProjectForListDto>>(projects);
            return Ok(projectsDto);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject(int id)
        {
            var project = await _repo.GetProject(id);
            var projectDto=_mapper.Map<ProjectForDetailDto>(project);
            return Ok(projectDto);
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, ProjectForUpdateDto projectForUpdateDto){
        //   //--> vérifier que id envoyé est le même id dans le Token
        //    if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
        //    return Unauthorized();

          var projectFromRepo = await _repo.GetProject(id);

          _mapper.Map(projectForUpdateDto,projectFromRepo);

          if(await _repo.SaveAll()){
              return NoContent();
          } 

          throw new Exception($"Un problème est survenu lors de la modification des données");

        }

        [AllowAnonymous]
        [HttpPost("AddProject")]
        public async Task<IActionResult> AddProject(ProjectForCreateDto projectForCreateDto)
        {
              projectForCreateDto.ProjectName = projectForCreateDto.ProjectName.ToLower();
            if (await _repo.ProjectExists(projectForCreateDto.ProjectName))
            {
                return BadRequest("Ce project exist déjà");
            }
            
            var ProjectToReturn =_mapper.Map<Project>(projectForCreateDto);
            var projectToCreate = await _repo.AddProject(ProjectToReturn);
            return StatusCode(201);
        }
    }
}