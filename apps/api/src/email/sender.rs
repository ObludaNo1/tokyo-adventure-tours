use std::env;

use lettre::{
    AsyncSmtpTransport, AsyncTransport, Tokio1Executor,
    message::{Mailbox, Message},
    transport::smtp::authentication::Credentials,
};
use tracing::info;

use crate::{
    env_keys::{SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_USER},
    error::AppError,
    models::contact::ContactRequest,
};

#[derive(Debug)]
pub struct EmailSender {
    from: String,
    to: String,
    mailer: AsyncSmtpTransport<Tokio1Executor>,
}

impl EmailSender {
    pub fn from_env() -> Result<Self, AppError> {
        let smtp_user = required_env(SMTP_USER)?;
        let smtp_pass = required_env(SMTP_PASS)?;
        let smtp_host = required_env(SMTP_HOST)?;
        let smtp_port = env::var(SMTP_PORT)
            .ok()
            .and_then(|value| value.parse::<u16>().ok())
            .unwrap_or(587);
        let from = smtp_user.clone();
        let to = smtp_user.clone();

        let credentials = Credentials::new(smtp_user, smtp_pass);
        let mailer = AsyncSmtpTransport::<Tokio1Executor>::starttls_relay(&smtp_host)
            .map_err(AppError::internal)?
            .credentials(credentials)
            .port(smtp_port)
            .build();

        Ok(Self { from, to, mailer })
    }

    pub async fn send_contact_email(&self, form: &ContactRequest) -> Result<(), AppError> {
        let email = Message::builder()
            .from(self.from.parse().map_err(AppError::internal)?)
            .reply_to(
                form.email
                    .parse::<Mailbox>()
                    .map_err(|error_value| AppError::validation(error_value.to_string()))?,
            )
            .to(self.to.parse().map_err(AppError::internal)?)
            .subject("New contact form submission")
            .body(format!(
                "New contact form submission\n\nFrom: {}\n\nMessage:\n{}",
                form.email, form.message
            ))
            .map_err(AppError::internal)?;

        info!(recipient = %self.to, reply_to = %form.email, "Sending contact email");

        self.mailer
            .send(email)
            .await
            .map_err(AppError::email_send_failed)?;

        Ok(())
    }
}

fn required_env(key: &str) -> Result<String, AppError> {
    env::var(key).map_err(|error_value| {
        AppError::internal(format!(
            "Missing required environment variable {key}: {error_value}"
        ))
    })
}
