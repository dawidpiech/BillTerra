using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BillTerra.Models;
using BillTerra.Models.ViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace BillTerra.Controllers
{
    public class AccountController : Controller
    {
        private UserManager<User> userManager;
        private SignInManager<User> signInManager;
        private ICategorieRepository categorieRepository;
        private INotificationRepository notificationRepository;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager , ICategorieRepository categorieRepository , INotificationRepository notificationRepository)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.categorieRepository = categorieRepository;
            this.notificationRepository = notificationRepository;
        }

        [AllowAnonymous]
        public async Task<IActionResult>  Index() =>   View();


        [AllowAnonymous]
        public ViewResult Create() => View();

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]CreateUser createUser)
        {
            AutorisationCreateUserState autorisationCreateUser = new AutorisationCreateUserState();

            User user = new User
            {
                UserName = createUser.Name,
                Email = createUser.Email,
                AvatarLink = "https://static.fajnyzwierzak.pl/media/uploads/media_image/auto/entry-content/24/desktop/szary-kot-brytyjski.jpg"

            };

            IdentityResult result = await userManager.CreateAsync(user, createUser.Password);

            if (result.Succeeded)
            {
                AddDefaultCaterories.Add(categorieRepository, user);
                await notificationRepository.SaveNotyfication(new Notification
                {
                    Title = $"Hello {user.UserName}",
                    Describe = "Welcome in Biletera",
                    User = user,
                    IsVisible = true
                });
                autorisationCreateUser.CreateAccountSucceeded = true;
                autorisationCreateUser.Errors = null;
            }
            else
            {
                autorisationCreateUser.CreateAccountSucceeded = false;
                autorisationCreateUser.Errors = result.Errors;
            }

            return Json(autorisationCreateUser);
        }
      
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginUser userLogin)
        {
                AutorisationLoginState autorisationLogin = new AutorisationLoginState();
                autorisationLogin.LoginAccountSucceeded = false;
                User user = await userManager.FindByEmailAsync(userLogin.Email);
                if (user != null)
                {
                    await signInManager.SignOutAsync();
                    Microsoft.AspNetCore.Identity.SignInResult result =
                            await signInManager.PasswordSignInAsync(
                                user, userLogin.Password, false, false);
                    if (result.Succeeded)
                    {
                        autorisationLogin.LoginAccountSucceeded = true;
                    }
                    else
                    {
                        autorisationLogin.Error = "Invalid email or password";
                    }
                }
                else
                {
                    autorisationLogin.Error = "Invalid email or password";
                }



            return Json(autorisationLogin);
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
