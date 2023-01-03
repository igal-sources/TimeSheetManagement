using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace TimeSheet.Server.Projects.Business.Repositories
{
    public class ProjectsRepository : IProjectsRepository
    {
        private readonly IConfiguration _config;
        private readonly string _connectionString;

        public ProjectsRepository(IConfiguration config)
        {
            _config = config;
            _connectionString = _config.GetConnectionString("TimeSheetDB");           
        }

        public async Task<string> GetProjectList()
        {
            using (var con = new SqlConnection(_connectionString))
            {
                await con.OpenAsync();

                var cd = new CommandDefinition(commandText: "[dbo].[Projects_List]",
                    commandType: CommandType.StoredProcedure);

                //Dapper returning "for xml" / "for json" is truncated to 2033 characters
                //in order to bypass the issue we need to use QueryAsync + string.Join
                var result = await con.QueryAsync<string>(cd);
                return string.Join("", result);
            }
        }

        public async Task<string> GetProjectSelectList()
        {
            using (var con = new SqlConnection(_connectionString))
            {
                await con.OpenAsync();

                var cd = new CommandDefinition(commandText: "[dbo].[Projects_SelectList]",
                    commandType: CommandType.StoredProcedure);

                //Dapper returning "for xml" / "for json" is truncated to 2033 characters
                //in order to bypass the issue we need to use QueryAsync + string.Join
                var result = await con.QueryAsync<string>(cd);
                return string.Join("", result);
            }
        }

        public async Task<string> GetProjectById(string id)
        {
            using (var con = new SqlConnection(_connectionString))
            {
                await con.OpenAsync();

                var cd = new CommandDefinition(commandText: "[dbo].[Projects_GetById]",
                    parameters: new { ProjectID = id },
                    commandType: CommandType.StoredProcedure);

                return await con.ExecuteScalarAsync<string>(cd);
            }
        }

        public async Task<string> GetProjectByCustomerId(string id)
        {
            using (var con = new SqlConnection(_connectionString))
            {
                await con.OpenAsync();

                var cd = new CommandDefinition(commandText: "[dbo].[Projects_GetByCustomerId]",
                    parameters: new { CustomerId = id },
                    commandType: CommandType.StoredProcedure);

                return await con.ExecuteScalarAsync<string>(cd);
            }
        }

        public async Task<string> SaveProject(string formJson)
        {
            using (var con = new SqlConnection(_connectionString))
            {
                await con.OpenAsync();

                var cd = new CommandDefinition(commandText: "[dbo].[Projects_Insert]",
                    parameters: new { FormDataJSON = formJson },
                    commandType: CommandType.StoredProcedure);

                return await con.ExecuteScalarAsync<string>(cd);
            }
        }

        public async Task<string> UpdateProject(string formJson)
        {
            using (var con = new SqlConnection(_connectionString))
            {
                await con.OpenAsync();

                var cd = new CommandDefinition(commandText: "[dbo].[Projects_Update]",
                    parameters: new { FormDataJSON = formJson },
                    commandType: CommandType.StoredProcedure);

                return await con.ExecuteScalarAsync<string>(cd);
            }
        }
    }
}
