using FirewallCracker.Core;

namespace FirewallCracker.Tests.Unit;

public class PasswordCheckerShould
{
    [Theory]
    [InlineData("Valid123@")]
    [InlineData("Valid123@#$")]
    [InlineData("ValidPassword123@")]
    public void Validate_ValidPasswords(string password)
        => Assert.True(PasswordPolicy.Check(password).IsValid);

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
    public void Reject_InvalidPasswords(string password, List<string> expectedMessages)
    {
        var result = PasswordPolicy.Check(password);

        Assert.False(result.IsValid);
        Assert.Equal(
            expectedMessages.OrderBy(m => m),
            result.Errors.OrderBy(m => m)
        );
    }
}