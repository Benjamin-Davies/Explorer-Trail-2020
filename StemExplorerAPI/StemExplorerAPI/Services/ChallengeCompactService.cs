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

        public async Task<IEnumerable<ChallengeCompactDto>> GetChallengeCompactsAsync()
        {
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
    }
}
