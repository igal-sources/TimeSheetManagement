using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using TimeSheet.Server.Customers.Common.Models;

namespace TimeSheet.Server.Customers.Business.Repositories
{
    public class CustomersRepository : ICustomersRepository
    {
        private readonly IConfiguration _config;
        private readonly string _connectionString;

        public CustomersRepository(IConfiguration config)
        {
            _config = config;
            _connectionString = _config.GetConnectionString("TimeSheetDB");           
        }

        public async Task<string> GetCustomerList()
        {
            using (var con = new SqlConnection(_connectionString))
            {
                await con.OpenAsync();

                var cd = new CommandDefinition(commandText: "[dbo].[Customers_List]",                  
                    commandType: CommandType.StoredProcedure);

                //Dapper returning "for xml" / "for json" is truncated to 2033 characters
                //in order to bypass the issue we need to use QueryAsync + string.Join
                var result = await con.QueryAsync<string>(cd);
                return string.Join("", result);
            }
        }

        public async Task<string> GetCustomerSelectList()
        {
            using (var con = new SqlConnection(_connectionString))
            {
                await con.OpenAsync();

                var cd = new CommandDefinition(commandText: "[dbo].[Customers_SelectList]",                  
                    commandType: CommandType.StoredProcedure);

                //Dapper returning "for xml" / "for json" is truncated to 2033 characters
                //in order to bypass the issue we need to use QueryAsync + string.Join
                var result = await con.QueryAsync<string>(cd);
                return string.Join("", result);
            }
        }

        public async Task<string> GetCustomerById(string id)
        {
            using (var con = new SqlConnection(_connectionString))
            {
                await con.OpenAsync();

                var cd = new CommandDefinition(commandText: "[dbo].[Customers_GetById]",
                    parameters: new { CustomerId = id },
                    commandType: CommandType.StoredProcedure);

                return await con.ExecuteScalarAsync<string>(cd);
            }
        }

        public async Task<List<CustomersModel>> GetCustomerObjectById(string id)
        {
            using (var con = new SqlConnection(_connectionString))
            {
                await con.OpenAsync();

                Dictionary<string, object> parameters = new Dictionary<string, object>
                {
                    { "@CustomerId", id }
                };

                
                return (List<CustomersModel>)await con.QueryAsync<CustomersModel>("[dbo].[Customers_GetById]", param: new DynamicParameters(parameters), commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<string> SaveCustomer(string formJson)
        {
            using (var con = new SqlConnection(_connectionString))
            {
                await con.OpenAsync();

                var cd = new CommandDefinition(commandText: "[dbo].[Customers_Insert]",
                    parameters: new { FormDataJSON = formJson },
                    commandType: CommandType.StoredProcedure);

                return await con.ExecuteScalarAsync<string>(cd);
            }
        }

        public async Task<string> UpdateCustomer(string formJson)
        {
            using (var con = new SqlConnection(_connectionString))
            {
                await con.OpenAsync();

                var cd = new CommandDefinition(commandText: "[dbo].[Customers_Update]",
                    parameters: new { FormDataJSON = formJson },
                    commandType: CommandType.StoredProcedure);

                return await con.ExecuteScalarAsync<string>(cd);
            }
        }
    }
}
