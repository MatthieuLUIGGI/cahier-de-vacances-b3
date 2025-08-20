using Dapper;
using FirewallCracker.Core;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Options;

namespace FirewallCracker.Adapters;

public class PasswordRuleRepository(IOptions<DatabaseOptions> options) : IPasswordRuleRepository
{
    private readonly string _connectionString = options.Value.Matrix;

    private SqliteConnection CreateConnection() => new(_connectionString);

    public async Task<IEnumerable<Rule>> GetRulesAsync()
    {
        const string sql = "SELECT * FROM Rules WHERE IsActive = 1";

        await using var connection = CreateConnection();
        var entities = await connection.QueryAsync<RuleEntity>(sql);

        return entities.Select(e => e.ToRule());
    }
}