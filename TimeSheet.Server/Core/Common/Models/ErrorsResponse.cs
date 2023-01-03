namespace TimeSheet.Common.Models
{
    public enum ErrorLevel
    {
        None,
        Info,
        Warning,
        Error,
        FatalError
    }

    public enum ErrorTypes
    {
        SchemaValidation,
        RuleEngineValidation
    }

    public class ErrorsResponse
    {
        public ErrorsResponse()
        {
        }

        public ErrorLevel ErrorLevel { get; set; }
        public ErrorTypes ErrorType { get; set; }
        public string FieldName { get; set; } = string.Empty;
        public object? FieldValue { get; set; }
        public string ErrorMessage { get; set; } = string.Empty;
        public string ValidationName { get; set; } = string.Empty;
    }
}
