using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RedRiverChatServer.Models
{
    public class ApplicationDbContext: IdentityDbContext<ApplicationUser>
    {
      //Create the Friendship database table if not already in place
        public virtual DbSet<Friendship> Friendship { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> contextOptions) : base(contextOptions)
        {
        
        }

        /// <summary>
        /// Guides to help construct tables, change keys etc can be placed here. Not needed at present.
        /// </summary>
        /// <param name="builder"></param>
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
