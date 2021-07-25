using StemExplorerData.Models.Entities;
using StemExplorerData.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StemExplorerData.Models.Mappings
{
    public static class ToEntities
    {
        public static Challenge ToEntity(this ChallengeDto dto)
        {
            return new Challenge
            {
                Id = dto.Id,
                Title = dto.Title,
                Description = dto.Description,
                Category = dto.Category,
                LocationId = dto.LocationId,
                ChallengeLevels = dto.ChallengeLevels
                    .Select(c => c.ToEntity())
                    .ToList()
            };
        }

        public static ChallengeLevel ToEntity(this ChallengeLevelDto dto)
        {
            return new ChallengeLevel
            {
                Id = dto.Id,
                QuestionText = dto.QuestionText,
                QuestionImage = dto.QuestionImage,
                QuestionImageHelperText = dto.QuestionImageHelperText,
                Difficulty = dto.Difficulty,
                Instructions = dto.Instructions,
                InstructionsImage = dto.InstructionsImage,
                InstructionsImageHelperText = dto.InstructionsImageHelperText,
                AnswerType = dto.AnswerType,
                PossibleAnswers = dto.PossibleAnswers,
                Answers = dto.Answers,
                ChallengeId = dto.ChallengeId,
                Hint = dto.Hint,
                VideoEmbedUrl = dto.VideoEmbedUrl
            };
        }

        public static Location ToEntity(this LocationDto dto)
        {
            return new Location
            {
                LocationId = dto.Id,
                Address = dto.Address,
                Email = dto.Email,
                Featured = dto.Featured,
                Latitude = dto.Position.Lat,
                Longitude = dto.Position.Lng,
                GooglePlaceId = dto.GooglePlaceId,
                Name = dto.Name,
                Phone = dto.Phone,
                Url = dto.Link,
            };
        }
    }
}
