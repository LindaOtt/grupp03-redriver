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
        public virtual DbSet<Friendship> Friendship { get; set; }
        public DbSet<Connection> Connections { get; set; }
        public DbSet<ApplicationUserConversationRoom> ApplicationUserConversationRooms { get; set; }
        public DbSet<ConversationRoom> Rooms { get; set; }
        public DbSet<Log> Logs { get; set; }


        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> contextOptions) : base(contextOptions)
        {
        
        }

        /// <summary>
        /// Guides to help construct tables, change keys etc can be placed here.
        /// </summary>
        /// <param name="builder"></param>
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ApplicationUserConversationRoom>()
                 .HasKey(t => new { t.ApplicationUserId, t.RoomName });

            base.OnModelCreating(builder);
        }
    }
}
