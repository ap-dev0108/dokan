using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dokan.Migrations
{
    /// <inheritdoc />
    public partial class ProductModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "stock",
                table: "Products",
                newName: "productMeta_stock");

            migrationBuilder.RenameColumn(
                name: "productTitle",
                table: "Products",
                newName: "productDetails_productTitle");

            migrationBuilder.RenameColumn(
                name: "productDescription",
                table: "Products",
                newName: "productDetails_productDescription");

            migrationBuilder.RenameColumn(
                name: "isSale",
                table: "Products",
                newName: "productMeta_isSale");

            migrationBuilder.RenameColumn(
                name: "isNew",
                table: "Products",
                newName: "productMeta_isNew");

            migrationBuilder.RenameColumn(
                name: "imageUrl",
                table: "Products",
                newName: "productDetails_imageUrl");

            migrationBuilder.RenameColumn(
                name: "category",
                table: "Products",
                newName: "productMeta_category");

            migrationBuilder.RenameColumn(
                name: "SalePrice",
                table: "Products",
                newName: "productMeta_SalePrice");

            migrationBuilder.RenameColumn(
                name: "MarkedPrice",
                table: "Products",
                newName: "productDetails_MarkedPrice");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "productMeta_stock",
                table: "Products",
                newName: "stock");

            migrationBuilder.RenameColumn(
                name: "productMeta_isSale",
                table: "Products",
                newName: "isSale");

            migrationBuilder.RenameColumn(
                name: "productMeta_isNew",
                table: "Products",
                newName: "isNew");

            migrationBuilder.RenameColumn(
                name: "productMeta_category",
                table: "Products",
                newName: "category");

            migrationBuilder.RenameColumn(
                name: "productMeta_SalePrice",
                table: "Products",
                newName: "SalePrice");

            migrationBuilder.RenameColumn(
                name: "productDetails_productTitle",
                table: "Products",
                newName: "productTitle");

            migrationBuilder.RenameColumn(
                name: "productDetails_productDescription",
                table: "Products",
                newName: "productDescription");

            migrationBuilder.RenameColumn(
                name: "productDetails_imageUrl",
                table: "Products",
                newName: "imageUrl");

            migrationBuilder.RenameColumn(
                name: "productDetails_MarkedPrice",
                table: "Products",
                newName: "MarkedPrice");
        }
    }
}
