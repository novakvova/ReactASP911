using AutoPart.Models;
using AutoPart.Settings;
using Data.AutoPart.Entities.Identity;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AutoPart.Services
{
    public interface IJwtTokenService
    {
        string CreateToken(AppUser user);
        Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(ExternalLoginRequest request);
    }

    public class JwtTokenService : IJwtTokenService
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<AppUser> _userManager;
        private readonly GoogleAuthSettings _googleAuthSettings;

        public JwtTokenService(IConfiguration configuration,
            GoogleAuthSettings googleAuthSettings,
            UserManager<AppUser> userManager)
        {
            _configuration = configuration;
            _userManager = userManager;
            _googleAuthSettings = googleAuthSettings;
        }

        public string CreateToken(AppUser user)
        {
            var roles = _userManager.GetRolesAsync(user).Result;
            List<Claim> claims = new List<Claim>()
            {
                new Claim("name", user.UserName)
                //,
                //new Claim("photo", user.Photo)
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim("roles", role));
            }
            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<String>("JwtKey")));
            var signinCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(
                signingCredentials: signinCredentials,
                expires: DateTime.Now.AddDays(1000),
                claims: claims
            );
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        public async Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(ExternalLoginRequest request)
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings()
            {
                Audience = new List<string>() { _googleAuthSettings.ClientId }
            };

            var payload = await GoogleJsonWebSignature.ValidateAsync(request.Token, settings);
            return payload;
        }
    }
}
