use std::{
    error::Error,
    fmt::{self, Display, Formatter},
};

use axum::{
    Json,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use tracing::error;
use validator::ValidationErrors;

use crate::models::contact::ErrorResponse;

#[derive(Debug)]
pub enum AppError {
    ValidationError(String),
    EmailSendFailed,
    InternalError,
}

impl AppError {
    pub fn validation(message: impl Into<String>) -> Self {
        Self::ValidationError(message.into())
    }

    pub fn internal<E>(error_value: E) -> Self
    where
        E: std::fmt::Debug,
    {
        error!(error = ?error_value, "Internal application error");
        Self::InternalError
    }

    pub fn email_send_failed<E>(error_value: E) -> Self
    where
        E: std::fmt::Debug,
    {
        error!(error = ?error_value, "Email sending failed");
        Self::EmailSendFailed
    }
}

impl Display for AppError {
    fn fmt(&self, formatter: &mut Formatter<'_>) -> fmt::Result {
        match self {
            Self::ValidationError(message) => formatter.write_str(message),
            Self::EmailSendFailed => formatter.write_str("Failed to send contact email"),
            Self::InternalError => formatter.write_str("Internal server error"),
        }
    }
}

impl Error for AppError {}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let status_code = match self {
            Self::ValidationError(_) => StatusCode::BAD_REQUEST,
            Self::EmailSendFailed => StatusCode::BAD_GATEWAY,
            Self::InternalError => StatusCode::INTERNAL_SERVER_ERROR,
        };

        let body = Json(ErrorResponse {
            error: self.to_string(),
        });

        (status_code, body).into_response()
    }
}

impl From<ValidationErrors> for AppError {
    fn from(errors: ValidationErrors) -> Self {
        let messages = errors
            .field_errors()
            .iter()
            .map(|(field, details)| {
                let reasons = details
                    .iter()
                    .map(|detail| {
                        detail
                            .message
                            .clone()
                            .map(|message| message.into_owned())
                            .unwrap_or_else(|| detail.code.to_string())
                    })
                    .collect::<Vec<_>>()
                    .join(", ");

                format!("{field}: {reasons}")
            })
            .collect::<Vec<_>>()
            .join("; ");

        Self::ValidationError(messages)
    }
}
