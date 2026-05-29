IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Products] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(100) NOT NULL,
    [Category] nvarchar(max) NOT NULL,
    [Price] decimal(18,2) NOT NULL,
    [IsDeleted] bit NOT NULL,
    [RowVersion] rowversion NULL,
    [quantity] int NOT NULL,
    [ImageUrl] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Products] PRIMARY KEY ([Id])
);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20260511071802_InitialCreate', N'8.0.0');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Admins] (
    [Id] int NOT NULL IDENTITY,
    [Username] nvarchar(max) NOT NULL,
    [PasswordHash] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Admins] PRIMARY KEY ([Id])
);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20260518121657_AddAdminAuthentication', N'8.0.0');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20260519115350_EnableProductConcurrency', N'8.0.0');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [Products] ADD [WarehouseId] int NOT NULL DEFAULT 1;
GO

CREATE TABLE [Warhouses] (
    [Id] int NOT NULL IDENTITY,
    [Location] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Warhouses] PRIMARY KEY ([Id])
);
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Location') AND [object_id] = OBJECT_ID(N'[Warhouses]'))
    SET IDENTITY_INSERT [Warhouses] ON;
INSERT INTO [Warhouses] ([Id], [Location])
VALUES (1, N'Warehouse 1'),
(2, N'Warehouse 2');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Location') AND [object_id] = OBJECT_ID(N'[Warhouses]'))
    SET IDENTITY_INSERT [Warhouses] OFF;
GO

CREATE INDEX [IX_Products_WarehouseId] ON [Products] ([WarehouseId]);
GO

ALTER TABLE [Products] ADD CONSTRAINT [FK_Products_Warhouses_WarehouseId] FOREIGN KEY ([WarehouseId]) REFERENCES [Warhouses] ([Id]) ON DELETE CASCADE;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20260524093549_AddWarehouse', N'8.0.0');
GO

COMMIT;
GO

