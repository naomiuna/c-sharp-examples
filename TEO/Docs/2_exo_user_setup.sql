
use master
--Set up the dblogin
IF EXISTS (SELECT * FROM master.dbo.syslogins WHERE loginname = N'Exam')
BEGIN
	EXEC sp_droplogin 'Exam'
END
GO

EXEC sp_addlogin 'Exam', 'UGe6JyMIfoh1B48sSNJK!!!', 'ExamOffice'

USE ExamOffice
GO

--Set up the EOConnect_user
EXEC sp_adduser 'Exam', 'Exam'
EXEC sp_addrolemember 'db_owner', 'Exam'
GO
