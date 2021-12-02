﻿// <auto-generated />
using System;
using Mav.API.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Mav.API.Migrations
{
    [DbContext(typeof(MavDbContext))]
    [Migration("20181011220517_TablePagesAdded")]
    partial class TablePagesAdded
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Mav.Data.Entities.Centre", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Enabled");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<string>("Number")
                        .HasMaxLength(100);

                    b.Property<int>("TypeID");

                    b.HasKey("ID");

                    b.HasIndex("TypeID");

                    b.ToTable("Centres");
                });

            modelBuilder.Entity("Mav.Data.Entities.CentreType", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasMaxLength(10);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.HasKey("ID");

                    b.ToTable("CentreTypes");
                });

            modelBuilder.Entity("Mav.Data.Entities.Page", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Deleted");

                    b.Property<int>("NavigationTypeID");

                    b.Property<int?>("ParentID");

                    b.Property<bool>("Published");

                    b.Property<int>("TypeID");

                    b.HasKey("ID");

                    b.HasIndex("ParentID");

                    b.ToTable("Pages");
                });

            modelBuilder.Entity("Mav.Data.Entities.PageInfo", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Content");

                    b.Property<DateTime>("CreatedOn");

                    b.Property<DateTime>("ModifiedOn");

                    b.Property<int>("PageID");

                    b.Property<string>("Title")
                        .HasMaxLength(400);

                    b.Property<string>("Url")
                        .HasMaxLength(400);

                    b.HasKey("ID");

                    b.HasIndex("PageID");

                    b.ToTable("PageInfos");
                });

            modelBuilder.Entity("Mav.Data.Entities.Setting", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Entry")
                        .IsRequired()
                        .HasMaxLength(400);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.ToTable("Settings");
                });

            modelBuilder.Entity("Mav.Data.Entities.UserCentre", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CentreID");

                    b.Property<string>("UserID")
                        .IsRequired()
                        .HasMaxLength(450);

                    b.HasKey("ID");

                    b.HasIndex("CentreID");

                    b.ToTable("UserCentres");
                });

            modelBuilder.Entity("Mav.Data.Entities.Centre", b =>
                {
                    b.HasOne("Mav.Data.Entities.CentreType", "CentreType")
                        .WithMany()
                        .HasForeignKey("TypeID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Mav.Data.Entities.Page", b =>
                {
                    b.HasOne("Mav.Data.Entities.Page", "Parent")
                        .WithMany()
                        .HasForeignKey("ParentID");
                });

            modelBuilder.Entity("Mav.Data.Entities.PageInfo", b =>
                {
                    b.HasOne("Mav.Data.Entities.Page", "Page")
                        .WithMany("PageInfos")
                        .HasForeignKey("PageID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Mav.Data.Entities.UserCentre", b =>
                {
                    b.HasOne("Mav.Data.Entities.Centre", "Centre")
                        .WithMany()
                        .HasForeignKey("CentreID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}