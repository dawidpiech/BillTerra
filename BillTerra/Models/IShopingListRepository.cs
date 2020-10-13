using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models
{
    public interface IShopingListRepository
    {      
        Task<ShopListElement> AddListElement(ShopListElement shopListElement);
        bool DeleteListElement(ShopListElement shopListElement);
        Task<IEnumerable<ShopListElement>> ShopListElements(User user);
    }
}
