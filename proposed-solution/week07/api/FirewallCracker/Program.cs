using FirewallCracker;
using FirewallCracker.Adapters;
using FirewallCracker.Core;
using FirewallCracker.PasswordCheck;
using Scalar.AspNetCore;
using Serilog;
using Serilog.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);
var allowedOrigins = builder.Configuration.GetSection("AllowedCorsOrigins").Get<string[]>();

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateLogger();

var businessLogger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("Logs/password-check.log", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Services.AddSingleton<ILogger<PasswordCheckLogger>>(_ =>
    new SerilogLoggerFactory(businessLogger).CreateLogger<PasswordCheckLogger>()
);

builder.Host.UseSerilog();

builder.Services
    .AddOpenApi()
    .AddCors(options =>
    {
        options.AddDefaultPolicy(policy =>
        {
            policy
                .WithOrigins(allowedOrigins ?? [])
                //.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
    })
    // Configure IOC
    .AddScoped<IPasswordChecker, PasswordChecker>()
    .AddScoped<IPasswordCheckLogger, PasswordCheckLogger>()
    .AddScoped<ICheckPasswordUseCase, CheckPasswordUseCase>()
    .AddScoped<IPasswordRuleRepository, PasswordRuleRepository>()
    .AddSingleton<Database>();

builder.Services.Configure<DatabaseOptions>(
    builder.Configuration.GetSection("ConnectionStrings")
);

var app = builder.Build();

app.UseCors()
    .UseHttpsRedirection()
    // Avoid to leak your implementation details to your callers
    .UseMiddleware<GlobalExceptionHandlerMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(opt => { opt.WithTitle("Matrix - Firewall Cracker"); });
}

app.MapPost("/api/password-check",
        async (ICheckPasswordUseCase useCase, CheckPassword request, IPasswordCheckLogger logger) =>
        {
            var result = await useCase.HandleAsync(request.Password);
            await logger.LogAsync(request.Password, result);

            return result.ToResponse();
        })
    .WithDisplayName("Check Password");


var db = app.Services.GetRequiredService<Database>();
await db.InitializeAsync();

await app.RunAsync();

public partial class Program;