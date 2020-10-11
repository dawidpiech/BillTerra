using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BillTerra.Models;
using BillTerra.Models.ViewModel;
using BillTerra.Contexts;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.ComponentModel;

namespace BillTerra.Controllers
{
    public class ShoppingListController : Controller
    {
        private IShopingListRepository shopingListRepository;
        private UserManager<User> userManager;

        public ShoppingListController(IShopingListRepository shopingListRepository, UserManager<User> userManager)
        {
            this.shopingListRepository = shopingListRepository;
            this.userManager = userManager;
        }

        [Authorize]
        public async Task<IActionResult> Index()
        {
            User user = await userManager.GetUserAsync(HttpContext.User);
            List<ShoppingListElementViewModel> shopListElementViewModel = new List<ShoppingListElementViewModel>();

            shopingListRepository.ShopListElements(user).Result.ToList().ForEach(x =>
           {
               shopListElementViewModel.Add(new ShoppingListElementViewModel
               {
                   ID = x.ID,
                   PositionInList = x.PositionInList,
                   Content = x.Content
               });
           });


            return Json(shopListElementViewModel);

        }



        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddShopingListElement([FromBody] ShoppingListElementViewModel shopListElementViewModel)
        {
            User user = await userManager.GetUserAsync(HttpContext.User);
            var shopinglistElement = new ShoppListElement
            {
                User = user,
                Content = shopListElementViewModel.Content,
                PositionInList = shopingListRepository.ShopListElements(user).Result.Last().PositionInList + 1

            };
            var tmp =  shopingListRepository.AddListElement(shopinglistElement).Result;

            return Json(new ShoppingListElementViewModel
            {
                ID = tmp.ID,
                Content = tmp.Content,
                PositionInList = tmp.PositionInList,

            });
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> DeleteShopingListElement([FromBody] ShoppingListElementViewModel shopListElementViewModel)
        {
            User user = await userManager.GetUserAsync(HttpContext.User);

            ShoppListElement shopListElement = new ShoppListElement
            {
                Content = shopListElementViewModel.Content,
                ID = shopListElementViewModel.ID,
                PositionInList = shopListElementViewModel.PositionInList,
                User = user
            };

            return Json(new { succeed = shopingListRepository.DeleteListElement(shopListElement) });
        }

        [Authorize]
        [HttpPut]
        public async Task EditShopingList([FromBody] ShoppingListElementViewModel [] shoppListElements)
        {
            User user = await userManager.GetUserAsync(HttpContext.User);

            foreach(var shoppingListElemnet in shoppListElements)
            {
                ShoppListElement newShoppingListElement = new ShoppListElement
                {
                    Content = shoppingListElemnet.Content,
                    ID = shoppingListElemnet.ID,
                    PositionInList = shoppingListElemnet.PositionInList,
                    User = user
                };
                await shopingListRepository.EditListElement(newShoppingListElement);
            }
        }

    }
}