using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BillTerra.Models;
using BillTerra.Contexts;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using BillTerra.Models.ViewModel;

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
        [HttpPost]
        public async Task<IActionResult> AddCategorie([FromBody]CategorieViewModel categorieViewModel)
        {
            User user = await userManager.GetUserAsync(HttpContext.User);
            var categorie = new Categorie
            {

                Name = categorieViewModel.Name,
                User = user,
                IsExpense = categorieViewModel.IsExpense


            };
            return Json(await categorieRepository.AddCategorie(categorie));
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> DeleteCategorie([FromBody]CategorieViewModel categorieViewModel)
        {
            User user = await userManager.GetUserAsync(HttpContext.User);
            var categorie = new Categorie
            {

                Name = categorieViewModel.Name,
                User = user,
                IsExpense = categorieViewModel.IsExpense


            };
            return Json(new { succeed = categorieRepository.DeleteCategorie(categorie) });
        }

        [Authorize]
        [HttpPut]
        public async Task EditCategory([FromBody] CategorieViewModel [] categorieViewModels)
        {
            User user = await userManager.GetUserAsync(HttpContext.User);
            
            foreach(var categorie in categorieViewModels)
            {
                var newCategorie = new Categorie
                {

                    Name = categorie.Name,
                    User = user,
                    IsExpense = categorie.IsExpense


                };
                await categorieRepository.EditCategory(newCategorie);
            }
            
           

        }


    }
}