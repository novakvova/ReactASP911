using AutoPart.Abastract;
using AutoPart.Constants;
using AutoPart.Models;
using Data.AutoPart.Entities.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoPart.Services
{
    public static class SeederDB
    {
        public static void SeedData(this IApplicationBuilder app)
        {

            using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                try
                {
                    var emailSender = scope.ServiceProvider.GetRequiredService<IEmailSender>();

                    var message = new Message(new string[] { "novakvova@gmail.com" },
                            "Start kotelshop.tk",
                            $"Сайт успішно звпущено: " +
                            $"<a href='http://kotelshop.tk'>Сайт</a>");

                    emailSender.SendEmail(message);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                }

                var manager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
                var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<AppRole>>();
                
                var result = managerRole.CreateAsync(new AppRole
                {
                    Name = Roles.Admin
                }).Result;

                result = managerRole.CreateAsync(new AppRole
                {
                    Name = Roles.User
                }).Result;

                string email = "admin@gmail.com";
                var user = new AppUser
                {
                    Email = email,
                    UserName = email,
                    PhoneNumber = "+11(111)111-11-11"
                };
                result = manager.CreateAsync(user, "Qwerty1-").Result;
                result = manager.AddToRoleAsync(user, Roles.Admin).Result;
            }
        }
    }
}
