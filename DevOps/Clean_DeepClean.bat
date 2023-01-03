rmdir /s /q ..\TimeSheet.Client\TimeSheet.Client.React.Common\az-common-localization\dist
rmdir /s /q ..\TimeSheet.Client\TimeSheet.Client.React.Common\az-common-localization\node_modules
del /q ..\TimeSheet.Client\TimeSheet.Client.React.Common\az-common-localization\package-lock.json

rmdir /s /q ..\TimeSheet.Client\TimeSheet.Client.React.Common\az-common-ui-components\dist
rmdir /s /q ..\TimeSheet.Client\TimeSheet.Client.React.Common\az-common-ui-components\node_modules
del /q ..\Sirius.Client\Sirius.Client.React.Common\az-common-ui-components\package-lock.json
del /q ..\Sirius.Client\Sirius.Client.React.Common\az-common-ui-components\*.tgz

rmdir /s /q ..\Sirius.Client\Sirius.Client.React.Common\core\dist
rmdir /s /q ..\Sirius.Client\Sirius.Client.React.Common\core\node_modules
del /q ..\Sirius.Client\Sirius.Client.React.Common\core\package-lock.json

rmdir /s /q ..\Sirius.Client\Sirius.Client.React.Common\material-ui\dist
rmdir /s /q ..\Sirius.Client\Sirius.Client.React.Common\material-ui\node_modules
del /q ..\Sirius.Client\Sirius.Client.React.Common\material-ui\package-lock.json
del /q ..\Sirius.Client\Sirius.Client.React.Common\material-ui\*.tgz

rmdir /s /q ..\Sirius.Client\Sirius.Client.React.MCT\ClientApp\build
rmdir /s /q ..\Sirius.Client\Sirius.Client.React.MCT\ClientApp\node_modules
del /q ..\Sirius.Client\Sirius.Client.React.MCT\ClientApp\package-lock.json

rmdir /s /q ..\Sirius.Client\Sirius.Client.React\ClientApp\build
rmdir /s /q ..\Sirius.Client\Sirius.Client.React\ClientApp\node_modules
del /q ..\Sirius.Client\Sirius.Client.React\ClientApp\package-lock.json

pause