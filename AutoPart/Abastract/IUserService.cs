using AutoPart.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoPart.Abastract
{
    public interface IUserService
    {
        public Task<string> CreateUser(RegisterViewModel model);
    }
}
