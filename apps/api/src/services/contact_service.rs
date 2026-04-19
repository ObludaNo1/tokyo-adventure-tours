use std::fmt::Debug;

use tracing::info;

use crate::{email::sender::EmailSender, error::AppError, models::contact::ContactInfo};

#[derive(Debug)]
pub struct ContactService {
    pub email_sender: EmailSender,
}

impl ContactService {
    pub fn new(email_sender: EmailSender) -> Self {
        Self { email_sender }
    }

    pub async fn handle_contact(&self, form: ContactInfo) -> Result<(), AppError> {
        info!(
            summary = %form.summary(),
            "Dispatching contact email"
        );
        self.email_sender.send_contact_email(&form).await?;
        Ok(())
    }
}
