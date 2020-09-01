using System.Collections.Generic;
using System.Threading.Tasks;

namespace BillTerra.Models
{
    public interface ICategorieRepository
    {
        Task Add(Categorie categorie);
        Task<IEnumerable<Categorie>> Categories(User user);
    }
}