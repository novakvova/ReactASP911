using AutoMapper;
using AutoPart.Models;
using Data.AutoPart;
using Data.AutoPart.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AutoPart.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartsController : ControllerBase
    {
        private readonly AppEFContext _context;
        private readonly IMapper _mapper;
        public CartsController(AppEFContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> Add([FromForm] CartAddViewModel model)
        {
            try
            {
                string userName = User.FindFirst("name")?.Value;
                var cart = _mapper.Map<CartEntity>(model);
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
                return Ok();
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
