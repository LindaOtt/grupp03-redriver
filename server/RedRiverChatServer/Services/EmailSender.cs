using Microsoft.Extensions.Options;
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
        public EmailSender(IOptions<AuthMessageSenderOptions> optionsAccessor)
        {
            Options = optionsAccessor.Value;
        }

        public AuthMessageSenderOptions Options { get; } //set only via Secret Manager

        public Task SendEmailConfirmationAsync(string email, string link)
        {
            string subject = "Bekräfta din mailadress";
            string message = $"Välkommen till RedRiver Chat!<br>" +
                $"För att kunna logga in och börja använda applikationen måste du först verifiera din mailadress.<br>" +
                $"Observera att du genom att verifiera din mailadress samtidigt bekräftar att du har läst igenom villkoren för att använda applikationen och att du godkänner dem villkoren.<br>" +
                $"För att verifiera din mailadress och godkänna villkoren klickar du på nedanstående länk:<br>" +
                $"<a href='{link}'>{link}</a>";

            return SendEmailAsync(email, subject, message);
        }

        public Task SendEmailAsync(string email, string subject, string message)
        {
            var apiKey = "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";

            return Execute(apiKey, subject, message, email);
            //return Execute(Options.SendGridKey, subject, message, email);
        }

        public Task Execute(string apiKey, string subject, string message, string email)
        {
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("sofiakristiansen@gmail.com", "Sofia Kristiansen"),
                Subject = subject,
                PlainTextContent = message,
                HtmlContent = message
            };
            msg.AddTo(new EmailAddress(email));
            return client.SendEmailAsync(msg);
        }
    }
}