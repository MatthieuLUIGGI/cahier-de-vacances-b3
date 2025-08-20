using FirewallCracker.Core;

namespace FirewallCracker.Adapters;

public class RuleEntity
{
    public int Id { get; set; }
    public string Regex { get; set; }
    public string Description { get; set; }
}

public static class RuleEntityExtensions
{
    public static Rule ToRule(this RuleEntity entity) => new(entity.Regex, entity.Description);
}