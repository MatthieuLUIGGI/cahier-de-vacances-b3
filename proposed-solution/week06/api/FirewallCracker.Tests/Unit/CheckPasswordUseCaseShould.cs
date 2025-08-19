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
    public void Throw_Invalid_Argument_Exception_If_Password_Is_Null()
        => Assert.Throws<ArgumentNullException>(() => _checkPasswordUseCase.Handle(null));

    [Fact]
    public void Call_Password_Checker()
    {
        var password = _faker.Internet.Password();
        _checkPasswordUseCase.Handle(password);
        _passwordCheckerFake.HaveBeenCalledWith(password);
    }
}

internal class PasswordCheckerFake : IPasswordChecker
{
    private string? _checkedPassword;

    public CheckPasswordResult Check(string password)
    {
        _checkedPassword = password;
        return new CheckPasswordResult(true, []);
    }

    public void HaveBeenCalledWith(string password) => Assert.Equal(_checkedPassword, password);
}