﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StemExplorerData.Models.Entities
{
    public class Challenge
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Enums.ChallengeCategories Category { get; set; }
        
        // EF relationship definition
        public int LocationId { get; set; }
        public Location Location { get; set; }

        public ICollection<ChallengeLevel> ChallengeLevels { get; set; }
    }
}
