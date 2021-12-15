using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace StemExplorerAPI.Migrations
{
    public partial class AddChallengeCompactTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ChallengeCompacts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(nullable: true),
                    Category = table.Column<int>(nullable: false),
                    Question = table.Column<string>(nullable: true),
                    Instructions = table.Column<string>(nullable: true),
                    Hint = table.Column<string>(nullable: true),
                    PossibleAnswers = table.Column<string>(nullable: true),
                    Answer = table.Column<int>(nullable: false),
                    AnswerBlurb = table.Column<string>(nullable: true),
                    IsComplete = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChallengeCompacts", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChallengeCompacts");
        }
    }
}
