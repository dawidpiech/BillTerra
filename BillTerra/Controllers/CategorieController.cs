using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BillTerra.Models;
using BillTerra.Contexts;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace BillTerra.Controllers
{
    public class CategorieController : Controller
    {
        private ICategorieRepository categorieRepository;
        private UserManager<User> userManager;

        public CategorieController(ICategorieRepository categorieRepository, UserManager<User> userManager)
        {
            this.categorieRepository = categorieRepository;
            this.userManager = userManager;
        }

        [Authorize]
        public async Task<IActionResult> Index()
        {
            User user = await userManager.GetUserAsync(HttpContext.User);
            return View("Categorie", categorieRepository.Categories(user).Result);
        }

        [Authorize]
        public async Task<IActionResult> Add()
        {
            User user = await userManager.GetUserAsync(HttpContext.User);
            var categorie = new Categorie
            {

                Name = "Home",
                User = user
                

            };
            await categorieRepository.SaveCategorie(categorie);
            return RedirectToAction("Index");
        }



      
    }
}