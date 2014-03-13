USE [master]
GO

/****** Object:  Database [Angular]    Script Date: 02/28/2014 14:50:37 ******/
CREATE DATABASE [Angular] 

GO

ALTER DATABASE [Angular] SET COMPATIBILITY_LEVEL = 100
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Angular].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [Angular] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [Angular] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [Angular] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [Angular] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [Angular] SET ARITHABORT OFF 
GO

ALTER DATABASE [Angular] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [Angular] SET AUTO_CREATE_STATISTICS ON 
GO

ALTER DATABASE [Angular] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [Angular] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [Angular] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [Angular] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [Angular] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [Angular] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [Angular] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [Angular] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [Angular] SET  DISABLE_BROKER 
GO

ALTER DATABASE [Angular] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [Angular] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [Angular] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [Angular] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [Angular] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [Angular] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [Angular] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [Angular] SET  READ_WRITE 
GO

ALTER DATABASE [Angular] SET RECOVERY SIMPLE 
GO

ALTER DATABASE [Angular] SET  MULTI_USER 
GO

ALTER DATABASE [Angular] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [Angular] SET DB_CHAINING OFF 
GO


USE [Angular]
GO

/****** Object:  Table [dbo].[angularPost]    Script Date: 02/28/2014 14:50:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[angularPost](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[content] [nvarchar](max) NULL,
	[postedby] [nvarchar](max) NULL,
	[createdate] [datetime] NULL,
	[isActive] [bit] NULL,
	[UserIP] [varchar](50) NULL,
	[UserBrowser] [varchar](max) NULL,
 CONSTRAINT [PK_angularPost] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


USE [Angular]
GO

/****** Object:  Table [dbo].[comments]    Script Date: 02/28/2014 14:51:04 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[comments](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[parentPost] [bigint] NOT NULL,
	[comments] [nvarchar](max) NULL,
	[commentPostedby] [nvarchar](max) NULL,
	[createDate] [datetime] NULL,
	[UserIP] [varchar](50) NULL,
	[UserBrowser] [varchar](200) NULL,
 CONSTRAINT [PK_comments] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[comments]  WITH CHECK ADD  CONSTRAINT [FK_comments_posts] FOREIGN KEY([parentPost])
REFERENCES [dbo].[angularPost] ([id])
GO

ALTER TABLE [dbo].[comments] CHECK CONSTRAINT [FK_comments_posts]
GO


--12 march 2014

alter table angularpost
add Likes int not null DEFAULT 0

alter table angularpost
add Hates int not null default 0

alter table angularpost
add  Views int not null default 0

alter table comments
add  Likes int not null default 0

alter table comments
add  Hates int not null default 0


