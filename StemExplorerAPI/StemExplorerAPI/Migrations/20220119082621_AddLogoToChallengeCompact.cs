using Microsoft.EntityFrameworkCore.Migrations;

namespace StemExplorerAPI.Migrations
{
    public partial class AddLogoToChallengeCompact : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Logo",
                table: "ChallengeCompacts",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Logo",
                table: "ChallengeCompacts");
        }
    }
}
