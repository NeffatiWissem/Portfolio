using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioApp.API.Data;
using PortfolioApp.API.Dtos;

namespace PortfolioApp.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]

    public class SkillController : ControllerBase
    {
        private readonly IPortfolioRepository _repo;
        private readonly IMapper _mapper;
        public SkillController(IPortfolioRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetSkills()
        {
            var skills = await _repo.GetAllSkills();
            var skillsDto=_mapper.Map<IEnumerable<SkillForListDto>>(skills);
            return Ok(skillsDto);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSkill(int id)
        {
            var skill = await _repo.GetSkill(id);
            var skillDto=_mapper.Map<SkillForDetailDto>(skill);
            return Ok(skillDto);
        }
    }
}