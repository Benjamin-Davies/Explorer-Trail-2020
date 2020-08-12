﻿using Microsoft.EntityFrameworkCore;
using StemExplorerAPI.Models;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services
{
    public class ChallengeService : IChallengeService
    {
        private readonly StemExplorerContext _context;
        public ChallengeService(StemExplorerContext context)
        {
            _context = context;
        }

        public async Task<ChallengesDto> GetChallenges()
        {
            var challenges = await _context.Challenges.Select(c => new ChallengeDto
            {
                Id = c.Id,
                Title = c.Title,
                Description = c.Description,
                Category = c.Category,
                LocationId = c.LocationId,
            }).ToListAsync();
            return new ChallengesDto
            {
                Challenges = challenges,
            };
        }

        public async Task<ChallengeDto> GetChallengeById(int challengeId)
        {
            return await _context.Challenges
                .AsNoTracking()
                .Where(c => c.Id == challengeId)
                .Select(challenge => new ChallengeDto
                {
                    Id = challenge.Id,
                    Title = challenge.Title,
                    Description = challenge.Description,
                    Category = challenge.Category
                }).SingleOrDefaultAsync();
        }
    }
}
