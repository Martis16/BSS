using AutoMapper;
using BSS.Models;
using BSS.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace BSS.Repository.Services
{
    public class EmployeeRepository(CompanyContext context, IMapper mapper, IHostEnvironment hostEnvironment) : IEmployeeRepository
    {
        private readonly CompanyContext _context = context;
        private readonly IMapper _mapper;
        private readonly IHostEnvironment _hostEnvironment;
        public async Task<IEnumerable<Employee>> GetAllEmployeesAsync()
        {
            return await _context.Employees.ToListAsync();
        }
        public async Task<Employee> GetEmployeeAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return null;
            }

            return employee;
        }
        public async Task<Employee> CreateEmployeeAsync(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return employee;
        }
        public async Task<Employee> DeleteEmployeeAsync(int employeeId)
        {
            var employee = await _context.Employees.FindAsync(employeeId);
            if (employee == null)
            {
                return null;
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return employee;
        }
        public async Task<Employee> UpdateEmployeeAsync(Employee employee)
        {
            var result = await _context.Employees
                .FirstOrDefaultAsync(e => e.EmployeeID == employee.EmployeeID);

            if (result != null)
            {
                result.EmployeeID = employee.EmployeeID;
                result.FirstName = employee.FirstName;
                result.LastName = employee.LastName;
                result.Title = employee.Title;
                result.TitleOfCourtesy = employee.TitleOfCourtesy;
                result.BirthDate = employee.BirthDate;
                result.HireDate = employee.HireDate;
                result.Address = employee.Address;
                result.City = employee.City;
                result.Region = employee.Region;
                result.PostalCode = employee.PostalCode;
                result.Country = employee.Country;
                result.HomePhone = employee.HomePhone;
                result.Extension = employee.Extension;
                result.Photo = employee.Photo;
                result.Notes = employee.Notes;
                result.ReportsTo = employee.ReportsTo;
                result.PhotoPath = employee.PhotoPath;

                await _context.SaveChangesAsync();

                return result;
            }

            return null;
        }



    }
}
