using AutoMapper;
using BSS.Models;

namespace BSS.Dtos
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Employee, EmployeeDto>().ReverseMap();

        }
    }
}
