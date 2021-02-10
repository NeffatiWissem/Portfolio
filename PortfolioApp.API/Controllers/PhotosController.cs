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
//    [Authorize]
    [ApiController]
    [Route("users/{userId}/photos")]

    public class PhotosController : ControllerBase
    {
        private readonly IPortfolioRepository _repo;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private readonly IMapper _mapper;
        private Cloudinary _cloudinary;

        public PhotosController(IPortfolioRepository repo, 
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

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepository = await _repo.GetPhoto(id);
            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepository);
            return Ok(photo);
        }

         [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId, [FromForm]PhotoForCreateDto photoForCreateDto)
        {
            //--> Vérifier l'authentification
            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);
            var file = photoForCreateDto.File;
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
            photoForCreateDto.Url = uploadResult.Uri.ToString();
            photoForCreateDto.publicId = uploadResult.PublicId;
            var photo = _mapper.Map<Photo>(photoForCreateDto);
            if (!userFromRepo.Photos.Any(p => p.IsMain))
                photo.IsMain = true;
            userFromRepo.Photos.Add(photo);
            if (await _repo.SaveAll())
            {
                var PhotoToReturn =_mapper.Map<PhotoForReturnDto>(photo);
                // return CreatedAtRoute("GetPhoto", new {id=photo.Id},PhotoToReturn);
                return Ok(PhotoToReturn);
            }

            return BadRequest("Erreur lors de l'ajout de l'image");

        }

         [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int userId,int id)
        {
            //  if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);

            if(!userFromRepo.Photos.Any(p=>p.Id==id))
            return Unauthorized();

            var DesiredMainPhoto = await _repo.GetPhoto(id);
            if(DesiredMainPhoto.IsMain)
            return BadRequest("C'est vraiment l'image de base");

            var CurrentMainPhoto = await _repo.GetMainPhotoForUser(userId);
            CurrentMainPhoto.IsMain=false;
            DesiredMainPhoto.IsMain=true;

            if(await _repo.SaveAll())
            return NoContent();
            return BadRequest("L'image de base ne peut pas être modifiée");
            
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int userId,int id){
            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //         return Unauthorized();

                var userFromRepo = await _repo.GetUser(userId);
                if(!userFromRepo.Photos.Any(p=>p.Id==id))
                return Unauthorized();

                var Photo = await _repo.GetPhoto(id);
                if(Photo.IsMain)
                return BadRequest("L'image principale ne peut pas être supprimée");

                if(Photo.PublicId!=null){
                    var deleteParams = new DeletionParams(Photo.PublicId);
                    var result = this._cloudinary.Destroy(deleteParams);
                    if(result.Result=="ok"){
                        _repo.Delete(Photo);
                    }
                }

                if(Photo.PublicId==null){
                    _repo.Delete(Photo);
                }

                if(await _repo.SaveAll())
                return Ok();

                return BadRequest("La suppression de l'image a échoué");
                
        }


    }
}