using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioApp.API.Data;
using PortfolioApp.API.Dtos;
using PortfolioApp.API.Models;
using System;
using System.Security.Claims;

namespace PortfolioApp.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IPortfolioRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IPortfolioRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

         [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetAllUsers();
            var usersDto=_mapper.Map<IEnumerable<UserForDetailDto>>(users);
            return Ok(usersDto);
        }

         [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            //--> Créer UserDto qui sera retourner au application Web
            var userDto=_mapper.Map<UserForDetailDto>(user);
            return Ok(userDto);
        }

         [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto){
        //   //--> vérifier que id envoyé est le même id dans le Token
        //    if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
        //    return Unauthorized();

          var userFromRepo = await _repo.GetUser(id);

          _mapper.Map(userForUpdateDto,userFromRepo);

          if(await _repo.SaveAll()){
              return NoContent();
          } 

          throw new Exception($"Un problème est survenu lors de la modification des données");

        }

    }
}