using BillTerra.Contexts;
using BillTerra.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillTerra.EntityFramework
{
    public class EFJarRepositorycs : IJarRepositorycs
    {
        private ApplicationDbContext context;

        public EFJarRepositorycs(ApplicationDbContext ctx)
        {
            context = ctx;

        }

        public async Task<IEnumerable<Jar>> Jars(User user)
        {
            return await context.Jars.Where(p => p.User.Id == user.Id).ToListAsync();

        }


        public async Task SaveJar(Jar jar)
        {
            if (jar.ID == 0)
                context.Jars.Add(jar);
            else
            {
                Jar dbEntity = context.Jars.FirstOrDefault(p => p.ID == jar.ID);
                if (dbEntity != null)
                {
                    dbEntity.Name = jar.Name;
                    dbEntity.FinalAmmount = jar.FinalAmmount;
                    dbEntity.AcumulatedAmmount = jar.AcumulatedAmmount;
                    dbEntity.CreationDate = jar.CreationDate;
                    dbEntity.MonthlyPayment = jar.MonthlyPayment;
                    dbEntity.State = jar.State;
                    dbEntity.EndDate = jar.EndDate;
                    dbEntity.Sequence = jar.Sequence;
                }

            }
            await context.SaveChangesAsync();
        }

        public Jar DeleteJar(Jar jar)
        {
            Jar dbEntity = context.Jars.FirstOrDefault(p => p.ID == jar.ID);
            if (dbEntity != null)
            {
                context.Jars.Remove(dbEntity);
                context.SaveChanges();
            }
            return dbEntity;
        }
    }
}
