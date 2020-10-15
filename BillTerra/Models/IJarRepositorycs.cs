using System.Collections.Generic;
using System.Threading.Tasks;


namespace BillTerra.Models
{
    public interface IJarRepositorycs
    {
        Task<IEnumerable<Jar>> Jars(User user);
        Task<IEnumerable<Jar>> ReachedJars(User user);
        Task<Jar> AddJar(Jar jar);
        Task<bool> EditJar(Jar jar);
        bool DeleteJar(Jar jar);
    }
}