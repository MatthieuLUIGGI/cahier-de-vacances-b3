namespace FirewallCracker.Core;

public interface IPasswordChecker
{
    public CheckPasswordResult Check(string password);
}

public sealed class PasswordChecker : IPasswordChecker
{
    public CheckPasswordResult Check(string password) => PasswordPolicy.Check(password);
}

public static class PasswordPolicy
{
    private const int MinimumLength = 8;
    private static readonly List<char> SpecialCharacters = ['.', '*', '#', '@', '$', '%', '&'];

    public static CheckPasswordResult Check(string password)
    {
        var errors = new List<string>();

        GreaterThanMinimumLength(password, errors);
        AtLeastOneUpperCase(password, errors);
        AtLeastOneLowerCase(password, errors);
        AtLeastOneNumber(password, errors);
        AtLeastOneCyberSymbol(password, errors);
        HasOnlyValidCharacters(password, errors);

        return new CheckPasswordResult(errors.Count == 0, errors.ToArray());
    }

    private static void GreaterThanMinimumLength(string password, List<string> errors)
    {
        if (password.Length < MinimumLength)
        {
            errors.Add("Password must be at least 8 characters long");
        }
    }

    private static void AtLeastOneUpperCase(string password, List<string> errors)
    {
        if (!password.Any(char.IsUpper))
        {
            errors.Add("Password must contain at least one uppercase letter");
        }
    }

    private static void AtLeastOneLowerCase(string password, List<string> errors)
    {
        if (!password.Any(char.IsLower))
        {
            errors.Add("Password must contain at least one lowercase letter");
        }
    }

    private static void AtLeastOneNumber(string password, List<string> errors)
    {
        if (!password.Any(char.IsDigit))
        {
            errors.Add("Password must contain at least one number");
        }
    }

    private static void AtLeastOneCyberSymbol(string password, List<string> errors)
    {
        if (!password.Any(SpecialCharacters.Contains))
        {
            errors.Add("Password must contain at least one cyber-symbol (. * # @ $ % &)");
        }
    }

    private static void HasOnlyValidCharacters(string password, List<string> errors)
    {
        if (!password.All(IsAValidCharacter))
        {
            errors.Add("Invalid characters detected!!!");
        }
    }

    private static bool IsAValidCharacter(char c) =>
        char.IsLetter(c)
        || char.IsDigit(c)
        || SpecialCharacters.Contains(c);
}