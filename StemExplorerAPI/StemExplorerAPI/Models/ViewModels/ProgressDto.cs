using System.Collections.Generic;

namespace StemExplorerAPI.Models.ViewModels
{
    public class ProgressDto
    {
        public int ProfileId { get; set; }
        public int ChallengeCompactId { get; set; }
        public int Attempts { get; set; }
        public bool Correct { get; set; }
    }

    public class ChallengeCompletedDto
    {
        public int ProfileId { get; set; }
        public int ChallengeCompactId { get; set; }
        public bool Correct { get; set; }
    }
}
