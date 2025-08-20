namespace FirewallCracker.Core;

public record CheckPasswordResult(bool IsValid, string[] Errors)
{
    public override string ToString() => $"IsValid: {IsValid}, Errors: {string.Join(", ", Errors)}";
}