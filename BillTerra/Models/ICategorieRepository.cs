using Microsoft.CodeAnalysis.Differencing;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BillTerra.Models
{
    public interface ICategorieRepository
    {
        Task<Categorie> AddCategorie(Categorie categorie);
        Task<bool> DeleteCategorie(Categorie categorie);
        Task<bool> EditCategory(Categorie categorie);
        Categorie GetCategoryByID(int id);
        Categorie GetCategoryByName(string name);
        Task<IEnumerable<Categorie>> Categories(User user);
        Task<IEnumerable<Categorie>> GetIncomes(User user);
        Task<IEnumerable<Categorie>> GetExpenses(User user);
    }
}