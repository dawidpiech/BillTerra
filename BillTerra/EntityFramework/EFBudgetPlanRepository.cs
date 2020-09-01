﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BillTerra.Models;
using Microsoft.EntityFrameworkCore;
using BillTerra.Contexts;

namespace BillTerra.EntityFramework
{
    public class EFBudgetPlanRepository : IBudgetPlanRepository
    {
        private ApplicationDbContext context;

        public EFBudgetPlanRepository(ApplicationDbContext ctx)
        {
            context = ctx;
        }

        public async Task Add(BudgetPlan budgetPlan)
        {
            context.BudgetPlans.Add(budgetPlan);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<BudgetPlan>> BudgetPlans(User user)
        {
            var sql = $"SELECT * FROM dbo.BudgetPlans WHERE UserId = '{user.Id}'";

            return await context.BudgetPlans
                .FromSql(sql)
                .ToListAsync();
        }
    }
}
