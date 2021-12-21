using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace StemExplorerAPI.Migrations
{
    public partial class RemoveChallengeLevels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Progress_ChallengeLevels_ChallengeLevelId",
                table: "Progress");

            migrationBuilder.DropTable(
                name: "ChallengeLevels");

            migrationBuilder.DropIndex(
                name: "IX_Progress_ChallengeLevelId",
                table: "Progress");

            migrationBuilder.DropIndex(
                name: "IX_Progress_ProfileId_ChallengeLevelId",
                table: "Progress");

            migrationBuilder.DropColumn(
                name: "ChallengeLevelId",
                table: "Progress");

            migrationBuilder.AddColumn<int>(
                name: "ChallengeCompactId",
                table: "Progress",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Progress_ChallengeCompactId",
                table: "Progress",
                column: "ChallengeCompactId");

            migrationBuilder.CreateIndex(
                name: "IX_Progress_ProfileId",
                table: "Progress",
                column: "ProfileId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Progress_ChallengeCompacts_ChallengeCompactId",
                table: "Progress",
                column: "ChallengeCompactId",
                principalTable: "ChallengeCompacts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Progress_ChallengeCompacts_ChallengeCompactId",
                table: "Progress");

            migrationBuilder.DropIndex(
                name: "IX_Progress_ChallengeCompactId",
                table: "Progress");

            migrationBuilder.DropIndex(
                name: "IX_Progress_ProfileId",
                table: "Progress");

            migrationBuilder.DropColumn(
                name: "ChallengeCompactId",
                table: "Progress");

            migrationBuilder.AddColumn<int>(
                name: "ChallengeLevelId",
                table: "Progress",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ChallengeLevels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AnswerType = table.Column<int>(type: "integer", nullable: false),
                    Answers = table.Column<string[]>(type: "text[]", nullable: true),
                    ChallengeId = table.Column<int>(type: "integer", nullable: false),
                    Difficulty = table.Column<int>(type: "integer", nullable: false),
                    Hint = table.Column<string>(type: "text", nullable: true),
                    Instructions = table.Column<string>(type: "text", nullable: true),
                    InstructionsImage = table.Column<string>(type: "text", nullable: true),
                    InstructionsImageHelperText = table.Column<string>(type: "text", nullable: true),
                    PossibleAnswers = table.Column<string[]>(type: "text[]", nullable: true),
                    QuestionImage = table.Column<string>(type: "text", nullable: true),
                    QuestionImageHelperText = table.Column<string>(type: "text", nullable: true),
                    QuestionText = table.Column<string>(type: "text", nullable: true),
                    VideoEmbedUrl = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChallengeLevels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChallengeLevels_Challenges_ChallengeId",
                        column: x => x.ChallengeId,
                        principalTable: "Challenges",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Progress_ChallengeLevelId",
                table: "Progress",
                column: "ChallengeLevelId");

            migrationBuilder.CreateIndex(
                name: "IX_Progress_ProfileId_ChallengeLevelId",
                table: "Progress",
                columns: new[] { "ProfileId", "ChallengeLevelId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ChallengeLevels_ChallengeId",
                table: "ChallengeLevels",
                column: "ChallengeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Progress_ChallengeLevels_ChallengeLevelId",
                table: "Progress",
                column: "ChallengeLevelId",
                principalTable: "ChallengeLevels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
