use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use validator::{Validate, ValidationErrors};

#[derive(Debug, Deserialize, Validate, ToSchema)]
pub struct ContactRequest {
    #[validate(length(min = 1, message = "must not be empty"))]
    first_name: String,

    #[validate(length(min = 1, message = "must not be empty"))]
    last_name: String,

    #[validate(email(message = "must be a valid email address"))]
    email: String,

    #[validate(length(min = 1, message = "must not be empty"))]
    message: String,
}

#[derive(Debug)]
pub struct ContactInfo {
    first_name: String,
    last_name: String,
    email: String,
    message: String,
}

impl ContactRequest {
    pub fn try_validate(self) -> Result<ContactInfo, ValidationErrors> {
        self.validate()?;
        Ok(ContactInfo {
            first_name: self.first_name,
            last_name: self.last_name,
            email: self.email,
            message: self.message,
        })
    }
}

impl ContactInfo {
    pub fn first_name(&self) -> &str {
        &self.first_name
    }

    pub fn last_name(&self) -> &str {
        &self.last_name
    }

    pub fn email(&self) -> &str {
        &self.email
    }

    pub fn message(&self) -> &str {
        &self.message
    }

    /// Creates a summary of the contact info for logging purposes, truncating the message if it's too long.
    pub fn summary(&self) -> String {
        let max_message_length = 100;
        let message_preview = if self.message.len() > max_message_length {
            format!("{}...", &self.message[..max_message_length])
        } else {
            self.message.clone()
        };
        format!(
            "ContactInfo {{ first_name: {}, last_name: {}, email: {}, message: {} }}",
            self.first_name, self.last_name, self.email, message_preview
        )
    }
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ContactResponse;

#[derive(Debug, Serialize, ToSchema)]
pub struct ErrorResponse {
    pub error: String,
}
