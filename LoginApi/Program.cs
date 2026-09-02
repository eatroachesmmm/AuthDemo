using LoginApi.Data;
using LoginApi.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//log in
app.MapPost("/login", async (User user, AppDbContext db) =>
{
    var exists = await db.Users.AnyAsync(u =>
        u.Username == user.Username &&
        u.Password == user.Password);

    if (!exists)
    {
        return Results.BadRequest("Invalid username or password. Please try again.");
    }

    return Results.Ok(user);
});

//register
app.MapPost("/register", async (User user, AppDbContext db) =>
{
    var exists = await db.Users.AnyAsync(u => u.Username == user.Username);

    if (exists)
    {
        return Results.BadRequest("Username already exists.");
    }

    db.Users.Add(user);
    await db.SaveChangesAsync();

    return Results.Ok(user);
});

app.Run();