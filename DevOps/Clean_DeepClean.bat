rmdir /s /q ..\TimeSheet.Client\TimeSheet.Client.React.Common\common-localization\dist
rmdir /s /q ..\TimeSheet.Client\TimeSheet.Client.React.Common\common-localization\node_modules
del /q ..\TimeSheet.Client\TimeSheet.Client.React.Common\common-localization\package-lock.json

rmdir /s /q ..\TimeSheet.Client\TimeSheet.Client.React.Common\common-ui-components\dist
rmdir /s /q ..\TimeSheet.Client\TimeSheet.Client.React.Common\common-ui-components\node_modules
del /q ..\TimeSheet.Client\TimeSheet.Client.React.Common\common-ui-components\package-lock.json
del /q ..\TimeSheet.Client\TimeSheet.Client.React.Common\common-ui-components\*.tgz

rmdir /s /q ..\TimeSheet.Client\TimeSheet.Client.React.Common\core\dist
rmdir /s /q ..\TimeSheet.Client\TimeSheet.Client.React.Common\core\node_modules
del /q ..\TimeSheet.Client\TimeSheet.Client.React.Common\core\package-lock.json

rmdir /s /q ..\TimeSheet.Client\Sirius.Client.React.Common\material-ui\dist
rmdir /s /q ..\TimeSheet.Client\Sirius.Client.React.Common\material-ui\node_modules
del /q ..\TimeSheet.Client\Sirius.Client.React.Common\material-ui\package-lock.json
del /q ..\TimeSheet.Client\Sirius.Client.React.Common\material-ui\*.tgz

rmdir /s /q ..\TimeSheet.Client\TimeSheet.Client.React\ClientApp\build
rmdir /s /q ..\TimeSheet.Client\TimeSheet.Client.React\ClientApp\node_modules
del /q ..\TimeSheet.Client\TimeSheet.Client.React\ClientApp\package-lock.json

pause