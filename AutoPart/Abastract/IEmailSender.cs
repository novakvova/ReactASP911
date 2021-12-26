using AutoPart.Models;

namespace AutoPart.Abastract
{
    public interface IEmailSender
    {
        void SendEmail(Message message);
    }
}
