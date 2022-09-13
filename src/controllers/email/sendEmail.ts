import { sendEmail } from "../../utils";
import { IEmailRequest } from "../../interfaces/email";

const SendEmailController = async ({ subject, text, to }: IEmailRequest) => {
  await sendEmail({ subject, text, to });

  return "Email sent";
};

export default SendEmailController;
