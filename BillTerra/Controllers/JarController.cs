using BillTerra.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace BillTerra.Controllers
{
    public class JarController : Controller
    {
        private IJarRepositorycs repository;
        private UserManager<User> userManager;

        public JarController(IJarRepositorycs repository, UserManager<User> userManager)
        {
            this.userManager = userManager;
            this.repository = repository;
        }

        [Authorize]
        public async Task<IActionResult> Index()
        {
            User user = await userManager.GetUserAsync(HttpContext.User);

            return View("List", repository.Jars(user).Result
            );

        }
        [Authorize]
        public async Task Add()
        {

            User user = await userManager.GetUserAsync(HttpContext.User);
            var jar = new Jar
            {
                User = user,
                Name = "Dada",
                FinalAmmount = 134,
                AcumulatedAmmount = 13341,
                CreationDate = DateTime.Now,
                MonthlyPayment = 100,
                State = State.Reached,
                EndDate = DateTime.Now + new TimeSpan(10, 10, 10),
                Sequence = 1


            };
            await repository.SaveJar(jar);
        }
    }
}