using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerAPI.Models.Entities
{
    public class ChallengeCompact
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Enums.ChallengeCategories Category { get; set; }
        public string Question { get; set; }
        public string Instructions { get; set; }
        public string Hint { get; set; }
        public string PossibleAnswers { get; set; } // json string
        public int Answer { get; set; }
        public string AnswerBlurb { get; set; }
        public bool IsComplete { get; set; }
    }
}
