using Microsoft.EntityFrameworkCore;
using StemExplorerAPI.Models;
using StemExplorerAPI.Models.Entities;
using StemExplorerAPI.Models.ViewModels;
using StemExplorerAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Services
{
    public class ProgressService : IProgressService
    {
        private readonly StemExplorerContext _context;
        public ProgressService(StemExplorerContext context)
        {
            _context = context;
        }

        public async Task<List<ProgressDto>> GetProgress(int profileId)
        {
            return await _context.Progress
                .Where(p => p.ProfileId == profileId)
                .Select(p => new ProgressDto
                {
                    ProfileId = p.ProfileId,
                    ChallengeCompactId = p.ChallengeCompactId,
                    Attempts = p.Attempts,
                    Correct = p.Correct,
                })
                .ToListAsync();
        }

        private async Task<Progress> GetProgressForChallenge(int profileId, int challengeId)
        {
            var progress = await _context.Progress
                .FirstOrDefaultAsync(p => p.ProfileId == profileId && p.ChallengeCompactId == challengeId);

            if (progress is null)
            {
                progress = new Progress
                {
                    Attempts = 0,
                    Correct = false,
                    ProfileId = profileId,
                    ChallengeCompactId = challengeId,
                };
                _context.Progress.Add(progress);
            }

            return progress;
        }

        public async Task ChallengeCompleted(int profileId, int challengeCompactId, bool correct)
        {
            var progress = await GetProgressForChallenge(profileId, challengeCompactId);
            if (progress.Correct)
            {
                // Don't store anything if the user has already completed the challenge
                return;
            }

            progress.Attempts++;
            if (correct)
            {
                progress.Correct = true;
            }
            await _context.SaveChangesAsync();
        }
    }
}

