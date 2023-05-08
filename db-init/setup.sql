USE notable_db;

CREATE TABLE `todos` (
    `id`        int NOT NULL AUTO_INCREMENT,
    `todo`      varchar(100) NOT NULL,
    `created`   DATETIME NOT NULL DEFAULT NOW(),
    `updated`   DATETIME,
    `completed` DATETIME,
    `deleted`   DATETIME,
    PRIMARY KEY (`id`)
);

INSERT INTO `todos` (todo) VALUES ('Varnish the soap');
INSERT INTO `todos` (todo) VALUES ('Grease the stairs');
INSERT INTO `todos` (todo) VALUES ('Clean the walrus');
INSERT INTO `todos` (todo) VALUES ('Teach grandma how to floss');