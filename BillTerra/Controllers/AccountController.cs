using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BillTerra.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

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

        [AllowAnonymous]
        public async Task<IActionResult> Index() => View();


        [AllowAnonymous]
        public ViewResult Create() => View();

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Create(CreateUser createUser)
        {
            User user = new User
            {
                UserName = createUser.Name,
                Email = createUser.Email
            };

            IdentityResult result = await userManager.CreateAsync(user, createUser.Password);

            if (result.Succeeded)
            {
                return RedirectToAction("Index");
            }
            else
            {
                foreach (IdentityError error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }
            }

            return View(createUser);
        }
        [AllowAnonymous]
        public IActionResult Login(string returnUrl)
        {
            ViewBag.returnUrl = returnUrl;
            return View();
           
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login(LoginUser userLogin,string returnUrl)
        {
           
            if (ModelState.IsValid)
            {
                User user = await userManager.FindByEmailAsync(userLogin.Email);
                if (user != null)
                {
                    await signInManager.SignOutAsync();
                    Microsoft.AspNetCore.Identity.SignInResult result =
                            await signInManager.PasswordSignInAsync(
                                user, userLogin.Password, false, false);
                    if (result.Succeeded)
                    {

                        return Redirect(returnUrl ?? "/");
                    }
                }

              
            }
            return View(userLogin);
        }
        [Authorize]
        public async Task<IActionResult> Edit()
        {
            User user = await userManager.GetUserAsync(HttpContext.User);
            if (user != null)
            {
                return View(new CreateUser { Name = user.UserName, Email = user.Email });
            }
            else
            {
                return RedirectToAction("Index");
            }
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Edit(CreateUser editUser)
        {
            User user = await userManager.GetUserAsync(HttpContext.User);
            user.Email = editUser.Email;
            user.UserName = editUser.Name;
            user.PasswordHash = userManager.PasswordHasher.HashPassword(user, editUser.Password);        
            IdentityResult result = await userManager.UpdateAsync(user);
            if(result.Succeeded)
            {
                return RedirectToAction("Index");
            }
            else
            {
                return View(user);
            }
        }

        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return RedirectToAction("Index");
        }


    }
}
