using BillTerra.Contexts;
using BillTerra.Models;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
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
            return await context.Jars.Where(p => p.User.Id == user.Id).OrderBy(x=> x.ID).ToListAsync();

        }
        public async Task<IEnumerable<Jar>> ReachedJars(User user)
        {
            return await context.Jars.Where(p => p.User.Id == user.Id && p.State == State.Reached).OrderBy(x => x.ID).ToListAsync();

        }

        public async Task<Jar> AddJar(Jar jar)
        {
            context.Jars.Add(jar);
            await context.SaveChangesAsync();

            return jar;
        }

        public async Task<bool> EditJar(Jar jar)
        {
            Jar dbEntity =  context.Jars.FirstOrDefault(x => x.ID == jar.ID);
            if(dbEntity != null)
            {
                dbEntity.Name = jar.Name;
                dbEntity.Goal = jar.Goal;
                dbEntity.State = jar.State;
                await context.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public bool DeleteJar(Jar jar)
        {
            Jar dbEntity = context.Jars.FirstOrDefault(p => p.ID == jar.ID);
            if (dbEntity != null)
            {
                context.Jars.Remove(dbEntity);
                context.SaveChanges();
                return true;
            }
            return false;
        }

      
    }
}
