using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;


using PortfolioApp.API.Data;
using PortfolioApp.API.Dtos;
using PortfolioApp.API.Helpers;
using PortfolioApp.API.Models;

namespace PortfolioApp.API.Controllers
{
    //  [Authorize]
     [ApiController]
     [Route("project/{projectId}/photos")]

    public class PhotosProjectController : ControllerBase
    {
       
        private readonly IProjectRepository _repo;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private readonly IMapper _mapper;
        private Cloudinary _cloudinary;

        public PhotosProjectController(IProjectRepository repo, 
                                IOptions<CloudinarySettings> cloudinaryConfig,
                                IMapper  mapper)
        {
            _repo = repo;
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            
            //--> Crerer compte Cloudinary
             Account acc = new Account(
               _cloudinaryConfig.Value.CloudName,
               _cloudinaryConfig.Value.ApiKey,
               _cloudinaryConfig.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(acc); 
        }

        [HttpGet("{id}", Name = "GetPhotoProject")]
        public async Task<IActionResult> GetPhotoProject(int id)
        {
            var photoFromRepository = await _repo.GetPhotoProject(id);
            var photo = _mapper.Map<PhotoProjectForReturnDto>(photoFromRepository);
            return Ok(photo);
        }

         [HttpPost]
        public async Task<IActionResult> AddPhotoForProject(int projectId, [FromForm]PhotoProjectForCreateDto photoProjectForCreateDto)
        {
            //--> Vérifier l'authentification
            // if (projectId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var projectFromRepo = await _repo.GetProject(projectId);
            
            var file = photoProjectForCreateDto.File;
            var uploadResult = new ImageUploadResult();
            if (file != null && file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation()
                       .Width(500).Height(500).Crop("fill").Gravity("face")
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }

            }
            photoProjectForCreateDto.Url = uploadResult.Uri.ToString();
            photoProjectForCreateDto.publicId = uploadResult.PublicId;
            var photoProject = _mapper.Map<PhotoProjects>(photoProjectForCreateDto);
            if (!projectFromRepo.Photos.Any(p => p.IsMain))
                photoProject.IsMain = true;

            projectFromRepo.Photos.Add(photoProject);

            if (await _repo.SaveAll())
            {
                var PhotoProjectToReturn =_mapper.Map<PhotoProjectForReturnDto>(photoProject);
                // return CreatedAtRoute("AddPhotoForProject", new { id = photoProject.Id },PhotoProjectToReturn);
                return Ok(PhotoProjectToReturn);
            }

            return BadRequest("Erreur lors de l'ajout de l'image");
        }

         [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int projectId,int id)
        {
            //  if (projectId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var projectFromRepo = await _repo.GetProject(projectId);

            if(!projectFromRepo.Photos.Any(p=>p.Id==id))
            return Unauthorized();

            var DesiredMainPhoto = await _repo.GetPhotoProject(id);
            if(DesiredMainPhoto.IsMain)
            return BadRequest("C'est vraiment l'image de base");

            var CurrentMainPhoto = await _repo.GetMainPhotoForProject(projectId);
            CurrentMainPhoto.IsMain=false;
            DesiredMainPhoto.IsMain=true;

            if(await _repo.SaveAll())
            return NoContent();
            return BadRequest("L'image de base ne peut pas être modifiée");
            
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int projectId,int id){
            // if (projectId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //         return Unauthorized();

                var projectFromRepo = await _repo.GetProject(projectId);
                if(!projectFromRepo.Photos.Any(p=>p.Id==id))
                return Unauthorized();

                var PhotoProject = await _repo.GetPhotoProject(id);
                if(PhotoProject.IsMain)
                return BadRequest("L'image principale ne peut pas être supprimée");

                if(PhotoProject.PublicId!=null){
                    var deleteParams = new DeletionParams(PhotoProject.PublicId);
                    var result = this._cloudinary.Destroy(deleteParams);
                    if(result.Result=="ok"){
                        _repo.Delete(PhotoProject);
                    }
                }

                if(PhotoProject.PublicId==null){
                    _repo.Delete(PhotoProject);
                }

                if(await _repo.SaveAll())
                return Ok();
                
                return BadRequest("La suppression de l'image a échoué");
                
        }
    }
}