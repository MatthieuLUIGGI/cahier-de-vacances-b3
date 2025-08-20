using Dapper;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;

namespace FirewallCracker.Adapters;

public class Database(IConfiguration configuration)
{
    private readonly string _connectionString = configuration.GetConnectionString("Matrix")
                                                ?? throw new InvalidOperationException("Missing connection string.");

    private bool _isInitialized;

    private static readonly string ScriptsDirectory = Path.Combine(AppContext.BaseDirectory, "scripts");
    private static readonly string CreateSchemaScript = Path.Combine(ScriptsDirectory, "CreateSchema.sql");
    private static readonly string SeedRulesScript = Path.Combine(ScriptsDirectory, "SeedRules.sql");

    public async Task InitializeAsync()
    {
        if (_isInitialized) return;

        await using var connection = new SqliteConnection(_connectionString);
        await connection.OpenAsync();

        await connection.ExecuteAsync(
            await File.ReadAllTextAsync(CreateSchemaScript)
        );

        var count = await connection.ExecuteScalarAsync<int>("SELECT COUNT(*) FROM Rules;");
        if (count == 0)
        {
            await connection.ExecuteAsync(await File.ReadAllTextAsync(SeedRulesScript));
        }

        _isInitialized = true;
    }
}