namespace FirewallCracker.Core;

public interface ICheckPasswordUseCase
{
    CheckPasswordResult Handle(string? password);
}

public class CheckPasswordUseCase(IPasswordChecker passwordChecker) : ICheckPasswordUseCase
{
    public CheckPasswordResult Handle(string? password)
    {
        ArgumentNullException.ThrowIfNull(password);
        return passwordChecker.Check(password);
    }
}