Param(
	[string]$build_number = "0",    
	[string]$code_version = "0.0",  
	[string]$build = "dev-npm",
	[String]$BuildConfiguration = "Debug"
)

###################
# Main folders
###################
$sb = [System.Text.StringBuilder]::new()
$scriptpath = split-path -parent $MyInvocation.MyCommand.Definition
$root_repo_code = $scriptpath + "\..\"

###################
# .net folders
###################
$root_buildFolder = "$scriptpath\..\..\Build\"
$root_publishFolder = "$scriptpath\..\..\Publish\"
$root_repo_database = $scriptpath + "\..\..\repo-database\"
$server_solution = $root_repo_code + "\TimeSheetManagement.sln"
$server_api_project = $root_repo_code + "\TimeSheet.Server\WebApi\TimeSheet.Server.WebApi.csproj"
$TimeSheet_project = $root_repo_code + "\TimeSheet.Client\TimeSheet.Client.React\TimeSheet.Client.React.csproj"
  
###################
# react folders
###################
$common_localization = $root_repo_code + "TimeSheet.Client\TimeSheet.Client.React.Common\common-localization"
$common_ui_components = $root_repo_code + "TimeSheet.Client\TimeSheet.Client.React.Common\common-ui-components"
$react_jsonschema_form_core = $root_repo_code + "TimeSheet.Client\TimeSheet.Client.React.Common\core"
$react_jsonschema_form_material_ui = $root_repo_code + "TimeSheet.Client\TimeSheet.Client.React.Common\material-ui"
$timeSheet_client_repo_code = $root_repo_code + "TimeSheet.Client\TimeSheet.Client.React\ClientApp"

$common_ui_components_tgz = "common-ui-components-1.0.9.tgz"
$rjsf_material_ui_tgz = "rjsf-material-ui-4.2.0.tgz"

$vs = & "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe" -version "[16.0,18.0)" -products * -requires Microsoft.Component.MSBuild -prerelease -latest -utf8 -format json | ConvertFrom-Json
$msbuild = $vs[0].installationPath + "\MSBuild\Current\Bin\MSBuild.exe"
#"dotnet.exe msbuild" #instead of calling msbuild we can use   "dotnet.exe msbuild"
$dotnet = "dotnet.exe"

######################
# DB Projects
######################
$DBProjects = @(
    #[PSCustomObject]@{DatabaseName = 'DB1'; DataToInstall = 'systemData'}
    [PSCustomObject]@{DatabaseName = 'siriusDB';  DataToInstall = 'DevData,SiriusInternalData'}
)
foreach ($item in $DBProjects) {
		$DatabaseName = $item.DatabaseName
		$DataToInstall = $item.DataToInstall
		Write-Host "###### DatabaseName: $DatabaseName"
		Write-Host "###### DataToInstall: $DataToInstall"

}
#exit
$DBSolution = $root_repo_code + "..\repo-database\SiriusDB.sln"

Write-Host "msbuild - $msbuild"
Write-Host "dotnet - $dotnet"

Write-Host "timeSheet_client_repo_code: "  $timeSheet_client_repo_code


function StartProcess([string]$FileName , [string]$CommandArgs = "", [string]$WorkingDirectory="")
{
	
	$psi = New-object System.Diagnostics.ProcessStartInfo 
	$psi.CreateNoWindow = $false 
	$psi.UseShellExecute = $false 
	$psi.RedirectStandardOutput = $true 
	$psi.RedirectStandardError = $true 
	$psi.FileName = $FileName
	
	if ($CommandArgs -ne "")
	{
		$psi.Arguments = $CommandArgs 
	}
	
	if ($WorkingDirectory -ne "")
	{
		$psi.WorkingDirectory = $WorkingDirectory
	}

	$process = New-Object System.Diagnostics.Process 
	$process.StartInfo = $psi 
	[void]$process.Start()
	$output = $process.StandardOutput.ReadToEnd() 
	$errorOutput = $process.StandardError.ReadToEnd() 
	$process.WaitForExit() 
	$process.ExitCode

	if ($process.ExitCode -gt 0 -or $errorOutput -ne '')
	{
		$IsError=1
		$ErrorMessage = 'Error:' + [Environment]::NewLine +  $process.ExitCode + [Environment]::NewLine +"Output:" + [Environment]::NewLine + $output + "errorOutput:" + $errorOutput
		Throw [System.Exception]$ErrorMessage
	} 

}



#################################################
#NPM 
#################################################
function npmCommand ([string] $reactProject, [string] $npmCommand) {
	Set-Location -Path $scriptpath	
	
	Write-Host "###### Running for: " $reactProject
	Push-Location $reactProject 
	$npmCommand
	if (0 -ne $LASTEXITCODE) {
		Write-Error "###### npm failed running: $reactProject"
		Stop-Transcript
		exit $LASTEXITCODE
	}

	Pop-Location	
}

#$package - can be pkg, folder, tgz
function npmInstall ([string] $reactProject, [string] $package = '', [string] $withLegacy) {
	Set-Location -Path $scriptpath
	
	$sw = [Diagnostics.Stopwatch]::StartNew()
	Write-Host ""
	Write-Host "##############################################################################"
	Write-Host "Running npm install..."
	Write-Host "reactProject: " $reactProject
	Write-Host "package " $package
	Push-Location $reactProject 
	if ($package -eq '') {
		Write-Host "	npm install $withLegacy"
		& npm install $withLegacy
		if (0 -ne $LASTEXITCODE) {
			Write-Error "###### npm failed running: $reactProject"
			Stop-Transcript
			exit $LASTEXITCODE
		}
	}
	else {
		Write-Host "	###### npm install --save $package $withLegacy"
		& npm install --save $package $withLegacy
		if (0 -ne $LASTEXITCODE) {
			Write-Error "###### npm failed running: $reactProject"
			Stop-Transcript
			exit $LASTEXITCODE
		}
	}

	Pop-Location
	$sw.Stop()
	$messageString = 'npm install {0} - Duration: {1}' -f ($package, $sw.Elapsed.ToString('mm\:ss'))
	[void]$sb.AppendLine($messageString)
	write-host "Duration - "$sw.Elapsed.ToString('mm\:ss')""
	write-host ""
}

function npmUnInstall ([string] $reactProject, [string] $packageName, [string] $withLegacy) {
	Set-Location -Path $scriptpath
	
	$sw = [Diagnostics.Stopwatch]::StartNew()
	Write-Host "###### Running npm uninstall for project: $reactProject #######"
	Write-Host "###### npm uninstall $packageName $withLegacy"
	Push-Location $reactProject 
	& npm uninstall $packageName $withLegacy
	if (0 -ne $LASTEXITCODE) {
		Write-Error "###### npm failed running: $reactProject"
		Stop-Transcript
		exit $LASTEXITCODE
	}

	Pop-Location
	$sw.Stop()
	$messageString = 'npm uninstall {0} - Duration: {1}' -f ($packageName, $sw.Elapsed.ToString('mm\:ss'))
	[void]$sb.AppendLine($messageString)
	write-host "Duration - "$sw.Elapsed.ToString('mm\:ss')""
	write-host ""
}

function npmBuild ([string] $reactProject) {
	Set-Location -Path $scriptpath

	$sw = [Diagnostics.Stopwatch]::StartNew()	
	Write-Host "###### Running npm run build for: " $reactProject
	Push-Location $reactProject 
	& npm run build
	if (0 -ne $LASTEXITCODE) {
		Write-Error "###### npm failed running: $reactProject"
		Stop-Transcript
		exit $LASTEXITCODE
	}

	Pop-Location
	$sw.Stop()
	$messageString = 'npm run build {0} - Duration: {1}' -f ($reactProject, $sw.Elapsed.ToString('mm\:ss'))
	[void]$sb.AppendLine($messageString)
	write-host "Duration - "$sw.Elapsed.ToString('mm\:ss')""
	write-host ""
}

function npmPack ([string] $reactProject) {
	Set-Location -Path $scriptpath
	
	Write-Host "###### Running npm pack for: " $reactProject
	Push-Location $reactProject 
	& npm pack
	if (0 -ne $LASTEXITCODE) {
		Write-Error "###### npm failed running: $reactProject"
		Stop-Transcript
		exit $LASTEXITCODE
	}

	Pop-Location
}

function npmtgzReinstallPackage ([string] $reactProject, [string] $packageName, [string] $tgzPackageFullPath, [string] $withLegacy) {
	npmUnInstall -reactProject $reactProject -packageName $packageName -withLegacy "--legacy-peer-deps"
	Write-Host "###### reactProject: $reactProject"
	Write-Host "###### tgzPackageFullPath: $tgzPackageFullPath"
	npmInstall -reactProject $reactProject -package $tgzPackageFullPath -withLegacy "--legacy-peer-deps"
	
	Write-Host "###### Running npm update on $reactProject"
	npm update

}

function npmInstallAndBuildProjects ([string] $reactProject, [string] $withLegacy) {
	npmInstall -reactProject $reactProject -withLegacy "--legacy-peer-deps"
	npmBuild -reactProject $reactProject
}

function npmInstallBuildAndPackProjects ([string] $reactProject, [string] $withLegacy) {
	npmInstallAndBuildProjects $reactProject -withLegacy "--legacy-peer-deps"
	npmPack -reactProject $reactProject
}

#####################################################################################
# Database Projects
#####################################################################################
function BuildDb {
	msbuild_compile -solutionFile $DBSolution -platform "Any CPU" -compilation "Release"
}

function DeployDB() {
	# TODO: publish project to DB
	[string] $DbsRootFolder = "$root_buildFolder\Database\DBs\"
	[string] $DBInstallerWrapper = "$DbsRootFolder\DBInstallerWrapper.exe"
	[string] $args
	foreach ($item in $DBProjects) {
		$DatabaseName = $item.DatabaseName
		$DataToInstall = $item.DataToInstall
		Write-Host "###### DatabaseName: $DatabaseName"
		Write-Host "###### DataToInstall: $DataToInstall"

		$ServerName = "."
		$InstanceName = "sirius"
		$LogDBDIR = "c:\mssql\data\$InstanceName\$DatabaseName"
		$PrimaryDBDIR = "c:\mssql\data\$InstanceName\$DatabaseName"
		$BackupDir = "c:\mssql\DBBackups\$InstanceName\$DatabaseName"
		
		$args = "-S $ServerName\$InstanceName -d master -f `"$DbsRootFolder\$DatabaseName\$DatabaseName" + "_Create.sql`" -v LogDBDir=`"$LogDBDir`" PrimaryDBDir=`"$PrimaryDBDir`" DatabaseName=$DatabaseName ProjectDirectory=`"$DbsRootFolder\$DatabaseName`"  DataPath=`"empty`" DataToInstall=`"$DataToInstall`""
		
		write-host "---------- Command ------------"
		write-host "$DBInstallerWrapper $args"
		write-host "---------- Command ------------"
		
		$process = Start-Process -FilePath $DBInstallerWrapper -ArgumentList $args -NoNewWindow -PassThru -Wait
		if ($process.ExitCode -gt 0)
		{
			$ErrorMessage = "$_ exited with status code $($process.ExitCode)"
			Write-error $ErrorMessage
			Throw [System.Exception]$ErrorMessage
		} 
	
	}
}

function DropDBs() {
	# TODO: publish project to DB
	[string] $DbsRootFolder = "$root_buildFolder\Database\DBs\"
	[string] $DBInstallerWrapper = "$DbsRootFolder\DBInstallerWrapper.exe"
	[string] $args
	foreach ($item in $DBProjects) {
		$DatabaseName = $item.DatabaseName
		Write-Host "###### DatabaseName: $DatabaseName"

		$ServerName = "."
		$InstanceName = "sirius"
		
		$args = "-S $ServerName\$InstanceName -d master -r `"$DbsRootFolder\$DatabaseName\DropDbs.sql`" -v DatabaseName=$DatabaseName"
		
		write-host "---------- Command ------------"
		write-host "$DBInstallerWrapper $args"
		write-host "---------- Command ------------"
		
		$process = Start-Process -FilePath $DBInstallerWrapper -ArgumentList $args -NoNewWindow -PassThru -Wait
		if ($process.ExitCode -gt 0)
		{
			$ErrorMessage = "$_ exited with status code $($process.ExitCode)"
			Write-error $ErrorMessage
			Throw [System.Exception]$ErrorMessage
		} 
		
	}
}
#####################################################################################
# MSBuild + dotnet.exe complie & Build Functions

#/m command line switch to tell it the maximum number of concurrent processes to build with /m:x (the default is 1)
#-t:targets
#####################################################################################

function msbuild_compile(
	[string]$solutionFile = ".\Project.sln"  ,
	[string]$outputPath ,
	[string]$platform = "Mixed Platforms",
	[string]$configuration = "Debug"		
) {		
	$ms_build_settings = "-t:rebuild /m /p:Retries=40;RetryDelayMilliseconds=250 /p:AllowUnsafeBlocks=true /p:WarningLevel=0"
	
	if (![string]::IsNullOrEmpty($outputPath)) {
		$ms_build_args = "/p:OutDir=$outputPath /p:Configuration=`"$configuration`" /p:Platform=`"$platform`" /p:RunCodeAnalysis=False" 
	}
	else {
		$ms_build_args = "/p:Configuration=`"$configuration`" /p:Platform=`"$platform`" /p:RunCodeAnalysis=False"
	}

	$args_string = "$solutionfile $ms_build_settings $ms_build_args"
	$args = $args_string.Split(" ")
	# write-host "$dotnet msbuild $args"
	# & "$dotnet" msbuild $args
	
	# we use msbuild that installed under VSStudio - 
	# there are fetures that are needed for sql project And cannot be build using "C:\Windows\Microsoft.NET\Framework64\msbuild" 
	write-host "$msbuild $args"
	& "$msbuild" $args
	if (0 -ne $LASTEXITCODE) {
		Write-Error "solution $solutionFile failed to compile"
		exit $LASTEXITCODE
	}
}

function dotnet_compile(
	[string]$solutionFile = ".\Project.sln"  ,
	[string]$version = "1.0.0.0",
	[string]$configuration = "Debug",		
	[string]$outputPath
) {		
  
	$build_args = "/p:Version=$version -c $configuration"
	
	if (![string]::IsNullOrEmpty($outputPath)) {
		$build_args += " -o `"$outputPath`""
	}
	
	$args_string = "$solutionfile $build_args"
	$args = $args_string.Split(" ")
	write-host "$dotnet build $args"
	& "$dotnet" build $args
	if (0 -ne $LASTEXITCODE) {
		Write-Error "solution $solutionFile failed to compile"
		exit $LASTEXITCODE
	}
}

function dotnet_publish(
	[string]$solutionFile = ".\Project.sln"  ,
	[string]$version = "1.0.0.0",
	[string]$configuration = "Debug",		
	[string]$outputPath,
	[string]$verbosity = "minimal" # q[uiet], m[inimal], n[ormal], d[etailed]
) {		
  
	$build_args = "/p:Version=$version -c $configuration "
	
	if (![string]::IsNullOrEmpty($outputPath)) {
		$build_args += " -o `"$outputPath`""
	}
		
	if (![string]::IsNullOrEmpty($verbosity)) {
		$build_args += " -v `"$verbosity`""
	}
	
	$args_string = "$solutionfile $build_args"
	$args = $args_string.Split(" ")
	write-host "$dotnet publish $args"
	& "$dotnet" publish $args
	if (0 -ne $LASTEXITCODE) {
		Write-Error "solution $solutionFile failed to compile"
		exit $LASTEXITCODE
	}
}

#####################################################################################
# CMD Build Functions
#####################################################################################
function DeleteFile([string] $FileName) {
	write-host "deleting file: $FileName"	
	if (Test-Path $FileName) {
		Remove-Item -Force $FileName
	}
}

function DeleteFolder([string] $FolderName) {
	write-host "deleting Folder: $FolderName"	
	if (Test-Path $FolderName) {
		Remove-Item -Recurse -Force $FolderName
	}
}


function CleanCommonLibraries() {

	write-host "deleting: $common_ui_components..."
	DeleteFolder -FolderName "$common_ui_components\dist"
	DeleteFile -FileName "$common_ui_components\package-lock.json"
	remove-item "$common_ui_components\*" -include *.tgz
	
	write-host "deleting: $react_jsonschema_form_material_ui..."	
	DeleteFolder -FolderName "$react_jsonschema_form_material_ui\dist"
	DeleteFolder -FolderName "$react_jsonschema_form_material_ui\node_modules\common-ui-components"
	DeleteFile -FileName "$react_jsonschema_form_material_ui\package-lock.json"
	remove-item "$react_jsonschema_form_material_ui\*" -include *.tgz	
	
	write-host "deleting: $timeSheet_client_repo_code..."
	DeleteFolder -FolderName "$timeSheet_client_repo_code\build"
	DeleteFolder -FolderName "$timeSheet_client_repo_code\node_modules\common-ui-components"
	DeleteFolder -FolderName "$timeSheet_client_repo_code\node_modules\@rjfs\material-ui"
	DeleteFile -FileName "$timeSheet_client_repo_code\package-lock.json"
}

function DeepClean() {
	write-host "deleting: $common_localization..."	
	DeleteFolder -FolderName "$common_localization\dist"
	DeleteFolder -FolderName "$common_localization\node_modules"
	DeleteFile -FileName "$common_localization\package-lock.json"
	
	write-host "deleting: $common_ui_components..."	
	DeleteFolder -FolderName "$common_ui_components\dist"
	DeleteFolder -FolderName "$common_ui_components\node_modules"
	DeleteFile -FileName "$common_ui_components\package-lock.json"
	remove-item "$common_ui_components\*" -include *.tgz
	
	write-host "deleting: $react_jsonschema_form_core..."			
	DeleteFolder -FolderName "$react_jsonschema_form_core\dist"
	DeleteFolder -FolderName "$react_jsonschema_form_core\node_modules"
	DeleteFile -FileName "$react_jsonschema_form_core\package-lock.json"
	
	write-host "deleting: $react_jsonschema_form_material_ui..."		
	DeleteFolder -FolderName "$react_jsonschema_form_material_ui\dist"
	DeleteFolder -FolderName "$react_jsonschema_form_material_ui\node_modules"
	DeleteFile -FileName "$react_jsonschema_form_material_ui\package-lock.json"
	remove-item "$react_jsonschema_form_material_ui\*" -include *.tgz
	
	write-host "deleting: $timeSheet_client_repo_code..."		
	DeleteFolder -FolderName "$timeSheet_client_repo_code\build"
	DeleteFolder -FolderName "$timeSheet_client_repo_code\node_modules"
	DeleteFile -FileName "$timeSheet_client_repo_code\package-lock.json"
}

function Build_FullEnvironment() {
	Set-Location -Path $scriptpath
	
	#Localization
	npmInstallAndBuildProjects -reactProject $common_localization -withLegacy "--legacy-peer-deps"

	#UI Components
	npmInstallAndBuildProjects -reactProject $common_ui_components -withLegacy "--legacy-peer-deps"
	npmPack -reactProject $common_ui_components

	##React Json Forms(rjfs)/Material-ui reinstall
	npmInstallAndBuildProjects -reactProject $react_jsonschema_form_core -withLegacy "--legacy-peer-deps"
	npmInstallAndBuildProjects -reactProject $react_jsonschema_form_material_ui -withLegacy "--legacy-peer-deps"
	npmPack -reactProject $react_jsonschema_form_material_ui

	#TimeSheet Client
	npmInstall -reactProject $timeSheet_client_repo_code -withLegacy "--legacy-peer-deps"
}
	
function Build_CommonLibraries() {
	Set-Location -Path $scriptpath
	
	#Common Localization
	npmInstallAndBuildProjects -reactProject $common_localization -withLegacy "--legacy-peer-deps"

	#UI Components
	npmInstallAndBuildProjects -reactProject $common_ui_components -withLegacy "--legacy-peer-deps"
	npmPack -reactProject $common_ui_components

	##React Json Forms(rjfs)/Material-ui reinstall
	npmInstallAndBuildProjects -reactProject $react_jsonschema_form_material_ui -withLegacy "--legacy-peer-deps"
	npmPack -reactProject $react_jsonschema_form_material_ui

	#TimeSheet Client
	npmInstall -reactProject $timeSheet_client_repo_code -withLegacy "--legacy-peer-deps"	

}	

#####################################################################################
# switch $build
#####################################################################################	
$sw = [Diagnostics.Stopwatch]::StartNew()
try
{
	switch ($build) {
	
		"buildCommonUI" {
			Set-Location -Path $scriptpath
			Start-Transcript -Path .\testlog.txt

			#localiztion
			npmInstallAndBuildProjects -reactProject $common_localization -withLegacy "--legacy-peer-deps"

			#UI Components
			npmInstallBuildAndPackProjects -reactProject $common_ui_components -withLegacy "--legacy-peer-deps"

			##React Json Forms(rjfs)/Material-ui reinstall
			$packageFullPath = $common_ui_components + '\' + $common_ui_components_tgz
			npmtgzReinstallPackage -reactProject $react_jsonschema_form_material_ui -packageName "common-ui-components" -tgzPackageFullPath $packageFullPath -withLegacy "--legacy-peer-deps"
			npmInstallAndBuildProjects -reactProject $react_jsonschema_form_core -withLegacy "--legacy-peer-deps"
			npmInstallBuildAndPackProjects -reactProject $react_jsonschema_form_material_ui -withLegacy "--legacy-peer-deps"

			#TimeSheet Client
			npmInstall -reactProject $timeSheet_client_repo_code -withLegacy "--legacy-peer-deps"
			$packageFullPath = $common_ui_components + '\' + $common_ui_components_tgz
			npmtgzReinstallPackage -reactProject $timeSheet_client_repo_code -packageName "common-ui-components" -tgzPackageFullPath $packageFullPath -withLegacy "--legacy-peer-deps"
			$packageFullPath = $react_jsonschema_form_material_ui + '\' + $rjsf_material_ui_tgz
			npmtgzReinstallPackage -reactProject $timeSheet_client_repo_code -packageName "@rjsf/material-ui" -tgzPackageFullPath $packageFullPath -withLegacy "--legacy-peer-deps"

			Stop-Transcript
			$sw.Stop()
			write-host "Total Duration - "$sw.Elapsed.ToString('mm\:ss')""
			write-host ""
			write-host "Summary of Build Durations"
			write-host "=========================="
			write-host $sb.ToString()
		}
	
		"Build_FullEnvironment" {
		
			Start-Transcript -Path .\testlog.txt
			write-host "starting Build_FullEnvironment"
		
			DeepClean
			Build_FullEnvironment
				
			Stop-Transcript
			$sw.Stop()
			write-host "Total Duration - "$sw.Elapsed.ToString('mm\:ss')""
			write-host ""
			write-host "Summary of Build Durations"
			write-host "=========================="
			write-host $sb.ToString()
		}
	
		"Build_CommonLibraries" {
		
			Start-Transcript -Path .\testlog.txt
			write-host "starting Build_CommonLibraries"
		
			CleanCommonLibraries
			Build_CommonLibraries
		
			Stop-Transcript
			$sw.Stop()
			write-host "Total Duration - "$sw.Elapsed.ToString('mm\:ss')""
			write-host ""
			write-host "Summary of Build Durations"
			write-host "=========================="
			write-host $sb.ToString()
		}
	
		"buildDotNet" {		
		
		
			Start-Transcript -Path .\testlog.txt
			write-host "starting Build_FullEnvironment"
		
			dotnet_compile -solutionFile "$server_solution"  -version "1.0.0.0" -configuration "Debug" -outputPath ""
			dotnet_publish -solutionFile "$server_api_project"  -version "1.0.0.0" -configuration "Release" -outputPath "$root_publishFolder\TimeSheet.Server.WebApi"
			dotnet_publish -solutionFile "$TimeSheet_project"  -version "1.0.0.0" -configuration "Release" -outputPath "$root_publishFolder\TimeSheet.Client.React"
		
			Stop-Transcript
			$sw.Stop()
			write-host "Total Duration - "$sw.Elapsed.ToString('mm\:ss')""
			write-host ""
			write-host "Summary of Build Durations"
			write-host "=========================="
			write-host $sb.ToString()
		}
	
		"BuildAndDeployDb" {
			Start-Transcript -Path .\testlog.txt
	
			write-host "==============================================================================="
			write-host "starting BuildDb"
			BuildDb
		
			write-host "==============================================================================="
			write-host "starting DropDBs"
			DropDBs
		
			write-host "==============================================================================="
			write-host "starting Deploy"
			DeployDB
		
			write-host "==============================================================================="
			Stop-Transcript
			$sw.Stop()
			write-host "Total Duration - "$sw.Elapsed.ToString('mm\:ss')""
			write-host ""
			write-host "Summary of Build Durations"
			write-host "==============================================================================="
			write-host $sb.ToString()
		
		}
		"BuildDb" {
			Start-Transcript -Path .\testlog.txt
	
			write-host "==============================================================================="
			write-host "starting BuildDb"
			BuildDb
		
			write-host "==============================================================================="
			Stop-Transcript
			$sw.Stop()
			write-host "Total Duration - "$sw.Elapsed.ToString('mm\:ss')""
			write-host ""
			write-host "Summary of Build Durations"
			write-host "==============================================================================="
			write-host $sb.ToString()
		
		}
	}
}
catch {
  Write-Host "An error occurred:"
  Write-Host $_
}

