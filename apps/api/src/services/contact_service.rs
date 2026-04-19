use std::fmt::Debug;

use tracing::info;

use crate::{email::sender::EmailSender, error::AppError, models::contact::ContactRequest};

#[derive(Debug)]
pub struct ContactService {
    pub email_sender: EmailSender,
}

impl ContactService {
    pub fn new(email_sender: EmailSender) -> Self {
        Self { email_sender }
    }

    pub async fn handle_contact(&self, form: ContactRequest) -> Result<(), AppError> {
        if form.message.trim().is_empty() {
            return Err(AppError::validation("message: message must not be blank"));
        }

        info!(email = %form.email, "Dispatching contact email");
        self.email_sender.send_contact_email(&form).await?;
        Ok(())
    }
}
