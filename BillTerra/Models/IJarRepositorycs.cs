using System.Collections.Generic;
using System.Threading.Tasks;


namespace BillTerra.Models
{
    public interface IJarRepositorycs
    {
        Task SaveJar(Jar jar);
        Jar DeleteJar(Jar jar);
        Task<IEnumerable<Jar>> Jars(User user);
    }
}