using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                      opt.MapFrom(source => source.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Age, options =>
                     options.MapFrom(source => source.DateofBirth.CalculateAge()));
            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<Photo, PhotoDto>();
            CreateMap<RegisterDto,AppUser>();
        }
    }
}