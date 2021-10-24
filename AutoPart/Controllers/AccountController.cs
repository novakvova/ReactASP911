using AutoMapper;
using AutoPart.Abastract;
using AutoPart.Constants;
using AutoPart.Exceptions;
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
        public AccountController(IUserService userService)
        {
            _userService = userService;
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
            catch(Exception ex)
            {
                return BadRequest(new AccountError("Щось пішло не так! " + ex.Message));
            }
        }
    }
}
