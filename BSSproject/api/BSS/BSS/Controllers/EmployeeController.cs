using AutoMapper;
using BSS.Dtos;
using BSS.Models;
using BSS.Repository.Interface;
using Microsoft.AspNetCore.Mvc;

namespace BSS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController(IEmployeeRepository bookingRepository, IMapper mapper) : ControllerBase
    {

        private readonly IEmployeeRepository _employeeRepository = bookingRepository;
        private readonly IMapper _mapper = mapper;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            var employees = await _employeeRepository.GetAllEmployeesAsync();
            return Ok(employees);
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployee(int id)
        {
            try
            {
                var result = await _employeeRepository.GetEmployeeAsync(id);

                if (result == null)
                {
                    return NotFound();
                }

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Employee>>> CreateEmployee(EmployeeDto employeeDto)
        {

            var employee = _mapper.Map<Employee>(employeeDto);
            var Createdemployee = await _employeeRepository.CreateEmployeeAsync(employee);
            var CreatedemployeeDto = _mapper.Map<EmployeeDto>(Createdemployee);

            return Ok(CreatedemployeeDto);
        }

        [HttpDelete("{employeeId}")]
        public async Task<ActionResult<Employee>> DeleteEmployee([FromRoute] int employeeId)
        {
            var deletedEmployee = await _employeeRepository.DeleteEmployeeAsync(employeeId);

            if (deletedEmployee == null)
            {
                return NotFound();
            }

            return Ok(deletedEmployee);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> UpdateEmployee(int id, Employee employee)
        {
            try
            {
                if (id != employee.EmployeeID)
                    return BadRequest("Employee ID mismatch");

                var employeeToUpdate = await _employeeRepository.GetEmployeeAsync(id);

                if (employeeToUpdate == null)
                    return NotFound($"Employee with Id = {id} not found");

                return await _employeeRepository.UpdateEmployeeAsync(employee);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
        }


    }
}
