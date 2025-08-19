using FirewallCracker.Core;

namespace FirewallCracker.PasswordCheck;

public record Response(bool IsValid, string[] Errors);

public static class Extensions
{
    public static Response ToResponse(this CheckPasswordResult result) => new(result.IsValid, result.Errors);
}