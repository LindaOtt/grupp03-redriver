using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;

namespace RedRiverChatServer.Services
{
    public interface IEmailSender
    {
        Task SendEmailConfirmationAsync(string email, string link);

        Task SendEmailAsync(string email, string subject, string message);

        Task Execute(string apiKey, string subject, string message, string email);
    }

    //ToDo Email sender must be configured.
    public class EmailSender : IEmailSender
    {
        //Needed to get info from appsettings.json
        private IConfiguration _config;

        public EmailSender(IOptions<AuthMessageSenderOptions> optionsAccessor, IConfiguration config)
        {
            Options = optionsAccessor.Value;
            _config = config;
        }

        public AuthMessageSenderOptions Options { get; } //set only via Secret Manager (is not used at the moment)

        public Task SendEmailConfirmationAsync(string email, string link)
        {
            string subject = _config["Client:Subject"];
            string message =  _config["Client:Message"] +
                $"<a href='{link}'>{link}</a>";

            return SendEmailAsync(email, subject, message);
        }

        public Task SendEmailAsync(string email, string subject, string message)
        {
            //This should be handled in a more secure way
            var apiKey = _config["Client:SendGridApiKey"];

            return Execute(apiKey, subject, message, email);
        }

        public Task Execute(string apiKey, string subject, string message, string email)
        {
            var emailAddress = _config["Client:EmailAddress"];
            var name = _config["Client:Name"];

            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress(emailAddress, name),
                Subject = subject,
                PlainTextContent = message,
                HtmlContent = message
            };
            msg.AddTo(new EmailAddress(email));
            return client.SendEmailAsync(msg);
        }
    }
}