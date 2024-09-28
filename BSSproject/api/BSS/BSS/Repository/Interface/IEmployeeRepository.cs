using BSS.Models;

namespace BSS.Repository.Interface
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllEmployeesAsync();
        Task<Employee> GetEmployeeAsync(int id);
        Task<Employee> CreateEmployeeAsync(Employee employee);
        Task<Employee> DeleteEmployeeAsync(int employeeId);
        Task<Employee> UpdateEmployeeAsync(Employee updatedEmployee);
    }
}
