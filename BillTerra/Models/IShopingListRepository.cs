using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.Models
{
    public interface IShopingListRepository
    {      
        Task<ShoppListElement> AddListElement(ShoppListElement shopListElement);
        Task<bool> DeleteListElement(ShoppListElement shopListElement);
        Task<bool> EditListElement(ShoppListElement shopListElement);
        Task<IEnumerable<ShoppListElement>> ShopListElements(User user);
    }
}
