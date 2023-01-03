using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace TimeSheet.Server.WorkingHours.Business.Repositories
{
    public class WorkingHoursRepository : IWorkingHoursRepository
    {
        private readonly IConfiguration _config;
        private readonly string _connectionString;

        public WorkingHoursRepository(IConfiguration config)
        {
            _config = config;
            _connectionString = _config.GetConnectionString("TimeSheetDB");           
        }

        public async Task<string> GetWorkingHoursList()
        {
            using (var con = new SqlConnection(_connectionString))
            {
                await con.OpenAsync();

                var cd = new CommandDefinition(commandText: "[dbo].[WorkingHours_List]",                  
                    commandType: CommandType.StoredProcedure);

                //Dapper returning "for xml" / "for json" is truncated to 2033 characters
                //in order to bypass the issue we need to use QueryAsync + string.Join
                var result = await con.QueryAsync<string>(cd);
                return string.Join("", result);
            }
        }

        public async Task<string> GetWorkingHoursById(string id)
        {
            using (var con = new SqlConnection(_connectionString))
            {
                await con.OpenAsync();

                var cd = new CommandDefinition(commandText: "[dbo].[WorkingHours_GetById]",
                    parameters: new { workingHoursId = id },
                    commandType: CommandType.StoredProcedure);

                return await con.ExecuteScalarAsync<string>(cd);
            }
        }

        public async Task<string> SaveWorkingHours(string formJson)
        {
            using (var con = new SqlConnection(_connectionString))
            {
                await con.OpenAsync();

                var cd = new CommandDefinition(commandText: "[dbo].[WorkingHours_Insert]",
                    parameters: new { FormDataJSON = formJson },
                    commandType: CommandType.StoredProcedure);

                return await con.ExecuteScalarAsync<string>(cd);
            }
        }

        public async Task<string> UpdateWorkingHours(string formJson)
        {
            using (var con = new SqlConnection(_connectionString))
            {
                await con.OpenAsync();

                var cd = new CommandDefinition(commandText: "[dbo].[WorkingHours_Update]",
                    parameters: new { FormDataJSON = formJson },
                    commandType: CommandType.StoredProcedure);

                return await con.ExecuteScalarAsync<string>(cd);
            }
        }
    }
}
