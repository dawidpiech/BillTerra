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
        private SignInManager<User> signInManager;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        
        public async Task<IActionResult>  Index()
        {
            User user = await userManager.GetUserAsync(HttpContext.User);
            
            return View(user);
        }
            

       
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

        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginModel details)
        {
            if (ModelState.IsValid)
            {
                User user = await userManager.FindByEmailAsync(details.Email);
                if (user != null)
                {
                    await signInManager.SignOutAsync();
                    Microsoft.AspNetCore.Identity.SignInResult result =
                            await signInManager.PasswordSignInAsync(
                                user, details.Password, false, false);
                    if (result.Succeeded)
                    {
                        
                        return View("Index",user);
                    }
                }

                ModelState.AddModelError(nameof(LoginModel.Email),
                "Nieprawidłowa nazwa użytkownika lub hasło.");
            }
            return View(details);
        }


    }
}
