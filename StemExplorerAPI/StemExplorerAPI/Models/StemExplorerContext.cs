﻿using Microsoft.EntityFrameworkCore;
using StemExplorerAPI.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Models
{
    public class StemExplorerContext : DbContext
    {
        public StemExplorerContext()
        {

        }

        public StemExplorerContext(DbContextOptions<StemExplorerContext> options) : base(options)
        {
        }

        internal DbSet<Challenge> Challenges { get; set; }
        internal DbSet<Location> Locations { get; set; }
        //internal DbSet<ChallengeLevel> ChallengeLevels { get; set; }
        internal DbSet<ExternalContent> ExternalContent { get; set; }
        internal DbSet<User> Users { get; set; }
        internal DbSet<Progress> Progress { get; set; }
        internal DbSet<Profile> Profiles { get; set; }
        internal DbSet<ChallengeCompact> ChallengeCompacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Challenge>()
                .Property(c => c.Category)
                .HasConversion<int>();
            
            //modelBuilder.Entity<ChallengeLevel>()
            //    .Property(c => c.AnswerType)
            //    .HasConversion<int>();
            
            //modelBuilder.Entity<ChallengeLevel>()
            //    .Property(c => c.Difficulty)
            //    .HasConversion<int>();
            
            modelBuilder.Entity<Progress>()
                .HasIndex(c => new { c.ProfileId/*, c.ChallengeLevelId*/ })
                .IsUnique();

            modelBuilder.Entity<ChallengeCompact>()
                .Property(c => c.Category)
                .HasConversion<int>();
            
            base.OnModelCreating(modelBuilder);
        }
    }
}
