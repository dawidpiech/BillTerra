using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BillTerra.Migrations
{
    public partial class initiall : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsChecked",
                table: "ShopListElements");

            migrationBuilder.DropColumn(
                name: "AcumulatedAmmount",
                table: "Jars");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "Jars");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Jars");

            migrationBuilder.DropColumn(
                name: "FinalAmmount",
                table: "Jars");

            migrationBuilder.RenameColumn(
                name: "Sequence",
                table: "Jars",
                newName: "Goal");

            migrationBuilder.RenameColumn(
                name: "MonthlyPayment",
                table: "Jars",
                newName: "CurrentAmount");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Goal",
                table: "Jars",
                newName: "Sequence");

            migrationBuilder.RenameColumn(
                name: "CurrentAmount",
                table: "Jars",
                newName: "MonthlyPayment");

            migrationBuilder.AddColumn<bool>(
                name: "IsChecked",
                table: "ShopListElements",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "AcumulatedAmmount",
                table: "Jars",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "Jars",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Jars",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "FinalAmmount",
                table: "Jars",
                nullable: false,
                defaultValue: 0);
        }
    }
}
