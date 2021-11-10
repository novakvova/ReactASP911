using AutoMapper;
using AutoPart.Models;
using Data.AutoPart;
using Data.AutoPart.Entities;
using Data.AutoPart.Entities.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace AutoPart.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartsController : ControllerBase
    {
        private readonly AppEFContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        public CartsController(AppEFContext context,
            IMapper mapper, UserManager<AppUser> userManager)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> Add([FromBody] CartAddViewModel model)
        {
            try
            {
                string userName = User.FindFirst("name")?.Value;
                var user = await _userManager.FindByNameAsync(userName);
                var cart = _mapper.Map<CartEntity>(model);
                cart.UserId = user.Id;
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();

                var result = _context.Carts
                    .Include(x=>x.Product)
                    .Where(x=>x.Id==cart.Id)
                    .Select(x=>_mapper.Map<CartItemViewModel>(x))
                    .First();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    invalid = ex.Message
                });
            }
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> List()
        {
            try
            {
                Thread.Sleep(2000);
                var model = await _context.Carts
                    .Include(x => x.Product)
                    .Select(x => _mapper.Map<CartItemViewModel>(x)).ToListAsync();
                return Ok(model);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    invalid = ex.Message
                });
            }
        }

    }
}
