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
     //   public virtual DbSet<ApplicationUser> ApplicationUser { get; set; }
        public virtual DbSet<Friendship> Friendship { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> contextOptions) : base(contextOptions)
        {
        
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {

         /*   builder.Entity<ApplicationUser>()
                .HasMany(a => a.Friendships)
                .WithOne(e => e.ApplicationUser)
                .HasForeignKey(bc => bc.ApplicationUserId);*/

            /*     builder.Entity<ApplicationUserFriend>()
            .HasKey(t => new { t.ApplicationUserId, t.FriendId });*/
            /*   builder.Entity<ApplicationUser>()
                .HasMany(c => c.Friends)
                .WithOne(e => e.ApplicationUser);*/

            /*       builder.Entity<ApplicationUserFriend>()
             .HasKey(bc => new { bc.ApplicationUserId, bc.FriendId });

                   builder.Entity<ApplicationUserFriend>()
                       .HasOne(bc => bc.ApplicationUser)
                       .WithMany(b => b.Friends)
                       .HasForeignKey(bc => bc.ApplicationUserId);

                   builder.Entity<ApplicationUserFriend>()
                       .HasOne(bc => bc.Friend)
                       .WithMany(c => c.ApplicationUsers)
                       .HasForeignKey(bc => bc.FriendId);*/
            /*    builder.Entity<Friendship>(entity =>
                {
                    entity.HasOne(d => d.ApplicationUser)
                        .WithMany(p => p.Friendships)
                        .HasForeignKey(d => d.ApplicationUserId);
                });*/
            base.OnModelCreating(builder);
        }
    }
}
