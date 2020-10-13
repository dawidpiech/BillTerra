using System.Collections.Generic;
using System.Threading.Tasks;

namespace BillTerra.Models
{
    public interface IBudgetPlanRepository
    {
        Task Add(BudgetPlan budgetPlan);
        Task<IEnumerable<BudgetPlan>> BudgetPlans(User user);
    }
}