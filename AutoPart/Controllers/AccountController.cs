using AutoMapper;
using AutoPart.Abastract;
using AutoPart.Constants;
using AutoPart.Exceptions;
using AutoPart.Helpers;
using AutoPart.Models;
using AutoPart.Services;
using Data.AutoPart.Entities.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AutoPart.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtTokenService _tokenService;

        public AccountController(IUserService userService, UserManager<AppUser> userManager,
            IJwtTokenService tokenService)
        {
            _userService = userService;
            _userManager = userManager;
            _tokenService = tokenService;
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromForm] RegisterViewModel model)
        {
            try
            {
                string token = await _userService.CreateUser(model);
                return Ok(
                    new { token }
                    );
            }
            catch (AccountException aex)
            {
                return BadRequest(aex.AccountError);
            }
            catch
            {
                return BadRequest(new AccountError("Щось пішло не так!"));
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (await _userManager.CheckPasswordAsync(user, model.Password))
                {
                    string token = _tokenService.CreateToken(user);
                    return Ok(
                        new { token }
                    );
                }
                else 
                {

                    var exc = new AccountError();
                    exc.Errors.Invalid.Add("Пароль не вірний!");
                    throw new AccountException(exc);
                }
            }
            catch (AccountException aex)
            {
                return BadRequest(aex.AccountError);
            }
            catch
            {
                return BadRequest(new AccountError("Щось пішло не так!"));
            }
        }

        [HttpPost("GoogleExternalLogin")]
        public async Task<IActionResult> GoogleExternalLoginAsync([FromBody] ExternalLoginRequest request)
        {
            var payload = await _tokenService.VerifyGoogleToken(request);
            if (payload == null)
            {
                return BadRequest(new AccountError("Щось пішло не так!"));
            }
            var info = new UserLoginInfo(request.Provider, payload.Subject, request.Provider);
            var user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);

            if (user == null)
            {
                user = await _userManager.FindByEmailAsync(payload.Email);

                if (user == null)
                {
                    user = new AppUser
                    {
                        Email = payload.Email,
                        UserName = payload.Email,
                        FirstName = payload.GivenName,
                        SecondName = payload.FamilyName
                    };
                    var resultCreate = await _userManager.CreateAsync(user);
                    if (!resultCreate.Succeeded)
                    {
                        return BadRequest(new AccountError("Щось пішло не так!"));
                    }

                }

                var resultAddLogin = await _userManager.AddLoginAsync(user, info);
                if (!resultAddLogin.Succeeded)
                {
                    return BadRequest(new AccountError("Щось пішло не так!"));
                }
            }
            
            return Ok(_tokenService.CreateToken(user));
        }
    }
}
