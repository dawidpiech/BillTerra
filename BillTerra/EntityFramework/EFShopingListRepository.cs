using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BillTerra.Contexts;
using BillTerra.Models;
using Microsoft.EntityFrameworkCore;

namespace BillTerra.EntityFramework
{
    public class EFShopingListRepository : IShopingListRepository
    {
        private ApplicationDbContext context;


        public EFShopingListRepository(ApplicationDbContext ctx)
        {
            context = ctx;
        }

        public async Task<IEnumerable<ShopListElement>> ShopListElements(User user)
        {
            return await context.ShopListElements.Where(p => p.User.Id == user.Id).OrderBy(x => x.PositionInList).ToListAsync();
        }


        public async Task<ShopListElement> AddListElement(ShopListElement shopListElement)
        {
            context.ShopListElements.Add(shopListElement);

            await context.SaveChangesAsync();
            return shopListElement;
        }

        public bool DeleteListElement(ShopListElement shopListElement)
        {
            ShopListElement dbEntity = context.ShopListElements.FirstOrDefault(p => p.ID == shopListElement.ID);
            if(dbEntity != null)
            {
                context.ShopListElements.Remove(dbEntity);
                context.SaveChanges();
                return true;
            }
            return false;

        }

        public async Task SaveListElement(ShopListElement shopListElement)
        {
            context.ShopListElements.Add(shopListElement);         
            await context.SaveChangesAsync();

        }

       
    }
}
