using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BillTerra.Contexts;
using BillTerra.Models;
using Microsoft.EntityFrameworkCore;

namespace BillTerra.EntityFramework
{
    public class EFShoppingListRepository : IShopingListRepository
    {
        private ApplicationDbContext context;


        public EFShoppingListRepository(ApplicationDbContext ctx)
        {
            context = ctx;
        }

        public async Task<IEnumerable<ShoppListElement>> ShopListElements(User user)
        {
            return await context.ShopListElements.Where(p => p.User.Id == user.Id).OrderBy(x => x.PositionInList).ToListAsync();
        }


        public async Task<ShoppListElement> AddListElement(ShoppListElement shopListElement)
        {
            context.ShopListElements.Add(shopListElement);

            await context.SaveChangesAsync();
            return shopListElement;
        }

        public async Task<bool> DeleteListElement(ShoppListElement shopListElement)
        {
            ShoppListElement dbEntity = context.ShopListElements.FirstOrDefault(p => p.ID == shopListElement.ID);
            if (dbEntity != null)
            {
                context.ShopListElements.Remove(dbEntity);
                await context.SaveChangesAsync();
                return true;
            }
            return false;

        }

        public async Task<bool> EditListElement(ShoppListElement shopListElement)
        {
            ShoppListElement dbEntity = context.ShopListElements.FirstOrDefault(p => p.ID == shopListElement.ID);
            if (dbEntity != null)
            {
                dbEntity.PositionInList = shopListElement.PositionInList;
                dbEntity.Content = shopListElement.Content;
                await context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
