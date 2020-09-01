using System.Collections.Generic;
using System.Threading.Tasks;


namespace BillTerra.Models
{
    public interface IJarRepositorycs
    {
        Task Add(Jar jar);
        Task<IEnumerable<Jar>> Jars(User user);
    }
}