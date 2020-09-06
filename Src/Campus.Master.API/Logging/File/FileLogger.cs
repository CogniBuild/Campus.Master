using System;
using System.IO;
using System.Text;
using Microsoft.Extensions.Logging;

namespace Campus.Master.API.Logging.File
{
    public class FileLogger : ILogger
    {
        private readonly FileStream _stream;
        private static object _lock = new object();

        public FileLogger(string filename) =>
            _stream = new FileStream(filename, FileMode.Append);

        public bool IsEnabled(LogLevel logLevel) => _stream != null;

        public IDisposable BeginScope<TState>(TState state) => _stream;

        public void Log<TState>(
            LogLevel logLevel, 
            EventId eventId, 
            TState state, 
            Exception exception, 
            Func<TState, Exception, string> formatter)
        {
            string log;
            
            if (formatter != null)
                log = new StringBuilder()
                    .Append(formatter(state, exception))
                    .ToString();
            else
                log = new StringBuilder()
                    .Append(state)
                    .Append(exception.Message)
                    .ToString();
            
            lock (_lock)
            {
                var byteArray = Encoding.Default.GetBytes(log + Environment.NewLine);
                _stream.Write(byteArray, 0, byteArray.Length);
            }
        }
    }
}