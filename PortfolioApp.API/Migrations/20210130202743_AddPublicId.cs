using Microsoft.EntityFrameworkCore.Migrations;

namespace PortfolioApp.API.Migrations
{
    public partial class AddPublicId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "PhotosProjects",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "Photos",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "PhotosProjects");

            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "Photos");
        }
    }
}
