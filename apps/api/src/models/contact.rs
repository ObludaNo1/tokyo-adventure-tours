use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use validator::Validate;

#[derive(Debug, Deserialize, Validate, ToSchema)]
pub struct ContactRequest {
    #[validate(length(min = 1, message = "must not be empty"))]
    pub first_name: String,

    #[validate(length(min = 1, message = "must not be empty"))]
    pub last_name: String,

    #[validate(email(message = "must be a valid email address"))]
    pub email: String,

    #[validate(length(min = 1, message = "must not be empty"))]
    pub message: String,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ContactResponse;

#[derive(Debug, Serialize, ToSchema)]
pub struct ErrorResponse {
    pub error: String,
}
