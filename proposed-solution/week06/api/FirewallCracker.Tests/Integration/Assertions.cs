using static System.Net.HttpStatusCode;

namespace FirewallCracker.Tests.Integration;

public static class Assertions
{
    public static void FailedWithInternalError(this HttpResponseMessage response)
        => Assert.Equal(InternalServerError, response.StatusCode);
}