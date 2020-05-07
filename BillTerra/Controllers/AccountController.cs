using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BillTerra.Models;
using Microsoft.AspNetCore.Identity;


namespace BillTerra.Controllers
{
    public class AccountController : Controller
    {
        private UserManager<User> userManager;

        public AccountController(UserManager<User> userManager)
        {
            this.userManager = userManager;
        }
        public ViewResult Index() => View(userManager.Users);
        public ViewResult Create() => View();

        [HttpPost]
        public async Task<IActionResult> Create(CreateModel createModel)
        {
            User user = new User
            {
                UserName = createModel.Name,
                Email = createModel.Email   
            };

            IdentityResult result = await userManager.CreateAsync(user, createModel.Password);

            if(result.Succeeded)
            {
                return RedirectToAction("Index");
            }
            else
            {
                foreach(IdentityError error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }
            }

            return View(createModel);
        }

    }
}
