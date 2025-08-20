namespace FirewallCracker.Core;

public interface ICheckPasswordUseCase
{
    Task<CheckPasswordResult> HandleAsync(string? password);
}

public class CheckPasswordUseCase(IPasswordChecker passwordChecker) : ICheckPasswordUseCase
{
    public async Task<CheckPasswordResult> HandleAsync(string? password)
    {
        ArgumentNullException.ThrowIfNull(password);
        return await passwordChecker.CheckAsync(password);
    }
}