using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
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
    public class ChallengeCompactService : IChallengeCompactService
    {
        private readonly StemExplorerContext _context;

        public ChallengeCompactService(StemExplorerContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ChallengeCompactDto>> GetChallengeCompactsAsync(string filter)
        {
            if (!string.IsNullOrWhiteSpace(filter))
            {
                return await GetChallengeCompactsFilteredByCategoryAsync(filter);
            }

            return await _context.ChallengeCompacts
                .Select(c => MapEntityToDto(c)).ToListAsync();
        }

        private async Task<IEnumerable<ChallengeCompactDto>> GetChallengeCompactsFilteredByCategoryAsync(string filter)
        {
            var categoryIntsToFilter = new List<int>();
            var categoryIntsAsStrings = filter.Split(",").Select(s => Convert.ToInt32(s)).ToList();
            categoryIntsToFilter.AddRange(categoryIntsAsStrings);

            return await _context.ChallengeCompacts.Where(c => !categoryIntsToFilter.Contains((int)c.Category))
                .Select(c => MapEntityToDto(c))
                .ToListAsync();
        }

        private ChallengeCompactDto MapEntityToDto(ChallengeCompact entity)
        {
            return new ChallengeCompactDto
            {
                Id = entity.Id,
                Title = entity.Title,
                Category = entity.Category,
                Question = entity.Question,
                Instructions = entity.Instructions,
                Hint = entity.Hint,
                PossibleAnswers = JsonConvert.DeserializeObject<List<PossibleAnswer>>(entity.PossibleAnswers),
                Answer = entity.Answer,
                AnswerBlurb = entity.AnswerBlurb,
                IsComplete = entity.IsComplete,
                Position = new Position
                {
                    Latitude = entity.Latitude,
                    Longitude = entity.Longitude
                }
            };
        }

        public async Task<ChallengeCompactDto> GetChallengeCompactByIdAsync(int id)
        {
            return await _context.ChallengeCompacts.Where(c => c.Id == id)
                .Select(c => MapEntityToDto(c))
                .SingleOrDefaultAsync();
        }
    }
}
