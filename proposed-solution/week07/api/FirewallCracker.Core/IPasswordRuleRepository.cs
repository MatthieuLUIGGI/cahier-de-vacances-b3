namespace FirewallCracker.Core;

public interface IPasswordRuleRepository
{
    Task<IEnumerable<Rule>> GetRulesAsync();
}