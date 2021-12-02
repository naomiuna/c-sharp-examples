
use master
--Set up the dblogin
IF EXISTS (SELECT * FROM master.dbo.syslogins WHERE loginname = N'Connect')
BEGIN
	EXEC sp_droplogin 'Connect'
END
GO

EXEC sp_addlogin 'Connect', 'UVn6JyMIfoh1B48sSNHG!!!', 'ExamOfficeConnect'

USE ExamOfficeConnect
GO

--Set up the EOConnect_user
EXEC sp_adduser 'Connect', 'Connect'
EXEC sp_addrolemember 'db_owner', 'Connect'
GO
