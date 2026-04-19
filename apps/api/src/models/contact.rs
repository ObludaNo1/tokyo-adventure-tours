use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use validator::{Validate, ValidationError, ValidationErrors};

#[derive(Debug, Deserialize, Validate, ToSchema)]
pub struct ContactRequest {
    #[schema(min_length = 1, max_length = 80)]
    #[validate(length(min = 1, max = 80, message = "must be between 1 and 80 characters"))]
    #[validate(custom(function = "validate_not_blank"))]
    #[validate(custom(function = "validate_name_characters"))]
    #[validate(custom(function = "validate_no_control_characters"))]
    first_name: String,

    #[schema(min_length = 1, max_length = 80)]
    #[validate(length(min = 1, max = 80, message = "must be between 1 and 80 characters"))]
    #[validate(custom(function = "validate_not_blank"))]
    #[validate(custom(function = "validate_name_characters"))]
    #[validate(custom(function = "validate_no_control_characters"))]
    last_name: String,

    #[schema(format = Email, max_length = 254)]
    #[validate(email(message = "must be a valid email address"))]
    #[validate(length(max = 254, message = "must be 254 characters or less"))]
    #[validate(custom(function = "validate_not_blank"))]
    #[validate(custom(function = "validate_no_control_characters"))]
    email: String,

    #[schema(min_length = 1, max_length = 2000)]
    #[validate(length(min = 1, max = 2000, message = "must be between 1 and 2000 characters"))]
    #[validate(custom(function = "validate_not_blank"))]
    #[validate(custom(function = "validate_message_characters"))]
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
            first_name: self.first_name.trim().to_string(),
            last_name: self.last_name.trim().to_string(),
            email: self.email.trim().to_string(),
            message: self.message.trim().to_string(),
        })
    }
}

fn validate_not_blank(value: &str) -> Result<(), ValidationError> {
    if value.trim().is_empty() {
        let mut error = ValidationError::new("blank");
        error.message = Some("must contain at least one non-whitespace character".into());
        return Err(error);
    }

    Ok(())
}

fn validate_name_characters(value: &str) -> Result<(), ValidationError> {
    let is_valid = value.chars().all(|character| {
        character.is_alphabetic() || character == ' ' || character == '-' || character == '\''
    });

    if !is_valid {
        let mut error = ValidationError::new("invalid_name_characters");
        error.message = Some("must contain only letters, spaces, apostrophes, or hyphens".into());
        return Err(error);
    }

    Ok(())
}

fn validate_no_control_characters(value: &str) -> Result<(), ValidationError> {
    if value.chars().any(|character| character.is_control()) {
        let mut error = ValidationError::new("contains_control_characters");
        error.message = Some("must not contain control characters".into());
        return Err(error);
    }

    Ok(())
}

fn validate_message_characters(value: &str) -> Result<(), ValidationError> {
    if value.chars().any(|character| {
        character.is_control() && character != '\n' && character != '\r' && character != '\t'
    }) {
        let mut error = ValidationError::new("contains_unsupported_control_characters");
        error.message =
            Some("must not contain unsupported control characters (allowed: newline, carriage return, tab)".into());
        return Err(error);
    }

    Ok(())
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
