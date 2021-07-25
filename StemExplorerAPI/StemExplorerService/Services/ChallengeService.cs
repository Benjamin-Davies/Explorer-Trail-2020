using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using StemExplorerData.Models;
using StemExplorerData.Models.Entities;
using StemExplorerData.Models.Mappings;
using StemExplorerData.Models.ViewModels;
using StemExplorerService.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace StemExplorerService.Services
{
    public class ChallengeService : IChallengeService
    {
        private readonly StemExplorerContext _context;
        private readonly ILogger _logger;
        private readonly IProgressService _progressService;
        public ChallengeService(StemExplorerContext context, ILogger<ChallengeService> logger, IProgressService progressService)
        {
            _context = context;
            _logger = logger;
            _progressService = progressService;
        }

        public async Task<List<ChallengeDto>> GetChallenges(int? profileId)
        {
            try
            {
                var challenges = await _context.Challenges
                    .AsNoTracking()
                    .Select(c => new ChallengeDto
                    {
                        Id = c.Id,
                        Title = c.Title,
                        Description = c.Description,
                        Category = c.Category,
                        LocationId = c.LocationId,
                    }).ToListAsync();

                if (profileId is int uid)
                {
                    var progress = await _progressService.GetProgress(uid);

                    foreach (var challenge in challenges)
                    {
                        foreach (var level in challenge.ChallengeLevels)
                        {
                            level.Complete = progress.FirstOrDefault(p => p.ChallengeLevelId == level.Id)?.Correct ?? false;
                        }
                    }
                }

                return challenges;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }
        }

        public async Task<ChallengeDto> GetChallengeById(int challengeId, int? profileId)
        {
            try
            {
                var challenge = await _context.Challenges
                    .AsNoTracking()
                    .Where(c => c.Id == challengeId)
                    .Select(challenge => new ChallengeDto
                    {
                        Id = challenge.Id,
                        Title = challenge.Title,
                        Description = challenge.Description,
                        Category = challenge.Category,
                        LocationId = challenge.LocationId,
                        ChallengeLevels = challenge.ChallengeLevels.Select(cl => new ChallengeLevelDto
                        {
                            Id = cl.Id,
                            QuestionText = cl.QuestionText,
                            QuestionImage = cl.QuestionImage,
                            QuestionImageHelperText = cl.QuestionImageHelperText,
                            Instructions = cl.Instructions,
                            InstructionsImage = cl.InstructionsImage,
                            InstructionsImageHelperText = cl.InstructionsImageHelperText,
                            Difficulty = cl.Difficulty,
                            Answers = cl.Answers,
                            Hint = cl.Hint,
                            PossibleAnswers = cl.PossibleAnswers,
                            AnswerType = cl.AnswerType,
                            VideoEmbedUrl = cl.VideoEmbedUrl,
                        }).OrderBy(l => l.Difficulty).ToList()
                    }).SingleOrDefaultAsync();

                if (profileId is int uid && challenge != null)
                {
                    var progress = await _progressService.GetProgress(uid);

                    foreach (var level in challenge.ChallengeLevels)
                    {
                        level.Complete = progress.FirstOrDefault(p => p.ChallengeLevelId == level.Id)?.Correct ?? false;
                    }
                }

                if (challenge != null)
                {
                    foreach (var level in challenge.ChallengeLevels)
                    {
                        if (level.VideoEmbedUrl == null)
                        {
                            level.VideoEmbedUrl = InferVideo(level);
                        }
                    }
                }

                return challenge;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }
        }

        public async Task<bool> UpdateChallenge(ChallengeDto dto)
        {
            var entity = dto.ToEntity();

            if (entity == null || ! await _context.Challenges.AnyAsync(c => c.Id == entity.Id))
            {
                return false;
            }

            try
            {
                _context.Entry(entity).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }
        }

        public async Task CreateChallenge(ChallengeDto dto)
        {
            var entity = dto.ToEntity();

            try
            {
                _context.Challenges.Add(entity);
                _context.ChallengeLevels.AddRange(entity.ChallengeLevels);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }
        }

        public async Task<Challenge> DeleteChallenge(int id)
        {
            var entity = await _context.Challenges.SingleOrDefaultAsync(c => c.Id == id);

            if (entity == null)
            {
                return new Challenge();
            }

            try
            {
                _context.Challenges.Remove(entity);
                await _context.SaveChangesAsync();
                return entity;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                throw;
            }

        }

        private string InferVideo(ChallengeLevelDto level)
            => InferVideo(level.Instructions) ?? InferVideo(level.Hint);
        private string InferVideo(string text)
        {
            var youtubeUrl = new Regex(@"(youtube.com\/watch\?v=|youtu.be\/)([^ ]{11})", RegexOptions.Compiled);
            var match = youtubeUrl.Match(text);
            if (!match.Success)
            {
                return null;
            }
            var videoId = match.Groups[2];
            return $"https://www.youtube-nocookie.com/embed/{videoId}";
        }
    }
}
