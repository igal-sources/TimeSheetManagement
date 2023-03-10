# Set-ExecutionPolicy Unrestricted
Param
(
	[string]$ScriptFolder = (get-location),
	[INT]$IsAdminUser = 0,
	[string]$Action = "StartServices"
)

$CurrentPSFile = $MyInvocation.MyCommand.Path
$ApplicationFolder = $ScriptFolder + "\..\..\..\Publish"

$ServerAPI = "TimeSheet.Server.WebApi"
$TimeSheetClient = "TimeSheet.Client.React"

function Pause ($Message = "Press any key to continue...") {
	Write-Host -NoNewLine $Message
	$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
	Write-Host ""
}

function SleepFor ([int]$numOfSeconds = 4) {
	for ($i = $numOfSeconds ; $i -gt 0; $i --) {
		Write-Host $i 
		sleep -Seconds 1
	}
}

function LogToFile([string]$Message, [string]$Color = "Gray") {
	#$Message | out-file -filepath $ErrorFile -append 
	Write-Host $Message -foregroundcolor $Color 
}

function StopProcess([string]$ProcessName) {
	LogToFile ("Stoping process: " + $ProcessName)

	$Process = Get-Process $ProcessName -ErrorAction SilentlyContinue
	if ($Process) {
		Stop-Process -Name "$ProcessName"
		LogToFile "Process Was Stoped.."
	}
	else {
		LogToFile "Process is not running.."
	}
}

function StartProcess([string]$FileName , [string]$CommandArgs = '', [string]$WorkingDirectory = "") {
	#we are using System.Diagnostics.Process and not Powerhsell "start-process"
	#The Powerhsell "start-process" not running with shell execute, and it's blocking the service host from starting the VMS Manger

	$psi = New-object System.Diagnostics.ProcessStartInfo 
	$psi.CreateNoWindow = $false 
	$psi.UseShellExecute = $true 
	$psi.RedirectStandardOutput = $false 
	$psi.RedirectStandardError = $false 
	$psi.RedirectStandardInput = $false;
	$psi.FileName = $FileName
	[System.Console]::Title = "Main title of the window"
	if ($CommandArgs -ne "") {
		$psi.Arguments = $CommandArgs 
		$CommandArgs 
	}
	
	$psi.WorkingDirectory = $WorkingDirectory
	if ($IsAdminUser -eq 0) {
		$psi.Verb = "runas"
	}
	
	$process = New-Object System.Diagnostics.Process 
	$process.StartInfo = $psi 
	[void]$process.Start()
	
}

function StopServices() {
	StopProcess $ServerAPI
	StopProcess $TimeSheetClient
}

function StartServices() {
	
	$workingDirectory = $ApplicationFolder + "\TimeSheet.Server.WebApi\"
	StartProcess "$ServerAPI.exe" "$cmd" $workingDirectory
	SleepFor 2

	$workingDirectory = $ApplicationFolder + "\TimeSheet.Client.React\"
	StartProcess "$TimeSheetClient.exe" "" $workingDirectory
	SleepFor 2
	
	OpenBrowsers
	
}

function OpenBrowsers() {
	OpenURLInBrowser -URL "http://localhost:5000/swagger/index.html"
	OpenURLInBrowser -URL "https://localhost:3011/"
	OpenURLInBrowser -URL "https://localhost:3001/"
}
##
#$BrowserType "msedge, chrome, firefox, iexplore" - empty from default browser
#
function OpenURLInBrowser ([string]$BrowserType = "", [string]$URL) {

	[system.Diagnostics.Process]::Start("chrome", $URL)
}

function StartAsAdmin() {
	if ($IsAdminUser -eq 0) {
		$MyInvocation.MyCommand.Path
		[string]$CommandArgs = '-File "' + $CurrentPSFile + '" -ScriptFolder "' + $ScriptFolder + '" -IsAdminUser 1 -Action "' + $Action + '"'
		
		StartProcess PowerShell.exe $CommandArgs, $ScriptFolder
		
		#start-process PowerShell.exe -verb Runas -wait -argumentlist ('-File "'+$MyInvocation.MyCommand.Path+'"'),$ScriptFolder,'1',('"'+$Action+'"')
		exit
	}
	else {
		set-location $ScriptFolder
	}
}

function main() {

	StartAsAdmin

	LogToFile ("Action: (" + $Action + ")")
	LogToFile ("ApplicationFolder: (" + $ApplicationFolder + ")")
	
	switch ($Action) {

		"StartServices" {	
			StartServices
		}
		"StopServices" {					
			StopServices 
			SleepFor 2
		}
		"ReStartServices" {
			StopServices
			SleepFor 2
			StartServices
		}
		"OpenBrowsers" {
			
			OpenBrowsers

		}
		default {
			LogToFile ("Can't Find Action: (" + $Action + ")")
		}
	}

	SleepFor 2
}

main