using FirewallCracker.Core;

namespace FirewallCracker.Tests.Unit;

public class PasswordCheckerShould
{
    private readonly PasswordChecker _checker = new(new PasswordRuleRepositoryFake());

    [Theory]
    [InlineData("Valid123@")]
    [InlineData("Valid123@#$")]
    [InlineData("ValidPassword123@")]
    public async Task Validate_ValidPasswords(string password)
        => Assert.True((await _checker.CheckAsync(password)).IsValid);

    public static IEnumerable<object[]> InvalidPasswords =>
        new List<object[]>
        {
            new object[]
            {
                "Val1@",
                new List<string>
                {
                    "Password must be at least 8 characters long"
                }
            },
            new object[]
            {
                "pass!",
                new List<string>
                {
                    "Password must be at least 8 characters long",
                    "Password must contain at least one uppercase letter",
                    "Password must contain at least one number",
                    "Password must contain at least one cyber-symbol (. * # @ $ % &)",
                    "Invalid characters detected!!!"
                }
            }
        };

    [Theory]
    [MemberData(nameof(InvalidPasswords))]
    public async Task Reject_InvalidPasswords(string password, List<string> expectedMessages)
    {
        var result = await _checker.CheckAsync(password);

        Assert.False(result.IsValid);
        Assert.Equal(
            expectedMessages.OrderBy(m => m),
            result.Errors.OrderBy(m => m)
        );
    }
}

internal class PasswordRuleRepositoryFake : IPasswordRuleRepository
{
    public Task<IEnumerable<Rule>> GetRulesAsync() =>
        Task.FromResult<IEnumerable<Rule>>(new List<Rule>
        {
            new(".{8,}", "Password must be at least 8 characters long"),
            new(".*[A-Z].*", "Password must contain at least one uppercase letter"),
            new(".*[a-z].*", "Password must contain at least one lowercase letter"),
            new(".*[0-9].*", "Password must contain at least one number"),
            new(".*[.*#@$%&].*", "Password must contain at least one cyber-symbol (. * # @ $ % &)"),
            new("^[a-zA-Z0-9.*#@$%&]+$", "Invalid characters detected!!!")
        });
}