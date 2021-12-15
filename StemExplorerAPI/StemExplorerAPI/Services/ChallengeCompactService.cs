using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using StemExplorerAPI.Models;
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

            return await _context.ChallengeCompacts.Select(c => new ChallengeCompactDto
            {
                Id = c.Id,
                Title = c.Title,
                Category = c.Category,
                Question = c.Question,
                Instructions = c.Instructions,
                Hint = c.Hint,
                PossibleAnswers = JsonConvert.DeserializeObject<List<PossibleAnswer>>(c.PossibleAnswers),
                Answer = c.Answer,
                AnswerBlurb = c.AnswerBlurb,
                IsComplete = c.IsComplete,
                Position = new Position
                {
                    Latitude = c.Latitude,
                    Longitude = c.Longitude
                }
            }).ToListAsync();
        }

        private async Task<IEnumerable<ChallengeCompactDto>> GetChallengeCompactsFilteredByCategoryAsync(string filter)
        {
            var categoryIntsToFilter = new List<int>();
            var categoryIntsAsStrings = filter.Split(",").Select(s => Convert.ToInt32(s)).ToList();
            categoryIntsToFilter.AddRange(categoryIntsAsStrings);

            return await _context.ChallengeCompacts.Where(c => !categoryIntsToFilter.Contains((int)c.Category))
                .Select(c => new ChallengeCompactDto
                {
                    Id = c.Id,
                    Title = c.Title,
                    Category = c.Category,
                    Question = c.Question,
                    Instructions = c.Instructions,
                    Hint = c.Hint,
                    PossibleAnswers = JsonConvert.DeserializeObject<List<PossibleAnswer>>(c.PossibleAnswers),
                    Answer = c.Answer,
                    AnswerBlurb = c.AnswerBlurb,
                    IsComplete = c.IsComplete,
                    Position = new Position
                    {
                        Latitude = c.Latitude,
                        Longitude = c.Longitude
                    }
                }).ToListAsync();
        }
    }
}
