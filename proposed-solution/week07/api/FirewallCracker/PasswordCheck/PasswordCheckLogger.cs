using System.Security.Cryptography;
using FirewallCracker.Core;
using static System.Text.Encoding;
using Convert = System.Convert;

namespace FirewallCracker.PasswordCheck;

public interface IPasswordCheckLogger
{
    Task LogAsync(string password, CheckPasswordResult result);
}

public class PasswordCheckLogger(ILogger<PasswordCheckLogger> logger) : IPasswordCheckLogger
{
    public Task LogAsync(string password, CheckPasswordResult result)
    {
        logger.LogInformation("Check password: {PasswordHash} | Result: {Result}",
            password.ToSha256(),
            result.ToString());

        return Task.CompletedTask;
    }
}

public static class StringExtensions
{
    public static string ToSha256(this string input) =>
        Convert.ToHexString(
            SHA256.HashData(UTF8.GetBytes(input)
            ));
}