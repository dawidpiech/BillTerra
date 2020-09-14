using System.Collections.Generic;
using System.Threading.Tasks;

namespace BillTerra.Models
{
    public interface ICategorieRepository
    {
        Task SaveCategorie(Categorie categorie);
        Categorie DeleteCategorie(Categorie categorie);
        Task<IEnumerable<Categorie>> Categories(User user);
    }
}