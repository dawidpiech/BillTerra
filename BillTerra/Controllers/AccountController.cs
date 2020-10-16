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
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly ICategorieRepository categorieRepository;
        private readonly INotificationRepository notificationRepository;

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
        public async Task<IActionResult> Create([FromBody]CreateUserViewModel createUser)
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
                await notificationRepository.SaveNotyfication(NotyficationMessages.HelloNotyfication(user));
              
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
            AutorisationLoginState autorisationLogin = new AutorisationLoginState
            {
                LoginAccountSucceeded = false
            };
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
        [HttpPost]
        public async Task<IActionResult> Edit([FromBody] EditUserViewModel editUserViewModel)
        {
            User user = await userManager.GetUserAsync(HttpContext.User); 
            user.UserName = editUserViewModel.Name;
            user.AvatarLink = editUserViewModel.AvatarLink;
            user.PasswordHash = userManager.PasswordHasher.HashPassword(user, editUserViewModel.Password);        
            IdentityResult result = await userManager.UpdateAsync(user);
            if(result.Succeeded)
            {
                return Json(new { succeed = true });
            }
            else
            {
                return Json(new { succeed = false });
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
