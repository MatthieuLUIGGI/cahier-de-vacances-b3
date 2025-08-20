using Bogus;
using FirewallCracker.Core;

namespace FirewallCracker.Tests.Unit;

public class CheckPasswordUseCaseShould
{
    private readonly Faker _faker;
    private readonly PasswordCheckerFake _passwordCheckerFake;
    private readonly CheckPasswordUseCase _checkPasswordUseCase;

    public CheckPasswordUseCaseShould()
    {
        _faker = new Faker();
        _passwordCheckerFake = new PasswordCheckerFake();
        _checkPasswordUseCase = new CheckPasswordUseCase(_passwordCheckerFake);
    }

    [Fact]
    public async Task Throw_Invalid_Argument_Exception_If_Password_Is_Null()
        => await Assert.ThrowsAsync<ArgumentNullException>(async ()
            => await _checkPasswordUseCase.HandleAsync(null)
        );

    [Fact]
    public async Task Call_Password_Checker()
    {
        var password = _faker.Internet.Password();
        await _checkPasswordUseCase.HandleAsync(password);
        _passwordCheckerFake.HaveBeenCalledWith(password);
    }
}

internal class PasswordCheckerFake : IPasswordChecker
{
    private string? _checkedPassword;

    public Task<CheckPasswordResult> CheckAsync(string password)
    {
        _checkedPassword = password;
        return Task.FromResult(new CheckPasswordResult(true, []));
    }

    public void HaveBeenCalledWith(string password) => Assert.Equal(_checkedPassword, password);
}