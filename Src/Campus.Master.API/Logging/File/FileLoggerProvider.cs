using Microsoft.Extensions.Logging;

namespace Campus.Master.API.Logging.File
{
    public class FileLoggerProvider : ILoggerProvider
    {
        private readonly string _filename;

        public FileLoggerProvider(string filename) =>
            _filename = filename;
        
        public void Dispose() { }

        public ILogger CreateLogger(string categoryName) =>
            new FileLogger(_filename);
    }
}