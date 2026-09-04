#build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

COPY LoginApi/LoginApi.csproj LoginApi/

RUN dotnet restore LoginApi/LoginApi.csproj

COPY LoginApi/ LoginApi/

RUN dotnet publish LoginApi/LoginApi.csproj -c Release -o /app/publish

#runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final

WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "LoginApi.dll"]