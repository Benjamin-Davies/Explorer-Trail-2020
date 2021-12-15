using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Models.ViewModels
{
    public class ChallengeCompactDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Enums.ChallengeCategories Category { get; set; }
        public string Question { get; set; }
        public string Instructions { get; set; }
        public string Hint { get; set; }
        public IEnumerable<PossibleAnswer> PossibleAnswers { get; set; } // json string
        public int Answer { get; set; }
        public string AnswerBlurb { get; set; }
        public bool IsComplete { get; set; }
        public Position Position { get; set; }
    }

    public class PossibleAnswer
    {
        public int Index { get; set; }
        public string Label { get; set; }
    }

    public class Position
    {
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }
}
