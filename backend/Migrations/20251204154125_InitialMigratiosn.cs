using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dokan.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigratiosn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAddresses_AspNetUsers_userId1",
                table: "UserAddresses");

            migrationBuilder.DropIndex(
                name: "IX_UserAddresses_userId1",
                table: "UserAddresses");

            migrationBuilder.DropColumn(
                name: "userId1",
                table: "UserAddresses");

            migrationBuilder.AlterColumn<string>(
                name: "userId",
                table: "UserAddresses",
                type: "text",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.CreateIndex(
                name: "IX_UserAddresses_userId",
                table: "UserAddresses",
                column: "userId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserAddresses_AspNetUsers_userId",
                table: "UserAddresses",
                column: "userId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAddresses_AspNetUsers_userId",
                table: "UserAddresses");

            migrationBuilder.DropIndex(
                name: "IX_UserAddresses_userId",
                table: "UserAddresses");

            migrationBuilder.AlterColumn<Guid>(
                name: "userId",
                table: "UserAddresses",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "userId1",
                table: "UserAddresses",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserAddresses_userId1",
                table: "UserAddresses",
                column: "userId1");

            migrationBuilder.AddForeignKey(
                name: "FK_UserAddresses_AspNetUsers_userId1",
                table: "UserAddresses",
                column: "userId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
